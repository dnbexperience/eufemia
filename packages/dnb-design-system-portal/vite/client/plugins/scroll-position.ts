/**
 * Vite plugin that persists and restores scroll positions for
 * specified DOM elements across route changes.
 *
 * Equivalent to Gatsby's `gatsby-plugin-scroll-position`. The runtime
 * code is served via a virtual module (`virtual:scroll-position`) that
 * exports helper functions and a React hook.
 */

import type { Plugin } from 'vite'

const VIRTUAL_MODULE_ID = 'virtual:scroll-position'
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

export default function scrollPositionPlugin(): Plugin {
  return {
    name: 'vite-plugin-scroll-position',

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
 * Saves and restores scroll positions for configured elements using
 * localStorage. Handles iOS Safari's pagehide event for back-forward
 * cache compatibility.
 */
const RUNTIME_CODE = `
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const SCROLL_ELEMENTS = [
  {
    selector: '#portal-sidebar-menu',
    ensureInView:
      '#portal-sidebar-menu ul li.is-active > .dnb-sidebar-menu__item',
  },
]

export function saveScrollPosition() {
  try {
    for (const { selector } of SCROLL_ELEMENTS) {
      const el = document.querySelector(selector)
      if (el) {
        localStorage.setItem('scroll-' + selector, String(el.scrollTop))
      }
    }
  } catch (e) {
    // ignore
  }
}

export function restoreScrollPosition({ smooth = false } = {}) {
  try {
    for (const { selector, ensureInView } of SCROLL_ELEMENTS) {
      const el = document.querySelector(selector)
      if (!el) {
        continue
      }

      const stored = parseFloat(
        localStorage.getItem('scroll-' + selector) || '0'
      )
      let scrollTop = stored || 0

      if (ensureInView) {
        const fallback = document.querySelector(ensureInView)
        if (fallback) {
          const offsetTop = fallback.offsetTop
          const inView =
            scrollTop <= offsetTop &&
            scrollTop >=
              offsetTop - el.offsetHeight + fallback.offsetHeight

          if (!inView) {
            scrollTop = offsetTop
          }
        }
      }

      el.style.scrollBehavior = 'auto'

      if (smooth) {
        el.scrollTop = stored
        el.style.scrollBehavior = 'smooth'
      }

      el.scrollTop = scrollTop
      el.style.scrollBehavior = ''
    }
  } catch (e) {
    // ignore
  }
}

/**
 * React hook that saves and restores sidebar scroll position on route
 * changes and page lifecycle events (beforeunload, pagehide).
 */
export function useScrollPosition() {
  const location = useLocation()
  const prevPathRef = useRef(location.pathname)

  // Save and restore on route changes
  useEffect(() => {
    const prevPath = prevPathRef.current
    prevPathRef.current = location.pathname

    if (prevPath !== location.pathname) {
      saveScrollPosition()

      requestAnimationFrame(() => {
        restoreScrollPosition({ smooth: true })
      })
    }
  }, [location])

  // Restore on initial render and persist on unload
  useEffect(() => {
    requestAnimationFrame(() => {
      restoreScrollPosition()
    })

    window.addEventListener('beforeunload', saveScrollPosition)

    // iOS Safari support
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      window.addEventListener('pagehide', saveScrollPosition)
    }

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition)
      window.removeEventListener('pagehide', saveScrollPosition)
    }
  }, [])
}
`
