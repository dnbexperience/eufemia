/**
 * Additionally Tools
 *
 */

const pageFocusElements = {}
export const setPageFocusElement = (element = null, key = 'default') => {
  pageFocusElements[key] = element
}

export const applyPageFocus = (key = 'default') => {
  console.log('applyPageFocus', key)
  try {
    let element = pageFocusElements[key]
    if (!element) {
      element = document.querySelector('.dnb-no-focus')
    }
    if (element instanceof HTMLElement) {
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1')
      }
      if (
        element.classList &&
        !element.classList.contains('dnb-no-focus')
      ) {
        element.classList.add('dnb-no-focus')
      }
      element.focus({ preventScroll: true })
    }
  } catch (e) {
    // console.log('DNB pageFocus', e)
  }
}
