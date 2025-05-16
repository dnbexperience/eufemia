import { useCallback, useContext, useEffect } from 'react'
import DataContext from '../../DataContext/Context'
import IsolationContext from './IsolationContext'

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
  const { dataReference } = useContext(IsolationContext) || {}
  const { snapshotRef, eventsRef, update, refresh, cleanup } =
    dataReference || {}

  useEffect(() => {
    if (enabled && eventsRef) {
      eventsRef.current.push(() => {
        update(structuredClone(internalDataRef?.current))
      })
      refresh()
    }

    return () => cleanup()
  }, [cleanup, enabled, eventsRef, internalDataRef, refresh, update])

  const handleReset = useCallback(() => {
    window.requestAnimationFrame(() => {
      if (snapshotRef) {
        setData(snapshotRef.current)
      }
    }) // To actually reset the data, we need to wait for the next frame
  }, [setData, snapshotRef])

  return { handleReset }
}
