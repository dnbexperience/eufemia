/**
 * Kill-switch service worker.
 *
 * The Eufemia portal does not use a service worker, but earlier
 * versions (running on Gatsby) may have shipped one to production
 * through `gatsby-plugin-offline`. Existing installs would continue
 * intercepting requests and serve cached HTML / chunk URLs that no
 * longer exist on the new build, causing ChunkLoadError on soft
 * reload.
 *
 * Serving an empty worker at the same scope replaces the old one and
 * uninstalls itself, restoring normal HTTP fetching for those users.
 *
 * Once this has been live long enough for all returning users to
 * have visited at least once, this file can be deleted.
 */

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        if (self.registration && self.registration.unregister) {
          await self.registration.unregister()
        }
        if (self.caches && typeof self.caches.keys === 'function') {
          const keys = await self.caches.keys()
          await Promise.all(keys.map((key) => self.caches.delete(key)))
        }
        if (self.clients && typeof self.clients.matchAll === 'function') {
          const clients = await self.clients.matchAll({
            type: 'window',
          })
          for (const client of clients) {
            if (client && typeof client.navigate === 'function') {
              try {
                await client.navigate(client.url)
              } catch {
                // Ignore navigation errors (cross-origin, etc.)
              }
            }
          }
        }
      } catch {
        // Best-effort cleanup; ignore errors.
      }
    })()
  )
})
