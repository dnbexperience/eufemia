/**
 * Global helpers
 *
 */

// For backward compatibility
export { debounce, debounceAsync } from './helpers/debounce'

export const PLATFORM_MAC = 'Mac|iPad|iPhone|iPod'
export const PLATFORM_WIN = 'Win'
export const PLATFORM_ANDROID = 'Android'
export const PLATFORM_LINUX = 'Linux'
export const PLATFORM_IOS = 'iOS|iPhone|iPad|iPod'

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

export const isEdge = () =>
  (IS_EDGE =
    typeof navigator !== 'undefined' && /edge/i.test(navigator?.userAgent))

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

export function applyPageFocus(selector = 'default', callback = null) {
  try {
    let element = /^[.#]/.test(selector)
      ? selector
      : pageFocusElements[selector]
    if (typeof element === 'string' && typeof document !== 'undefined') {
      element = document.querySelector(element)
    } else if (!element && typeof document !== 'undefined') {
      element = document.querySelector('.dnb-no-focus')
    }

    if (!(element instanceof HTMLElement)) {
      return // stop here
    }

    const role = element.getAttribute('role')
    const list = [
      'a',
      'button',
      'input',
      'textarea',
      'select',
      'label',
      'menu',
    ]
    const isInteractive =
      list.includes(String(element.nodeName).toLowerCase()) ||
      list.includes(String(role).toLowerCase())
    const hasTabIndex = element.hasAttribute('tabindex')
    const hasNoFocus = element.classList.contains('dnb-no-focus')

    if (!isInteractive) {
      if (!hasTabIndex) {
        element.setAttribute('tabindex', '-1')
      }
      if (!hasNoFocus) {
        element.classList.add('dnb-no-focus')
      }
    }

    element.focus()

    const onBlur = () => {
      if (!isInteractive) {
        if (!hasTabIndex) {
          element.removeAttribute('tabindex')
        }
        if (!hasNoFocus) {
          element.classList.remove('dnb-no-focus')
        }
      }
    }
    element.addEventListener('blur', onBlur, { once: true })

    if (typeof callback === 'function') {
      callback(element)
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
            const totalOffset = getOffsetTop(elem)

            if (totalOffset <= 0) {
              return // stop here
            }

            const top = totalOffset - offset

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

/**
 * Uses console.log to warn about Eufemia usage issues
 *
 * It uses log instead of warn,
 * because of the stack track some browser do add
 * which takes a lot of visual space in the console
 *
 * @param  {...any} params Send in what ever you would
 */
export const warn = (...params) => {
  if (
    typeof process !== 'undefined' &&
    process.env.NODE_ENV !== 'production' &&
    typeof console !== 'undefined' &&
    typeof console.log === 'function'
  ) {
    const isBrowser =
      typeof window !== 'undefined' && process.env.NODE_ENV !== 'test'

    if (isBrowser) {
      const styles = [
        `padding: 0.125rem 0.5rem ${IS_SAFARI ? '' : '0'}`,
        'font-weight: bold',
        'color: #00343E',
        'background: #A5E1D2',
      ].join(';')
      console.log('%cEufemia', styles, ...params)
    } else {
      console.log(
        // How to generate it: JSON.stringify(chalk.reset.bold.hex('#00343E').bgHex('#A5E1D2')('Eufemia'))
        '\u001b[0m\u001b[1m\u001b[38;5;23m\u001b[48;5;152mEufemia\u001b[49m\u001b[39m\u001b[22m\u001b[0m',
        ...params
      )
    }
  }
}
