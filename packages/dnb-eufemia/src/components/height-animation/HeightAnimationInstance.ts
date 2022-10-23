import { warn } from '../../shared/component-helper'

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
  isInBrowser: boolean
  state: HeightAnimationStates
  onStartStack: HeightAnimationOnStartStack
  onEndStack: HeightAnimationOnEndStack
  events: HeightAnimationEvents
  opts: HeightAnimationOptions
  elem: HeightAnimationElement
  reqId1: number
  reqId2: number
  resizeTimeout: NodeJS.Timeout
  isAnimating: boolean
  __currentHeight: number
  onResize: () => void

  constructor(opts: HeightAnimationOptions = {}) {
    this.isInBrowser = typeof window !== 'undefined'
    this.state = 'init'
    this.onStartStack = []
    this.onEndStack = []
    this.events = []
    this.opts = opts
  }

  // Private methods
  _callOnStart() {
    this.onStartStack.forEach((fn) => {
      if (typeof fn === 'function') {
        fn(this.state)
      }
    })
  }
  _callOnEnd() {
    this.isAnimating = false

    if (this.state !== 'opened') {
      delete this.__currentHeight
    }

    this._removeEndEvents()

    this.onEndStack.forEach((fn) => {
      if (typeof fn === 'function') {
        fn(this.state)
      }
    })
  }
  reset() {
    this.state = 'init'
    this.isAnimating = false
    this._removeEndEvents()
    this._restore()
  }
  _restore() {
    if (this.elem.parentElement) {
      this.elem.parentElement.style.position = ''
    }
    this.elem.style.position = ''
    this.elem.style.visibility = ''
    this.elem.style.height = '' // not sure about this
    this.elem.style.width = ''
  }
  _addEndEvents(listener: HeightAnimationEventListener) {
    this._removeEndEvents() // also, remove events on every open (but not on close!)

    this.events.push(listener)
    this.elem.addEventListener('transitionend', listener)
  }
  _removeEndEvents() {
    if (!this.elem) {
      return // stop here
    }

    this.events.forEach((listener, i) => {
      this.elem.removeEventListener('transitionend', listener)
      this.events.splice(i, 1)
    })
  }
  _emitTransitionEnd() {
    try {
      const event = new CustomEvent('transitionend')
      this.elem.dispatchEvent(event)
    } catch (e) {
      warn(e)
    }
  }

  // Public methods
  setElement(elem: HeightAnimationElement) {
    this._removeEndEvents() // in case element gets set several times

    this.elem =
      elem ||
      (typeof document !== 'undefined' && document.createElement('div'))

    // TODO: remove when responsive tables are supported
    if (String(this.elem?.nodeName).toLowerCase() === 'td') {
      this.elem = this.elem.parentElement
    }
  }
  remove() {
    this.stop()
    this._removeEndEvents()
    this.isAnimating = false
    this.onStartStack = null
    this.onEndStack = null
    this.elem = null
    this.state = 'init'
    if (this.onResize && this.isInBrowser) {
      clearTimeout(this.resizeTimeout)
      window.removeEventListener('resize', this.onResize)
    }
  }
  getHeight() {
    return parseFloat(String(this.elem?.clientHeight)) || null
  }
  getWidth() {
    if (!this.isInBrowser) {
      return null
    }
    return window.getComputedStyle(this.elem).width
  }
  getUnknownHeight() {
    if (!this.elem) {
      return null
    }

    if (this.isAnimating && this.__currentHeight) {
      return this.__currentHeight
    }

    this.elem.style.width = this.getWidth()

    if (this.elem.parentElement) {
      this.elem.parentElement.style.position = 'relative'
    }
    this.elem.style.position = 'absolute'
    this.elem.style.visibility = 'hidden'
    this.elem.style.height = 'auto'

    this.__currentHeight = this.getHeight()

    this._restore()

    return this.__currentHeight
  }

  onStart(fn: HeightAnimationOnStartCallback) {
    this.onStartStack.push(fn)
  }
  onEnd(fn: HeightAnimationOnEndCallback) {
    this.onEndStack.push(fn)
  }
  start(
    fromHeight: HeightAnimationFromHeight,
    toHeight: HeightAnimationToHeight,
    { animate = true }: HeightAnimationOptions = {}
  ) {
    if (window?.location?.href?.includes('data-visual-test')) {
      animate = false
    }

    if (
      fromHeight === toHeight ||
      animate === false ||
      this.opts?.animate === false
    ) {
      this.elem.style.height = `${toHeight}px`

      this._callOnStart()

      this._emitTransitionEnd()

      return // stop here
    }

    if (
      this.isInBrowser &&
      typeof window.requestAnimationFrame === 'function'
    ) {
      this.stop()

      this.isAnimating = true

      // call the callbacks here, because then we do not call this during startup. This way we get an instant startup
      this._callOnStart()

      // make the animation
      this.reqId1 = window.requestAnimationFrame(() => {
        if (!this.elem) {
          return // stop here
        }

        this.elem.style.height = `${fromHeight}px`

        this.reqId2 = window.requestAnimationFrame(() => {
          this.elem.style.height = `${toHeight}px`
        })
      })
    }
  }
  stop() {
    if (
      this.isInBrowser &&
      typeof window.requestAnimationFrame === 'function'
    ) {
      window.cancelAnimationFrame(this.reqId1)
      window.cancelAnimationFrame(this.reqId2)
    }
  }
  /**
   * Deprecated
   * "adjustFrom" is only used by GlobalStatus.js
   * it should be replaced with "useHeightAnimation"
   */
  adjustFrom(height: HeightAnimationFromHeight = null) {
    if (!this.elem) {
      return
    }

    height = height || this.getHeight()
    this.elem.style.height = `${height}px`
    return height
  }
  adjustTo(
    fromHeight: HeightAnimationFromHeight = null,
    toHeight: HeightAnimationToHeight = null,
    { animate = true }: HeightAnimationOptions = {}
  ) {
    if (!this.elem) {
      return
    }

    if (fromHeight === null) {
      fromHeight = this.getHeight()
    }
    if (toHeight === null) {
      toHeight = this.getUnknownHeight()
    }

    this._addEndEvents((e) => {
      if (e.target === e.currentTarget) {
        if (this.elem) {
          this.elem.style.height = 'auto'
        }

        this.state = 'adjusted'
        this._callOnEnd()
      }
    })

    this.state = 'adjusting'
    this.start(fromHeight, toHeight, { animate })
  }
  open({ animate = true }: HeightAnimationOptions = {}) {
    if (
      !this.elem ||
      this.state === 'opened' ||
      this.state === 'opening'
    ) {
      return
    }

    const height = this.getUnknownHeight()

    this._addEndEvents((e) => {
      if (e.target === e.currentTarget) {
        if (this.elem) {
          this.elem.style.height = 'auto'
        }

        this.state = 'opened'
        this._callOnEnd()
      }
    })

    this.state = 'opening'
    this.start(0, height, { animate })
  }
  close({ animate = true }: HeightAnimationOptions = {}) {
    if (
      !this.elem ||
      this.state === 'closed' ||
      this.state === 'closing'
    ) {
      return
    }

    let height = this.getHeight()
    if (this.state === 'init') {
      height = this.getUnknownHeight()
    }

    this._addEndEvents((e) => {
      if (e.target === e.currentTarget) {
        if (this.elem) {
          this.elem.style.visibility = 'hidden'
        }

        this.state = 'closed'
        this._callOnEnd()
      }
    })

    this.state = 'closing'
    this.start(height, 0, { animate })
  }
}
