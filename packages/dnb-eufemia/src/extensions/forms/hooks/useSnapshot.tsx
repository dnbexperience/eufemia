import { useCallback, useRef, useState } from 'react'
import { makeUniqueId } from '../../../shared/component-helper'
import pointer from '../utils/json-pointer'
import { SharedStateId } from '../../../shared/helpers/useSharedState'
import useDataContext from './useDataContext'
import { SnapshotId, SnapshotName } from '../Form/Snapshot'
import useData from '../Form/data-context/useData'

export default function useSnapshot(id?: SharedStateId) {
  const [map] = useState(() => new Map())
  const internalSnapshotsRef = useRef<Map<SnapshotId, unknown>>(map)

  const { getContext } = useDataContext(id)
  const { set: setData, update: updateData } = useData(id)

  const createSnapshot = useCallback(
    (
      id: SnapshotId = makeUniqueId(),
      name: SnapshotName = null,
      content: unknown = null
    ): SnapshotId => {
      const { internalDataRef, snapshotsRef } = getContext()

      if (!content) {
        const snapshotWithPaths = snapshotsRef?.current?.get?.(name)
        if (snapshotWithPaths) {
          const collectedData = new Map()
          snapshotWithPaths.forEach((isMounted, path) => {
            if (isMounted && pointer.has(internalDataRef.current, path)) {
              collectedData.set(
                path,
                pointer.get(internalDataRef.current, path)
              )
            }
          })
          content = collectedData
        } else {
          content = internalDataRef.current
        }
      }

      internalSnapshotsRef.current.set(
        combineIdWithName(id, name),
        content
      )

      return id
    },
    [getContext]
  )

  const getSnapshot = useCallback(
    (id: SnapshotId, name: SnapshotName = null): unknown => {
      return internalSnapshotsRef.current.get(combineIdWithName(id, name))
    },
    []
  )

  const deleteSnapshot = useCallback(
    (id: SnapshotId, name: SnapshotName = null): void => {
      internalSnapshotsRef.current.delete(combineIdWithName(id, name))
    },
    []
  )

  const applySnapshot = useCallback(
    (id: SnapshotId, name: SnapshotName = null) => {
      const snapshot = getSnapshot(id, name)

      if (snapshot instanceof Map) {
        snapshot.forEach((value, path) => {
          updateData(path, value)
        })
      } else if (snapshot) {
        setData(snapshot)
      }
    },
    [getSnapshot, setData, updateData]
  )

  const revertSnapshot = useCallback(
    (id: SnapshotId, name: SnapshotName = null) => {
      applySnapshot(id, name)
      deleteSnapshot(id, name)
    },
    [applySnapshot, deleteSnapshot]
  )

  return {
    createSnapshot,
    revertSnapshot,
    applySnapshot,
    internalSnapshotsRef,
  }
}

function combineIdWithName(id: SnapshotId, name: SnapshotName = null) {
  return name ? `${id}-${name}` : id
}
