import {
  warn,
  isChildOfElement,
  checkIfHasScrollbar,
} from '../../shared/component-helper'

const isServer = () => typeof window === 'undefined'
const detectOS = (ua) => {
  ua = ua || navigator.userAgent
  const ipad = /(iPad).*OS\s([\d_]+)/.test(ua)
  const iphone = !ipad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
  const android = /(Android);?[\s/]+([\d.]+)?/.test(ua)
  const ios = iphone || ipad
  return { ios, android }
}
const detectiOSVersion = () => {
  const match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
  let version

  if (match !== undefined && match !== null) {
    version = [
      parseInt(match[1], 10),
      parseInt(match[2], 10),
      parseInt(match[3] || 0, 10),
    ]
    return parseFloat(version.join('.'))
  }
  return false
}

const desktopLikeIOs = 14

let lockedNum = 0
let initialClientY = 0
let initialClientX = 0
let callbackUnlock = null
let documentListenerAdded = false

const lockedElements = []
const eventListenerOptions = getEventListenerOptions({ passive: false })
function getEventListenerOptions(options) {
  if (isServer()) {
    return // stop here
  }

  let isSupportOptions = true
  const { capture } = options
  return isSupportOptions
    ? options
    : typeof capture !== 'undefined'
    ? capture
    : false
}

const setOverflowHidden = () => {
  try {
    const $html = document.documentElement
    const $body = document.body
    const htmlStyle = Object.assign({}, $html.style)
    const bodyStyle = Object.assign({}, $body.style)
    const scrollBarWidth =
      window.innerWidth - ($body.clientWidth || window.innerWidth)

    $html.style.overflow = 'hidden'
    $html.style.height = '100%'
    $html.style.setProperty('--scrollbar-width', `${scrollBarWidth}px`)

    $body.style.overflow = 'hidden'
    $body.style.height = 'auto'
    $body.style.boxSizing = 'border-box'
    $body.style.marginRight = `${scrollBarWidth}px`

    return () => {
      try {
        // eslint-disable-next-line
        ;['overflow', 'height'].forEach((x) => {
          $html.style[x] = htmlStyle[x] || ''
        })
        ;['overflow', 'height', 'boxSizing', 'margin'].forEach((x) => {
          $body.style[x] = bodyStyle[x] || ''
        })
        $html.style.removeProperty('--scrollbar-width')
      } catch (e) {
        warn(e)
      }
    }
  } catch (e) {
    warn(e)
  }
}

const setOverflowHiddenMobile = () => {
  try {
    const unbind = setOverflowHidden()

    const $html = document.documentElement
    const $body = document.body
    const scrollTop = $html.scrollTop || $body.scrollTop
    const bodyStyle = Object.assign({}, $body.style)

    $body.style.position = 'fixed'
    $body.style.top = `-${scrollTop}px`
    $body.style.left = '0'
    $body.style.right = '0'

    return () => {
      unbind()

      try {
        // eslint-disable-next-line
        ;['position', 'top', 'right', 'left'].forEach((x) => {
          $body.style[x] = bodyStyle[x] || ''
        })

        const scrollBehavior =
          window.getComputedStyle($html).scrollBehavior
        $html.style.scrollBehavior = 'auto'
        $html.scrollTop = scrollTop
        $html.style.scrollBehavior = scrollBehavior
      } catch (e) {
        warn(e)
      }
    }
  } catch (e) {
    warn(e)
  }
}

const preventDefault = (event) => {
  const found = lockedElements.find((targetElement) => {
    return isChildOfElement(event.target, targetElement)
  })

  if (found || !event.cancelable) {
    return // stop here
  }

  event.preventDefault()
}

// Depreciated – this function can be removed as soon as we do not need to support iOS < 14
const handleScroll = (event, targetElement) => {
  try {
    if (targetElement) {
      const {
        scrollTop,
        scrollLeft,
        scrollWidth,
        scrollHeight,
        clientWidth,
        clientHeight,
      } = targetElement
      const clientX = event.targetTouches[0].clientX - initialClientX
      const clientY = event.targetTouches[0].clientY - initialClientY
      const isVertical = Math.abs(clientY) > Math.abs(clientX)
      const isOnTop = clientY > 0 && scrollTop === 0
      const isOnLeft = clientX > 0 && scrollLeft === 0
      const isOnRight =
        clientX < 0 && scrollLeft + clientWidth + 1 >= scrollWidth
      const isOnBottom =
        clientY < 0 && scrollTop + clientHeight + 1 >= scrollHeight
      if (
        (isVertical && (isOnTop || isOnBottom)) ||
        (!isVertical && (isOnLeft || isOnRight))
      ) {
        const hasScrollbar = isChildOfElement(
          event.target,
          targetElement,
          checkIfHasScrollbar
        )

        if (hasScrollbar && hasScrollbar !== targetElement) {
          return true
        }

        return event.cancelable && event.preventDefault()
      }
    }

    event.stopPropagation()

    return true
  } catch (e) {
    warn(e)
  }
}

const checkTargetElement = (targetElement) => {
  if (targetElement) return
  if (targetElement === null) return
  warn(
    `If scrolling is also required in the floating layer, ` +
      `the target element must be provided.`
  )
}

export const disableBodyScroll = (targetElement) => {
  if (isServer()) {
    return // stop here
  }

  checkTargetElement(targetElement)

  try {
    // iOS
    if (detectOS().ios) {
      // Works better on iOS v14, therefore, use this
      if (detectiOSVersion() >= desktopLikeIOs) {
        if (lockedNum <= 0) {
          callbackUnlock = setOverflowHidden()
        }
      } else {
        // Depreciated – the rest here can be removed as soon as we do not need to support iOS < 14

        if (targetElement) {
          const elementArray = Array.isArray(targetElement)
            ? targetElement
            : [targetElement]
          elementArray.forEach((element) => {
            if (element && lockedElements.indexOf(element) === -1) {
              element.ontouchstart = (event) => {
                initialClientY = event.targetTouches[0].clientY
                initialClientX = event.targetTouches[0].clientX
              }
              element.ontouchmove = (event) => {
                if (event.targetTouches.length !== 1) {
                  return // stop here
                }
                handleScroll(event, element)
              }
              lockedElements.push(element)
            }
          })
        }

        if (!documentListenerAdded) {
          document.addEventListener(
            'touchmove',
            preventDefault,
            eventListenerOptions
          )
          documentListenerAdded = true
        }
      }

      // Android or Desktop
    } else if (lockedNum <= 0) {
      if (detectOS().android) {
        callbackUnlock = setOverflowHiddenMobile()
      } else {
        callbackUnlock = setOverflowHidden()
      }
    }

    lockedNum += 1
  } catch (e) {
    warn(e)
  }
}

export const enableBodyScroll = (targetElement) => {
  if (isServer()) {
    return
  }

  checkTargetElement(targetElement)

  try {
    lockedNum -= 1

    if (lockedNum > 0) {
      return // stop here
    }

    if (typeof callbackUnlock === 'function') {
      callbackUnlock()
    }

    // iOS
    if (detectOS().ios && detectiOSVersion() < desktopLikeIOs) {
      if (targetElement) {
        const elementArray = Array.isArray(targetElement)
          ? targetElement
          : [targetElement]
        elementArray.forEach((element) => {
          const index = lockedElements.indexOf(element)
          if (index !== -1) {
            element.ontouchmove = null
            element.ontouchstart = null
            lockedElements.splice(index, 1)
          }
        })
      }

      if (documentListenerAdded) {
        document.removeEventListener(
          'touchmove',
          preventDefault,
          eventListenerOptions
        )
        documentListenerAdded = false
      }
    }
  } catch (e) {
    warn(e)
  }
}

export const clearAllBodyScrollLocks = () => {
  if (isServer()) {
    return // stop here
  }

  try {
    lockedNum = 0

    if (typeof callbackUnlock === 'function') {
      callbackUnlock()
    }

    // iOS
    if (detectOS().ios && detectiOSVersion() < desktopLikeIOs) {
      if (lockedElements && lockedElements.length) {
        // clear events
        let element = lockedElements.pop()
        while (element) {
          element.ontouchmove = null
          element.ontouchstart = null
          element = lockedElements.pop()
        }
      }
    }

    if (documentListenerAdded) {
      document.removeEventListener(
        'touchmove',
        preventDefault,
        eventListenerOptions
      )
      documentListenerAdded = false
    }
  } catch (e) {
    warn(e)
  }
}
