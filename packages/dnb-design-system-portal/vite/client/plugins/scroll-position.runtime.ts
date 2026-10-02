import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

const WINDOW_SCROLL_KEY = 'scroll-window'

export function saveScrollPosition() {
  try {
    // Don't save scroll position during code block focus mode.
    if (document.documentElement.hasAttribute('data-code-focus-mode')) {
      return // stop here
    }

    sessionStorage.setItem(WINDOW_SCROLL_KEY, String(window.scrollY))
  } catch (e) {
    // ignore
  }
}

export function restoreScrollPosition({
  smooth = false,
  restoreWindow = true,
} = {}) {
  try {
    // Don't restore scroll position during code block focus mode.
    if (document.documentElement.hasAttribute('data-code-focus-mode')) {
      return // stop here
    }

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
  } catch (e) {
    // ignore
  }
}

/**
 * React hook that saves and restores the page scroll position on route
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
