import { useContext, useMemo } from 'react'
import pointer from '../../utils/json-pointer'
import DataContext from '../../DataContext/Context'
import useDataContextSnapshot from './useDataContextSnapshot'

export default function useHasContentChanged() {
  const { internalDataRef } = useContext(DataContext)
  const { snapshotRef } = useDataContextSnapshot({ enabled: true })

  const data = internalDataRef?.current
  const snapshot = snapshotRef?.current // To support a custom data reference, we need to have a snapshot in the hook deps.
  const hasContentChanged = useMemo(() => {
    if (!data || !snapshot) {
      return undefined
    }

    let hasChanged = false

    pointer.walk(data, (value, path) => {
      if (
        pointer.has(snapshot, path) &&
        pointer.get(snapshot, path) !== value
      ) {
        hasChanged = true
        return false
      }
    })

    return hasChanged
  }, [data, snapshot])

  return { hasContentChanged }
}
