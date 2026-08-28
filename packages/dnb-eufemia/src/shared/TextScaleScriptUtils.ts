type TextScaleRuntime = typeof globalThis & {
  __eufemiaTextScaleCleanup?: () => void
}

export function applyTextScale(): (() => void) | undefined {
  try {
    const root = document.documentElement
    const runtime = globalThis as TextScaleRuntime
    const attribute = 'data-eufemia-text-scale'
    const probeStyle =
      'position:absolute;visibility:hidden;pointer-events:none;' +
      'contain:layout style;display:block;left:-10000px;top:0;' +
      'padding:0;border:0;margin:0;'

    runtime.__eufemiaTextScaleCleanup?.()

    const createProbe = (style: string, text = '') => {
      const element = document.createElement('span')
      element.setAttribute('aria-hidden', 'true')
      element.style.cssText = probeStyle + style
      element.textContent = text
      root.appendChild(element)
      return element
    }

    const removeProbe = (element?: HTMLElement) => {
      element?.parentNode?.removeChild(element)
    }

    const readAppleTextScale = (element?: HTMLElement) => {
      if (
        !runtime.CSS?.supports('-webkit-touch-callout:none') ||
        !runtime.CSS.supports('font:-apple-system-body')
      ) {
        return 0
      }

      const probe =
        element ??
        createProbe(
          'font:-apple-system-body;width:max-content;height:auto;' +
            'white-space:nowrap;',
          'M'
        )
      const scale = parseFloat(getComputedStyle(probe).fontSize) / 17

      if (!element) {
        removeProbe(probe)
      }

      return isFinite(scale) && scale > 0 ? scale : 0
    }

    const appleScale = readAppleTextScale()

    const apply = (scale: number) => {
      if (!scale) {
        return
      }

      root.style.fontSize = `${16 * scale}px`
      root.setAttribute(attribute, 'apple')
    }

    apply(appleScale)

    if (!appleScale) {
      return undefined
    }

    let probe: HTMLElement | undefined
    let observer: ResizeObserver | undefined
    let observing = false

    const update = () => {
      apply(readAppleTextScale(probe))
    }

    const observe = () => {
      if (observing) {
        return
      }
      observing = true

      probe = createProbe(
        'font:-apple-system-body;width:max-content;height:auto;' +
          'white-space:nowrap;',
        'M'
      )

      if (runtime.ResizeObserver) {
        observer = new ResizeObserver(update)
        observer.observe(probe)
      }

      addEventListener('pageshow', update)
      addEventListener('focus', update)
      document.addEventListener('visibilitychange', update)
    }

    const cleanup = () => {
      observer?.disconnect()
      removeProbe(probe)
      document.removeEventListener('DOMContentLoaded', observe)
      removeEventListener('pageshow', update)
      removeEventListener('focus', update)
      document.removeEventListener('visibilitychange', update)
      delete runtime.__eufemiaTextScaleCleanup
    }

    runtime.__eufemiaTextScaleCleanup = cleanup

    if (document.body) {
      observe()
    } else {
      document.addEventListener('DOMContentLoaded', observe, {
        once: true,
      })
    }

    return cleanup
  } catch {
    // Keep the CSS fallback when measurement is unavailable.
    return undefined
  }
}

export function getTextScaleScript() {
  return `(${applyTextScale.toString()})()`
}
