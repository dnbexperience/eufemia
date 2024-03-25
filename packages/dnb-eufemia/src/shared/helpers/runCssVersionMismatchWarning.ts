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

        const cssVersion =
          window
            .getComputedStyle(document.body)
            .getPropertyValue('--eufemia-version')
            ?.replace(/["']/g, '') || 'unknown'

        if (cssVersion !== jsVersion) {
          console.error(
            'Eufemia CSS and JS version mismatch!',
            `\nCSS: ${cssVersion}`,
            `\nJS: ${jsVersion}`
          )
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
