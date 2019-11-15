// Copy of https://raw.githubusercontent.com/willmcpo/body-scroll-lock/master/lib/bodyScrollLock.es6.js
// + additinal scroll fix: previousBodyPosition and previousBodyTop
// - previousBodyOverflowSetting

let hasPassiveEvents = false
if (typeof window !== 'undefined') {
  const passiveTestOptions = {
    get passive() {
      hasPassiveEvents = true
      return undefined
    }
  }
  try {
    window.addEventListener('testPassive', null, passiveTestOptions)
    window.removeEventListener('testPassive', null, passiveTestOptions)
  } catch (e) {
    console.error(e)
  }
}

const isIosDevice =
  typeof window !== 'undefined' &&
  window.navigator &&
  window.navigator.platform &&
  /iP(ad|hone|od)/.test(window.navigator.platform)

let locks = []
let documentListenerAdded = false
let initialClientY = -1
let previousBodyPosition
let previousBodyTop
let previousBodyScrollBehavior
let previousBodyPaddingRight

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

const setOverflowHidden = options => {
  // Setting overflow on body/documentElement synchronously in Desktop Safari slows down
  // the responsiveness for some reason. Setting within a setTimeout fixes this.
  setTimeout(() => {
    try {
      // If previousBodyOverflowSetting is already set, don't set it again.
      if (previousBodyTop === undefined) {
        const top =
          (window.pageYOffset || document.scrollTop) -
          (document.clientTop || 0)

        // const top = (document.documentElement && document.documentElement.scrollTop) ||
        //       document.body.scrollTop;

        previousBodyTop = top
        document.body.style.top = `${-top}px`
      }
      if (previousBodyPosition === undefined) {
        previousBodyPosition = document.body.style.position
        document.body.style.position = 'fixed'
      }
      // If previousBodyPaddingRight is already set, don't set it again.
      if (previousBodyPaddingRight === undefined) {
        const reserveScrollBarGap =
          !!options && options.reserveScrollBarGap === true
        const scrollBarGap =
          window.innerWidth - document.documentElement.clientWidth

        if (reserveScrollBarGap && scrollBarGap > 0) {
          previousBodyPaddingRight = document.body.style.paddingRight
          document.body.style.paddingRight = `${scrollBarGap}px`
        }
      }
    } catch (e) {
      console.error(e)
    }
  })
}

const restoreOverflowSetting = () => {
  // Setting overflow on body/documentElement synchronously in Desktop Safari slows down
  // the responsiveness for some reason. Setting within a setTimeout fixes this.
  setTimeout(() => {
    try {
      if (previousBodyPosition !== undefined) {
        document.body.style.position = previousBodyPosition
        previousBodyPosition = undefined
      }

      if (previousBodyPaddingRight !== undefined) {
        document.body.style.paddingRight = previousBodyPaddingRight

        // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
        // can be set again.
        previousBodyPaddingRight = undefined
      }
      if (previousBodyTop !== undefined) {
        const top = previousBodyTop
        document.body.style.top = top
        previousBodyScrollBehavior =
          document.documentElement.style.scrollBehavior
        document.documentElement.style.scrollBehavior = 'auto'
        document.documentElement.scrollTop = top
        document.documentElement.style.scrollBehavior = previousBodyScrollBehavior
        previousBodyScrollBehavior = undefined
        previousBodyTop = undefined
      }
    } catch (e) {
      console.error(e)
    }
  })
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

export const disableBodyScroll = (targetElement, options) => {
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
        options: options || {}
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
        try {
          document.addEventListener(
            'touchmove',
            preventDefault,
            hasPassiveEvents ? { passive: false } : undefined
          )
          documentListenerAdded = true
        } catch (e) {
          console.error(e)
        }
      }
    }
  } else {
    setOverflowHidden(options)
    const lock = {
      targetElement,
      options: options || {}
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
      try {
        document.removeEventListener(
          'touchmove',
          preventDefault,
          hasPassiveEvents ? { passive: false } : undefined
        )
        documentListenerAdded = false
      } catch (e) {
        console.error(e)
      }
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
      try {
        document.removeEventListener(
          'touchmove',
          preventDefault,
          hasPassiveEvents ? { passive: false } : undefined
        )

        documentListenerAdded = false
      } catch (e) {
        console.error(e)
      }
    }
  } else {
    locks = locks.filter(lock => lock.targetElement !== targetElement)
    if (!locks.length) {
      restoreOverflowSetting()
    }
  }
}
