import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react'
import type { Context } from 'react'

export type SharedStateId =
  | string
  | (() => void)
  | Promise<() => void>
  | Context<any>
  | Record<string, unknown>

export type SharedStateStore = {
  states: Map<SharedStateId, SharedStateInstance<any>>
  referenceKeys: Map<unknown, Map<unknown, Record<string, never>>>
}

export function createSharedStateStore(): SharedStateStore {
  return { states: new Map(), referenceKeys: new Map() }
}

const globalStore = createSharedStateStore()

/**
 * Holds the store of the current server render.
 */
export const SharedStateScopeContext =
  createContext<SharedStateStore | null>(null)

export function isServerEnvironment() {
  return typeof window === 'undefined' || typeof document === 'undefined'
}

/**
 * Returns the store to use for shared state.
 * In the browser, this is always the process-wide store.
 * On the server, it is the store of the current render,
 * so data never reaches another request.
 */
export function useSharedStateStore(): SharedStateStore {
  const scope = useContext(SharedStateScopeContext)
  const isolatedRef = useRef<SharedStateStore>(null)

  if (!isServerEnvironment()) {
    return globalStore
  }

  if (scope) {
    return scope
  }

  if (!isolatedRef.current) {
    isolatedRef.current = createSharedStateStore()
  }

  return isolatedRef.current
}

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
    /** The store to use. Defaults to the process-wide store. */
    store = globalStore,
  }: { weak?: boolean; store?: SharedStateStore } = {}
) {
  const instanceRef = useRef({})

  const sharedState = useMemo(() => {
    if (id) {
      return createSharedState<Data>(id, initialData, store)
    }

    return undefined
  }, [id, initialData, store])

  const sharedAttachment = useMemo(() => {
    if (id) {
      return createSharedState(
        createReferenceKey(id, 'oc', store),
        { onChange },
        store
      )
    }

    return undefined
  }, [id, onChange, store])

  const syncAttachment = useCallback(
    (newData: Data | Partial<Data>) => {
      if (id) {
        sharedAttachment.data?.onChange?.(newData)
      }
    },
    [id, sharedAttachment]
  )

  // Subscribe to the shared state using useSyncExternalStore.
  // This reads the snapshot synchronously during render, solving the StrictMode
  // initial-render issue where subscribers would otherwise see stale data.
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!id || !sharedState) {
        return () => {}
      }

      const subscriber: Subscriber = () => onStoreChange()
      subscriber['ref'] = instanceRef.current

      sharedState.subscribe(subscriber)

      return () => {
        sharedState.unsubscribe(subscriber)

        if (weak && sharedState.subscribersRef.current.length === 0) {
          sharedState.update(undefined)
        }
      }
    },
    [id, sharedState, weak]
  )

  const getSnapshot = useCallback(() => {
    return id ? (sharedState?.get?.() ?? undefined) : undefined
  }, [id, sharedState])

  const data = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const get = useCallback(() => {
    if (id) {
      return sharedState?.get?.()
    }

    return undefined
  }, [id, sharedState])

  const update = useCallback(
    (newData: Data | Partial<Data>, opts?: Options) => {
      if (id) {
        sharedState.update(newData, {
          ...opts,
          callerRef: instanceRef.current,
        })
      }
    },
    [id, sharedState]
  )

  const set = useCallback(
    (newData: Data | Partial<Data>, opts?: Options) => {
      if (!id) {
        return false
      }

      const changed = sharedState.set(newData, {
        ...opts,
        callerRef: instanceRef.current,
      })

      if (changed) {
        syncAttachment(newData)
      }

      return changed
    },
    [id, sharedState, syncAttachment]
  )

  const extend = useCallback(
    (newData: Data | Partial<Data>, opts?: Options) => {
      if (!id) {
        return false
      }

      const changed = sharedState.extend(newData, {
        ...opts,
        callerRef: instanceRef.current,
      })

      if (changed) {
        syncAttachment(newData)
      }

      return changed
    },
    [id, sharedState, syncAttachment]
  )

  useEffect(() => {
    // Set the onChange function in case it is not set yet
    if (id && onChange && !sharedAttachment.data?.onChange) {
      sharedAttachment.set({ onChange })
    }
  }, [id, onChange, sharedAttachment])

  return {
    get,
    data: data as Data,
    hadInitialData: sharedState?.hadInitialData,
    update,
    set,
    extend,
  }
}

type Subscriber = (() => void) & { ref?: unknown }

export type SharedStateReturn<Data = undefined> = {
  data: Data
  get: () => Data
  set: (newData: Data | Partial<Data>, opts?: Options) => boolean
  extend: (newData: Data | Partial<Data>, opts?: Options) => boolean
  update: (newData: Data | Partial<Data>, opts?: Options) => void
  subscribersRef?: { current: Subscriber[] }
}

type SharedStateInstance<Data> = {
  subscribe: (subscriber: Subscriber) => void
  unsubscribe: (subscriber: Subscriber) => void
  hadInitialData: boolean
} & SharedStateReturn<Data>

type Options = {
  preventSyncOfSameInstance?: boolean
  callerRef?: unknown
  forceSync?: boolean
  silent?: boolean
}

/**
 * Creates a shared state instance with the specified ID and initial data.
 */
export function createSharedState<Data>(
  /** The identifier for the shared state. */
  id: SharedStateId,
  /** The initial data for the shared state. */
  initialData?: Data,
  /** The store to use. Defaults to the process-wide store. */
  store: SharedStateStore = globalStore
): SharedStateInstance<Data> {
  const sharedStates = store.states

  if (!sharedStates.get(id)) {
    const subscribersRef = {
      current: [] as Subscriber[],
    }

    const sync = (opts: Options = {}) => {
      subscribersRef.current.forEach((subscriber) => {
        if (
          opts.preventSyncOfSameInstance &&
          opts.callerRef !== undefined &&
          subscriber['ref'] === opts.callerRef
        ) {
          return
        }

        subscriber()
      })
    }

    const get = () => sharedStates.get(id).data

    const set = (
      newData: Data | Partial<Data>,
      opts?: Options
    ): boolean => {
      const store = sharedStates.get(id)
      const current = store.data

      if (newData === undefined) {
        if (current === undefined) {
          return false
        }

        store.data = undefined
        if (!opts?.silent) {
          sync(opts)
        }
        return true
      }

      const next = cloneData(newData)
      if (!opts?.forceSync && shallowEqual(current, next)) {
        return false
      }

      store.data = next as Data
      if (!opts?.silent) {
        sync(opts)
      }
      return true
    }

    const update = (
      newData: Data | Partial<Data>,
      opts?: Options
    ): void => {
      set(newData, opts)
    }

    const extend = (
      newData: Data | Partial<Data>,
      opts?: Options
    ): boolean => {
      const store = sharedStates.get(id)
      const current = store.data

      if (!isMergeableObject(newData)) {
        return set(newData, opts)
      }

      const base = isMergeableObject(current)
        ? (current as Record<string, unknown>)
        : {}
      const next = { ...base, ...newData }
      if (!opts?.forceSync && shallowEqual(base, next)) {
        return false
      }

      store.data = next as Data
      if (!opts?.silent) {
        sync(opts)
      }
      return true
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
    // Silently seed the store so children render with data on their first pass.
    // No sync here — we may be in the render phase where calling subscribers
    // would cause a "setState during render" warning. The store value will be
    // picked up by useSyncExternalStore's getSnapshot on the next render.
    sharedStates.get(id).data = cloneData(initialData) as Data
  }

  return sharedStates.get(id)
}

/**
 * Pre-seed a shared state with data silently — without notifying subscribers,
 * without triggering useSyncExternalStore subscriptions, and crucially without
 * setting `hadInitialData = true`. This lets subsequent `Form.useData(id, data)`
 * calls still merge their own initialData, which `createSharedState(id, data)`
 * would prevent by setting `hadInitialData = true`.
 *
 * Safe to call during the render phase when no subscribers exist yet.
 */
export function preSeedSharedState<Data>(
  id: SharedStateId,
  data: Data,
  store: SharedStateStore = globalStore
): void {
  // Ensure the store exists with hadInitialData = false
  const sharedState = createSharedState<Data>(id, undefined, store)
  if (sharedState.data === undefined && data !== undefined) {
    sharedState.data = cloneData(data) as Data
  }
}

/**
 * Creates a reference key for the shared state.
 * You can pass any JavaScript instance as the reference.
 */
export function createReferenceKey(
  ref1: unknown,
  ref2: unknown,
  store: SharedStateStore = globalStore
) {
  const cache = store.referenceKeys

  if (!cache.has(ref1)) {
    cache.set(ref1, new Map())
  }

  const innerMap = cache.get(ref1)

  if (!innerMap.has(ref2)) {
    innerMap.set(ref2, {})
  }

  return innerMap.get(ref2)
}

function isObjectLike(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isMergeableObject(
  value: unknown
): value is Record<string, unknown> {
  return isObjectLike(value) && !Array.isArray(value)
}

function cloneData<T>(value: T): T {
  if (Array.isArray(value)) {
    return [...value] as T
  }

  if (isMergeableObject(value)) {
    return { ...value } as T
  }

  return value
}

// set and extend create new containers, so reference equality alone would
// re-sync unchanged values and can trigger subscriber feedback loops.
export function shallowEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) {
    return true
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false
    }

    for (let i = 0; i < a.length; i++) {
      if (!Object.is(a[i], b[i])) {
        return false
      }
    }

    return true
  }

  if (isMergeableObject(a) && isMergeableObject(b)) {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) {
      return false
    }

    for (const key of keysA) {
      if (!Object.hasOwn(b, key) || !Object.is(a[key], b[key])) {
        return false
      }
    }

    return true
  }

  return false
}
