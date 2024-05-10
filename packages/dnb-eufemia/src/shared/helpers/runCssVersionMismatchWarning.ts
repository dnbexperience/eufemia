declare global {
  interface Window {
    Eufemia?: {
      version: string
    }
  }
}

export function runCssVersionMismatchWarning() {
  try {
    if (
      typeof document !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      const runCheck = () => {
        const jsVersion = window.Eufemia?.version

        if (jsVersion === '__VERSION__') {
          return
        }

        const getCssVersion = (element) => {
          return element
            ? window
                .getComputedStyle(element)
                .getPropertyValue('--eufemia-version')
                ?.replace(/["']/g, '')
            : undefined
        }

        const cssVersion =
          getCssVersion(document.body) ||
          getCssVersion(
            document.getElementsByClassName('dnb-core-style')[0]
          ) ||
          'unknown'

        if (cssVersion !== jsVersion) {
          const isUnknown = cssVersion === 'unknown'

          const consoleArguments = [
            `Eufemia CSS and JS version mismatch!${
              isUnknown
                ? ' CSS version is either not loaded (are you perhaps using lazy loading?), or older than "10.25.0"'
                : ''
            }`,
            `\nCSS: ${cssVersion}`,
            `\nJS: ${jsVersion}`,
          ]

          if (isUnknown) {
            console.warn(...consoleArguments)
          } else {
            console.error(...consoleArguments)
          }
        }
      }

      if (document.readyState === 'complete') {
        window.requestAnimationFrame(runCheck)
      } else {
        window.addEventListener('load', runCheck)
      }
    }
  } catch (error) {
    console.error(error)
  }
}
