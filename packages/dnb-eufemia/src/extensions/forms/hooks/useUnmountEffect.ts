import { useEffect } from 'react'

/**
 * UseEffect that only run on the initial mount
 */
export default function useUnmountEffect(callback: () => void) {
  useEffect(() => {
    return callback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
