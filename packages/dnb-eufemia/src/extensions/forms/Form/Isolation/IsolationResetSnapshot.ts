import React from 'react'

export type IsolationResetSnapshot = {
  refresh: () => void
  update: (data: unknown) => void
  cleanup: () => void
  snapshotRef: React.MutableRefObject<unknown>
  eventsRef: React.MutableRefObject<Array<() => void>>
}

export function createResetSnapshot(): IsolationResetSnapshot {
  const snapshotRef = { current: undefined }
  const eventsRef = { current: [] }

  const refresh: IsolationResetSnapshot['refresh'] = () => {
    eventsRef.current.forEach((fn) => fn())
  }

  const update: IsolationResetSnapshot['update'] = (data) => {
    snapshotRef.current = data
  }

  const cleanup: IsolationResetSnapshot['cleanup'] = () => {
    eventsRef.current = []
  }

  return {
    refresh,
    update,
    cleanup,
    snapshotRef,
    eventsRef,
  }
}
