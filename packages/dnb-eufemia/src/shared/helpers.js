/**
 * Global helpers
 *
 */

import {
  warn,
  PLATFORM_MAC,
  PLATFORM_WIN,
  PLATFORM_ANDROID,
  PLATFORM_LINUX,
  PLATFORM_IOS,
} from './component-helper'

export let IS_IE11 = false
export let IS_EDGE = false
export let IS_IOS = false
export let IS_SAFARI = false
export let IS_WIN = false
export let IS_MAC = false
export let IS_ANDROID = false
export let IS_LINUX = false

export const isMac = () =>
  (IS_MAC =
    typeof navigator !== 'undefined' &&
    new RegExp(PLATFORM_MAC, 'i').test(navigator?.platform))

export const isWin = () =>
  (IS_WIN =
    typeof navigator !== 'undefined' &&
    new RegExp(PLATFORM_WIN, 'i').test(navigator?.platform))

export const isAndroid = () =>
  (IS_ANDROID =
    typeof navigator !== 'undefined' &&
    new RegExp(PLATFORM_ANDROID, 'i').test(navigator?.userAgent))

export const isLinux = () =>
  (IS_LINUX =
    typeof navigator !== 'undefined' &&
    new RegExp(PLATFORM_LINUX, 'i').test(navigator?.platform))

export const isiOS = () =>
  (IS_IOS =
    typeof navigator !== 'undefined' &&
    new RegExp(PLATFORM_IOS, 'i').test(navigator?.platform))

export const isSafari = () =>
  (IS_SAFARI =
    typeof navigator !== 'undefined' &&
    /safari/i.test(navigator?.userAgent) &&
    !/chrome/i.test(navigator?.userAgent))

export const isIE11 = () =>
  (IS_IE11 =
    typeof window !== 'undefined' && typeof document !== 'undefined'
      ? !!window.MSInputMethodContext && !!document.documentMode
      : false)

export const isEdge = () =>
  (IS_EDGE =
    typeof navigator !== 'undefined' && /edge/i.test(navigator?.userAgent))

isIE11()
isEdge()
isiOS()
isSafari()
isWin()
isAndroid()
isMac()
isLinux()

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
          'article',
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
    warn('Error on applyPageFocus:', e)
  }
}

export function getOffsetTop(elem) {
  let offsetTop = 0
  if (elem) {
    do {
      if (!isNaN(elem.offsetTop)) {
        offsetTop += elem.offsetTop
      }
    } while ((elem = elem.offsetParent))
  }
  return offsetTop
}

export function getOffsetLeft(elem) {
  let offsetLeft = 0
  if (elem) {
    do {
      if (!isNaN(elem.offsetLeft)) {
        offsetLeft += elem.offsetLeft
      }
    } while ((elem = elem.offsetParent))
  }
  return offsetLeft
}

export function scrollToLocationHashId({
  offset = 0,
  delay = null,
  onCompletion = null,
} = {}) {
  if (
    typeof document !== 'undefined' &&
    typeof window !== 'undefined' &&
    window.location
  ) {
    try {
      let _timeout
      const id = String(window.location.hash).replace('#', '')
      if (id.length > 0) {
        const handleScroll = () => {
          const runScroll = () => {
            const top = getOffsetTop(elem) - offset
            try {
              if (typeof IntersectionObserver !== 'undefined') {
                const intersectionObserver = new IntersectionObserver(
                  (entries) => {
                    const [entry] = entries
                    if (entry.isIntersecting) {
                      intersectionObserver.unobserve(elem)
                      if (typeof onCompletion === 'function') {
                        onCompletion(elem)
                      }
                    }
                  }
                )
                // start observing
                intersectionObserver.observe(elem)
              }

              if (window.scrollTo) {
                window.scrollTo({
                  top,
                  behavior: 'smooth',
                })
              } else {
                window.scrollTop = top
              }
            } catch (e) {
              warn('Error on scrollToLocationHashId:', e)
            }
          }

          if (delay > 0) {
            clearTimeout(_timeout)
            _timeout = setTimeout(runScroll, delay) // to make sure we run our scrollTo after the native anchor
          } else {
            runScroll()
          }
        }

        const elem = document.getElementById(id)
        if (elem instanceof HTMLElement) {
          window.addEventListener('beforeunload', () =>
            clearTimeout(_timeout)
          )
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', handleScroll)
          } else {
            handleScroll()
          }
        }

        return elem
      }
    } catch (e) {
      warn('Error on scrollToLocationHashId:', e)
    }
  }
}

// Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(
  func,
  wait = 250,
  { immediate = false, context = null } = {}
) {
  let timeout
  let recall

  // This is the function that is actually executed when
  // the DOM event is triggered.
  return function executedFunction() {
    // Store the context of this and any
    // parameters passed to executedFunction
    const ctx = context || this
    const args = arguments

    if (typeof recall === 'function') {
      recall()
    }

    // The function to be called after
    // the debounce time has elapsed
    const later = () => {
      // null timeout to indicate the debounce ended
      timeout = null

      // Call function now if you did not on the leading end
      if (!immediate) {
        recall = func.apply(ctx, args)
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
      recall = func.apply(ctx, args)
    }
  }
}

export function insertElementBeforeSelection(elem) {
  try {
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    range.cloneRange().insertNode(elem)
    selection.addRange(range) // Restore the original selection - this is a Safari fix!

    // For now I (Tobias) could not find any reason for supporting document.selection as well
    // const range = document.selection.createRange()
    // range.collapse(true)
    // range.pasteHTML(elem.outerHTML)
  } catch (e) {
    //
  }
}

export function getSelectedText() {
  try {
    return window.getSelection().toString()

    // For now I (Tobias) could not find any reason for supporting document.selection as well
    // return document.selection.createRange().text
  } catch (e) {
    //
  }
  return ''
}

export function hasSelectedText() {
  return getSelectedText().length > 0
}

export function getSelectedElement() {
  try {
    const selection = window.getSelection()
    if (selection.rangeCount > 0) {
      let elem = selection.getRangeAt(0).startContainer
      if (elem && typeof elem === 'object') {
        elem = elem.parentNode
      }
      return elem
    }

    // For now I (Tobias) could not find any reason for supporting document.selection as well
    // return document.selection.createRange().parentElement()
  } catch (e) {
    //
  }

  return null
}

export async function copyToClipboard(string) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }

  // get the selection range
  const selection = window.getSelection()
  const range =
    selection.rangeCount > 0 // Check if there is any content selected previously
      ? selection.getRangeAt(0) // Store selection if found
      : false // Mark as false to know no selection existed before

  const resetSelection = () => {
    try {
      // If a selection existed before copying
      selection.removeAllRanges() // Unselect everything on the HTML document
      selection.addRange(range) // Restore the original selection
    } catch (e) {
      //
    }
  }

  const copyFallback = () => {
    try {
      // create the focusable element
      const elem = document.createElement('textarea')
      elem.value = String(string)
      elem.contentEditable = true
      elem.readOnly = false
      elem.style.position = 'fixed'
      elem.style.top = '-1000px'
      document.body.appendChild(elem)

      // iOS helper
      // But right now, we do not use that
      // if (IS_IOS) {
      //   const newRange = document.createRange()
      //   newRange.selectNodeContents(elem)
      //   const sel = window.getSelection()
      //   sel.removeAllRanges()
      //   sel.addRange(newRange)
      //   elem.setSelectionRange(0, 999999)
      // } else {
      //   elem.select()
      // }

      // NB: copy only works as a result of a user action (e.g. click events)
      const success = document.execCommand('copy')

      // Cleanup
      document.body.removeChild(elem)

      resetSelection()

      if (success) {
        return true
      }
    } catch (e) {
      return e
    }

    return `Could not copy! Unknown reason. ${string}`
  }

  let success

  if (typeof navigator !== 'undefined' && navigator?.clipboard) {
    try {
      await navigator.clipboard.writeText(String(string))
      success = true
      resetSelection()
    } catch (e) {
      success = e
      const newTry = copyFallback()
      if (newTry === true) {
        success = newTry
      }
    }
  } else {
    // use the fallback as the primary, because we get
    success = copyFallback()
  }

  return success
}
