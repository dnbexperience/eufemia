import type React from 'react'

export type IsolationDataReference = {
  refresh: (options?: { deferred?: boolean }) => void
  update: (data: unknown) => void
  cleanup: (fn?: () => void) => void
  snapshotRef: React.MutableRefObject<unknown>
  eventsRef: React.MutableRefObject<Array<() => void>>
}

export function createDataReference(): IsolationDataReference {
  const snapshotRef = { current: undefined }
  const eventsRef = { current: [] }

  const refresh: IsolationDataReference['refresh'] = ({
    deferred = false,
  } = {}) => {
    const update = () => eventsRef.current.forEach((fn) => fn())
    if (deferred && typeof window !== 'undefined') {
      requestAnimationFrame(update)
    } else {
      update()
    }
  }

  const update: IsolationDataReference['update'] = (data) => {
    snapshotRef.current = data
  }

  const cleanup: IsolationDataReference['cleanup'] = (fn = null) => {
    if (fn) {
      const index = eventsRef.current.indexOf(fn)
      if (index !== -1) {
        eventsRef.current.splice(index, 1)
      }
    } else {
      eventsRef.current = []
    }
  }

  return {
    refresh,
    update,
    cleanup,
    snapshotRef,
    eventsRef,
  }
}
