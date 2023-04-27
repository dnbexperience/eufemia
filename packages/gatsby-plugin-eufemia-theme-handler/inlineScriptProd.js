if (typeof window !== 'undefined') {
  window.__updateEufemiaThemeFile = (themeName, reload) => {
    try {
      const styleElement = document.getElementById('eufemia-style-theme')
      const headElement = document.querySelector('html head')
      const themes = globalThis.availableThemes
      const theme = themes[themeName]

      // Only load CSS file if not inline and not default theme
      if (
        ((globalThis.inlineDefaultTheme &&
          themeName !== globalThis.defaultTheme) ||
          !globalThis.inlineDefaultTheme ||
          reload) &&
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
          '[data-href^="' + themes[globalThis.defaultTheme].file + '"]'
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

  window.__getEufemiaThemeName = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const themeName = urlParams.get('eufemia-theme')
      if (themeName) {
        return themeName
      }
    } catch (e) {
      console.error(e)
    }
    try {
      const data = window.localStorage.getItem('eufemia-theme')
      const theme = JSON.parse(data?.startsWith('{') ? data : '{}')

      return theme?.name || globalThis.defaultTheme
    } catch (e) {
      console.error(e)
    }
  }

  const themeName = window.__getEufemiaThemeName()
  window.__updateEufemiaThemeFile(themeName)
}
