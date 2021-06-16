/**
 * EventEmitter
 *
 * This is a tiny event emitter meant to be used at several components that relay on each other to sync data in parallel.
 *
 * - In your class: this._emitterInstance = EventEmitter.createInstance(id) // unique id
 * - Listen to changes: this._emitterInstance.listen(function)
 * - Set new data: this._emitterInstance.set({...})
 * - Update new data: this._emitterInstance.update({...})
 * - Get new data: this._emitterInstance.get()
 * - Remove it like this: this._emitterInstance.remove()
 *
 * __EEE__ stands for __EUFEMIA_EVENT_EMITTER__
 */

class EventEmitter {
  constructor(id) {
    scope.__EEE__ = scope.__EEE__ || {}
    if (!scope.__EEE__[id]) {
      scope.__EEE__[id] = {
        instances: [],
        count: 0,
        data: {},
      }
    }
    scope.__EEE__[id].count = scope.__EEE__[id].count + 1
    scope.__EEE__[id].instances.push(this)

    this.id = id
    this.listeners = []

    return this
  }
  update(data) {
    this.set(data)
    scope.__EEE__[this.id].instances.forEach((instance) => {
      instance.listeners.forEach((fn) => {
        if (typeof fn === 'function') {
          fn(instance.get())
        }
      })
    })
  }
  set(data) {
    scope.__EEE__[this.id].data = {
      ...scope.__EEE__[this.id].data,
      ...data,
    }
  }
  get() {
    return scope.__EEE__[this.id].data
  }
  listen(fn) {
    if (!this.listeners.includes(fn)) {
      this.listeners.push(fn)
    }
    // console.log('add', this.listeners)
    return this
  }
  unlisten(fn) {
    for (let i = 0, l = this.listeners.length; i < l; i++) {
      if (!fn || (fn && this.listeners[i] === fn)) {
        this.listeners[i] = null
      }
    }
  }
  remove() {
    this.unlisten()
    scope.__EEE__[this.id].count = scope.__EEE__[this.id].count - 1
    if (scope.__EEE__[this.id].count <= 0) {
      delete scope[this.id]
    }
  }
}

const scope = typeof window !== 'undefined' ? window : EventEmitter

function createInstance(id) {
  return new EventEmitter(id)
}

export default { createInstance }
