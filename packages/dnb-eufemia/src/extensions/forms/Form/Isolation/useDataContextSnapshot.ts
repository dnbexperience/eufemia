import { useCallback, useContext, useEffect, useRef } from 'react'
import DataContext from '../../DataContext/Context'

/**
 * Deprecated, as it is supported by all major browsers and Node.js >=v18
 * So its a question of time, when we will remove this polyfill
 */
import structuredClone from '@ungap/structured-clone'

export default function useDataContextSnapshot({
  enabled,
}: {
  enabled?: boolean
} = {}) {
  const { internalDataRef, setData } = useContext(DataContext)
  const snapshotRef = useRef<unknown>()

  useEffect(() => {
    if (enabled) {
      snapshotRef.current = structuredClone(internalDataRef?.current)
    }

    // We only want to set the initial value once for now.
    // When e.g. the data from outside is controlled, we do not support it yet.
  }, [enabled, internalDataRef])

  const handleReset = useCallback(() => {
    window.requestAnimationFrame(() => {
      setData(snapshotRef.current)
    })
  }, [setData])

  return { handleReset }
}
