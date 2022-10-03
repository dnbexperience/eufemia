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

declare global {
  interface Window {
    __EEE__?: EventEmitterEEE
  }
}

export type EventEmitterId = string
export type EventEmitterData = Record<string, unknown>
export type EventEmitterListener = (data: EventEmitterData) => void
export type EventEmitterEEE = Record<
  EventEmitterId,
  EventEmitterScopeObject
>
export type EventEmitterScope =
  | ({
      __EEE__?: EventEmitterEEE
    } & Window)
  | EventEmitter
export type EventEmitterScopeInstances = Array<EventEmitter>
export type EventEmitterScopeObject = {
  count: number
  instances: EventEmitterScopeInstances
  data: EventEmitterData
}

class EventEmitter {
  static createInstance(id: EventEmitterId) {
    return new EventEmitter(id)
  }

  static __EEE__?: Record<EventEmitterId, EventEmitterScopeObject>
  id: EventEmitterId
  listeners: Array<EventEmitterListener>

  constructor(id: EventEmitterId) {
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
  update = (data: EventEmitterData) => {
    this.set(data)
    scope.__EEE__[this.id].instances.forEach((instance) => {
      instance.listeners.forEach((fn) => {
        if (typeof fn === 'function') {
          fn(instance.get())
        }
      })
    })
  }
  set = (data: EventEmitterData) => {
    scope.__EEE__[this.id].data = {
      ...scope.__EEE__[this.id].data,
      ...data,
    }
  }
  get = () => {
    return scope.__EEE__[this.id].data
  }
  listen(fn: EventEmitterListener) {
    if (!this.listeners.includes(fn)) {
      this.listeners.push(fn)
    }
    return this
  }
  unlisten(fn?: EventEmitterListener | undefined) {
    for (let i = 0, l = this.listeners.length; i < l; i++) {
      if (!fn || (fn && fn === this.listeners[i])) {
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

export default EventEmitter
