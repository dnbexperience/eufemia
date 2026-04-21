import { useCallback } from 'react'

/**
 * Combines multiple React refs into a single callback ref.
 *
 * Useful when a component needs to maintain an internal ref
 * while also forwarding a ref from props.
 */
export default function useCombinedRef<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return useCallback(
    (instance: T | null) => {
      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(instance)
        } else if (ref) {
          ;(ref as React.MutableRefObject<T | null>).current = instance
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  )
}
