/**
 * Debounces a function to be executed after a specified wait time.
 *
 * @param {Function} debouncedFunction - The function to be debounced.
 * @param {number} [wait=250] - The wait time in milliseconds before executing the debounced function.
 * @param {Object} [options] - Additional options for the debounced function.
 * @param {boolean} [options.immediate=false] - Whether to execute the debounced function immediately.
 * @param {Object} [options.instance=null] - The instance to bind the debounced function to.
 * @param {boolean} [options.async=false] - Whether to return a promise that resolves with the result of the debounced function.
 * @returns {Function|Promise} - The debounced function or a promise that resolves with the result of the debounced function.
 * @memberof helpers
 */
export function debounce(
  debouncedFunction,
  wait = 250,
  { immediate = false, instance = null, async = false } = {}
) {
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

  function executedFunction(...args) {
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

  executedFunction.cancel = cancel
  executedFunction.addCancelEvent = addCancelEvent

  return executedFunction
}

/**
 * Debounces a function in async to be executed after a specified wait time.
 *
 * @param {Function} debouncedFunction - The function to be debounced.
 * @param {number} [wait=250] - The wait time in milliseconds before executing the debounced function.
 * @param {Object} [options] - Additional options for the debounced function.
 * @param {boolean} [options.immediate=false] - Whether to execute the debounced function immediately.
 * @param {Object} [options.instance=null] - The instance to bind the debounced function to.
 * @returns {Promise} - The debounced promise that resolves with the result of the debounced function.
 * @memberof helpers
 */
export function debounceAsync(debouncedFunction, wait = 250, opts = null) {
  return debounce(debouncedFunction, wait, { ...opts, async: true })
}
