import { useCallback, useEffect, useReducer, useRef } from 'react'
import pointer from 'json-pointer'
import {
  SharedStateId,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'
import type { Path } from '../../DataContext/Context'
import type { FilterData, Props } from '../../DataContext/Provider'
import { useMountEffect } from '../../hooks'

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
  fn: (value: PathType<Data, P>) => unknown
) => void

type UseDataReturn<Data> = {
  data: Data
  update: UseDataReturnUpdate<Data>
  set: (newData: Data) => void
  filterData: (filterDataHandler: FilterData) => Partial<Data>
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
  id: SharedStateId,
  initialData: Data = undefined
): UseDataReturn<Data> {
  const sharedDataRef = useRef(null)
  const sharedAttachmentsRef = useRef(null)
  const hasMounted = useRef(false)
  const [, forceUpdate] = useReducer(() => ({}), {})

  useEffect(() => {
    hasMounted.current = true
    return () => {
      hasMounted.current = false
    }
  }, [])

  const rerenderUseDataHook = useCallback(() => {
    if (hasMounted.current) {
      if (typeof window !== 'undefined') {
        // Because we need to wait for the updated props of the fields to be in latest state
        window.requestAnimationFrame(forceUpdate)
      }
    } else {
      forceUpdate()
    }
  }, [])

  sharedDataRef.current = useSharedState<Data>(
    id,
    initialData,
    forceUpdate
  )

  sharedAttachmentsRef.current = useSharedState<{
    filterDataHandler?: Props<Data>['filterData']
    rerenderUseDataHook?: () => void
  }>(id + '-attachments', { rerenderUseDataHook })

  const setHandler = useCallback((newData: Data) => {
    sharedDataRef.current.update(newData)
  }, [])

  const updateHandler = useCallback<UseDataReturnUpdate<Data>>(
    (path, fn) => {
      const existingData = sharedDataRef.current.data || ({} as Data)
      const existingValue = pointer.has(existingData, path)
        ? pointer.get(existingData, path)
        : undefined

      // get new value
      const newValue = fn(existingValue)

      // update existing data
      pointer.set(existingData, path, newValue)

      // update provider
      sharedDataRef.current.update(existingData)
    },
    []
  )

  const filterData = useCallback<UseDataReturn<Data>['filterData']>(
    (filter) => {
      const data = sharedDataRef.current.data
      return (
        sharedAttachmentsRef.current.data?.filterDataHandler?.(
          data,
          filter
        ) || (() => data)
      )
    },
    []
  )

  useMountEffect(() => {
    if (id && !sharedDataRef.current.hadInitialData && initialData) {
      sharedDataRef.current.update(initialData)
    }
  })

  return {
    data: sharedDataRef.current.data,
    update: updateHandler,
    set: setHandler,
    filterData,
  }
}
