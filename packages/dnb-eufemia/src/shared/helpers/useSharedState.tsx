import { useCallback, useEffect, useMemo, useState } from 'react'

type SharedStateId = string
type Subscriber = () => void

interface SharedStateInstance<Data> {
  data: Data
  getSharedState: () => Data
  updateSharedState: (newData: Partial<Data>) => void
  subscribeToSharedState: (subscriber: Subscriber) => void
  unsubscribeFromSharedState: (subscriber: Subscriber) => void
}

const sharedStates: Record<SharedStateId, SharedStateInstance<any>> = {}

export function getOrCreateSharedState<Data>(
  id: SharedStateId,
  initialData: Data
): SharedStateInstance<Data> {
  if (!sharedStates[id]) {
    let subscribers: Subscriber[] = []

    const getSharedState = () => sharedStates[id].data

    const updateSharedState = (newData: Partial<Data>) => {
      sharedStates[id].data = { ...sharedStates[id].data, ...newData }
      subscribers.forEach((subscriber) => subscriber())
    }

    const subscribeToSharedState = (subscriber: Subscriber) => {
      subscribers.push(subscriber)
    }

    const unsubscribeFromSharedState = (subscriber: Subscriber) => {
      subscribers = subscribers.filter((sub) => sub !== subscriber)
    }

    sharedStates[id] = {
      data: initialData ? { ...initialData } : undefined,
      getSharedState,
      updateSharedState,
      subscribeToSharedState,
      unsubscribeFromSharedState,
    } as SharedStateInstance<Data>
  } else if (
    sharedStates[id].data === undefined &&
    initialData !== undefined
  ) {
    sharedStates[id].data = { ...initialData }
  }

  return sharedStates[id]
}

export function useSharedState<Data>(
  id: SharedStateId,
  initialData: Data
) {
  const sharedState = useMemo(
    () => id && getOrCreateSharedState<Data>(id, initialData),
    [id, initialData]
  )
  const [data, setData] = useState(sharedState?.getSharedState?.())

  const update = useCallback(
    (newData: Data) => {
      if (!id) {
        return
      }

      sharedState?.updateSharedState?.(newData)
    },
    [id, sharedState]
  )

  useEffect(() => {
    if (!id) {
      return
    }

    const updateState = () => {
      const existingData = sharedState.getSharedState()
      setData(existingData)
    }

    sharedState.subscribeToSharedState(updateState)

    return () => {
      sharedState.unsubscribeFromSharedState(updateState)
    }
  }, [id, sharedState])

  return { data, update }
}
