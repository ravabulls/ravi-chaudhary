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
 *            translation | bdt | dictation | rapidfire | shadow
 *
 * Two deliberate behaviours:
 *   - A rapidfire round NEVER starts on page load. It waits for a Start click,
 *     because the clock burning while you read the page above it is useless.
 *   - Shadowing does not lean on slowing the audio down. Heavy playbackRate
 *     smears consonants, and shadowing wants a short segment repeated many
 *     times at close to natural speed. So the player offers an A-B loop with a
 *     repetition counter, a one-click "loop these ten seconds", and only a mild
 *     speed option with pitch preserved.
 */

(function () {
  "use strict";

  /* ---------- answer checking ---------------------------------------- */

  function loosen(s) {
    return s
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
      .replace(/Ä/g, "Ae").replace(/Ö/g, "Oe").replace(/Ü/g, "Ue")
      .replace(/ß/g, "ss");
  }

  function tidy(s) {
    return (s || "").trim().replace(/\s+/g, " ").replace(/[.!?]+$/, "");
  }

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

  function fmt(t) {
    if (!isFinite(t) || t < 0) t = 0;
    var m = Math.floor(t / 60), s = Math.floor(t % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
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
    var isRapid = type === "rapidfire";
    var order = items.slice();
    var i = 0, correct = 0, answered = 0, timer = null, secondsLeft = 60, running = false;

    var head = el("div", "de-head");
    head.appendChild(el("strong", null, root.dataset.title || "Übung"));
    var counter = el("span", "de-count");
    head.appendChild(counter);

    var timerBox = el("div", "de-timer");
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

    var btnStart = el("button", "de-btn de-primary", "Start - 60 Sekunden");
    var btnCheck = el("button", "de-btn de-primary", "Prüfen");
    var btnSkip = el("button", "de-btn", "Zeigen");
    var btnAgain = el("button", "de-btn", "Wiederholen");
    var btnShuffle = el("button", "de-btn", "Mischen");
    var bar = el("div", "de-bar");
    if (isRapid) bar.appendChild(btnStart);
    bar.appendChild(btnCheck); bar.appendChild(btnSkip);
    bar.appendChild(btnAgain); bar.appendChild(btnShuffle);

    root.appendChild(head);
    if (isRapid) root.appendChild(timerBox);
    root.appendChild(promptBox);
    root.appendChild(audioBox);
    root.appendChild(hintBox);
    root.appendChild(input);
    root.appendChild(bar);
    root.appendChild(feedback);
    root.appendChild(answerBox);

    function setRunning(on) {
      running = on;
      btnStart.style.display = (isRapid && !on) ? "" : "none";
      btnCheck.style.display = (!isRapid || on) ? "" : "none";
      btnSkip.style.display = (!isRapid || on) ? "" : "none";
      input.style.display = (!isRapid || on) ? "" : "none";
    }

    function render(focus) {
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
      if (focus) input.focus();
    }

    function advance() {
      if (i < order.length - 1) { i++; render(true); }
      else { finish(); }
    }

    function finish() {
      if (timer) { clearInterval(timer); timer = null; }
      setRunning(false);
      if (isRapid) btnStart.textContent = "Nochmal - 60 Sekunden";
      promptBox.textContent = "Fertig.";
      audioBox.innerHTML = ""; hintBox.style.display = "none";
      var pct = answered ? Math.round((correct / answered) * 100) : 0;
      feedback.className = "de-feedback ok";
      feedback.textContent = correct + " von " + answered + " richtig (" + pct + "%).";
      answerBox.style.display = "";
      answerBox.textContent = "Nothing was saved. Reload and it is gone.";
    }

    function check() {
      if (isRapid && !running) return;
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
      if (isRapid) setTimeout(advance, 450);
    }

    function startTimer() {
      secondsLeft = 60;
      timerBox.textContent = "60s";
      if (timer) clearInterval(timer);
      timer = setInterval(function () {
        secondsLeft--;
        timerBox.textContent = secondsLeft + "s";
        if (secondsLeft <= 0) { clearInterval(timer); timer = null; finish(); }
      }, 1000);
    }

    function reset(doShuffle) {
      if (timer) { clearInterval(timer); timer = null; }
      if (doShuffle) order = shuffle(items.slice());
      i = 0; correct = 0; answered = 0;
      if (isRapid) {
        setRunning(false);
        timerBox.textContent = "60s - bereit";
        btnStart.textContent = "Start - 60 Sekunden";
        render(false);
        promptBox.textContent = "Bereit? Drück Start.";
      } else {
        render(false);
      }
    }

    btnStart.addEventListener("click", function () {
      order = shuffle(items.slice());
      i = 0; correct = 0; answered = 0;
      setRunning(true);
      startTimer();
      render(true);
    });
    btnCheck.addEventListener("click", check);
    btnSkip.addEventListener("click", function () {
      if (isRapid && !running) return;
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
    btnAgain.addEventListener("click", function () { reset(false); });
    btnShuffle.addEventListener("click", function () { reset(true); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); check(); }
    });

    if (isRapid) reset(false);
    else { setRunning(true); render(false); }
  }

  /* ---------- bidirectional translation ------------------------------- */

  function buildBdt(root) {
    var items = Array.prototype.map.call(root.querySelectorAll(".de-item"), function (n) {
      return { q: n.dataset.q || "", a: n.dataset.a || "" };
    });
    if (!items.length) return;
    var dir = root.dataset.direction === "de-en" ? "de-en" : "en-de";
    var title = root.dataset.title || "Bidirektional";
    root.innerHTML = "";
    root.appendChild(el("div", "de-head")).appendChild(el("strong", null, title));

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
  /* Built around repetition of a short stretch, not around slowing speech
     down. Set A and B, or hit the ten-second button, and it loops until you
     stop, counting the passes.                                            */

  function buildShadow(root) {
    var src = root.dataset.audio;
    if (!src) return;
    var label = root.dataset.title || "Shadowing";
    var note = root.dataset.note || "";
    root.innerHTML = "";
    root.appendChild(el("div", "de-head")).appendChild(el("strong", null, label));

    var au = document.createElement("audio");
    au.controls = true; au.preload = "metadata"; au.src = src;
    // keep voices sounding like voices if the speed is nudged at all
    au.preservesPitch = true;
    au.mozPreservesPitch = true;
    au.webkitPreservesPitch = true;
    root.appendChild(au);

    var a = null, b = null, looping = false, passes = 0;

    var status = el("div", "de-loop-status");
    function paint() {
      status.textContent =
        "A " + (a === null ? "-" : fmt(a)) +
        "   B " + (b === null ? "-" : fmt(b)) +
        (looping ? "   Schleife läuft - Durchgänge: " + passes : "   Schleife aus");
    }

    var row1 = el("div", "de-bar");
    var bA = el("button", "de-btn de-small", "A setzen");
    var bB = el("button", "de-btn de-small", "B setzen");
    var bLoop = el("button", "de-btn de-small", "Schleife an");
    var bTen = el("button", "de-btn de-primary de-small", "Diese 10 Sekunden wiederholen");
    var bClear = el("button", "de-btn de-small", "Zurücksetzen");
    [bTen, bA, bB, bLoop, bClear].forEach(function (x) { row1.appendChild(x); });

    var row2 = el("div", "de-bar");
    var bBack = el("button", "de-btn de-small", "-3s");
    var bRe = el("button", "de-btn de-small", "A nochmal");
    [bBack, bRe].forEach(function (x) { row2.appendChild(x); });
    [["Tempo 1x", 1], ["0.9x", 0.9], ["0.8x", 0.8]].forEach(function (p) {
      var x = el("button", "de-btn de-small", p[0]);
      x.addEventListener("click", function () { au.playbackRate = p[1]; });
      row2.appendChild(x);
    });

    root.appendChild(row1);
    root.appendChild(row2);
    root.appendChild(status);
    if (note) root.appendChild(el("div", "de-hint", note));

    bTen.addEventListener("click", function () {
      a = au.currentTime;
      b = a + 10;
      looping = true; passes = 0;
      bLoop.textContent = "Schleife aus";
      au.currentTime = a;
      au.play();
      paint();
    });
    bA.addEventListener("click", function () { a = au.currentTime; if (b !== null && b <= a) b = null; paint(); });
    bB.addEventListener("click", function () { if (a === null) a = 0; b = Math.max(au.currentTime, a + 1); paint(); });
    bLoop.addEventListener("click", function () {
      if (a === null || b === null) { status.textContent = "Erst A und B setzen, oder die 10-Sekunden-Taste nehmen."; return; }
      looping = !looping;
      passes = 0;
      bLoop.textContent = looping ? "Schleife aus" : "Schleife an";
      if (looping) { au.currentTime = a; au.play(); }
      paint();
    });
    bClear.addEventListener("click", function () {
      a = b = null; looping = false; passes = 0;
      bLoop.textContent = "Schleife an";
      au.playbackRate = 1;
      paint();
    });
    bBack.addEventListener("click", function () { au.currentTime = Math.max(0, au.currentTime - 3); });
    bRe.addEventListener("click", function () { if (a !== null) { au.currentTime = a; au.play(); } });

    au.addEventListener("timeupdate", function () {
      if (looping && a !== null && b !== null && au.currentTime >= b) {
        au.currentTime = a;
        passes++;
        paint();
      }
    });

    paint();
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
