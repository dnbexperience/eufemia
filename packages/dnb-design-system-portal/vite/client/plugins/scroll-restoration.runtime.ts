/** Restore a refreshed SSG page as soon as its content has been parsed. */
;(() => {
  const pending = document.getElementById('portal-page-scroll-restoration')
  try {
    const navigation = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined
    if (
      navigation?.type !== 'reload' ||
      location.hash ||
      new URLSearchParams(location.search).has('focusmode') ||
      !document.getElementById('root')?.childElementCount
    ) {
      pending?.remove()
      return
    }

    const position = Number(sessionStorage.getItem('scroll-window'))
    if (Number.isFinite(position) && position > 0) {
      history.scrollRestoration = 'manual'
      window.scrollTo({ top: position, behavior: 'instant' })
      if (pending) {
        const events = ['wheel', 'touchstart', 'pointerdown', 'keydown']
        const cancel = () => {
          document.documentElement.setAttribute(
            'data-portal-scroll-interacted',
            'true'
          )
          finish()
        }
        const finish = () => {
          pending.remove()
          clearTimeout(timeout)
          events.forEach((event) =>
            window.removeEventListener(event, cancel)
          )
        }
        const timeout = setTimeout(cancel, 1000)
        events.forEach((event) =>
          window.addEventListener(event, cancel, {
            once: true,
            passive: true,
          })
        )
        const reveal = () => {
          if (pending.isConnected) {
            window.scrollTo({ top: position, behavior: 'instant' })
          }
          finish()
        }
        document.fonts.ready.then(
          () => requestAnimationFrame(reveal),
          reveal
        )
      }
    } else {
      pending?.remove()
    }
  } catch {
    pending?.remove()
    // The browser can still restore the page when storage is unavailable.
  }
})()
