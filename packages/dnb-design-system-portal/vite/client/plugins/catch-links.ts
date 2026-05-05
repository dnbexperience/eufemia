/**
 * Vite plugin that intercepts clicks on internal links and navigates
 * via React Router instead of triggering a full page reload.
 *
 * Equivalent to Gatsby's `gatsby-plugin-catch-links`. The runtime code
 * is served via a virtual module (`virtual:catch-links`) that exports a
 * `useCatchLinks` React hook.
 */

import type { Plugin } from 'vite'

const VIRTUAL_MODULE_ID = 'virtual:catch-links'
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

export default function catchLinksPlugin(): Plugin {
  return {
    name: 'vite-plugin-catch-links',

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
 * Listens for click events at the document level, identifies internal
 * links, and calls navigate() instead of letting the browser reload.
 */
const RUNTIME_CODE = `
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * React hook that intercepts clicks on internal <a> tags and navigates
 * via React Router instead of triggering a full page reload.
 */
export function useCatchLinks() {
  const navigateFn = useNavigate()

  useEffect(() => {
    function onClick(e) {
      // Only handle plain left-clicks without modifier keys
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.altKey ||
        e.ctrlKey ||
        e.shiftKey
      ) {
        return
      }

      const anchor = e.target?.closest?.('a')
      if (!anchor) {
        return
      }

      // Skip links that opt out, target another frame, or trigger downloads
      if (
        anchor.hasAttribute('download') ||
        anchor.getAttribute('rel') === 'external' ||
        (anchor.target && anchor.target !== '_self')
      ) {
        return
      }

      const href = anchor.getAttribute('href')
      if (!href) {
        return
      }

      // Let the browser handle hash-only links natively (scroll to anchor)
      if (href.startsWith('#')) {
        return
      }

      // Only catch internal links (same origin or relative paths)
      try {
        const url = new URL(href, window.location.origin)
        if (url.origin !== window.location.origin) {
          return
        }

        e.preventDefault()
        navigateFn(url.pathname + url.search + url.hash)
      } catch {
        // Invalid URL, let the browser handle it
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigateFn])
}
`
