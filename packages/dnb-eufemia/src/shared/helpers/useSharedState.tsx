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

export type SharedStateId =
  | string
  | (() => void)
  | Promise<() => void>
  | React.Context<any>
  | Record<string, unknown>

/**
 * Custom hook that provides shared state functionality.
 */
export function useSharedState<Data>(
  /** The identifier for the shared state. */
  id: SharedStateId | undefined,
  /** The initial data for the shared state. */
  initialData: Data = undefined,
  /** Optional callback function to be called when the shared state is set from another instance/component. */
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
      return createSharedState(createReferenceKey(id, 'oc'), { onChange })
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

export interface SharedStateReturn<Data = undefined> {
  data: Data
  get: () => Data
  set: (newData: Partial<Data>) => void
  extend: (newData: Partial<Data>) => void
  update: (newData: Partial<Data>) => void
}

interface SharedStateInstance<Data> extends SharedStateReturn<Data> {
  subscribe: (subscriber: Subscriber) => void
  unsubscribe: (subscriber: Subscriber) => void
  hadInitialData: boolean
}

const sharedStates: Map<
  SharedStateId,
  SharedStateInstance<any>
> = new Map()

/**
 * Creates a shared state instance with the specified ID and initial data.
 */
export function createSharedState<Data>(
  /** The identifier for the shared state. */
  id: SharedStateId,
  /** The initial data for the shared state. */
  initialData?: Data
): SharedStateInstance<Data> {
  if (!sharedStates.get(id)) {
    let subscribers: Subscriber[] = []

    const get = () => sharedStates.get(id).data

    const set = (newData: Partial<Data>) => {
      sharedStates.get(id).data = { ...newData }
    }

    const update = (newData: Partial<Data>) => {
      set(newData)
      sync()
    }

    const extend = (newData: Data) => {
      sharedStates.get(id).data = {
        ...sharedStates.get(id).data,
        ...newData,
      }
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

    sharedStates.set(id, {
      data: undefined,
      get,
      set,
      extend,
      update,
      subscribe,
      unsubscribe,
      hadInitialData: Boolean(initialData),
    } as SharedStateInstance<Data>)

    if (initialData) {
      extend(initialData)
    }
  } else if (
    sharedStates.get(id).data === undefined &&
    initialData !== undefined
  ) {
    sharedStates.get(id).data = { ...initialData }
  }

  return sharedStates.get(id)
}

/**
 * Creates a reference key for the shared state.
 * You can pass any JavaScript instance as the reference.
 */
export function createReferenceKey(ref1, ref2) {
  if (!cache.has(ref1)) {
    cache.set(ref1, new Map())
  }

  const innerMap = cache.get(ref1)

  if (!innerMap.has(ref2)) {
    innerMap.set(ref2, {})
  }

  return innerMap.get(ref2)
}
const cache = new Map()
