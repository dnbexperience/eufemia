import { warn } from './component-helper'

export type AnimateHeightOnStartStates =
  | 'opening'
  | 'closing'
  | 'adjusting'
export type AnimateHeightOnEndStates = 'opened' | 'closed' | 'adjusted'
export type AnimateHeightStates =
  | AnimateHeightOnStartStates
  | AnimateHeightOnEndStates
  | 'init'
export type AnimateHeightOptions = {
  animate?: boolean
}
export type AnimateHeightOnStartCallback = (
  state: AnimateHeightStates
) => void
export type AnimateHeightOnEndCallback = (
  state: AnimateHeightStates
) => void
export type AnimateHeightOnStartStack = Array<AnimateHeightOnStartCallback>
export type AnimateHeightOnEndStack = Array<AnimateHeightOnEndCallback>
export type AnimateHeightEventListener = (e: Event) => void
export type AnimateHeightEvents = Array<AnimateHeightEventListener>
export type AnimateHeightElement = HTMLElement
export type AnimateHeightContainer = HTMLElement
export type AnimateHeightFromHeight = number
export type AnimateHeightToHeight = number

export default class AnimateHeight {
  isInBrowser: boolean
  state: AnimateHeightStates
  onStartStack: AnimateHeightOnStartStack
  onEndStack: AnimateHeightOnEndStack
  events: AnimateHeightEvents
  opts: AnimateHeightOptions
  elem: AnimateHeightElement
  container: AnimateHeightContainer
  reqId1: number
  reqId2: number
  resizeTimeout: NodeJS.Timeout
  isAnimating: boolean
  __currentHeight: number
  onResize: () => void

  constructor(opts: AnimateHeightOptions = {}) {
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
  _restore() {
    if (this.elem.parentElement) {
      this.elem.parentElement.style.position = ''
    }
    this.elem.style.position = ''
    this.elem.style.visibility = ''
    this.elem.style.height = '' // not sure about this
    this.elem.style.width = ''
  }
  _addEndEvents(listener: AnimateHeightEventListener) {
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
  setElement(
    elem: AnimateHeightElement,
    container: AnimateHeightContainer = null
  ) {
    this._removeEndEvents() // in case element gets set several times

    this.elem =
      elem ||
      (typeof document !== 'undefined' && document.createElement('div'))

    // TODO: remove when responsive tables are supported
    if (String(this.elem?.nodeName).toLowerCase() === 'td') {
      this.elem = this.elem.parentElement
    }

    this.container = container

    if (this.container && this.isInBrowser) {
      this.onResize = () => {
        clearTimeout(this.resizeTimeout)
        this.resizeTimeout = setTimeout(
          () => this.setContainerHeight(),
          300
        )
      }
      window.addEventListener('resize', this.onResize)
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

  onStart(fn: AnimateHeightOnStartCallback) {
    this.onStartStack.push(fn)
  }
  onEnd(fn: AnimateHeightOnEndCallback) {
    this.onEndStack.push(fn)
  }
  start(
    fromHeight: AnimateHeightFromHeight,
    toHeight: AnimateHeightToHeight,
    { animate = true }: AnimateHeightOptions = {}
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

        if (this.container) {
          this.container.style.minHeight = `${fromHeight}px`
        }

        this.reqId2 = window.requestAnimationFrame(() => {
          this.elem.style.height = `${toHeight}px`
          this.setContainerHeight()
        })
      })
    }
  }
  setContainerHeight() {
    if (this.container) {
      const contentElem = this.elem
      if (contentElem.offsetHeight > 0) {
        this.container.style.minHeight = `${
          contentElem.offsetHeight + contentElem.offsetTop
        }px`
      }
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
  adjustFrom(height: AnimateHeightFromHeight = null) {
    if (!this.elem) {
      return
    }

    height = height || this.getHeight()
    this.elem.style.height = `${height}px`
    return height
  }
  adjustTo(
    fromHeight: AnimateHeightFromHeight = null,
    toHeight: AnimateHeightToHeight = null,
    { animate = true }: AnimateHeightOptions = {}
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
        this.setContainerHeight()
      }
    })

    this.state = 'adjusting'
    this.start(fromHeight, toHeight, { animate })
  }
  open({ animate = true }: AnimateHeightOptions = {}) {
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
        this.setContainerHeight()
      }
    })

    this.state = 'opening'
    this.start(0, height, { animate })
  }
  close({ animate = true }: AnimateHeightOptions = {}) {
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
