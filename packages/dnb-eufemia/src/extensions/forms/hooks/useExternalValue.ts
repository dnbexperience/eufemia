import {
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from 'react'
import type { RefObject } from 'react'
import pointer from '../utils/json-pointer'
import type { FieldProps, Path } from '../types'
import DataContext from '../DataContext/Context'
import IterateItemContext from '../Iterate/IterateItemContext'

export type UseExternalValueProps<Value> = {
  path?: Path | undefined
  itemPath?: Path
  value?: Value
  transformers?: RefObject<{
    fromExternal: FieldProps<Value>['fromExternal']
  }>
  emptyValue?: FieldProps<Value>['emptyValue']
}

export default function useExternalValue<Value>(
  props: UseExternalValueProps<Value>
) {
  const {
    path,
    itemPath,
    value = undefined,
    transformers,
    emptyValue = undefined,
  } = props
  const dataContext = useContext(DataContext)
  const { data, subscribeDataValue, getDataValue } = dataContext || {}
  const iterateItemContext = useContext(IterateItemContext)
  const inIterate = Boolean(iterateItemContext)
  const { value: iterateElementValue } = iterateItemContext || {}
  const subscribablePath =
    isPath(path) && (!inIterate || !itemPath) ? path : undefined

  const subscribe = useCallback(
    (callback: () => void) => {
      if (subscribablePath && subscribeDataValue) {
        return subscribeDataValue(subscribablePath, callback)
      }

      return () => undefined
    },
    [subscribablePath, subscribeDataValue]
  )

  const getSnapshot = useCallback(() => {
    if (subscribablePath && getDataValue) {
      return getDataValue(subscribablePath)
    }

    return undefined
  }, [getDataValue, subscribablePath])

  const dataValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot
  )

  return useMemo(() => {
    if (value !== undefined && value !== emptyValue) {
      // Value-prop sent directly to the field has highest priority, overriding any surrounding source
      return transformers?.current?.fromExternal?.(value) ?? emptyValue
    }

    if (inIterate && itemPath) {
      // This field is inside an iterate, and has a pointer from the base of the element being iterated
      if (itemPath === '/') {
        return (
          transformers?.current?.fromExternal?.(
            iterateElementValue as Value
          ) ?? emptyValue
        )
      }

      if (pointer.has(iterateElementValue, itemPath)) {
        return (
          transformers?.current?.fromExternal?.(
            pointer.get(iterateElementValue, itemPath) as Value
          ) ?? emptyValue
        )
      }
    }

    if (subscribablePath && getDataValue) {
      return (
        transformers?.current?.fromExternal?.(dataValue as Value) ??
        emptyValue
      )
    }

    if (data && path) {
      // There is a surrounding data context and a path for where in the source to find the data
      if (path === '/') {
        return transformers?.current?.fromExternal?.(data) ?? emptyValue
      }

      if (pointer.has(data, path)) {
        return (
          transformers?.current?.fromExternal?.(pointer.get(data, path)) ??
          emptyValue
        )
      }
    }

    return emptyValue
  }, [
    data,
    dataValue,
    getDataValue,
    emptyValue,
    inIterate,
    itemPath,
    iterateElementValue,
    path,
    subscribablePath,
    transformers,
    value,
  ])
}

function isPath(path: Path | unknown): path is Path {
  return typeof path === 'string' && path.startsWith('/')
}
