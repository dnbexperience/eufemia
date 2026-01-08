import React, { useCallback, useContext, useEffect, useRef } from 'react'
import type { SnapshotContextState, SnapshotMap } from './SnapshotContext'
import SnapshotContext from './SnapshotContext'
import DataContext from '../../DataContext/Context'
import type { SharedStateId } from '../../../../shared/helpers/useSharedState'

export type SnapshotId = SharedStateId | number
export type SnapshotName = string

export type SnapshotProps = {
  name: SnapshotName
  children: React.ReactNode
}

function SnapshotProvider(props: SnapshotProps) {
  const { name, children } = props

  const { snapshotsRef } = useContext(DataContext) || {}
  const mountedFieldsRef: SnapshotMap = useRef()
  if (!mountedFieldsRef.current) {
    mountedFieldsRef.current = new Map()
  }

  const setMountedField: SnapshotContextState['setMountedField'] =
    useCallback((path, state) => {
      mountedFieldsRef.current.set(path, state)
    }, [])

  useEffect(() => {
    if (snapshotsRef) {
      snapshotsRef.current.set(name, mountedFieldsRef.current)
    }
  }, [snapshotsRef, name])

  const contextValue = { name, setMountedField }

  return (
    <SnapshotContext.Provider value={contextValue}>
      {children}
    </SnapshotContext.Provider>
  )
}

SnapshotProvider._supportsSpacingProps = undefined

export default SnapshotProvider
