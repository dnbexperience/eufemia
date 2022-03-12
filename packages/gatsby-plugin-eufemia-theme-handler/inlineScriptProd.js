if (typeof window !== 'undefined') {
  window.__updateEufemiaThemeFile = (themeName, reload) => {
    try {
      const styleElement = document.getElementById('eufemia-style-theme')
      const headElement = document.querySelector('html head')
      const themes = __AVAILABLE_THEMES__
      const theme = themes[themeName]

      if (
        (themeName !== __DEFAULT_THEME__ || reload) &&
        theme &&
        !theme.isDev
      ) {
        styleElement.setAttribute('href', theme.file)

        // Remove existing inline styles
        const inlineStyleElement = document.querySelector(
          '[data-href^="' + theme.file + '"]'
        )
        if (inlineStyleElement) {
          headElement.removeChild(inlineStyleElement)
        }
        const defaultStyleElement = document.querySelector(
          '[data-href^="' + themes[__DEFAULT_THEME__].file + '"]'
        )
        if (defaultStyleElement) {
          headElement.removeChild(defaultStyleElement)
        }
      }

      if (typeof window.__updateEufemiaThemeFileDev === 'function') {
        window.__updateEufemiaThemeFileDev({
          styleElement,
          headElement,
          theme,
          reload,
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  window.__getEufemiaTheme = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const themeName = urlParams.get('dnb-theme')
      if (themeName) {
        return themeName
      }
    } catch (e) {
      console.error(e)
    }
    try {
      return window.localStorage.getItem('dnb-theme') || __DEFAULT_THEME__
    } catch (e) {
      console.error(e)
    }
  }

  window.__updateEufemiaThemeFile(window.__getEufemiaTheme())
}
