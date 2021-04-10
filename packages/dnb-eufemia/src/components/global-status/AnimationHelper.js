/**
 * Animation helper
 *
 * NB: For now only used in GlobalStatus,
 * but can be of interest to use in other components as well
 *
 */

import { warn } from '../../shared/component-helper'

export default class Animation {
  stack = []
  events = []

  // Main methods
  add(animation) {
    if (!animation.type) {
      warn('You should define an animation type.')
    }

    // same animation in process, so do nothing
    const isInProgress = this.isInProgress(animation)
    if (isInProgress) {
      if (typeof animation.onPartial === 'function') {
        animation.onPartial(isInProgress)
      }
      return animation
    }

    this.stack.push(animation)

    return this.runNext()
  }
  unbind() {
    this.stack.forEach((animation) => {
      animation.onReset = null
      this.reset(animation)
    })
    this.stack = []
    this.events = []
  }
  reset(animation) {
    if (!animation) {
      return
    }
    clearTimeout(animation._durationId)
    clearTimeout(animation._delayId)
    if (typeof animation.onReset === 'function') {
      animation.onReset(animation)
    }
    this.stack = this.stack.filter((a) => a !== animation)
  }

  // Helpers
  isInProgress(animation) {
    return (
      this.stack.length > 0 &&
      this.stack[0].running &&
      animation.type === this.stack[0].type &&
      this.stack[0]
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
        this.stack = this.stack.filter((a) => a !== animation)
        this.runNext()
      }
      clearTimeout(animation._durationId)
      if (animation.duration > 0) {
        animation._durationId = setTimeout(next, animation.duration)
      } else {
        next()
      }
    }
    clearTimeout(animation._delayId)
    if (animation.delay > 0) {
      animation._delayId = setTimeout(run, animation.delay)
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
    this.events.forEach((event) => {
      if (type === event.type && typeof event.callback === 'function') {
        event.callback(animation)
      }
    })
    this.events = []
  }
}
