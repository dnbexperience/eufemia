if (typeof window !== 'undefined') {
  let uniqueId = ''

  window.__updateEufemiaThemeFileDev = ({
    styleElement,
    headElement,
    theme,
    reload,
  }) => {
    try {
      if (reload) {
        uniqueId = '?' + Date.now()
      }

      const moveAfterCommons = () => {
        headElement.appendChild(styleElement)
      }
      if (document.readyState === 'complete') {
        moveAfterCommons()
      } else {
        window.addEventListener('load', moveAfterCommons)
      }

      styleElement.setAttribute('href', theme?.file + uniqueId)
    } catch (e) {
      console.error(e)
    }
  }

  try {
    const headElement = document.querySelector('html head')
    const logMutations = (mutations) => {
      for (const mutation of mutations) {
        const element = mutation.nextSibling
        if (
          element &&
          (element.src || element.href || '').includes('/commons.')
        ) {
          const themeName = window.__getEufemiaThemeName()
          window.__updateEufemiaThemeFile(themeName, true)
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
