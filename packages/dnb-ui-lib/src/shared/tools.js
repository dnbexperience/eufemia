/**
 * Additionally Tools
 *
 */

export const pageFocus = (element = null) => {
  try {
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
      element.focus()
    }
  } catch (e) {
    // console.log('DNB pageFocus', e)
  }
}
