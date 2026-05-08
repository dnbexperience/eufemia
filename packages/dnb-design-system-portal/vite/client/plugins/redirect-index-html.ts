/**
 * Vite plugin that normalises URLs /
 * trailingSlash: 'always' behavior.
 *
 * Two middleware layers, both applied to dev and preview servers:
 *
 * 1. **redirectIndexHtml** – rewrites `/path/index.html` → `/path/`
 * 2. **trailingSlash** – redirects `/path` → `/path/` when
 *    `<outDir>/path/index.html` exists on disk.
 *
 * Without the trailing-slash redirect the preview server's SPA
 * fallback kicks in and serves the root `index.html` (the homepage)
 * for any path that doesn't end in `/` — which is every sidebar link
 * because the SSR-rendered `<a href>` values omit the slash.
 * This makes the portal appear broken when JavaScript is disabled.
 */

import path from 'node:path'
import fs from 'node:fs'
import type { Plugin, Connect, ResolvedConfig } from 'vite'

export function redirectIndexHtmlMiddleware(): Connect.NextHandleFunction {
  return (req, res, next) => {
    if (req.url?.endsWith('/index.html')) {
      const cleanUrl = req.url.replace(/index\.html$/, '')
      res.writeHead(301, { Location: cleanUrl })
      res.end()
      return
    }
    next()
  }
}

/**
 * Redirects `/path` → `/path/` when `<outDir>/path/index.html` exists.
 * This mirrors the behavior of most static hosting providers and
 * ensures that prerendered pages are served correctly without JS.
 */
export function trailingSlashMiddleware(
  outDir: string
): Connect.NextHandleFunction {
  return (req, res, next) => {
    const url = req.url || ''
    const pathname = url.split('?')[0].split('#')[0]

    // Only redirect paths without a trailing slash and without a file extension
    if (
      pathname !== '/' &&
      !pathname.endsWith('/') &&
      !path.extname(pathname)
    ) {
      const indexPath = path.join(outDir, pathname, 'index.html')
      if (fs.existsSync(indexPath)) {
        const query = url.includes('?') ? url.slice(url.indexOf('?')) : ''
        res.writeHead(301, { Location: pathname + '/' + query })
        res.end()
        return
      }
    }
    next()
  }
}

export default function redirectIndexHtmlPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig

  return {
    name: 'redirect-index-html',

    configResolved(config) {
      resolvedConfig = config
    },

    configureServer(server) {
      server.middlewares.use(redirectIndexHtmlMiddleware())
    },

    configurePreviewServer(server) {
      server.middlewares.use(redirectIndexHtmlMiddleware())

      const outDir = resolvedConfig?.build?.outDir || 'public'
      server.middlewares.use(trailingSlashMiddleware(outDir))
    },
  }
}
