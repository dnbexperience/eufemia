/**
 * Additionally Tools
 *
 */

const pageFocusElements = {}
export const setPageFocusElement = (element = null, key = 'default') => {
  pageFocusElements[key] = element
}

export const applyPageFocus = (key = 'default') => {
  try {
    let element = pageFocusElements[key]
    if (typeof element === 'string') {
      element = document.querySelector(element)
    } else if (!element) {
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
    // console.log('DNB pageFocus', e)
  }
}
