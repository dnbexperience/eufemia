import { useCallback, useContext, useRef } from 'react'
import pointer from '../utils/json-pointer'
import { Path } from '../types'
import DataContext, { ContextState } from '../DataContext/Context'
import IterateItemContext from '../Iterate/IterateItemContext'
import usePath from './usePath'

export type Props<Value> = {
  path?: Path | undefined
  value?: Value
}

export type GetValueByPath<Value = unknown> = <T = Value>(path: Path) => T

export default function useDataValue<Value>(
  pathProp?: Path | undefined,
  value?: Value
) {
  const dataContextRef = useRef<ContextState>()
  dataContextRef.current = useContext(DataContext)
  const iterateItemContext = useContext(IterateItemContext)

  const { makePath, makeIteratePath } = usePath()

  const get = useCallback((selector: Path) => {
    const data = dataContextRef.current?.internalDataRef?.current
    if (selector === '/') {
      return data
    }
    return pointer.has(data, selector)
      ? pointer.get(data, selector)
      : undefined
  }, [])

  const getValueByPath = useCallback(
    (path: Path) => {
      if (isPath(path)) {
        return get(makePath(path))
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
        if (iterateItemContext) {
          return getValueByIteratePath(source)
        }

        return getValueByPath(source)
      }

      return source
    },
    [getValueByIteratePath, getValueByPath, iterateItemContext]
  )

  if (pathProp) {
    value = getSourceValue(pathProp)
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

function isPath(path: Path | unknown) {
  return typeof path === 'string' && path.startsWith('/')
}
