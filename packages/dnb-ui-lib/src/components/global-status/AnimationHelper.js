/**
 * Animation helper
 *
 * NB: For now only used in GlobalStatus,
 * but can be of interest to use in other components as well
 *
 */

export default class Animation {
  stack = []
  events = []

  // Main methodes
  add(animation) {
    if (!animation.type) {
      console.warn('You should define an animation type.')
    }
    if (this.isInProgress() && animation.type === this.stack[0].type) {
      return
    }
    this.stack.push(animation)

    this.runNext()
  }
  unbind() {
    clearTimeout(this._durationId)
    clearTimeout(this._delayId)
    this.stack = []
    this.events = []
  }

  // Helpers
  getCurrent() {
    return this.isInProgress() ? this.stack[0] : null
  }
  isEmpty() {
    return this.stack.length === 0
  }
  isInProgress() {
    return this.stack.length > 0
  }

  // Internals
  runNext() {
    if (this.stack.length > 1) {
      return
    }
    const animation = this.stack[0]

    if (!animation) {
      return
    }
    const run = () => {
      if (typeof animation.onStart === 'function') {
        animation.onStart(animation)
      }
      this.runGlobalEvents(animation, 'onStart')
      const next = () => {
        // now, remove the one we have processed
        this.stack = this.stack.filter(a => a !== animation)
        if (typeof animation.onComplete === 'function') {
          animation.onComplete(animation)
        }
        this.runGlobalEvents(animation, 'onComplete')
        this.runNext()
      }
      if (animation.duration > 0) {
        this._durationId = setTimeout(next, animation.duration)
      } else {
        next()
      }
    }
    if (animation.delay > 0) {
      this._delayId = setTimeout(run, animation.delay)
    } else {
      run()
    }

    return animation
  }

  // Global events
  onStart(callback) {
    this.events.push({ callback, type: 'onStart' })
  }
  onComplete(callback) {
    this.events.push({ callback, type: 'onComplete' })
  }
  runGlobalEvents(animation, type) {
    this.events.forEach(event => {
      if (type === event.type && typeof event.callback === 'function') {
        event.callback(animation)
      }
    })
    this.events = []
  }
}
