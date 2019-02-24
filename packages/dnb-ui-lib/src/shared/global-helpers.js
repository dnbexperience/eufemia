/**
 * Global helpers
 *
 */

import whatInput from 'what-input'
whatInput.specificKeys([9])

defineIsTouch()

/**
 * Check if device is touch device or not
 */
function isTouchDevice() {
  try {
    return (
      !!(
        typeof window !== 'undefined' &&
        ('ontouchstart' in window ||
          (window.DocumentTouch &&
            typeof document !== 'undefined' &&
            document instanceof window.DocumentTouch))
      ) ||
      !!(
        typeof navigator !== 'undefined' &&
        (navigator.maxTouchPoints || navigator.msMaxTouchPoints)
      )
    )
  } catch (e) {
    console.log('Could not determine the touch situation:', e)
    return null
  }
}

export function defineIsTouch(runInstantly = true) {
  const handleDefineTouch = () => {
    if (typeof document === 'undefined' || typeof window === 'undefined')
      return
    try {
      if (isTouchDevice()) {
        document.documentElement.setAttribute('dnb-is-touch', true)
      }
    } catch (e) {
      console.log('Could not apply "touch class"', e)
    }

    window.removeEventListener('load', handleDefineTouch)
  }

  if (runInstantly) {
    handleDefineTouch()
  } else if (typeof window !== 'undefined') {
    try {
      window.addEventListener('load', handleDefineTouch)
    } catch (e) {
      console.log('Could not add "load" event listener', e)
    }
  }
}

const pageFocusElements = {}
export const setPageFocusElement = (
  selectorOrElement,
  key = 'default'
) => {
  pageFocusElements[key] = selectorOrElement
}

export const applyPageFocus = (key = 'default') => {
  try {
    let element = pageFocusElements[key]
    if (typeof element === 'string' && typeof document !== 'undefined') {
      element = document.querySelector(element)
    } else if (!element && typeof document !== 'undefined') {
      element = document.querySelector('.dnb-no-focus')
    }
    if (element instanceof HTMLElement) {
      if (
        [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'p',
          'div',
          'main',
          'nav',
          'header',
          'footer',
          'aside',
          'section',
          'article'
        ].includes(String(element.nodeName).toLowerCase())
      ) {
        if (!element.hasAttribute('tabindex')) {
          element.setAttribute('tabindex', '-1')
        }
        if (
          element.classList &&
          !element.classList.contains('dnb-no-focus')
        ) {
          element.classList.add('dnb-no-focus')
        }
      }
      element.focus({ preventScroll: true })
    }
  } catch (e) {
    console.log('Error on applyPageFocus:', e)
  }
}

export const scrollToLocationHashId = ({ offset = 0 } = {}) => {
  if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    const id = String(window.location.hash).replace('#', '')
    const elem = document.getElementById(id)
    if (elem instanceof HTMLElement) {
      const top = parseFloat(elem.offsetTop) - offset
      try {
        window.scrollTo({
          top,
          behavior: 'smooth'
        })
      } catch (e) {
        console.log('Error on scrollToLocationHashId:', e)
      }
    }
  }
}

export const isIE11 =
  typeof window !== 'undefined' && typeof document !== 'undefined'
    ? !!window.MSInputMethodContext && !!document.documentMode
    : false
