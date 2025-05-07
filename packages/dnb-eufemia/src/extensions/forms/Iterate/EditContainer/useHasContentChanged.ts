import { useContext, useEffect, useMemo, useRef } from 'react'
import DataContext from '../../DataContext/Context'
import pointer from '../../utils/json-pointer'

/**
 * Deprecated, as it is supported by all major browsers and Node.js >=v18
 * So its a question of time, when we will remove this polyfill
 */
import structuredClone from '@ungap/structured-clone'

export default function useHasContentChanged() {
  const { internalDataRef } = useContext(DataContext)
  const snapshotRef = useRef<unknown>()

  useEffect(() => {
    snapshotRef.current = structuredClone(internalDataRef?.current)

    // We only want to set the initial value once for now.
    // When e.g. the data from outside is controlled, we do not support it yet.
  }, [internalDataRef])

  const data = internalDataRef?.current
  const hasContentChanged = useMemo(() => {
    if (data === undefined) {
      return undefined
    }

    let hasChanged = false

    pointer.walk(data, (value, path) => {
      if (
        pointer.has(snapshotRef.current, path) &&
        pointer.get(snapshotRef.current, path) !== value
      ) {
        hasChanged = true
        return false
      }
    })

    return hasChanged
  }, [data])

  return { hasContentChanged }
}
