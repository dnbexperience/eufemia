/** Restore a refreshed SSG page as soon as its content has been parsed. */
;(() => {
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
      return
    }

    const position = Number(sessionStorage.getItem('scroll-window'))
    if (Number.isFinite(position) && position > 0) {
      history.scrollRestoration = 'manual'
      window.scrollTo({ top: position, behavior: 'instant' })
    }
  } catch {
    // The browser can still restore the page when storage is unavailable.
  }
})()
