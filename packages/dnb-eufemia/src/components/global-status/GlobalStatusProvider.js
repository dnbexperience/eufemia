/**
 * Web GlobalStatus Provider
 *
 */

import {
  makeUniqueId,
  warn,
  convertJsxToString,
  slugify,
} from '../../shared/component-helper'

export class GlobalStatusProviderItem {
  constructor(id, props = null) {
    this.internal_id = id
    if (props) {
      this.add(props)
    }
  }

  onUpdate(event) {
    // check for duplication first
    if (this._onUpdateEvents.filter((cb) => cb === event).length === 0) {
      this._onUpdateEvents.push(event)
    }
  }

  // force re-render of the given GlobalStatus component
  forceRerender(
    globalStatus,
    props,
    { buffer_delay = 0, isEmpty = false } = {}
  ) {
    const run = () => {
      this._onUpdateEvents.forEach((event) => {
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
    this.remove('internal-close', { preventRerender: true })

    // make copy
    const newProps = { ...props }

    // make sure we have a status id
    if (!newProps.status_id) {
      newProps.status_id = makeUniqueId()
    }

    // also, set show to true
    if (typeof newProps.show === 'undefined') {
      newProps.show = true
    }

    // make it possible to send in children as the text
    if (newProps.children) {
      newProps.text = newProps.children
      delete newProps.children
    }

    // replace the props if exists
    const stackIndex = this.stack.findIndex(
      (cur) => cur.status_id === newProps.status_id
    )
    if (stackIndex > -1) {
      this.stack[stackIndex] = newProps
    } else {
      // add the new props
      this.stack.push(newProps)
    }

    const globalStatus = GlobalStatusProvider.combineMessages(this.stack)

    if (!opts?.preventRerender) {
      this.forceRerender(globalStatus, props, {
        buffer_delay: props?.buffer_delay > -1 ? props.buffer_delay : 0,
      })
    }

    return globalStatus
  }

  get(status_id) {
    return this.stack.find((cur) => cur.status_id === status_id)
  }

  update(status_id, newProps, opts = {}) {
    const item = this.get(status_id)
    if (!item) {
      this.add(newProps, { preventRerender: true })
    } else {
      this.stack = this.stack.map((cur, i, arr) => {
        if (
          status_id ? cur.status_id === status_id : i === arr.length - 1
        ) {
          // if (!status_id) {
          //   // newProps = { ...newProps }
          //   delete newProps.status_id
          // }
          return { ...cur, ...newProps }
        }

        return cur
      })
    }

    this.restack(status_id)

    const globalStatus = GlobalStatusProvider.combineMessages(this.stack)

    if (!opts?.preventRerender) {
      this.forceRerender(globalStatus, null, {
        buffer_delay:
          newProps?.buffer_delay > -1 ? newProps.buffer_delay : 1,
      })
    }
  }

  restack(status_id) {
    const item = this.get(status_id)

    // re-stack,so the new one is the latest
    if (item) {
      this.stack = this.stack.filter((cur) => {
        return cur.status_id !== status_id
      })
      this.stack.push(item)
    }
  }

  remove(status_id, opts = {}) {
    if (status_id) {
      this.stack = this.stack.filter((cur) => {
        return cur.status_id !== status_id
      })
      const globalStatus = GlobalStatusProvider.combineMessages(this.stack)

      if (!opts?.preventRerender) {
        this.forceRerender(globalStatus, null, {
          buffer_delay: opts?.buffer_delay > -1 ? opts.buffer_delay : 1,
        })
      }
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
    this._onReadyEvents = this._onReadyEvents.filter(
      ({ status, cb }, i) => {
        if (typeof cb === 'function') {
          cb(status)
        }
        this._onReadyEvents[i] = null
        return false
      }
    )

    return true
  }

  addOnReady(status, cb) {
    this._onReadyEvents.push({ status, cb })
  }

  stack = [] // the "layers" with
  globalStatus = {} // summary of all stacks
  _onUpdateEvents = [] // for the "onUpdate" events
  _onReadyEvents = [] // for startup events
}

// The meaning with this is that we can force a rerender without sharing the same context
class GlobalStatusProvider {
  static providers = {}

  static create = (id = 'main', props = null) => {
    return (GlobalStatusProvider.providers[id] =
      new GlobalStatusProviderItem(id, props))
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
      // send along the new status
      newStatus.addOnReady(newStatus, onReady)
    }

    if (id !== 'main') {
      warn(`No <GlobalStatus ${`id="${id}"`} /> found.`)
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

    if (!item.item_id) {
      if (status_id && status_id !== 'status-main') {
        item.item_id = status_id
      } else {
        if (item?.text) {
          item.item_id = slugify(convertJsxToString(item.text))
        } else {
          item.item_id = slugify(item)
        }
      }
    }

    return item
  }

  static combineMessages(stack) {
    const globalStatus = stack.reduce((acc, cur) => {
      // make a copy, because items are read-only
      cur = { ...cur }

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
        cur.items = cur.items.reduce((_acc, item) => {
          // only a fallback and to make sure we have
          item = GlobalStatusProvider.prepareItemWithStatusId(item)

          const foundAtIndex = _acc.findIndex(
            ({ item_id }) => item_id === item.item_id
          )
          if (foundAtIndex > -1) {
            _acc[foundAtIndex] = item
          } else {
            _acc.push(item)
          }

          return _acc
        }, acc.items || []) // here we use the items from the prev stack
      }

      // merge the prev stack with the current
      Object.assign(acc, cur)

      return acc
    }, {})

    return globalStatus
  }
}

// add a fallback, in case we don't run this inside the same React instance
if (typeof window !== 'undefined') {
  window.GlobalStatusProvider = GlobalStatusProvider
}

export default GlobalStatusProvider
