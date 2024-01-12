import { useCallback, useEffect, useRef } from 'react'
import pointer from 'json-pointer'
import { useSharedState } from '../../../../shared/helpers/useSharedState'
import type { Path } from '../../DataContext/Provider'

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
}

export default function useData<Data>(
  id: string,
  data: Data = undefined
): UseDataReturn<Data> {
  const initialDataRef = useRef(data)
  const sharedState = useSharedState<Data>(id, data)

  const updatePath = useCallback<UseDataReturnUpdate<Data>>(
    (path, fn) => {
      const existingData = sharedState.data || ({} as Data)
      const existingValue = pointer.has(existingData, path)
        ? pointer.get(existingData, path)
        : undefined

      // get new value
      const newValue = fn(existingValue)

      // update existing data
      pointer.set(existingData, path, newValue)

      // update provider
      sharedState.update?.(existingData)
    },
    [sharedState]
  )

  // when initial data changes, update the shared state
  useEffect(() => {
    if (data && data !== initialDataRef.current) {
      initialDataRef.current = data
      sharedState.update?.(data)
    }
  }, [data, sharedState])

  return { data: sharedState.data, update: updatePath }
}
