/**
 * Global helpers
 *
 */

const pageFocusElements = {}
export function setPageFocusElement(selectorOrElement, key = 'default') {
  return (pageFocusElements[key] = selectorOrElement)
}

export function applyPageFocus(key = 'default', callback = null) {
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
      if (typeof callback === 'function') {
        callback(element)
      }
    }
  } catch (e) {
    console.warn('Error on applyPageFocus:', e)
  }
}

export function getOffsetTop(elem) {
  let offsetTop = 0
  do {
    if (!isNaN(elem.offsetTop)) {
      offsetTop += elem.offsetTop
    }
  } while ((elem = elem.offsetParent))
  return offsetTop
}

export function scrollToLocationHashId({ offset = 0 } = {}) {
  if (typeof window !== 'undefined' && window.location) {
    const id = String(window.location.hash).replace('#', '')
    if (typeof document !== 'undefined' && id.length > 0) {
      const elem = document.getElementById(id)
      if (elem instanceof HTMLElement) {
        const top = getOffsetTop(elem) - offset
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

// Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait = 250, immediate = false) {
  let timeout
  let recall

  // This is the function that is actually executed when
  // the DOM event is triggered.
  return function executedFunction() {
    // Store the context of this and any
    // parameters passed to executedFunction
    const context = this
    const args = arguments

    if (typeof recall === 'function') {
      recall()
    }

    // console.log('timeout!!!', timeout)

    // The function to be called after
    // the debounce time has elapsed
    const later = () => {
      // null timeout to indicate the debounce ended
      timeout = null

      // Call function now if you did not on the leading end
      if (!immediate) {
        recall = func.apply(context, args)
      }
    }

    // Determine if you should call the function
    // on the leading or trail end
    const callNow = immediate && !timeout

    // This will reset the waiting every function execution.
    // This is the step that prevents the function from
    // being executed because it will never reach the
    // inside of the previous setTimeout
    clearTimeout(timeout)

    // Restart the debounce waiting period.
    // setTimeout returns a truthy value (it differs in web vs node)
    timeout = setTimeout(later, wait)

    // Call immediately if you're dong a leading
    // end execution
    if (callNow) {
      recall = func.apply(context, args)
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
