/** Keep a scrolled refresh out of view until its font metrics are ready. */
;(() => {
  try {
    const navigation = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined
    const position = Number(sessionStorage.getItem('scroll-window'))
    if (
      navigation?.type !== 'reload' ||
      location.hash ||
      new URLSearchParams(location.search).has('focusmode') ||
      !Number.isFinite(position) ||
      position <= 0
    ) {
      return
    }

    const style = document.createElement('style')
    style.id = 'portal-page-scroll-restoration'
    style.textContent =
      '#dnb-app-content{opacity:0!important;pointer-events:none!important}'
    document.head.appendChild(style)
    setTimeout(() => style.remove(), 1000)
  } catch {
    // Keep the content visible when storage is unavailable.
  }
})()
