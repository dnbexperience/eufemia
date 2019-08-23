/**
 * Web GlobalStatus Provider
 *
 */

// The meaning with this is that we can force a rerender without sharing the same context
class GlobalStatusProvider {
  static providers = {}
  static Factory = (id = 'main', props = null) => {
    return GlobalStatusProvider.providers[id] || this.set(id, props)
  }

  static set(id = 'main', props = null) {
    return (
      GlobalStatusProvider.providers[id] ||
      (GlobalStatusProvider.providers[id] = new GlobalStatusProviderItem(
        id,
        props
      ))
    )
  }
  static get(id = 'main') {
    return GlobalStatusProvider.providers[id] || null
  }
  static remove(id = 'main') {
    if (GlobalStatusProvider.providers[id]) {
      delete GlobalStatusProvider.providers[id]
    }
  }
}

class GlobalStatusProviderItem {
  constructor(id, props = null) {
    this.internal_id = id
    if (props) {
      this.add(props)
    }
  }
  count = 0
  globalStatus = {}
  listeners = []
  stack = []

  onUpdate(event) {
    // check for duplication first
    if (this.listeners.filter(cb => cb === event).length === 0) {
      this.listeners.push(event)
    }
  }

  // force rerender of the given GlobalStatus component
  forceRerender(globalStatus, props, { buffer_delay = 0 } = {}) {
    const run = () => {
      this.listeners.forEach(event => {
        if (typeof event === 'function') {
          event(globalStatus, props)
        }
      })
    }
    if (buffer_delay > 0) {
      clearTimeout(this._bufferDelayId)
      this._bufferDelayId = setTimeout(run, buffer_delay) // delay the sum & rerender, in case we change the state in the same frame
    } else {
      run()
    }
  }
  sumItemsToSingleStatus() {
    const globalStatus = this.stack.reduce(
      (acc, cur) => {
        if (cur.status_id) {
          acc.ids.push(cur.status_id)
        }
        if (cur.item) {
          if (typeof cur.item === 'string') {
            acc.items.push({ text: cur.item, status_id: cur.status_id })
          } else {
            acc.items.push(cur.item)
          }
        }
        Object.assign(acc, cur)
        return acc
      },
      { ids: [], items: [] }
    )
    return globalStatus
  }

  add(props) {
    if (props.status_id) {
      const exists = this.get(props.status_id)
      if (exists) {
        return exists
      }
    }

    const newProps = Object.assign({}, props)

    newProps.status_time = new Date().getTime()
    newProps.status_id =
      props.status_id || newProps.status_time + (this.count += 1)
    // also, set show to true
    if (typeof newProps.show === 'undefined' || newProps.show === null) {
      newProps.show = true
      newProps.isEmptyNow = false
    }

    // make it possible to send in children as the text
    if (newProps.children) {
      newProps.text = newProps.children
      delete newProps.children
    }

    // add the new props
    this.stack.push(newProps)

    const globalStatus = this.sumItemsToSingleStatus()
    this.forceRerender(globalStatus, props)

    return newProps
  }

  get(status_id) {
    return this.stack.find(
      cur => cur.status_id && cur.status_id === status_id
    )
  }

  remove(status_id, { buffer_delay = 10 } = {}) {
    if (status_id) {
      this.stack = this.stack.filter(cur => cur.status_id !== status_id)

      const globalStatus = this.sumItemsToSingleStatus()
      if (this.stack && this.stack.length === 0) {
        globalStatus.isEmptyNow = true
      }
      this.forceRerender(globalStatus, null, { buffer_delay })
    }
  }

  // to remove this provider item
  unbind() {
    this.listeners.forEach((cb, i) => {
      this.listeners[i] = null
    })
    GlobalStatusProvider.remove(this.internal_id)
  }
}

// add a fallback, in case we don't run this inside the same React instance
if (typeof window !== 'undefined') {
  window.GlobalStatusProvider = GlobalStatusProvider
}

export default GlobalStatusProvider
