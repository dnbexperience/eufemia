if (typeof window !== 'undefined') {
  globalThis.__updateEufemiaThemeFile = (
    themeName,
    reload = false,
    callback = null
  ) => {
    try {
      const styleElement = document.getElementById('eufemia-style-theme')
      const headElement = document.querySelector('html head')
      const themes = globalThis.availableThemes
      const theme = themes[themeName]
      const href = theme.file + (reload ? '?' + Date.now() : '')

      if (!theme) {
        console.error('No theme found:', themeName)
        return // stop here
      }

      /**
       * To avoid flicker during change
       */
      document
        .getElementById('current-theme')
        ?.setAttribute('id', 'previous-theme')
      const clonedElem = styleElement.cloneNode(false)
      clonedElem.setAttribute('href', href)
      clonedElem.setAttribute('id', 'current-theme')

      const isDefaultTheme = themeName === globalThis.defaultTheme

      if (
        globalThis.isDev ||
        reload ||
        !globalThis.inlineDefaultTheme ||
        (globalThis.inlineDefaultTheme && !isDefaultTheme)
      ) {
        if (!reload) {
          // Preload
          const elem = styleElement.cloneNode(false)
          elem.removeAttribute('id')
          elem.setAttribute('href', href)
          elem.setAttribute('rel', 'preload')
          styleElement.after(elem)
        }

        // Remove existing styles, if needed
        clonedElem.addEventListener(
          'load',
          () => {
            try {
              // Remove existing inline styles
              const inlineStyleElement = document.querySelector(
                '[data-href^="' + theme.file + '"]'
              )
              if (inlineStyleElement) {
                headElement.removeChild(inlineStyleElement)
              }

              const defaultStyleElement = document.querySelector(
                '[data-href^="' +
                  themes[globalThis.defaultTheme].file +
                  '"]'
              )
              if (defaultStyleElement) {
                headElement.removeChild(defaultStyleElement)
              }

              const previousElem =
                document.getElementById('previous-theme')
              if (previousElem) {
                headElement.removeChild(previousElem)
              }
            } catch (e) {
              console.error(e)
            }

            callback?.(theme)
          },
          { once: true }
        )

        // Set the new style
        styleElement.after(clonedElem)
      }
    } catch (e) {
      console.error(e)
    }
  }

  globalThis.__getEufemiaThemeName = () => {
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

  const themeName = globalThis.__getEufemiaThemeName()
  globalThis.__updateEufemiaThemeFile(themeName)
}
