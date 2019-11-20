/**
 * Global helpers
 *
 */

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
    console.warn('Error on applyPageFocus:', e)
  }
}

export const scrollToLocationHashId = ({ offset = 0 } = {}) => {
  if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    const id = String(window.location.hash).replace('#', '')
    if (id) {
      const elem = document.getElementById(id)
      if (elem instanceof HTMLElement) {
        const top = parseFloat(elem.offsetTop) - offset
        try {
          if (window.scrollTo) {
            window.scrollTo({
              top,
              behavior: 'smooth'
            })
          } else {
            window.scrollTop = top
          }
        } catch (e) {
          console.warn('Error on scrollToLocationHashId:', e)
        }
      }
    }
  }
}

export const isIE11 =
  typeof window !== 'undefined' && typeof document !== 'undefined'
    ? !!window.MSInputMethodContext && !!document.documentMode
    : false

export const isEdge =
  typeof navigator !== 'undefined' &&
  navigator.userAgent &&
  navigator.userAgent.indexOf
    ? navigator.userAgent.indexOf('Edge') >= 0
    : false
