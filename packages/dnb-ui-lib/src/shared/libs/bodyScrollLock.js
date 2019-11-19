// Copy of https://raw.githubusercontent.com/willmcpo/body-scroll-lock/master/lib/bodyScrollLock.es6.js
// + Additional HTML / root handling

// Older browsers don't support event options, feature detect it.

// Adopted and modified solution from Bohdan Didukh (2017)
// https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi

let hasPassiveEvents = false
if (typeof window !== 'undefined') {
  const passiveTestOptions = {
    get passive() {
      hasPassiveEvents = true
      return undefined
    }
  }
  window.addEventListener('testPassive', null, passiveTestOptions)
  window.removeEventListener('testPassive', null, passiveTestOptions)
}

const isIosDevice =
  typeof window !== 'undefined' &&
  window.navigator &&
  window.navigator.platform &&
  /iP(ad|hone|od)/.test(window.navigator.platform)

let locks = []
let documentListenerAdded = false
let initialClientY = -1
let prevBodyOverflow
let prevBodyHeight
let prevRootOverflow
let prevRootHeight
let prevBodyMarginLeft

// returns true if `el` should be allowed to receive touchmove events.
const allowTouchMove = el =>
  locks.some(lock => {
    if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
      return true
    }

    return false
  })

const preventDefault = rawEvent => {
  const e = rawEvent || window.event

  // For the case whereby consumers adds a touchmove event listener to document.
  // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
  // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
  // the touchmove event on document will break.
  if (allowTouchMove(e.target)) {
    return true
  }

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (e.touches.length > 1) return true

  if (e.preventDefault) e.preventDefault()

  return false
}

const setOverflowHidden = () => {
  try {
    // Edge and IE has a gap
    let scrollBarGap =
      window.innerWidth - document.documentElement.clientWidth
    if (scrollBarGap > 0) {
      scrollBarGap =
        scrollBarGap -
        (parseFloat(window.getComputedStyle(document.body).marginLeft) ||
          0)
    }

    if (prevBodyHeight === undefined) {
      prevBodyHeight = document.body.style.height
      document.body.style.height = 'auto'
    }
    if (prevRootHeight === undefined) {
      prevRootHeight = document.documentElement.style.height
      document.documentElement.style.height = 'auto'
    }
    if (prevBodyOverflow === undefined) {
      prevBodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    if (prevRootOverflow === undefined) {
      prevRootOverflow = document.documentElement.style.overflow
      document.documentElement.style.overflow = 'hidden'
    }

    if (prevBodyMarginLeft === undefined && scrollBarGap > 0) {
      prevBodyMarginLeft = document.body.style.marginLeft
      document.body.style.marginLeft = `-${scrollBarGap / 2}px`
    }
  } catch (e) {
    console.error(e)
  }
}

const restoreOverflowSetting = () => {
  try {
    if (prevBodyMarginLeft !== undefined) {
      document.body.style.marginLeft = prevBodyMarginLeft

      // Restore prevBodyMarginLeft to undefined so setOverflowHidden knows it
      // can be set again.
      prevBodyMarginLeft = undefined
    }

    if (prevBodyOverflow !== undefined) {
      document.body.style.overflow = prevBodyOverflow
      prevBodyOverflow = undefined
    }

    if (prevRootOverflow !== undefined) {
      document.documentElement.style.overflow = prevRootOverflow
      prevRootOverflow = undefined
    }

    if (prevBodyHeight !== undefined) {
      document.body.style.height = prevBodyHeight
      prevBodyHeight = undefined
    }
    if (prevRootHeight !== undefined) {
      document.documentElement.style.height = prevRootHeight
      prevRootHeight = undefined
    }
  } catch (e) {
    console.error(e)
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
const isTargetElementTotallyScrolled = targetElement =>
  targetElement
    ? targetElement.scrollHeight - targetElement.scrollTop <=
      targetElement.clientHeight
    : false

const handleScroll = (event, targetElement) => {
  const clientY = event.targetTouches[0].clientY - initialClientY

  if (allowTouchMove(event.target)) {
    return false
  }

  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    // element is at the top of its scroll.
    return preventDefault(event)
  }

  if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    // element is at the top of its scroll.
    return preventDefault(event)
  }

  event.stopPropagation()
  return true
}

export const disableBodyScroll = (targetElement, options = {}) => {
  if (isIosDevice) {
    // targetElement must be provided, and disableBodyScroll must not have been
    // called on this targetElement before.
    if (!targetElement) {
      // eslint-disable-next-line no-console
      console.error(
        'disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.'
      )
      return
    }

    if (
      targetElement &&
      !locks.some(lock => lock.targetElement === targetElement)
    ) {
      const lock = {
        targetElement,
        options
      }

      locks = [...locks, lock]

      targetElement.ontouchstart = event => {
        if (event.targetTouches.length === 1) {
          // detect single touch.
          initialClientY = event.targetTouches[0].clientY
        }
      }
      targetElement.ontouchmove = event => {
        if (event.targetTouches.length === 1) {
          // detect single touch.
          handleScroll(event, targetElement)
        }
      }

      if (!documentListenerAdded) {
        document.addEventListener(
          'touchmove',
          preventDefault,
          hasPassiveEvents ? { passive: false } : undefined
        )
        documentListenerAdded = true
      }
    }
  } else {
    setOverflowHidden(options)
    const lock = {
      targetElement,
      options
    }

    locks = [...locks, lock]
  }
}

export const clearAllBodyScrollLocks = () => {
  if (isIosDevice) {
    // Clear all locks ontouchstart/ontouchmove handlers, and the references.
    locks.forEach(lock => {
      lock.targetElement.ontouchstart = null
      lock.targetElement.ontouchmove = null
    })

    if (documentListenerAdded) {
      document.removeEventListener(
        'touchmove',
        preventDefault,
        hasPassiveEvents ? { passive: false } : undefined
      )
      documentListenerAdded = false
    }

    locks = []

    // Reset initial clientY.
    initialClientY = -1
  } else {
    restoreOverflowSetting()
    locks = []
  }
}

export const enableBodyScroll = targetElement => {
  if (isIosDevice) {
    if (!targetElement) {
      // eslint-disable-next-line no-console
      console.error(
        'enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.'
      )
      return
    }

    targetElement.ontouchstart = null
    targetElement.ontouchmove = null

    locks = locks.filter(lock => lock.targetElement !== targetElement)

    if (documentListenerAdded && locks.length === 0) {
      document.removeEventListener(
        'touchmove',
        preventDefault,
        hasPassiveEvents ? { passive: false } : undefined
      )

      documentListenerAdded = false
    }
  } else {
    locks = locks.filter(lock => lock.targetElement !== targetElement)
    if (!locks.length) {
      restoreOverflowSetting()
    }
  }
}
