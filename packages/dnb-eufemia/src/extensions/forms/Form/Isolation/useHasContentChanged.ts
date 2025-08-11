import { useContext, useMemo } from 'react'
import pointer from '../../utils/json-pointer'
import DataContext from '../../DataContext/Context'
import useDataContextSnapshot from './useDataContextSnapshot'
import { isObject } from '../../../../shared/component-helper'

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
      const prev = exists ? pointer.get(snapshot, path) : undefined

      if (!exists || hasValueChanged(value, prev)) {
        hasChanged = true
        return false // stop walking
      }
    })

    return hasChanged
  }, [data, snapshot])

  return { hasContentChanged }
}

function hasValueChanged(a, b) {
  if (a === b) {
    return false
  }

  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) {
      return true
    }

    // Check fo deep-equality of the values
    return keysA.some((k) => hasValueChanged(a[k], b[k]))
  }

  return true
}
