if (typeof window !== 'undefined') {
  try {
    const headElement = document.querySelector('html head')
    const logMutations = (mutations) => {
      for (const mutation of mutations) {
        const element = mutation.nextSibling
        if (
          element &&
          (element.src || element.href || '').includes('/commons.')
        ) {
          const themeName = globalThis.__getEufemiaThemeName()
          globalThis.__updateEufemiaThemeFile(themeName, true)
          break
        }
      }
    }

    const observer = new MutationObserver(logMutations)
    observer.observe(headElement, { childList: true })
  } catch (e) {
    console.error(e)
  }
}
