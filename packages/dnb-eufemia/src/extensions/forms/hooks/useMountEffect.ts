import { useEffect, EffectCallback } from 'react'

/**
 * UseEffect that only run on the initial mount
 */
export default function useMountEffect(callback: EffectCallback) {
  useEffect((...args) => {
    return callback(...args)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
