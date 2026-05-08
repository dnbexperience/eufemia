import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const SCROLL_ELEMENTS = [
  {
    selector: '#portal-sidebar-menu',
    ensureInView:
      '#portal-sidebar-menu ul li.is-active > .dnb-sidebar-menu__item',
  },
]

const WINDOW_SCROLL_KEY = 'scroll-window'

export function saveScrollPosition() {
  try {
    sessionStorage.setItem(WINDOW_SCROLL_KEY, String(window.scrollY))

    for (const { selector } of SCROLL_ELEMENTS) {
      const el = document.querySelector(selector)
      if (el) {
        sessionStorage.setItem('scroll-' + selector, String(el.scrollTop))
      }
    }
  } catch (e) {
    // ignore
  }
}

export function restoreScrollPosition({
  smooth = false,
  restoreWindow = true,
} = {}) {
  try {
    if (restoreWindow) {
      const storedWindowScroll = parseFloat(
        sessionStorage.getItem(WINDOW_SCROLL_KEY) || '0'
      )

      if (storedWindowScroll) {
        window.scrollTo({
          top: storedWindowScroll,
          behavior: smooth ? 'smooth' : 'auto',
        })
      }
    }

    for (const { selector, ensureInView } of SCROLL_ELEMENTS) {
      const el = document.querySelector(selector)
      if (!el) {
        continue
      }

      const stored = parseFloat(
        sessionStorage.getItem('scroll-' + selector) || '0'
      )
      let scrollTop = stored || 0

      if (ensureInView) {
        const fallback = document.querySelector(ensureInView)
        if (fallback) {
          const offsetTop = (fallback as HTMLElement).offsetTop
          const inView =
            scrollTop <= offsetTop &&
            scrollTop >=
              offsetTop -
                (el as HTMLElement).offsetHeight +
                (fallback as HTMLElement).offsetHeight

          if (!inView) {
            scrollTop = offsetTop
          }
        }
      }

      ;(el as HTMLElement).style.scrollBehavior = 'auto'

      if (smooth) {
        el.scrollTop = stored
        ;(el as HTMLElement).style.scrollBehavior = 'smooth'
      }

      el.scrollTop = scrollTop
      ;(el as HTMLElement).style.scrollBehavior = ''
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

      window.scrollTo({ top: 0 })

      requestAnimationFrame(() => {
        restoreScrollPosition({ smooth: true, restoreWindow: false })
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
