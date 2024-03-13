import { isAsync } from './isAsync'

type ReturnHelpers = {
  cancel: () => void
  addCancelEvent: (fn: () => void) => () => boolean
}
type DebouncedFunction<T extends any[], R> = (...args: T) => R
type DebouncedOptions = {
  /**
   * Whether to execute the debounced function immediately.
   */
  immediate?: boolean

  /**
   * The instance to bind the debounced function to.
   */
  instance?: any

  /**
   * Whether to return a promise that resolves with the result of the debounced function.
   */
  async?: boolean
}

/**
 * Debounces a function in async to be executed after a specified wait time.
 */
export function debounceAsync<T extends any[], R>(
  debouncedFunction: DebouncedFunction<T, R>,
  wait = 500,
  opts: Omit<DebouncedOptions, 'async'> = null
): DebouncedFunction<T, R> & ReturnHelpers {
  return debounce<T, R>(debouncedFunction, wait, { ...opts, async: true })
}

/**
 * Debounces a function to be executed after a specified wait time.
 */
export function debounce<T extends any[], R>(
  debouncedFunction: DebouncedFunction<T, R>,
  wait = 500,
  {
    immediate = false,
    instance = null,
    async = false,
  }: DebouncedOptions = {}
): DebouncedFunction<T, R> & ReturnHelpers {
  let timeout
  let recall
  let resolvePromise
  let rejectPromise
  let canceled = false
  const customCancels = []

  const cancel = () => {
    canceled = true

    clearTimeout(timeout)
    resolvePromise?.()

    customCancels.forEach((fn) => {
      fn()
    })
  }

  const addCancelEvent = (fn) => {
    if (!customCancels.includes(fn)) {
      customCancels.push(fn)
    }

    return () => {
      return canceled
    }
  }

  function executedFunction(...args: T) {
    if (typeof recall === 'function') {
      recall()
    }

    canceled = false

    const inst = instance || this || {}
    inst.cancel = cancel
    inst.addCancelEvent = addCancelEvent

    const later = (callNow) => {
      timeout = null
      if (callNow || !immediate) {
        try {
          recall = debouncedFunction.apply(inst, args)
          resolvePromise?.(recall)
        } catch (error) {
          rejectPromise?.(error)
        }
      }
    }

    const callNow = immediate && !timeout

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) {
      later(true)
    }

    if (async) {
      return new Promise((resolve, reject) => {
        resolvePromise = resolve
        rejectPromise = reject
      })
    }

    return recall
  }

  // Sync
  function syncFunction(...args: T) {
    return executedFunction(...args)
  }
  syncFunction.cancel = cancel
  syncFunction.addCancelEvent = addCancelEvent

  // Async return
  async function asyncFunction(...args: T) {
    return executedFunction(...args)
  }
  asyncFunction.cancel = cancel
  asyncFunction.addCancelEvent = addCancelEvent

  if (isAsync(debouncedFunction)) {
    return asyncFunction as DebouncedFunction<T, R> & ReturnHelpers
  }

  return syncFunction
}
