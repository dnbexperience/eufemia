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

  static autoAddStatusId(
    item,
    status_id = GlobalStatusProvider.makeStatusId()
  ) {
    if (typeof item === 'string') {
      item = { text: item }
    }
    if (!item.status_id) {
      item.status_id = status_id
    }
    return item
  }

  static makeStatusId() {
    return new Date().getTime() + Math.round(Math.random() * 999)
  }

  static combineMessages(stack) {
    const globalStatus = stack.reduce((acc, _cur) => {
      // make a copy, because items are read-only
      const cur = { ..._cur }

      if (!cur.status_id) {
        cur.status_id = GlobalStatusProvider.makeStatusId()
      }

      if (typeof cur.items === 'string') {
        cur.items = JSON.parse(cur.items)
      } else {
        // make sure we have an array of items
        cur.items = cur.items || []
      }

      // if there is only one item, put it into the array
      if (cur.item) {
        cur.items.push(cur.item)
      }

      // merge items from prev stack into the current
      cur.items = cur.items.reduce((acc, item) => {
        item = GlobalStatusProvider.autoAddStatusId(item, cur.status_id)

        const foundAtIndex = acc.findIndex(
          ({ status_id }) => status_id === item.status_id
        )
        if (foundAtIndex > -1) {
          acc[foundAtIndex] = item
        } else {
          acc.push(item)
        }

        return acc
      }, acc.items || []) // here we use the items from the prev stack

      // merge the prev stack with the current
      Object.assign(acc, cur)

      return acc
    }, {})

    // no items? remove them then
    if (globalStatus.items && globalStatus.items.length === 0) {
      delete globalStatus.items
    }

    return globalStatus
  }
}

class GlobalStatusProviderItem {
  constructor(id, props = null) {
    this.internal_id = id
    if (props) {
      this.add(props)
    }
  }

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
  forceRerender(
    globalStatus,
    props,
    { buffer_delay = 0, isEmpty = false } = {}
  ) {
    const run = () => {
      this.listeners.forEach(event => {
        if (typeof event === 'function') {
          event(globalStatus, props, { isEmpty })
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

  add(props) {
    if (!props.status_id) {
      console.warn('status_id is required!')
    }

    // make copy
    const newProps = Object.assign({}, props)

    // make sure we have a status id
    newProps.status_id =
      props.status_id || GlobalStatusProvider.makeStatusId()

    // also, set show to true
    if (typeof newProps.show === 'undefined' || newProps.show === null) {
      newProps.show = true
    }

    // make it possible to send in children as the text
    if (newProps.children) {
      newProps.text = newProps.children
      delete newProps.children
    }

    // replace the props if exists
    const stackIndex = this.stack.findIndex(
      cur => cur.status_id === props.status_id
    )
    if (stackIndex > -1) {
      this.stack[stackIndex] = newProps
    } else {
      // add the new props
      this.stack.push(newProps)
    }

    const globalStatus = GlobalStatusProvider.combineMessages(this.stack)
    this.forceRerender(globalStatus, props)

    return newProps
  }

  get(status_id) {
    return this.stack.find(cur => cur.status_id === status_id)
  }

  remove(status_id, { buffer_delay = 10, empty_offset = 1 } = {}) {
    if (status_id) {
      this.stack = this.stack.filter(cur => cur.status_id !== status_id)

      const globalStatus = GlobalStatusProvider.combineMessages(this.stack)

      this.forceRerender(globalStatus, null, {
        buffer_delay,
        isEmpty: this.stack && this.stack.length - empty_offset === 0 // because we have by default a main, we
      })
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
