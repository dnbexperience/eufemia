/**
 * Additionally Tools
 *
 */

export const pageFocus = (element = null) => {
  try {
    if (!element) {
      element = document.querySelector('.no-focus')
    }
    if (element instanceof HTMLElement) {
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1')
      }
      if (element.classList && !element.classList.contains('no-focus')) {
        element.classList.add('no-focus')
      }
      element.focus()
    }
  } catch (e) {
    // console.log('DNB pageFocus', e)
  }
}
