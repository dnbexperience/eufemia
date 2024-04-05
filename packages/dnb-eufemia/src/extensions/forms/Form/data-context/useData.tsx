import {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import pointer from 'json-pointer'
import {
  SharedStateId,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'
import useMountEffect from '../../../../shared/helpers/useMountEffect'
import type { Path } from '../../types'
import DataContext, {
  FilterData,
  FilterDataHandler,
} from '../../DataContext/Context'

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

type UseDataReturn<Data> = {
  data: Data
  update: UseDataReturnUpdate<Data>
  set: (newData: Data) => void
  filterData: (filterDataHandler: FilterData) => Partial<Data>
}

type SharedAttachment<Data> = {
  rerenderUseDataHook: () => void
  filterDataHandler?: FilterDataHandler<Data>
}

/**
 * Custom hook that provides form data management functionality.
 *
 * @template Data - The type of data being managed.
 * @param {SharedStateId} id - The identifier for the data.
 * @param {Data} initialData - The initial data value (optional).
 * @returns {UseDataReturn<Data>} An object containing the data and data management functions.
 */
export default function useData<Data>(
  id: SharedStateId = undefined,
  initialData: Data = undefined
): UseDataReturn<Data> {
  const sharedDataRef =
    useRef<ReturnType<typeof useSharedState<Data>>>(null)
  const sharedAttachmentsRef =
    useRef<ReturnType<typeof useSharedState<SharedAttachment<Data>>>>(null)
  const [, forceUpdate] = useReducer(() => ({}), {})

  sharedDataRef.current = useSharedState<Data>(
    id,
    initialData,
    forceUpdate
  )

  // If no id is provided, use the context data
  const context = useContext(DataContext)
  if (!id && context?.data) {
    sharedDataRef.current.data = context.data
  }
  const updateDataValue = context?.updateDataValue
  const setData = context?.setData

  sharedAttachmentsRef.current = useSharedState<SharedAttachment<Data>>(
    id + '-attachments',
    { rerenderUseDataHook: forceUpdate }
  )

  const setHandler = useCallback(
    (newData: Data) => {
      if (id) {
        sharedDataRef.current.update(newData)
      } else {
        setData?.(newData)
      }
    },
    [id, setData]
  )

  const updateHandler = useCallback<UseDataReturnUpdate<Data>>(
    (path, value = undefined) => {
      const existingData = sharedDataRef.current.data || ({} as Data)
      const existingValue = pointer.has(existingData, path)
        ? pointer.get(existingData, path)
        : undefined

      // get new value
      const newValue =
        typeof value === 'function' ? value(existingValue) : value

      // update existing data
      pointer.set(existingData, path, newValue)

      // update provider
      if (id) {
        sharedDataRef.current.extend(existingData)
      } else {
        updateDataValue(path, newValue)
      }
    },
    [id, updateDataValue]
  )

  const filterData = useCallback<UseDataReturn<Data>['filterData']>(
    (filter) => {
      const data = sharedDataRef.current.data

      if (id) {
        return sharedAttachmentsRef.current.data?.filterDataHandler?.(
          data,
          filter
        )
      }

      return context?.filterDataHandler(data, filter)
    },
    [context, id]
  )

  useMountEffect(() => {
    if (id && !sharedDataRef.current.hadInitialData && initialData) {
      sharedDataRef.current.extend(initialData)
    }
  })

  const { data } = sharedDataRef.current

  return useMemo(
    () => ({
      data,
      update: updateHandler,
      set: setHandler,
      filterData,
    }),
    [data, filterData, setHandler, updateHandler]
  )
}
