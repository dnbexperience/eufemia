import { useCallback, useRef } from 'react'
import { makeUniqueId } from '../../../shared/component-helper'
import { SharedStateId } from '../../../shared/helpers/useSharedState'
import useData from '../Form/data-context/useData'

export default function useSnapshot(id?: SharedStateId) {
  const snapshotsRef = useRef<Map<string, any>>(new Map())

  const { data, set } = useData(id)

  const createSnapshot = useCallback(
    (id: string = makeUniqueId(), content: any = data): string => {
      snapshotsRef.current.set(id, content)
      return id
    },
    [data]
  )

  const getSnapshot = useCallback((id: string): any => {
    return snapshotsRef.current.get(id)
  }, [])

  const deleteSnapshot = useCallback((id: string): void => {
    snapshotsRef.current.delete(id)
  }, [])

  const revertSnapshot = useCallback(
    (id: string) => {
      const snapshot = getSnapshot(id)
      if (snapshot) {
        set(snapshot)
      }

      deleteSnapshot(id)
    },
    [deleteSnapshot, getSnapshot, set]
  )

  return {
    createSnapshot,
    revertSnapshot,
  }
}
