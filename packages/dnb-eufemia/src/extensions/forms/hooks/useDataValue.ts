import { useCallback, useContext, useRef } from 'react'
import pointer from '../utils/json-pointer'
import { Path } from '../types'
import DataContext, { ContextState } from '../DataContext/Context'
import usePath from './usePath'

export type Props<Value> = {
  path?: Path | undefined
  value?: Value
}

export type GetValueByPath<Value = unknown> = <T = Value>(path: Path) => T

export default function useDataValue<Value>({
  path: pathProp,
  value,
}: Props<Value> = {}) {
  const dataContextRef = useRef<ContextState>()
  dataContextRef.current = useContext<ContextState>(DataContext)

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

  const moveValueToPath = useCallback(<T>(path: Path, value: T): T => {
    if (path !== '/' && isPath(path)) {
      const obj = {}
      pointer.set(obj, path, value)
      return obj as T
    }

    return value
  }, [])

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
        return getValueByPath(source)
      }

      return source
    },
    [getValueByPath]
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
