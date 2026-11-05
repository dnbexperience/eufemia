/**
 * Vite plugin that prefetches route chunks when internal links are
 * hovered or focused.
 *
 * Equivalent to Gatsby's built-in link prefetching on hover — when the
 * user moves their pointer over (or tabs to) an internal link, the
 * target route's lazy() import is triggered so the JS chunk is cached
 * by the browser. Subsequent navigation then resolves instantly.
 *
 * The runtime code is served via a virtual module
 * (`virtual:prefetch-on-hover`) that exports a `usePrefetchOnHover`
 * React hook and a standalone `setupPrefetchOnHover` function.
 */

import type { Plugin } from 'vite'
import path from 'node:path'

const VIRTUAL_MODULE_ID = 'virtual:prefetch-on-hover'
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

export default function prefetchOnHoverPlugin(): Plugin {
  return {
    name: 'vite-plugin-prefetch-on-hover',

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return RUNTIME_CODE
      }
    },
  }
}

/**
 * Client-side runtime code served as the virtual module.
 *
 * Discovers routes on pointerover, focusin, or pointerdown. Each matching
 * internal link triggers the route's lazy() import once per successful load.
 */
const RUNTIME_CODE = `
import { useEffect } from 'react'
import { prefetchPortalRoute } from '${path.resolve(__dirname, '../load-portal-routes').replace(/\\/g, '/')}'

const prefetchedPaths = new Set()

async function prefetchRoute(pathname) {
  if (prefetchedPaths.has(pathname)) {
    return
  }

  prefetchedPaths.add(pathname)
  try {
    await prefetchPortalRoute(pathname)
  } catch {
    // Speculation must not interrupt the current page. Navigation can retry.
    prefetchedPaths.delete(pathname)
  }
}

function getInternalPathname(anchor) {
  const href = anchor.getAttribute('href')
  if (!href) {
    return null
  }

  if (
    anchor.hasAttribute('download') ||
    anchor.relList.contains('external') ||
    (anchor.target && anchor.target !== '_self')
  ) {
    return null
  }

  try {
    const url = new URL(href, window.location.href)
    if (url.origin !== window.location.origin) {
      return null
    }

    if (url.pathname.replace(/\\/+$/, '') === window.location.pathname.replace(/\\/+$/, '')) {
      return null
    }

    return url.pathname
  } catch {
    return null
  }
}

function handleAnchorEvent(e) {
  const anchor = e.target?.closest?.('a')
  if (!anchor) {
    return
  }

  const pathname = getInternalPathname(anchor)
  if (pathname) {
    prefetchRoute(pathname)
  }
}

/**
 * Sets up document-level listeners for prefetching.
 * Returns a cleanup function that removes the listeners.
 */
export function setupPrefetchOnHover() {
  document.addEventListener('pointerover', handleAnchorEvent)
  document.addEventListener('focusin', handleAnchorEvent)
  document.addEventListener('pointerdown', handleAnchorEvent)

  return () => {
    document.removeEventListener('pointerover', handleAnchorEvent)
    document.removeEventListener('focusin', handleAnchorEvent)
    document.removeEventListener('pointerdown', handleAnchorEvent)
  }
}

/**
 * React hook that activates prefetch-on-hover for the lifetime
 * of the component.
 */
export function usePrefetchOnHover() {
  useEffect(() => setupPrefetchOnHover(), [])
}
`
