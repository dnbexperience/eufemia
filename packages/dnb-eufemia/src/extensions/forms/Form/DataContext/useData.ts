import {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react'
import type { JsonObject } from '../../utils/json-pointer'
import pointer from '../../utils/json-pointer'
import type {
  SharedStateId,
  SharedStateReturn,
} from '../../../../shared/helpers/useSharedState'
import {
  createReferenceKey,
  createSharedState,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'
import useMountEffect from '../../../../shared/helpers/useMountEffect'
import type { Path } from '../../types'
import type {
  ContextState,
  FilterData,
  VisibleDataHandler,
} from '../../DataContext/Context'
import DataContext from '../../DataContext/Context'
import type { DataContextRef } from '../../DataContext/DataContextRefContext'
import type { SharedAttachments } from '../../DataContext/Provider'
import { structuredClone } from '../../../../shared/helpers/structuredClone'

type PathImpl<T, P extends string> = P extends `${infer Key}/${infer Rest}`
  ? Key extends keyof T
    ? Rest extends ''
      ? T[Key]
      : PathImpl<T[Key], Rest>
    : never
  : T[P & keyof T]

export type PathType<T, P extends string> = P extends `/${infer Rest}`
  ? PathImpl<T, Rest>
  : never

export type UseDataReturnUpdate<Data> = <P extends Path>(
  path: P,
  value: ((value: PathType<Data, P>) => unknown) | unknown
) => void

export type UseDataReturnGetValue<Data> = <P extends Path>(
  path: P
) => PathType<Data, P> | any

export type UseDataReturnFilterData<Data> = (
  filterDataHandler: FilterData,
  data?: Data
) => Partial<Data>

export type UseDataReturnVisibleData<Data> = VisibleDataHandler<Data>

export type UseDataReturn<Data> = {
  data: Data
  set: (newData: Data) => void
  update: UseDataReturnUpdate<Data>
  remove: (path: Path) => void
  getValue: UseDataReturnGetValue<Data>
  filterData: UseDataReturnFilterData<Data>
  reduceToVisibleFields: UseDataReturnVisibleData<Data>
}

export type UseDataSharedData<Data> = SharedStateReturn<Data> & {
  hadInitialData?: boolean
}

type UseDataReturnOptions<Data> = {
  id: SharedStateId
  initialData: Data
  sharedDataRef: { current: UseDataSharedData<Data> | null }
  sharedAttachmentsRef: {
    current: ReturnType<
      typeof createSharedState<SharedAttachments<Data>>
    > | null
  }
  dataContext: ContextState
  dataContextRef?: DataContextRef
  contextData?: Data
  errorMessage: string
}

/**
 * Custom hook that provides form data management functionality.
 *
 * @template Data - The type of data being managed.
 * @param {SharedStateId} id - The identifier for the data.
 * @param {Data} initialData - The initial data value (optional).
 * @returns {UseDataReturn<Data>} An object containing the data and data management functions.
 */
export default function useData<Data = JsonObject>(
  id: SharedStateId = undefined,
  initialData: Data = undefined
): UseDataReturn<Data> {
  const sharedDataRef = useRef<UseDataSharedData<Data> | null>(null)
  const sharedAttachmentsRef = useRef<ReturnType<
    typeof createSharedState<SharedAttachments<Data>>
  > | null>(null)

  sharedDataRef.current = useSharedState<Data>(id, initialData)

  // Use createSharedState (non-reactive) for attachments — we only ever access
  // them imperatively, so subscribing to changes would cause unnecessary re-renders.
  sharedAttachmentsRef.current = id
    ? createSharedState<SharedAttachments<Data>>(
        createReferenceKey(id, 'attachments')
      )
    : null

  // If no id is provided, use the context data
  const dataContext = useContext(DataContext)
  const subscribeContextData = useCallback(
    (callback: () => void) => {
      if (!id && dataContext?.subscribeDataValue) {
        return dataContext.subscribeDataValue('/', callback)
      }

      return () => undefined
    },
    [dataContext, id]
  )

  const getContextDataSnapshot = useCallback(() => {
    if (!id && dataContext?.getDataValue) {
      return dataContext.getDataValue('/') as Data
    }

    return undefined
  }, [dataContext, id])

  const contextData = useSyncExternalStore(
    subscribeContextData,
    getContextDataSnapshot,
    getContextDataSnapshot
  )

  return useDataReturn({
    id,
    initialData,
    sharedDataRef,
    sharedAttachmentsRef,
    dataContext,
    contextData,
    errorMessage:
      'useData needs to run inside DataContext (Form.Handler) or have a valid id',
  })
}

export function useDataReturn<Data = JsonObject>({
  id,
  initialData,
  sharedDataRef,
  sharedAttachmentsRef,
  dataContext,
  dataContextRef,
  contextData,
  errorMessage,
}: UseDataReturnOptions<Data>): UseDataReturn<Data> {
  const fallbackDataContextRef = useRef(dataContext)
  fallbackDataContextRef.current = dataContext

  const getDataContext = useCallback(() => {
    return dataContextRef?.current ?? fallbackDataContextRef.current
  }, [dataContextRef])

  const contextDataDependency = id ? undefined : dataContext

  if (!id && !getDataContext().hasContext) {
    throw new Error(errorMessage)
  }

  const getCurrentData = useCallback(() => {
    if (id) {
      return sharedDataRef.current?.get?.()
    }

    const dataContext = getDataContext()
    return (dataContext?.getDataValue?.('/') ?? dataContext?.data) as Data
  }, [getDataContext, id, sharedDataRef])

  const getExistingData = useCallback(() => {
    // Use the live store value (always current) when available.
    // Prefer get() over the stale useSyncExternalStore snapshot (.data) and
    // the stale internalDataRef.current, because Provider may not have
    // re-rendered yet to reflect a previous update().
    const liveStoreData = id ? sharedDataRef.current?.get?.() : null
    const liveContextData = !id ? getCurrentData() : null
    const dataContext = getDataContext()
    return structuredClone(
      liveStoreData ??
        liveContextData ??
        dataContext?.data ??
        sharedAttachmentsRef.current?.data?.internalDataRef?.current ??
        {}
    ) as Data & JsonObject
  }, [
    getDataContext,
    getCurrentData,
    id,
    sharedAttachmentsRef,
    sharedDataRef,
  ])

  const set = useCallback(
    (newData: Data) => {
      if (id) {
        sharedDataRef.current?.set(newData)
      } else {
        getDataContext().setData?.(newData)
      }
    },
    [getDataContext, id, sharedDataRef]
  )

  const update = useCallback<UseDataReturnUpdate<Data>>(
    (path, value = undefined) => {
      const existingData = getExistingData()
      const existingValue = pointer.has(existingData, path)
        ? pointer.get(existingData, path)
        : undefined

      // Get new value
      const newValue =
        typeof value === 'function' ? value(existingValue) : value

      if (newValue !== existingValue) {
        // Update existing data
        pointer.set(existingData, path, newValue)

        // Update provider with new data
        if (id) {
          sharedDataRef.current?.extend(existingData)
        } else {
          getDataContext().updateDataValue?.(path, newValue)
        }
      }
    },
    [getDataContext, getExistingData, id, sharedDataRef]
  )

  const remove = useCallback<UseDataReturn<Data>['remove']>(
    (path) => {
      const existingData = getExistingData()

      if (pointer.has(existingData, path)) {
        // Remove existing data
        pointer.remove(existingData, path)

        // Update provider with new data
        if (id) {
          sharedDataRef.current?.set(existingData)
        } else {
          getDataContext().setData?.(existingData)
        }
      }
    },
    [getDataContext, getExistingData, id, sharedDataRef]
  )

  const reduceToVisibleFields = useCallback<
    UseDataReturn<Data>['reduceToVisibleFields']
  >(
    (data, options = {}) => {
      if (id) {
        return sharedAttachmentsRef.current.data?.visibleDataHandler?.(
          data,
          options
        )
      }

      return getDataContext()?.visibleDataHandler?.(data, options)
    },
    [contextDataDependency, getDataContext, id, sharedAttachmentsRef]
  )

  const filterData = useCallback<UseDataReturn<Data>['filterData']>(
    (filter, data = getCurrentData()) => {
      if (id) {
        return sharedAttachmentsRef.current.data?.filterDataHandler?.(
          data,
          filter
        )
      }

      return getDataContext()?.filterDataHandler?.(data, filter)
    },
    [
      contextDataDependency,
      getCurrentData,
      getDataContext,
      id,
      sharedAttachmentsRef,
    ]
  )

  const getValue = useCallback<UseDataReturn<Data>['getValue']>(
    (path) => {
      const dataContext = getDataContext()

      if (!id && dataContext?.getDataValue) {
        return dataContext.getDataValue(path)
      }

      const data = getCurrentData()
      if (pointer.has(data, path)) {
        return pointer.get(data, path)
      }

      return undefined
    },
    [getCurrentData, getDataContext, id]
  )

  useMountEffect(() => {
    if (id && !sharedDataRef.current?.hadInitialData && initialData) {
      sharedDataRef.current?.extend(initialData, { forceSync: true })
    }
  })

  const data = (
    id ? sharedDataRef.current?.data : (contextData ?? getCurrentData())
  ) as Data

  return useMemo(
    () => ({
      data,
      remove,
      update,
      set,
      getValue,
      reduceToVisibleFields,
      filterData,
    }),
    [
      data,
      remove,
      update,
      set,
      getValue,
      reduceToVisibleFields,
      filterData,
    ]
  )
}
