import {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react'
import pointer, { isPath } from '../utils/json-pointer'
import type { Path } from '../types'
import type { ContextState } from '../DataContext/Context'
import DataContextRefContext from '../DataContext/DataContextRefContext'
import IterateItemContext from '../Iterate/IterateItemContext'
import usePath from './usePath'

export type UseDataValueProps<Value> = {
  path?: Path | undefined
  value?: Value
}

export type GetValueByPath<Value = unknown> = <T = Value>(path: Path) => T

type UseDataValueOptions = {
  pathType?: 'auto' | 'absolute' | 'iterate'
}

export default function useDataValue<Value>(
  pathProp?: Path | Array<Path> | undefined,
  value?: Value,
  options: UseDataValueOptions = {}
) {
  const providedDataContextRef = useContext(DataContextRefContext)
  const fallbackDataContextRef = useRef<ContextState>(undefined)
  const dataContextRef = providedDataContextRef ?? fallbackDataContextRef
  const iterateItemContext = useContext(IterateItemContext)
  const snapshotVersionRef = useRef(0)
  const { pathType = 'auto' } = options

  const { makePath, makeIteratePath } = usePath()
  const resolvePath = useCallback(
    (path: Path) => {
      if (pathType === 'absolute') {
        return makePath(path)
      }

      if (pathType === 'iterate') {
        return makeIteratePath(path)
      }

      if (iterateItemContext) {
        if (path.startsWith('//')) {
          return makePath(path)
        }

        const currentItemPath = makeIteratePath('/')
        if (
          path === currentItemPath ||
          path.startsWith(`${currentItemPath}/`)
        ) {
          return path
        }

        return makeIteratePath(path)
      }

      return makePath(path)
    },
    [iterateItemContext, makeIteratePath, makePath, pathType]
  )

  const subscribablePaths = useMemo(() => {
    if (!pathProp) {
      return undefined
    }

    const paths = Array.isArray(pathProp) ? pathProp : [pathProp]
    const normalizedPaths = paths
      .filter(isPath)
      .map((path) => resolvePath(path))

    return normalizedPaths.length > 0 ? normalizedPaths : undefined
  }, [pathProp, resolvePath])

  const subscribablePath =
    typeof pathProp === 'string' && subscribablePaths?.length === 1
      ? subscribablePaths[0]
      : undefined

  const subscribe = useCallback(
    (callback: () => void) => {
      if (
        subscribablePaths?.length &&
        dataContextRef.current?.subscribeDataValue
      ) {
        const handleUpdate = () => {
          snapshotVersionRef.current += 1
          callback()
        }
        const unsubscribers = subscribablePaths.map((path) =>
          dataContextRef.current.subscribeDataValue(path, handleUpdate)
        )

        return () => {
          unsubscribers.forEach((unsubscribe) => unsubscribe())
        }
      }

      return () => undefined
    },
    [dataContextRef, subscribablePaths]
  )

  const getSnapshot = useCallback(() => {
    if (subscribablePath) {
      return dataContextRef.current?.getDataValue?.(subscribablePath)
    }

    return snapshotVersionRef.current
  }, [dataContextRef, subscribablePath])

  const subscribedValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot
  )

  const get = useCallback(
    (
      selector: Path,
      data = dataContextRef.current?.internalDataRef?.current
    ) => {
      if (selector === '/') {
        return data
      }
      return pointer.has(data, selector)
        ? pointer.get(data, selector)
        : undefined
    },
    [dataContextRef]
  )

  const getValueByPath = useCallback(
    (path: Path, data: ContextState['data'] = undefined) => {
      if (isPath(path)) {
        return get(makePath(path), data)
      }
    },
    [get, makePath]
  )

  const getValueByIteratePath = useCallback(
    (path: Path) => {
      if (isPath(path)) {
        return get(makeIteratePath(path))
      }
    },
    [get, makeIteratePath]
  )

  const moveValueToPath = useCallback(
    <T>(path: Path, value: T, object = {}): T => {
      if (path !== '/' && isPath(path)) {
        pointer.set(object, path, value)
        return object as T
      }

      return value
    },
    []
  )

  const getData = useCallback(
    (path: Path, options?: { includeCurrentPath?: boolean }) => {
      if (isPath(path)) {
        const value = getValueByPath(path)

        if (options?.includeCurrentPath && path !== '/') {
          return moveValueToPath(path, value)
        }

        return value
      }
    },
    [getValueByPath, moveValueToPath]
  )

  const getSourceValue = useCallback(
    (source: Path | Value) => {
      if (typeof source === 'string' && isPath(source)) {
        return get(resolvePath(source))
      }

      return source
    },
    [get, resolvePath]
  )

  if (typeof pathProp === 'string') {
    value = subscribablePath
      ? (subscribedValue as Value)
      : getSourceValue(pathProp)
  }

  return {
    getSourceValue,
    getValueByPath,
    getValueByIteratePath,
    moveValueToPath,
    getData,
    value,
  }
}
