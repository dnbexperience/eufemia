import {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import pointer, { JsonObject } from '../../utils/json-pointer'
import {
  SharedStateId,
  createReferenceKey,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'
import useMountEffect from '../../../../shared/helpers/useMountEffect'
import type { Path } from '../../types'
import DataContext, {
  FilterData,
  VisibleDataHandler,
} from '../../DataContext/Context'
import { SharedAttachments } from '../../DataContext/Provider'

/**
 * Deprecated, as it is supported by all major browsers and Node.js >=v18
 * So it's a question of time, when we will remove this polyfill
 */
import structuredClone from '@ungap/structured-clone'

type PathImpl<T, P extends string> = P extends `${infer Key}/${infer Rest}`
  ? Key extends keyof T
    ? Rest extends ''
      ? T[Key]
      : PathImpl<T[Key], Rest>
    : never
  : T[P & keyof T]

type PathType<T, P extends string> = P extends `/${infer Rest}`
  ? PathImpl<T, Rest>
  : never

type UseDataReturnUpdate<Data> = <P extends Path>(
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

type UseDataReturn<Data> = {
  data: Data
  set: (newData: Data) => void
  update: UseDataReturnUpdate<Data>
  remove: (path: Path) => void
  getValue: UseDataReturnGetValue<Data>
  filterData: UseDataReturnFilterData<Data>
  reduceToVisibleFields: UseDataReturnVisibleData<Data>
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
  const sharedDataRef =
    useRef<ReturnType<typeof useSharedState<Data>>>(null)
  const sharedAttachmentsRef =
    useRef<ReturnType<typeof useSharedState<SharedAttachments<Data>>>>(
      null
    )
  const [, forceUpdate] = useReducer(() => ({}), {})

  sharedDataRef.current = useSharedState<Data>(
    id,
    initialData,
    forceUpdate
  )

  sharedAttachmentsRef.current = useSharedState<SharedAttachments<Data>>(
    createReferenceKey(id, 'attachments'),
    { rerenderUseDataHook: forceUpdate }
  )

  // If no id is provided, use the context data
  const dataContext = useContext(DataContext)
  if (!id) {
    if (!dataContext.hasContext) {
      throw new Error(
        'useData needs to run inside DataContext (Form.Handler) or have a valid id'
      )
    }

    sharedDataRef.current.data = dataContext.data
    sharedAttachmentsRef.current.data.filterDataHandler =
      dataContext.filterDataHandler
  }

  const updateDataValue = dataContext?.updateDataValue
  const setData = dataContext?.setData

  const set = useCallback(
    (newData: Data) => {
      if (id) {
        sharedDataRef.current.update(newData)
      } else {
        setData?.(newData)
      }
    },
    [id, setData]
  )

  const update = useCallback<UseDataReturnUpdate<Data>>(
    (path, value = undefined) => {
      const existingData = structuredClone(
        sharedDataRef.current.data || {}
      ) as Data & JsonObject
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
          sharedDataRef.current.extend(existingData)
        } else {
          updateDataValue(path, newValue)
        }
      }
    },
    [id, updateDataValue]
  )

  const remove = useCallback<UseDataReturn<Data>['remove']>(
    (path) => {
      const existingData = structuredClone(
        sharedDataRef.current.data || {}
      ) as Data & JsonObject

      if (pointer.has(existingData, path)) {
        // Remove existing data
        pointer.remove(existingData, path)

        // Update provider with new data
        if (id) {
          sharedDataRef.current.set(existingData)
        } else {
          updateDataValue(path, undefined)
        }
      }
    },
    [id, updateDataValue]
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

      return dataContext?.visibleDataHandler?.(data, options)
    },
    [dataContext, id]
  )

  const filterData = useCallback<UseDataReturn<Data>['filterData']>(
    (filter, data = sharedDataRef.current.data) => {
      if (id) {
        return sharedAttachmentsRef.current.data?.filterDataHandler?.(
          data,
          filter
        )
      }

      return dataContext?.filterDataHandler?.(data, filter)
    },
    [dataContext, id]
  )

  const getValue = useCallback<UseDataReturn<Data>['getValue']>((path) => {
    if (pointer.has(sharedDataRef.current.data, path)) {
      return pointer.get(sharedDataRef.current.data, path)
    }

    return undefined
  }, [])

  useMountEffect(() => {
    if (id && !sharedDataRef.current.hadInitialData && initialData) {
      sharedDataRef.current.extend(initialData)
    }
  })

  const { data } = sharedDataRef.current

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
