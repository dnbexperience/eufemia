/**
 * Web Tabs Controller
 *
 */

class TabsController {
  constructor(id) {
    this.id = id
    this.listeners = []
    this.count = 0
    this.data = {}
  }
  init() {
    this.count = this.count + 1
    return this
  }
  update(data) {
    this.set(data)
    this.listeners.forEach((fn) => {
      if (typeof fn === 'function') {
        fn(this.get())
      }
    })
  }
  set(data) {
    this.data = data
  }
  get() {
    return this.data
  }
  listen(fn) {
    if (!this.listeners.includes(fn)) {
      this.listeners.push(fn)
    }
    return this
  }
  remove() {
    this.count = this.count - 1
    if (this.count <= 0) {
      for (let i = 0, l = this.listeners.length; i < l; i++) {
        this.listeners[i] = null
      }
      delete inst[this.id]
    }
  }
}

const inst = typeof window !== 'undefined' ? window : TabsController

export default {
  use: (id) => {
    inst.__tabsController = inst.__tabsController || {}
    return (
      inst.__tabsController[id] ||
      (inst.__tabsController[id] = new TabsController(id))
    ).init()
  }
}
