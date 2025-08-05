import { useContext, useMemo } from 'react'
import pointer from '../../utils/json-pointer'
import DataContext from '../../DataContext/Context'
import useDataContextSnapshot from './useDataContextSnapshot'

export default function useHasContentChanged({
  enabled = false,
}: {
  enabled?: boolean
} = {}) {
  const { internalDataRef } = useContext(DataContext)
  const { snapshotRef } = useDataContextSnapshot({ enabled })

  const data = internalDataRef?.current
  const snapshot = snapshotRef?.current // To support a custom data reference, we need to have a snapshot in the hook deps.

  const hasContentChanged = useMemo(() => {
    if (!data || !snapshot) {
      return undefined
    }

    let hasChanged = false

    pointer.walk(data, (value, path) => {
      const exists = pointer.has(snapshot, path)
      if (
        !exists ||
        (exists && isValuesDifferent(value, pointer.get(snapshot, path)))
      ) {
        hasChanged = true
        return false
      }
    })

    return hasChanged
  }, [data, snapshot])

  return { hasContentChanged }
}

function isValuesDifferent(value1, value2) {
  if (
    typeof value1 === 'object' &&
    value1 !== null &&
    typeof value2 === 'object' &&
    value2 !== null
  ) {
    return JSON.stringify(value1) !== JSON.stringify(value2)
  }
  return value1 !== value2
}
