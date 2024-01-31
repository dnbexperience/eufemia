import { useCallback, useEffect, useMemo, useReducer } from 'react'

export type SharedStateId = string

/**
 * Custom hook that provides shared state functionality.
 *
 * @template Data - The type of data stored in the shared state.
 * @param {SharedStateId} id - The identifier for the shared state.
 * @param {Data} initialData - The initial data for the shared state.
 * @param {Function} onChange - Optional callback function to be called when the shared state is set from another instance/component.
 * @returns {Object} - An object containing the shared state data, update function, extend function, and set function.
 */
export function useSharedState<Data>(
  id: SharedStateId,
  initialData: Data = undefined,
  onChange = null
) {
  const [, forceUpdate] = useReducer(() => ({}), {})

  const sharedState = useMemo(
    () => id && createSharedState<Data>(id, initialData),
    [id, initialData]
  )
  const sharedFunc = useMemo(
    () => id && createSharedState(id + '-onChange', { onChange }),
    [id, onChange]
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
      if (id) {
        sharedState.set(newData)
        sharedFunc.get()?.onChange?.(newData)
      }
    },
    [id, sharedState, sharedFunc]
  )

  const extend = useCallback(
    (newData: Data) => {
      if (id) {
        sharedState.extend(newData)
        sharedFunc.get()?.onChange?.(newData)
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
    // Set the onChange function in case it is not set yet
    if (id && onChange && !sharedFunc.get()?.onChange) {
      sharedFunc.set({ onChange })
    }
  }, [id, onChange, sharedFunc])

  return {
    data: sharedState?.get?.(),
    hadInitialData: sharedState?.hadInitialData,
    update,
    set,
    extend,
  }
}

type Subscriber = () => void

interface SharedStateInstance<Data> {
  data: Data
  get: () => Data
  set: (newData: Partial<Data>) => void
  extend: (newData: Partial<Data>) => void
  update: (newData: Partial<Data>) => void
  subscribe: (subscriber: Subscriber) => void
  unsubscribe: (subscriber: Subscriber) => void
  hadInitialData: boolean
}

const sharedStates: Record<SharedStateId, SharedStateInstance<any>> = {}

/**
 * Creates a shared state instance with the specified ID and initial data.
 * @template Data The type of data stored in the shared state.
 * @param id The ID of the shared state.
 * @param initialData The initial data for the shared state.
 * @returns The created shared state instance.
 */
export function createSharedState<Data>(
  id: SharedStateId,
  initialData: Data
): SharedStateInstance<Data> {
  if (!sharedStates[id]) {
    let subscribers: Subscriber[] = []

    const get = () => sharedStates[id].data

    const extend = (newData: Data) => {
      sharedStates[id].data = { ...sharedStates[id].data, ...newData }
    }

    const set = (newData: Partial<Data>) => {
      sharedStates[id].data = { ...newData }
      subscribers.forEach((subscriber) => subscriber())
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
      extend,
      update,
      subscribe,
      unsubscribe,
      hadInitialData: Boolean(initialData),
    } as SharedStateInstance<Data>

    if (initialData) {
      extend(initialData)
    }
  } else if (
    sharedStates[id].data === undefined &&
    initialData !== undefined
  ) {
    sharedStates[id].data = { ...initialData }
  }

  return sharedStates[id]
}
