import { warn } from './component-helper'

export default class AnimateHeight {
  constructor(opts = {}) {
    this.isInBrowser = typeof window !== 'undefined'
    this.state = 'init'
    this.onStartStack = []
    this.onEndStack = []
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
  _removeEndEvents() {
    if (this.onOpenEnd) {
      this.elem.removeEventListener('transitionend', this.onOpenEnd)
      this.onOpenEnd = null
    }
    if (this.onAdjustEnd) {
      this.elem.removeEventListener('transitionend', this.onAdjustEnd)
      this.onAdjustEnd = null
    }
    if (this.onCloseEnd) {
      this.elem.removeEventListener('transitionend', this.onCloseEnd)
      this.onCloseEnd = null
    }
  }

  // Public methods
  setElement(elem, container = null) {
    this.elem =
      elem ||
      (typeof document !== 'undefined' && document.createElement('div'))

    // get tr element
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
    this._removeEndEvents()
    this.isAnimating = false
    this.onStartStack = null
    this.onEndStack = null
    this.stop()
    this.elem = null
    this.state = 'init'
    if (this.onResize && this.isInBrowser) {
      clearTimeout(this.resizeTimeout)
      window.removeEventListener('resize', this.onResize)
    }
  }
  getHeight() {
    return parseFloat(this.elem.clientHeight) || null
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

    this.elem.style.width = this.getWidth()

    if (this.elem.parentElement) {
      this.elem.parentElement.style.position = 'relative'
    }
    this.elem.style.position = 'absolute'
    this.elem.style.visibility = 'hidden'
    this.elem.style.height = 'auto'

    const height = this.getHeight()

    this._restore()

    return height
  }

  onStart(fn) {
    this.onStartStack.push(fn)
  }
  onEnd(fn) {
    this.onEndStack.push(fn)
  }
  start(fromHeight, toHeight, { animate = true } = {}) {
    try {
      if (window.location.href.includes('data-visual-test')) {
        animate = false
      }
    } catch (e) {
      //
    }
    if (animate === false || this.opts?.animate === false) {
      this.elem.style.height = `${toHeight}px`
      this._callOnStart()

      try {
        const event = new CustomEvent('transitionend')
        this.elem.dispatchEvent(event)
      } catch (e) {
        warn(e)
      }

      return // stop here
    }

    if (this.isInBrowser && window.requestAnimationFrame) {
      this.stop()

      this.isAnimating = true

      // call the callbacks here, because then we do not call this during startup. This way we get an instant startup
      this._callOnStart()

      // make the animation
      this.reqId1 = window.requestAnimationFrame(() => {
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
    if (this.isInBrowser && window.requestAnimationFrame) {
      window.cancelAnimationFrame(this.reqId1)
      window.cancelAnimationFrame(this.reqId2)
    }
  }
  adjustFrom(height = null) {
    if (!this.elem) {
      return
    }

    height = height || this.getHeight()
    this.elem.style.height = `${height}px`
    return height
  }
  adjustTo(fromHeight, toHeight = null, { animate = true } = {}) {
    if (!this.elem) {
      return
    }

    toHeight = toHeight !== null ? toHeight : this.getUnknownHeight()

    this.state = 'adjusting'
    this._removeEndEvents() // also, remove events on every open (but not on close!)

    if (!this.onAdjustEnd) {
      this.elem.addEventListener(
        'transitionend',
        (this.onAdjustEnd = () => {
          if (this.elem) {
            this.elem.style.height = 'auto'
          }

          this.state = 'adjusted'
          this._callOnEnd()
          this.setContainerHeight()
        })
      )
    }

    this.start(fromHeight, toHeight, { animate })
  }
  open({ animate = true } = {}) {
    if (
      !this.elem ||
      this.state === 'opened' ||
      this.state === 'opening'
    ) {
      return
    }

    const height = this.getUnknownHeight()

    this.state = 'opening'
    this._removeEndEvents() // also, remove events on every open (but not on close!)

    if (!this.onOpenEnd) {
      this.elem.addEventListener(
        'transitionend',
        (this.onOpenEnd = () => {
          if (this.elem) {
            this.elem.style.height = 'auto'
          }

          this.state = 'opened'
          this._callOnEnd()
          this.setContainerHeight()
        })
      )
    }

    this.start(0, height, { animate })
  }
  close({ animate = true } = {}) {
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

    this.state = 'closing'
    this._removeEndEvents() // also, remove events on every open (but not on close!)

    if (!this.onCloseEnd) {
      this.elem.addEventListener(
        'transitionend',
        (this.onCloseEnd = () => {
          if (this.elem) {
            this.elem.style.visibility = 'hidden'
          }

          this.state = 'closed'
          this._callOnEnd()
        })
      )
    }

    this.start(height, 0, { animate })
  }
}
