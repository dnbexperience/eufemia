import { useCallback } from 'react'
import type { MutableRefObject, Ref, RefCallback } from 'react'

/**
 * Combines multiple React refs into a single callback ref.
 *
 * Useful when a component needs to maintain an internal ref
 * while also forwarding a ref from props.
 */
export default function useCombinedRef<T>(
  ...refs: Array<Ref<T> | undefined>
): RefCallback<T> {
  return useCallback(
    (instance: T | null) => {
      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(instance)
        } else if (ref) {
          ;(ref as MutableRefObject<T | null>).current = instance
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  )
}
