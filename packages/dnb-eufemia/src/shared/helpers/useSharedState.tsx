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
 * The shared state will be deleted when all components have been unmounted.
 */
export function useWeakSharedState<
  Data,
> /** The identifier for the shared state. */(
  id: SharedStateId | undefined,
  /** The initial data for the shared state. */
  initialData: Data = undefined,
  /** Optional callback function to be called when the shared state is set from another instance/component. */
  onChange = null
) {
  return useSharedState<Data>(id, initialData, onChange, { weak: true })
}

/**
 * Custom hook that provides shared state functionality.
 */
export function useSharedState<Data>(
  /** The identifier for the shared state. */
  id: SharedStateId | undefined,
  /** The initial data for the shared state. */
  initialData: Data = undefined,
  /** Optional callback function to be called when the shared state is set from another instance/component. */
  onChange = null,
  /** Optional configuration options. */
  {
    /** When set to `true`, the shared state will be deleted when all components have been unmounted. */
    weak = false,
  } = {}
) {
  const [, forceUpdate] = useReducer(() => ({}), {})
  const hasMountedRef = useMounted()
  const waitForMountedRef = useRef(false)
  const instanceRef = useRef({})

  const forceRerender = useCallback(() => {
    if (hasMountedRef.current) {
      forceUpdate()
    } else {
      waitForMountedRef.current = true
    }
  }, [hasMountedRef])

  const shouldSync = useCallback((fn: () => void) => {
    // Do not rerender the "same component", when the hook is used. Only other subscribers will rerender.
    if (instanceRef.current === fn?.['ref']) {
      return false
    }
  }, [])

  useMountEffect(() => {
    if (waitForMountedRef.current) {
      forceUpdate()
    }
  })

  const sharedState = useMemo(() => {
    if (id) {
      return createSharedState<Data>(id, initialData, { shouldSync })
    }
  }, [id, initialData, shouldSync])
  const sharedAttachment = useMemo(() => {
    if (id) {
      return createSharedState(
        createReferenceKey(id, 'oc'),
        { onChange },
        { shouldSync }
      )
    }
  }, [id, onChange, shouldSync])

  const syncAttachment = useCallback(
    (newData: Data) => {
      if (id) {
        sharedAttachment.data?.onChange?.(newData)
      }
    },
    [id, sharedAttachment]
  )

  const update = useCallback(
    (newData: Data, opts?: Options) => {
      if (id) {
        sharedState.update(newData, opts)
      }
    },
    [id, sharedState]
  )

  const get = useCallback(() => {
    if (id) {
      return sharedState?.get?.()
    }
  }, [id, sharedState])

  const set = useCallback(
    (newData: Data) => {
      if (id) {
        sharedState.set(newData)
        syncAttachment(newData)
      }
    },
    [id, sharedState, syncAttachment]
  )

  const extend = useCallback(
    (newData: Data, opts?: Options) => {
      if (id) {
        sharedState.extend(newData, opts)
        syncAttachment(newData)
      }
    },
    [id, sharedState, syncAttachment]
  )

  useLayoutEffect(() => {
    if (!id) {
      return
    }

    forceRerender['ref'] = instanceRef.current
    sharedState.subscribe(forceRerender)

    return () => {
      sharedState.unsubscribe(forceRerender)

      if (weak && sharedState.subscribersRef.current.length === 0) {
        sharedState.update(undefined)
      }
    }
  }, [forceRerender, id, onChange, sharedState, weak])

  useEffect(() => {
    // Set the onChange function in case it is not set yet
    if (id && onChange && !sharedAttachment.data?.onChange) {
      sharedAttachment.set({ onChange })
    }
  }, [id, onChange, sharedAttachment])

  return {
    get,
    data: sharedState?.get?.() as Data,
    hadInitialData: sharedState?.hadInitialData,
    update,
    set,
    extend,
  }
}

type Subscriber = () => void

export interface SharedStateReturn<Data = undefined> {
  data: Data
  get: () => Data
  set: (newData: Partial<Data>) => void
  extend: (newData: Partial<Data>, opts?: Options) => void
  update: (newData: Partial<Data>, opts?: Options) => void
  subscribersRef?: { current: Subscriber[] }
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

type Options = {
  preventSyncOfSameInstance?: boolean
}

/**
 * Creates a shared state instance with the specified ID and initial data.
 */
export function createSharedState<Data>(
  /** The identifier for the shared state. */
  id: SharedStateId,
  /** The initial data for the shared state. */
  initialData?: Data,
  /** Optional configuration options. */
  {
    /** A function that returns true if the component should be rerendered. */
    shouldSync = null,
  } = {}
): SharedStateInstance<Data> {
  if (!sharedStates.get(id)) {
    const subscribersRef = {
      current: [] as Subscriber[],
    }

    const sync = (opts: Options = {}) => {
      subscribersRef.current.forEach((subscriber) => {
        const syncNow = opts.preventSyncOfSameInstance
          ? shouldSync?.(subscriber) !== false
          : true
        if (syncNow) {
          subscriber()
        }
      })
    }

    const get = () => sharedStates.get(id).data

    const set = (newData: Partial<Data>) => {
      sharedStates.get(id).data =
        newData === undefined ? undefined : { ...newData }
    }

    const update = (newData: Partial<Data>, opts?: Options) => {
      set(newData)
      sync(opts)
    }

    const extend = (newData: Data, opts?: Options) => {
      sharedStates.get(id).data = {
        ...sharedStates.get(id).data,
        ...newData,
      }
      sync(opts)
    }

    const subscribe = (subscriber: Subscriber) => {
      if (!subscribersRef.current.includes(subscriber)) {
        subscribersRef.current.push(subscriber)
      }
    }

    const unsubscribe = (subscriber: Subscriber) => {
      subscribersRef.current = subscribersRef.current.filter(
        (sub) => sub !== subscriber
      )
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
      subscribersRef,
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
