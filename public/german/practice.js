/* German practice engine - deliberately stateless.
 *
 * Nothing is ever written to localStorage, sessionStorage, cookies or a server.
 * All progress lives in JavaScript variables, so a refresh wipes it. That is a
 * feature, not an oversight: the schedule lives in the content (each day's page
 * re-drills items from days N-1, N-2, N-5, N-12, N-30), not in saved state.
 *
 * Markup contract - every drill is declared in MDX as plain HTML:
 *
 *   <div class="de-drill" data-type="recall" data-title="Neue Bausteine">
 *     <div class="de-item" data-q="good morning" data-a="Guten Morgen"
 *          data-hint="literally: good morning"></div>
 *   </div>
 *
 * data-type: recall | cloze | substitution | conversion | response |
 *            translation | bdt | dictation | rapidfire
 * Audio drills add data-audio="/german/audio/file.mp3" on the item.
 */

(function () {
  "use strict";

  /* ---------- answer checking ---------------------------------------- */

  // German learners type "ue" for "ü" and "ss" for "ß" constantly. Accept it,
  // but say so, because the exam will not.
  function loosen(s) {
    return s
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
      .replace(/Ä/g, "Ae").replace(/Ö/g, "Oe").replace(/Ü/g, "Ue")
      .replace(/ß/g, "ss");
  }

  function tidy(s) {
    return (s || "").trim().replace(/\s+/g, " ").replace(/[.!?]+$/, "");
  }

  // Returns: exact | umlaut | caps | wrong
  function judge(given, wanted) {
    var g = tidy(given), w = tidy(wanted);
    if (!g) return "wrong";
    if (g === w) return "exact";
    if (loosen(g) === loosen(w)) return "umlaut";
    if (g.toLowerCase() === w.toLowerCase()) return "caps";
    if (loosen(g).toLowerCase() === loosen(w).toLowerCase()) return "caps";
    return "wrong";
  }

  var VERDICT = {
    exact: { cls: "ok", msg: "Richtig." },
    umlaut: { cls: "near", msg: "Right, but write the umlaut properly." },
    caps: { cls: "near", msg: "Right words, wrong capitals. German nouns take a capital." },
    wrong: { cls: "no", msg: "Not yet." }
  };

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------- the drill ----------------------------------------------- */

  function buildDrill(root) {
    var type = root.dataset.type || "recall";
    var items = Array.prototype.map.call(root.querySelectorAll(".de-item"), function (n) {
      return {
        q: n.dataset.q || "",
        a: n.dataset.a || "",
        hint: n.dataset.hint || "",
        audio: n.dataset.audio || ""
      };
    });
    if (!items.length) return;

    root.innerHTML = "";
    var order = items.slice();
    var i = 0, correct = 0, answered = 0, timer = null, secondsLeft = 60;
    var isRapid = type === "rapidfire";

    var head = el("div", "de-head");
    var title = el("strong", null, root.dataset.title || "Übung");
    var counter = el("span", "de-count");
    head.appendChild(title); head.appendChild(counter);

    var promptBox = el("div", "de-prompt");
    var hintBox = el("div", "de-hint");
    var audioBox = el("div", "de-audio");

    var input = el("input", "de-input");
    input.type = "text";
    input.autocomplete = "off"; input.autocorrect = "off";
    input.spellcheck = false;
    input.setAttribute("lang", "de");
    input.placeholder = "auf Deutsch tippen und Enter drücken";

    var feedback = el("div", "de-feedback");
    var answerBox = el("div", "de-answer");

    var btnCheck = el("button", "de-btn de-primary", "Prüfen");
    var btnSkip = el("button", "de-btn", "Zeigen");
    var btnAgain = el("button", "de-btn", "Wiederholen");
    var btnShuffle = el("button", "de-btn", "Mischen");
    var bar = el("div", "de-bar");
    bar.appendChild(btnCheck); bar.appendChild(btnSkip);
    bar.appendChild(btnAgain); bar.appendChild(btnShuffle);

    root.appendChild(head);
    if (isRapid) root.appendChild(el("div", "de-timer"));
    root.appendChild(promptBox);
    root.appendChild(audioBox);
    root.appendChild(hintBox);
    root.appendChild(input);
    root.appendChild(bar);
    root.appendChild(feedback);
    root.appendChild(answerBox);

    function render() {
      var it = order[i];
      counter.textContent = (i + 1) + " / " + order.length +
        "   richtig: " + correct + "/" + answered;
      promptBox.textContent = it.q;
      hintBox.textContent = it.hint;
      hintBox.style.display = it.hint ? "" : "none";
      audioBox.innerHTML = "";
      if (it.audio) {
        var au = document.createElement("audio");
        au.controls = true; au.preload = "none"; au.src = it.audio;
        audioBox.appendChild(au);
      }
      feedback.textContent = ""; feedback.className = "de-feedback";
      answerBox.textContent = ""; answerBox.style.display = "none";
      input.value = "";
      input.disabled = false;
      input.focus();
    }

    function advance() {
      if (i < order.length - 1) { i++; render(); }
      else { finish(); }
    }

    function finish() {
      if (timer) { clearInterval(timer); timer = null; }
      promptBox.textContent = "Fertig.";
      audioBox.innerHTML = ""; hintBox.style.display = "none";
      input.style.display = "none"; btnCheck.style.display = "none";
      btnSkip.style.display = "none";
      var pct = answered ? Math.round((correct / answered) * 100) : 0;
      feedback.className = "de-feedback ok";
      feedback.textContent = correct + " von " + answered + " richtig (" + pct + "%).";
      answerBox.style.display = "";
      answerBox.textContent = "Nothing was saved. Reload and it is gone.";
    }

    function check() {
      if (input.disabled) { advance(); return; }
      var it = order[i];
      var verdict = judge(input.value, it.a);
      answered++;
      if (verdict === "exact" || verdict === "umlaut") correct++;
      var v = VERDICT[verdict];
      feedback.className = "de-feedback " + v.cls;
      feedback.textContent = v.msg;
      answerBox.style.display = "";
      answerBox.innerHTML = "";
      answerBox.appendChild(el("span", "de-label", "Antwort: "));
      answerBox.appendChild(el("strong", null, it.a));
      input.disabled = true;
      if (isRapid) { setTimeout(advance, 450); }
    }

    btnCheck.addEventListener("click", check);
    btnSkip.addEventListener("click", function () {
      var it = order[i];
      answered++;
      feedback.className = "de-feedback no";
      feedback.textContent = "Shown - that counts as not known.";
      answerBox.style.display = "";
      answerBox.innerHTML = "";
      answerBox.appendChild(el("span", "de-label", "Antwort: "));
      answerBox.appendChild(el("strong", null, it.a));
      input.disabled = true;
    });
    btnAgain.addEventListener("click", function () {
      i = 0; correct = 0; answered = 0;
      if (isRapid) startTimer();
      render();
    });
    btnShuffle.addEventListener("click", function () {
      order = shuffle(items.slice());
      i = 0; correct = 0; answered = 0;
      if (isRapid) startTimer();
      render();
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); check(); }
    });

    function startTimer() {
      var box = root.querySelector(".de-timer");
      secondsLeft = 60;
      if (timer) clearInterval(timer);
      box.textContent = "60s";
      timer = setInterval(function () {
        secondsLeft--;
        box.textContent = secondsLeft + "s";
        if (secondsLeft <= 0) { clearInterval(timer); timer = null; finish(); }
      }, 1000);
    }

    if (isRapid) { order = shuffle(items.slice()); startTimer(); }
    render();
  }

  /* ---------- bidirectional translation ------------------------------- */
  /* Two panes. You type, then reveal, then read the differences yourself -
     Lampariello's point is that the comparison is the lesson.              */

  function buildBdt(root) {
    var items = Array.prototype.map.call(root.querySelectorAll(".de-item"), function (n) {
      return { q: n.dataset.q || "", a: n.dataset.a || "" };
    });
    if (!items.length) return;
    var dir = root.dataset.direction === "de-en" ? "de-en" : "en-de";
    root.innerHTML = "";
    root.appendChild(el("div", "de-head")).appendChild(
      el("strong", null, root.dataset.title || "Bidirektional"));

    items.forEach(function (it, n) {
      var row = el("div", "de-bdt-row");
      var src = dir === "en-de" ? it.q : it.a;
      var tgt = dir === "en-de" ? it.a : it.q;
      row.appendChild(el("div", "de-bdt-src", (n + 1) + ". " + src));
      var ta = el("textarea", "de-bdt-input");
      ta.rows = 2;
      ta.setAttribute("lang", dir === "en-de" ? "de" : "en");
      ta.placeholder = dir === "en-de" ? "deine Übersetzung" : "your translation";
      row.appendChild(ta);
      var out = el("div", "de-bdt-model");
      out.style.display = "none";
      var b = el("button", "de-btn de-small", "Vergleichen");
      b.addEventListener("click", function () {
        out.style.display = "";
        out.innerHTML = "";
        out.appendChild(el("span", "de-label", "Modell: "));
        out.appendChild(el("strong", null, tgt));
        var v = judge(ta.value, tgt);
        var note = el("div", "de-bdt-note " + VERDICT[v].cls);
        note.textContent = v === "exact"
          ? "Identical to the model."
          : (v === "wrong"
            ? "Different from the model - read both, find the gap, say yours aloud."
            : VERDICT[v].msg);
        out.appendChild(note);
      });
      row.appendChild(b);
      row.appendChild(out);
      root.appendChild(row);
    });
  }

  /* ---------- shadowing player ---------------------------------------- */
  /* Native <audio> plus loop and speed. No library, no storage.           */

  function buildShadow(root) {
    var src = root.dataset.audio;
    if (!src) return;
    var label = root.dataset.title || "Shadowing";
    root.innerHTML = "";
    root.appendChild(el("div", "de-head")).appendChild(el("strong", null, label));

    var au = document.createElement("audio");
    au.controls = true; au.preload = "none"; au.src = src;
    root.appendChild(au);

    var bar = el("div", "de-bar");
    [["0.6x", 0.6], ["0.75x", 0.75], ["1x", 1]].forEach(function (p) {
      var b = el("button", "de-btn de-small", p[0]);
      b.addEventListener("click", function () { au.playbackRate = p[1]; });
      bar.appendChild(b);
    });
    var back = el("button", "de-btn de-small", "-5s");
    back.addEventListener("click", function () { au.currentTime = Math.max(0, au.currentTime - 5); });
    var loop = el("button", "de-btn de-small", "Loop: aus");
    loop.addEventListener("click", function () {
      au.loop = !au.loop;
      loop.textContent = "Loop: " + (au.loop ? "an" : "aus");
    });
    bar.appendChild(back); bar.appendChild(loop);
    root.appendChild(bar);

    if (root.dataset.note) root.appendChild(el("div", "de-hint", root.dataset.note));
  }

  /* ---------- boot ----------------------------------------------------- */

  function init() {
    document.querySelectorAll(".de-drill").forEach(function (n) {
      var t = n.dataset.type;
      if (t === "bdt") buildBdt(n);
      else if (t === "shadow") buildShadow(n);
      else buildDrill(n);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
