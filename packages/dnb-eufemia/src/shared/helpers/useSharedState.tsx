import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import useMounted from './useMounted'
import useMountEffect from './useMountEffect'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

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
  const hasMounted = useMounted()
  const waitForMountedRef = useRef(false)

  const forceRerender = useCallback(() => {
    if (hasMounted.current) {
      forceUpdate()
    } else {
      waitForMountedRef.current = true
    }
  }, [hasMounted])

  useMountEffect(() => {
    if (waitForMountedRef.current) {
      forceUpdate()
    }
  })

  const sharedState = useMemo(() => {
    if (id) {
      return createSharedState<Data>(id, initialData)
    }
  }, [id, initialData])
  const sharedAttachment = useMemo(() => {
    if (id) {
      return createSharedState(id + '-oc', { onChange })
    }
  }, [id, onChange])

  const sync = useCallback(
    (newData: Data) => {
      if (id) {
        sharedAttachment.data?.onChange?.(newData)
      }
    },
    [id, sharedAttachment]
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
        sync(newData)
      }
    },
    [id, sharedState, sync]
  )

  const extend = useCallback(
    (newData: Data) => {
      if (id) {
        sharedState.extend(newData)
        sync(newData)
      }
    },
    [id, sharedState, sync]
  )

  useLayoutEffect(() => {
    if (!id) {
      return
    }

    sharedState.subscribe(forceRerender)

    return () => {
      sharedState.unsubscribe(forceRerender)
    }
  }, [forceRerender, id, onChange, sharedState])

  useEffect(() => {
    // Set the onChange function in case it is not set yet
    if (id && onChange && !sharedAttachment.data?.onChange) {
      sharedAttachment.set({ onChange })
    }
  }, [id, onChange, sharedAttachment])

  return {
    get: sharedState?.get,
    data: sharedState?.get?.() as Data,
    hadInitialData: sharedState?.hadInitialData,
    update,
    set,
    extend,
    sync,
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
  initialData?: Data
): SharedStateInstance<Data> {
  if (!sharedStates[id]) {
    let subscribers: Subscriber[] = []

    const get = () => sharedStates[id].data

    const set = (newData: Partial<Data>) => {
      sharedStates[id].data = { ...newData }
    }

    const update = (newData: Partial<Data>) => {
      set(newData)
      sync()
    }

    const extend = (newData: Data) => {
      sharedStates[id].data = { ...sharedStates[id].data, ...newData }
      sync()
    }

    const subscribe = (subscriber: Subscriber) => {
      if (!subscribers.includes(subscriber)) {
        subscribers.push(subscriber)
      }
    }

    const unsubscribe = (subscriber: Subscriber) => {
      subscribers = subscribers.filter((sub) => sub !== subscriber)
    }

    const sync = () => {
      subscribers.forEach((subscriber) => subscriber())
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
