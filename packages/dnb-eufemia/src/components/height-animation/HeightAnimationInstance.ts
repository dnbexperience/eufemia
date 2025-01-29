export type HeightAnimationOnStartStates =
  | 'opening'
  | 'closing'
  | 'adjusting'
export type HeightAnimationOnEndStates = 'opened' | 'closed' | 'adjusted'
export type HeightAnimationStates =
  | HeightAnimationOnStartStates
  | HeightAnimationOnEndStates
  | 'init'
export type HeightAnimationOptions = {
  animate?: boolean
}
export type HeightAnimationOnStartCallback = (
  state: HeightAnimationStates
) => void
export type HeightAnimationOnEndCallback = (
  state: HeightAnimationStates
) => void
export type HeightAnimationOnStartStack =
  Array<HeightAnimationOnStartCallback>
export type HeightAnimationOnEndStack = Array<HeightAnimationOnEndCallback>
export type HeightAnimationEventListener = (e: Event) => void
export type HeightAnimationEvents = Array<HeightAnimationEventListener>
export type HeightAnimationElement = HTMLElement
export type HeightAnimationContainer = HTMLElement
export type HeightAnimationFromHeight = number
export type HeightAnimationToHeight = number

export default class HeightAnimation {
  private state: Readonly<HeightAnimationStates>
  isInBrowser: boolean
  onStartStack: HeightAnimationOnStartStack = []
  onEndStack: HeightAnimationOnEndStack = []
  events: HeightAnimationEvents = []
  opts: HeightAnimationOptions = { animate: true }
  elem: HeightAnimationElement
  reqId1: number
  reqId2: number
  resizeTimeout: NodeJS.Timeout
  timeouts: NodeJS.Timeout[] = []
  firstTime?: number = 0
  startTime?: number = 0
  duration?: number = 0
  isAnimating: boolean
  __currentHeight: number

  firstPaintStyle = {
    visibility: 'hidden',
    opacity: '0', // prevents before/after elements to be visible
    height: 'auto',
  } as const

  constructor(opts: HeightAnimationOptions = {}) {
    this.isInBrowser = typeof window !== 'undefined'
    this.setState('init')
    this.setOptions(opts)
  }

  callAnimationStart() {
    this.startTime = Date.now()
    if (!this.firstTime) {
      this.firstTime = this.startTime
    }
    if (this.onStartStack) {
      this.onStartStack.forEach((fn) => {
        if (typeof fn === 'function') {
          fn(this.state)
        }
      })
    }
  }
  callAnimationEnd() {
    this.isAnimating = false

    if (this.state !== 'opened') {
      delete this.__currentHeight
    }

    this.removeEndEvents()

    if (this.onEndStack) {
      this.onEndStack.forEach((fn) => {
        if (typeof fn === 'function') {
          fn(this.state)
        }
      })
    }
  }
  addEndEvent(listener: HeightAnimationEventListener) {
    this.removeEndEvents() // also, remove events on every open (but not on close!)

    const handleTransitionEnd = (e) => {
      if (this.canFinish()) {
        listener(e)
      } else {
        const delay = this.duration - (Date.now() - this.startTime)

        if (delay === -1) {
          listener(e)
        } else {
          this.timeouts.push(setTimeout(() => listener(e), delay))
        }
      }
    }

    this.events.push(handleTransitionEnd)
    this.elem?.addEventListener?.('transitionend', handleTransitionEnd)
  }
  removeEndEvents() {
    this.events.forEach((listener) => {
      this.elem?.removeEventListener?.('transitionend', listener)
    })
    this.events = []
  }

  // Public methods
  setElement(elem: HeightAnimationElement) {
    this.elem =
      elem ||
      (typeof document !== 'undefined' && document.createElement('div'))

    // TODO: remove when responsive tables are supported
    if (String(this.elem?.nodeName).toLowerCase() === 'td') {
      this.elem = this.elem.parentElement
    }

    this.duration =
      globalThis.animationDuration ??
      (parseFloat(window.getComputedStyle(this.elem).transitionDuration) *
        1000 ||
        400) // The default duration
  }
  setState(state: HeightAnimationStates) {
    this.state = Object.freeze(state)
  }
  setOptions(opts: HeightAnimationOptions) {
    this.opts = Object.freeze({ ...this.opts, ...opts })
  }
  getOptions() {
    return this.opts
  }
  remove() {
    this.stop()
    this.removeEndEvents()
    this.setState('init')
    this.isAnimating = false
    this.onEndStack = []
    this.onStartStack = []
    this.__currentHeight = undefined
    this.elem = undefined
  }
  setAsOpen() {
    if (this.state === 'opened') {
      return
    }
    this.setState('opening')
    this.callAnimationStart()
    this.setState('opened')
    this.callAnimationEnd()
  }
  setAsClosed() {
    if (this.state === 'closed') {
      return
    }
    this.setState('closing')
    this.callAnimationStart()
    this.setState('closed')
    this.callAnimationEnd()
  }
  getHeight() {
    return this.withFallback(this.elem, 'clientHeight') ?? null
  }
  getUnknownHeight() {
    if (!this.elem) {
      return null
    }

    if (this.isAnimating && typeof this.__currentHeight !== 'undefined') {
      return this.__currentHeight
    }

    const clonedElem = this.elem.cloneNode(true) as HTMLElement
    const inputs = clonedElem.querySelectorAll('input')
    inputs.forEach((input) => {
      input.removeAttribute('name') // because type="radio" will be else effected negatively
      input.removeAttribute('id') // don't put IDs twice in the DOM
    })

    // Hide the cloned element
    for (const key in this.firstPaintStyle) {
      clonedElem.style[key] = this.firstPaintStyle[key]
    }
    clonedElem.style.position = 'absolute' // not a part of the "firstPaintStyle"

    this.elem.parentNode?.insertBefore(clonedElem, this.elem.nextSibling)

    // When text is wrapped, we get different widths,
    // so we need to set the width to the original width
    const elemWidth = this.elem.clientWidth
    const clonedWidth =
      this.withFallback(clonedElem, 'clientWidth', 'data-width') ?? 0

    if (clonedWidth > elemWidth) {
      clonedElem.style.width = `${elemWidth}px`
    }

    const height =
      // data-height is used for mockup testing with "mockHeight"
      this.withFallback(this.elem, 'clientHeight', 'data-height') ?? null

    clonedElem.parentNode?.removeChild(clonedElem)

    if (height) {
      this.__currentHeight = height
    }

    return height
  }
  withFallback(
    elem: HTMLElement,
    key: 'clientHeight' | 'clientWidth',
    fallback?: 'data-height' | 'data-width'
  ) {
    const val =
      fallback && elem.hasAttribute(fallback)
        ? parseFloat(elem.getAttribute(fallback))
        : elem?.[key]

    if (isNaN(val)) {
      return null
    }

    return val
  }
  onStart(fn: HeightAnimationOnStartCallback) {
    this.onStartStack.push(fn)
  }
  onEnd(fn: HeightAnimationOnEndCallback) {
    this.onEndStack.push(fn)
  }
  start(
    fromHeight: HeightAnimationFromHeight,
    toHeight: HeightAnimationToHeight
  ) {
    if (
      !this.elem ||
      !(
        this.isInBrowser &&
        typeof window.requestAnimationFrame === 'function'
      )
    ) {
      return
    }

    const opts = this.getOptions()
    if (opts.animate === false) {
      return
    }

    this.stop()
    this.isAnimating = true

    const cleanup = this.stopOuterAnimations()

    // make the animation
    this.reqId1 = window.requestAnimationFrame(() => {
      if (
        !this.elem ||
        this.elem.classList.contains('dnb-height-animation--stop')
      ) {
        return
      }

      this.elem.style.height = `${fromHeight}px`

      this.reqId2 = window.requestAnimationFrame(() => {
        if (!this.elem) {
          return
        }

        this.elem.style.height = `${toHeight}px`

        cleanup()
      })
    })
  }
  stop() {
    this.timeouts.forEach((id) => clearTimeout(id))
    this.timeouts = []

    if (
      this.isInBrowser &&
      typeof window.requestAnimationFrame === 'function'
    ) {
      window.cancelAnimationFrame(this.reqId1)
      window.cancelAnimationFrame(this.reqId2)
    }
  }
  open() {
    if (
      this.state === 'opened' ||
      this.state === 'opening' ||
      this.shouldBypassAnimation()
    ) {
      this.setAsOpen()
      return
    }

    this.setState('opening')
    this.callAnimationStart()

    const toHeight = this.getUnknownHeight()

    this.addEndEvent((e) => {
      if (e.target === e.currentTarget || !e.currentTarget) {
        if (this.elem) {
          this.elem.style.overflowY = ''
        }
        this.setState('opened')
        this.readjust()
      }
    })

    this.start(0, toHeight)
  }
  close() {
    if (
      this.state === 'closed' ||
      this.state === 'closing' ||
      this.shouldBypassAnimation()
    ) {
      this.setAsClosed()
      return
    }

    this.setState('closing')
    this.callAnimationStart()

    const fromHeight = this.getHeight()

    this.addEndEvent((e) => {
      if (e.target === e.currentTarget || !e.currentTarget) {
        if (this.elem) {
          this.elem.style.visibility = 'hidden'
          this.elem.style.overflowY = 'clip'
        }
        this.setState('closed')
        this.callAnimationEnd()
      }
    })

    this.start(fromHeight, 0)
  }
  adjustTo(
    fromHeight: HeightAnimationFromHeight = null,
    toHeight: HeightAnimationToHeight = null
  ) {
    const opts = this.getOptions()

    if (
      !this.elem ||
      opts.animate === false ||
      this.state === 'opening' ||
      this.state === 'closing'
    ) {
      return
    }

    if (fromHeight === null) {
      fromHeight = this.getHeight()
    }
    if (toHeight === null) {
      toHeight = this.getUnknownHeight()
    }

    if (fromHeight === toHeight) {
      this.setState('adjusted')
      return
    }

    this.setState('adjusting')
    this.callAnimationStart()

    this.addEndEvent((e) => {
      if (
        this.state === 'adjusting' &&
        (e.target === e.currentTarget || !e.currentTarget)
      ) {
        if (this.elem) {
          this.elem.style.height = 'auto'
        }
        this.setState('adjusted')
        this.callAnimationEnd()
      }
    })

    this.start(fromHeight, toHeight)
  }
  stopOuterAnimations() {
    // When animating nested height animations,
    // we need to stop the outer animation,
    // because it has a fixed height. We want it to be "auto".

    const elements = []

    const getCloses = (elem: HTMLElement) =>
      elem.parentElement?.closest('.dnb-height-animation') as HTMLElement

    let elem = getCloses(this.elem)
    while (elem) {
      elements.push(elem)
      elem = getCloses(elem)
    }

    elements.forEach((elem) => {
      elem.classList.add('dnb-height-animation--stop')
    })

    return () => {
      elements.forEach((elem) => {
        if (elem) {
          elem.classList.remove('dnb-height-animation--stop')
        }
      })
      elements.length = 0 // reset the array
    }
  }
  readjust() {
    const endHeight = this.getHeight()

    if (this.elem) {
      this.elem.style.height = 'auto'
    }

    this.__currentHeight = undefined
    const newHeight = this.getUnknownHeight()

    // If the height has changed during the animation, we need to adjust it
    if (endHeight !== newHeight) {
      this.adjustTo(endHeight, newHeight)
    } else {
      this.callAnimationEnd()
    }
  }
  /**
   * Determines whether the animation can finish.
   * Check for certain states and if the time passed is too short.
   * With a so short first state change, we do not call animation end.
   */
  canFinish() {
    return Boolean(
      this.startTime &&
        Date.now() - this.startTime >
          (globalThis.animationDuration ?? this.duration)
    )
  }
  /**
   * Determines whether the animation should be bypassed.
   * Check for certain states and if the time passed is too short to be correct.
   * With a very short first state change, we skip animation.
   */
  shouldBypassAnimation() {
    const opts = this.getOptions()

    if (!this.elem || opts.animate === false) {
      return true
    }

    if (
      this.isInBrowser &&
      (globalThis.IS_TEST || globalThis.bypassTime === -1)
    ) {
      return false
    }

    return Boolean(
      this.firstTime &&
        Date.now() - this.firstTime < (globalThis.bypassTime ?? 100)
    )
  }
}
