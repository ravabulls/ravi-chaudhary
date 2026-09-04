/* Service worker for the site's PWA shell.
 *
 * The previous version was cache-first for every request and only ever held
 * "/" and "/resume/". Once a visitor had installed the app those two pages
 * were served from the cache indefinitely, so a new deploy never reached
 * them until CACHE_NAME was bumped by hand.
 *
 * This version is network-first for page navigations and stale-while-
 * revalidate for static assets, so content stays current while the site
 * still works offline.
 */

const VERSION = 'v2';
const PAGE_CACHE = `ravi-pages-${VERSION}`;
const ASSET_CACHE = `ravi-assets-${VERSION}`;
const OFFLINE_URLS = ['/', '/resume/'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PAGE_CACHE)
      .then((cache) => cache.addAll(OFFLINE_URLS))
      .catch(() => undefined)
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  const keep = [PAGE_CACHE, ASSET_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !keep.includes(k)).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

/* Pages: go to the network first so a deploy is picked up immediately, and
 * fall back to the cached copy only when the network fails. */
function networkFirst(request) {
  return fetch(request)
    .then((response) => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(PAGE_CACHE).then((cache) => cache.put(request, copy));
      }
      return response;
    })
    .catch(() =>
      caches
        .match(request)
        .then((cached) => cached || caches.match('/'))
    );
}

/* Static assets are content-hashed by the build, so serving a cached copy is
 * safe; refresh it in the background for next time. */
function staleWhileRevalidate(request) {
  return caches.match(request).then((cached) => {
    const network = fetch(request)
      .then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(ASSET_CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => cached);
    return cached || network;
  });
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never cache the search index or the sitemap.
  if (url.pathname.startsWith('/pagefind/') || url.pathname.includes('sitemap')) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (/\.(?:css|js|woff2?|png|jpe?g|svg|webp|ico)$/.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

/* Lets a future page trigger an immediate update if it wants to. */
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
