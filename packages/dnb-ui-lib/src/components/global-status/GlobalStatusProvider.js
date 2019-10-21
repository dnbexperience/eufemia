/**
 * Web GlobalStatus Provider
 *
 */

import { makeUniqueId } from '../../shared/component-helper'

// The meaning with this is that we can force a rerender without sharing the same context
class GlobalStatusProvider {
  static providers = {}

  static create = (id = 'main', props = null) => {
    return (GlobalStatusProvider.providers[
      id
    ] = new GlobalStatusProviderItem(id, props))
  }

  static init(id = 'main', onReady = null, props = null) {
    const existingStatus = GlobalStatusProvider.get(id)

    if (existingStatus) {
      if (props) {
        existingStatus.add(props)
      }
      if (typeof onReady === 'function') {
        onReady(existingStatus)
      }
      return existingStatus
    }

    const newStatus = GlobalStatusProvider.create(id, props)

    if (onReady) {
      newStatus.addOnReady(newStatus)
    }

    return newStatus
  }

  static get(id = 'main') {
    return GlobalStatusProvider.providers[id] || null
  }

  static remove(id = 'main') {
    if (GlobalStatusProvider.providers[id]) {
      delete GlobalStatusProvider.providers[id]
    }
  }

  static prepareItemWithStatusId(item, status_id = null) {
    if (typeof item === 'string') {
      item = { text: item }
    }
    if (!item.status_id) {
      item.status_id =
        status_id && status_id !== 'status-main' // same as defaultProps.status_id
          ? status_id
          : slugify(JSON.stringify(item))
    }
    return item
  }

  static combineMessages(stack) {
    const globalStatus = stack.reduce((acc, _cur) => {
      // make a copy, because items are read-only
      const cur = { ..._cur }

      if (typeof cur.items === 'string' && cur.items[0] === '[') {
        cur.items = JSON.parse(cur.items)
      }

      // if there is only one item, put it into the array
      if (cur.item) {
        if (typeof cur.item === 'string' && cur.item[0] === '{') {
          cur.item = JSON.parse(cur.item)
        }
        // make sure we have an array of items
        cur.items = cur.items || []
        cur.items.push(cur.item)
      }

      // merge items from prev stack into the current
      if (cur.items) {
        cur.items = cur.items.reduce((acc, item) => {
          // only a fallback and to make sure we have
          item = GlobalStatusProvider.prepareItemWithStatusId(item)

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
      }

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

  onUpdate(event) {
    // check for duplication first
    if (this._onUpdateEvents.filter(cb => cb === event).length === 0) {
      this._onUpdateEvents.push(event)
    }
  }

  // force rerender of the given GlobalStatus component
  forceRerender(
    globalStatus,
    props,
    { buffer_delay = 0, isEmpty = false } = {}
  ) {
    const run = () => {
      this._onUpdateEvents.forEach(event => {
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

  init(props) {
    return this.add(props, { preventRerender: true })
  }

  add(props, opts = {}) {
    // make copy
    const newProps = { ...props }

    // make sure we have a status id
    if (!newProps.status_id) {
      newProps.status_id = makeUniqueId()
    }

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

    const globalStatus = GlobalStatusProvider.combineMessages(
      this.stack,
      opts
    )
    if (!opts.preventRerender) {
      this.forceRerender(globalStatus, props)
    }

    return globalStatus
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

  empty() {
    this._onUpdateEvents.forEach((cb, i) => {
      this._onUpdateEvents[i] = null
    })
    this._onUpdateEvents = []
    this._onReadyEvents.forEach((cb, i) => {
      this._onReadyEvents[i] = null
    })
    this._onReadyEvents = []
  }

  // to remove this provider item
  unbind() {
    this.empty()
    GlobalStatusProvider.remove(this.internal_id)
  }

  isReady() {
    this._onReadyEvents = this._onReadyEvents.filter((cb, i) => {
      if (typeof cb === 'function') [cb()]
      this._onReadyEvents[i] = null
      return false
    })

    return true
  }

  addOnReady(cb) {
    this._onReadyEvents.push(cb)
  }

  stack = [] // the "layers" with
  globalStatus = {} // summary of all stacks
  _onUpdateEvents = [] // for the "onUpdate" events
  _onReadyEvents = [] // for startup events
}

// add a fallback, in case we don't run this inside the same React instance
if (typeof window !== 'undefined') {
  window.GlobalStatusProvider = GlobalStatusProvider
}

export default GlobalStatusProvider

const slugify = s =>
  s
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
