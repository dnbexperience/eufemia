import { useCallback, useEffect, useMemo, useReducer } from 'react'

type SharedStateId = string
type Subscriber = () => void

interface SharedStateInstance<Data> {
  data: Data
  get: () => Data
  set: (newData: Partial<Data>) => void
  update: (newData: Partial<Data>) => void
  subscribe: (subscriber: Subscriber) => void
  unsubscribe: (subscriber: Subscriber) => void
}

const sharedStates: Record<SharedStateId, SharedStateInstance<any>> = {}

export function createSharedState<Data>(
  id: SharedStateId,
  initialData: Data
): SharedStateInstance<Data> {
  if (!sharedStates[id]) {
    let subscribers: Subscriber[] = []

    const get = () => sharedStates[id].data

    const set = (newData: Partial<Data>) => {
      sharedStates[id].data = { ...sharedStates[id].data, ...newData }
    }

    const update = (newData: Partial<Data>) => {
      set(newData)
      subscribers.forEach((subscriber) => subscriber())
    }

    const subscribe = (subscriber: Subscriber) => {
      subscribers.push(subscriber)
    }

    const unsubscribe = (subscriber: Subscriber) => {
      subscribers = subscribers.filter((sub) => sub !== subscriber)
    }

    sharedStates[id] = {
      data: undefined,
      get,
      set,
      update,
      subscribe,
      unsubscribe,
    } as SharedStateInstance<Data>

    if (initialData) {
      set(initialData)
    }
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
  initialData: Data = undefined,
  onSet = null
) {
  const [, forceUpdate] = useReducer(() => ({}), {})

  const sharedState = useMemo(
    () => id && createSharedState<Data>(id, initialData),
    [id, initialData]
  )
  const sharedFunc = useMemo(
    () => id && createSharedState(id + '-onSet', { onSet }),
    [id, onSet]
  )

  const update = useCallback(
    (newData: Data) => {
      if (id) {
        sharedState.update(newData)
      }
    },
    [id, sharedState]
  )

  const set = useCallback(
    (newData: Data) => {
      if (id && !sharedState.get()) {
        sharedState.set(newData)
        sharedFunc.get()?.onSet?.(newData)
      }
    },
    [id, sharedState, sharedFunc]
  )

  useEffect(() => {
    if (!id) {
      return
    }

    sharedState.subscribe(forceUpdate)

    return () => {
      sharedState.unsubscribe(forceUpdate)
    }
  }, [id, sharedState])

  useEffect(() => {
    // Set the onSet function in case it is not set yet
    if (id && onSet && !sharedFunc.get()?.onSet) {
      sharedFunc.set({ onSet })
    }
  }, [id, onSet, sharedFunc])

  return { data: sharedState?.get?.(), update, set }
}
