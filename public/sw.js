/* Self-destroying service worker.
 *
 * Earlier versions of this file cached the HTML of "/" and "/resume/" and
 * served it cache-first with no revalidation. Because the build gives every
 * stylesheet a content hash and deletes the previous one, that stale HTML
 * kept pointing at asset filenames that no longer existed on the server, so
 * visitors saw unstyled pages and months-old content until they hard
 * refreshed.
 *
 * This file exists only to undo that. It takes control, deletes every cache
 * this origin has, unregisters itself, and reloads any page it controls so
 * the visitor lands on the live version. Once it has run, the browser has no
 * service worker for this site and pages come straight from the network,
 * governed by the Cache-Control headers in public/_headers.
 *
 * Keep this file in place. Visitors still running a months-old worker only
 * reach it when their stale page calls register('/sw.js'), so deleting it
 * would strand them.
 */

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(names.map((n) => caches.delete(n)));

      await self.registration.unregister();

      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) {
        try {
          client.navigate(client.url);
        } catch (e) {
          /* navigate() can be refused; the next load is uncontrolled anyway */
        }
      }
    })()
  );
});

/* No fetch handler on purpose: every request goes straight to the network. */
