/**
 * Web GlobalStatus Provider
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import type { ReactNode } from 'react'
import {
  makeUniqueId,
  warn,
  convertJsxToString,
  slugify,
} from '../../shared/component-helper'

type StatusProps = {
  statusId?: string
  show?: boolean | string
  text?: ReactNode
  children?: ReactNode
  items?: (StatusItem | string)[] | string
  item?: StatusItem | string
  bufferDelay?: number
  [key: string]: any
}

type StatusItem = {
  itemId?: string
  text?: any
  [key: string]: any
}

type GlobalStatusResult = {
  statusId?: string
  items?: StatusItem[]
  [key: string]: any
}

type OnUpdateCallback = (
  globalStatus: GlobalStatusResult,
  props: StatusProps | null,
  opts: { isEmpty?: boolean }
) => void

type OnReadyEntry = {
  status: GlobalStatusProviderItem
  cb: ((status: GlobalStatusProviderItem) => void) | null
}

export class GlobalStatusProviderItem {
  internalId: string

  constructor(id: string, props: StatusProps | null = null) {
    this.internalId = id
    if (props) {
      this.add(props)
    }
  }

  onUpdate(event: OnUpdateCallback) {
    // check for duplication first
    if (this._onUpdateEvents.filter((cb) => cb === event).length === 0) {
      this._onUpdateEvents.push(event)
    }
  }

  // force re-render of the given GlobalStatus component
  forceRerender(
    globalStatus: GlobalStatusResult,
    props: StatusProps | null,
    { bufferDelay = 0, isEmpty = false } = {}
  ) {
    const run = () => {
      this._onUpdateEvents.forEach((event) => {
        if (typeof event === 'function') {
          event(globalStatus, props, { isEmpty })
        }
      })
    }

    if (bufferDelay > 0) {
      clearTimeout(this._bufferDelayId)
      this._bufferDelayId = setTimeout(run, bufferDelay) // delay the sum & rerender, in case we change the state in the same frame
    } else {
      run()
    }
  }

  init(props: StatusProps) {
    return this.add(props, { preventRerender: true })
  }

  add(props: StatusProps, opts: { preventRerender?: boolean } = {}) {
    this.remove('internal-close', { preventRerender: true })

    // make copy
    const newProps = { ...props }

    // make sure we have a status id
    if (!newProps.statusId) {
      newProps.statusId = makeUniqueId()
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
      (cur) => cur.statusId === newProps.statusId
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
        bufferDelay: props?.bufferDelay > -1 ? props.bufferDelay : 0,
      })
    }

    return globalStatus
  }

  get(statusId: string) {
    return this.stack.find((cur) => cur.statusId === statusId)
  }

  update(
    statusId: string,
    newProps: StatusProps,
    opts: { preventRerender?: boolean; preventRestack?: boolean } = {}
  ) {
    const item = this.get(statusId)
    if (!item) {
      this.add(newProps, { preventRerender: true })
    } else {
      this.stack = this.stack.map((cur, i, arr) => {
        if (statusId ? cur.statusId === statusId : i === arr.length - 1) {
          // if (!statusId) {
          //   // newProps = { ...newProps }
          //   delete newProps.statusId
          // }
          return { ...cur, ...newProps }
        }

        return cur
      })
    }

    this.restack(statusId)

    const globalStatus = GlobalStatusProvider.combineMessages(this.stack)

    if (!opts?.preventRerender) {
      this.forceRerender(globalStatus, null, {
        bufferDelay: newProps?.bufferDelay > -1 ? newProps.bufferDelay : 1,
      })
    }
  }

  restack(statusId: string) {
    const item = this.get(statusId)

    // re-stack,so the new one is the latest
    if (item) {
      this.stack = this.stack.filter((cur) => {
        return cur.statusId !== statusId
      })
      this.stack.push(item)
    }
  }

  remove(
    statusId: string,
    opts: Record<string, unknown> & {
      preventRerender?: boolean
      bufferDelay?: number
    } = {}
  ) {
    if (statusId) {
      this.stack = this.stack.filter((cur) => {
        return cur.statusId !== statusId
      })
      const globalStatus = GlobalStatusProvider.combineMessages(this.stack)

      if (!opts?.preventRerender) {
        this.forceRerender(globalStatus, null, {
          bufferDelay: opts?.bufferDelay > -1 ? opts.bufferDelay : 1,
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
    GlobalStatusProvider.remove(this.internalId)
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

  addOnReady(
    status: GlobalStatusProviderItem,
    cb: (status: GlobalStatusProviderItem) => void
  ) {
    this._onReadyEvents.push({ status, cb })
  }

  stack: StatusProps[] = []
  globalStatus: GlobalStatusResult = {}
  _onUpdateEvents: (OnUpdateCallback | null)[] = []
  _onReadyEvents: OnReadyEntry[] = []
  _bufferDelayId: ReturnType<typeof setTimeout> | undefined = undefined
}

// The meaning with this is that we can force a rerender without sharing the same context
class GlobalStatusProvider {
  static providers: Record<string, GlobalStatusProviderItem> = {}
  static _supportsSpacingProps = true

  static create = (id = 'main', props: StatusProps | null = null) => {
    return (GlobalStatusProvider.providers[id] =
      new GlobalStatusProviderItem(id, props))
  }

  static init(
    id = 'main',
    onReady: ((status: GlobalStatusProviderItem) => void) | null = null,
    props: StatusProps | null = null
  ) {
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

  static get(id = 'main'): GlobalStatusProviderItem | null {
    return GlobalStatusProvider.providers[id] || null
  }

  static remove(id = 'main') {
    if (GlobalStatusProvider.providers[id]) {
      delete GlobalStatusProvider.providers[id]
    }
  }

  static prepareItemWithStatusId(
    item: StatusItem | string,
    statusId: string | null = null
  ): StatusItem {
    if (typeof item === 'string') {
      item = { text: item }
    }

    if (!item.itemId) {
      if (statusId && statusId !== 'status-main') {
        item.itemId = statusId
      } else {
        if (item?.text) {
          item.itemId = slugify(convertJsxToString(item.text))
        } else {
          item.itemId = slugify(item)
        }
      }
    }

    return item
  }

  static combineMessages(stack: StatusProps[]): GlobalStatusResult {
    const globalStatus = stack.reduce<GlobalStatusResult>((acc, cur) => {
      // make a copy, because items are read-only
      cur = { ...cur }

      if (typeof cur.items === 'string' && cur.items[0] === '[') {
        cur.items = JSON.parse(cur.items) as StatusItem[]
      }

      // if there is only one item, put it into the array
      if (cur.item) {
        if (typeof cur.item === 'string' && cur.item[0] === '{') {
          cur.item = JSON.parse(cur.item) as StatusItem
        }
        // make sure we have an array of items
        const items: (StatusItem | string)[] = Array.isArray(cur.items)
          ? cur.items
          : []
        items.push(cur.item as StatusItem)
        cur.items = items
      }

      // merge items from prev stack into the current
      if (Array.isArray(cur.items)) {
        cur.items = cur.items.reduce((_acc, item) => {
          // only a fallback and to make sure we have
          item = GlobalStatusProvider.prepareItemWithStatusId(item)

          const foundAtIndex = _acc.findIndex(
            ({ itemId }) => itemId === item.itemId
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
  ;(
    window as Window & {
      GlobalStatusProvider?: typeof GlobalStatusProvider
    }
  ).GlobalStatusProvider = GlobalStatusProvider
}

export default GlobalStatusProvider
