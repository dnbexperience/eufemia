import type { EffectCallback, DependencyList } from 'react'
import { useEffect, useRef } from 'react'

/**
 * UseEffect that does not run on the initial mount
 */
export default function useUpdateEffect(
  callback: EffectCallback,
  deps?: DependencyList
) {
  const wasMounted = useRef(false)

  useEffect((...args) => {
    if (!wasMounted.current) {
      wasMounted.current = true
      return
    }
    callback(...args)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
