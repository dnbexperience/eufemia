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

    // same animation in process, so do nothing
    if (this.isInProgress(animation)) {
      if (typeof animation.onPartial === 'function') {
        animation.onPartial()
      }
      return animation
    }

    this.stack.push(animation)

    return this.runNext()
  }
  unbind() {
    clearTimeout(this._durationId)
    clearTimeout(this._delayId)
    this.stack = []
    this.events = []
  }

  // Helpers
  isInProgress(animation) {
    return (
      this.stack.length > 0 &&
      this.stack[0].running &&
      animation.type === this.stack[0].type
    ) // ok, we depend on mutability here
  }

  // Internals
  runNext() {
    const animation = this.stack[0]

    // ok, we depend on mutability here
    if (!animation || animation.running) {
      return null
    }
    animation.running = true // use mutability here

    const run = () => {
      if (typeof animation.onStart === 'function') {
        animation.onStart(animation)
      }
      this.runGlobalEvents(animation, 'onStart')
      const next = () => {
        animation.running = false // use mutability here

        if (typeof animation.onComplete === 'function') {
          animation.onComplete(animation)
        }
        this.runGlobalEvents(animation, 'onComplete')

        // now, remove the one we have processed
        this.stack = this.stack.filter(a => a !== animation)
        this.runNext()
      }
      clearTimeout(this._durationId)
      if (animation.duration > 0) {
        this._durationId = setTimeout(next, animation.duration)
      } else {
        next()
      }
    }
    clearTimeout(this._delayId)
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
