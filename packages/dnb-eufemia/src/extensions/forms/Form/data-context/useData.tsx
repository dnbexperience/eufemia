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

export type UseDataReturnGetValue<Data> = <P extends Path>(
  path: P
) => PathType<Data, P>

export type UseDataReturnFilterData<Data> = (
  filterDataHandler: FilterData,
  data?: Data
) => Partial<Data>

type UseDataReturn<Data> = {
  data: Data
  set: (newData: Data) => void
  update: UseDataReturnUpdate<Data>
  getValue: UseDataReturnGetValue<Data>
  filterData: UseDataReturnFilterData<Data>
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

  sharedAttachmentsRef.current = useSharedState<SharedAttachment<Data>>(
    id + '-attachments',
    { rerenderUseDataHook: forceUpdate }
  )

  // If no id is provided, use the context data
  const context = useContext(DataContext)
  if (!id) {
    if (!context?.hasContext) {
      throw new Error(
        'useData needs to run inside DataContext (Form.Handler) or have a valid id'
      )
    }

    if (context) {
      sharedDataRef.current.data = context.data
      sharedAttachmentsRef.current.data.filterDataHandler =
        context.filterDataHandler
    }
  }

  const updateDataValue = context?.updateDataValue
  const setData = context?.setData

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

      if (newValue !== existingValue) {
        // update existing data
        pointer.set(existingData, path, newValue)

        // update provider
        if (id) {
          sharedDataRef.current.extend(existingData)
        } else {
          updateDataValue(path, newValue)
        }
      }
    },
    [id, updateDataValue]
  )

  const filterData = useCallback<UseDataReturn<Data>['filterData']>(
    (filter, data = sharedDataRef.current.data) => {
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
      update: updateHandler,
      set: setHandler,
      getValue,
      filterData,
    }),
    [data, getValue, setHandler, updateHandler, filterData]
  )
}
