import React from 'react'

export type IsolationDataReference = {
  refresh: () => void
  update: (data: unknown) => void
  cleanup: () => void
  snapshotRef: React.MutableRefObject<unknown>
  eventsRef: React.MutableRefObject<Array<() => void>>
}

export function createDataReference(): IsolationDataReference {
  const snapshotRef = { current: undefined }
  const eventsRef = { current: [] }

  const refresh: IsolationDataReference['refresh'] = () => {
    eventsRef.current.forEach((fn) => fn())
  }

  const update: IsolationDataReference['update'] = (data) => {
    snapshotRef.current = data
  }

  const cleanup: IsolationDataReference['cleanup'] = () => {
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
