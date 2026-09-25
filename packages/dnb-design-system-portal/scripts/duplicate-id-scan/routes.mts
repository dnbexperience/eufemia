import fs from 'node:fs'
import path from 'node:path'

/**
 * Discover portal routes from the prerendered output. The prerender step writes
 * one `index.html` per route into the build output directory, so the set of
 * `index.html` files is the exact set of served routes.
 *
 * Returns route paths like `/` and `/uilib/components/button/`.
 */
export function discoverRoutes(publicDir: string): string[] {
  const routes: string[] = []

  // Vite asset output and the SSR bundle are not routes.
  const skipTopLevel = new Set(['assets', 'server'])

  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        const isTopLevel = path.resolve(dir) === path.resolve(publicDir)
        if (isTopLevel && skipTopLevel.has(entry.name)) {
          continue
        }
        walk(path.join(dir, entry.name))
        continue
      }

      if (entry.name === 'index.html') {
        const rel = path.relative(publicDir, dir).replace(/\\/g, '/')
        routes.push(rel === '' ? '/' : `/${rel}/`)
      }
    }
  }

  walk(publicDir)
  return Array.from(new Set(routes)).sort()
}

/**
 * Convert a route path (`/uilib/components/button/`) to a slug
 * (`uilib/components/button`). The site root becomes an empty string.
 */
export function routeToSlug(route: string): string {
  return route.replace(/^\/+|\/+$/g, '')
}
