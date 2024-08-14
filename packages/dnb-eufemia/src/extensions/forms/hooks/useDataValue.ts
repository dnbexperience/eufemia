import { useCallback, useContext, useRef } from 'react'
import pointer from 'json-pointer'
import { Path } from '../types'
import DataContext, { ContextState } from '../DataContext/Context'
import usePath from './usePath'

export type Props<Value> = {
  path?: Path | undefined
  value?: Value
}

export default function useDataValue<Value>({
  path: pathProp,
  value,
}: Props<Value> = {}) {
  const dataContextRef = useRef<ContextState>()
  dataContextRef.current = useContext<ContextState>(DataContext)

  const { makePath, makeIteratePath } = usePath()

  const get = useCallback((selector: Path) => {
    if (selector === '/') {
      return dataContextRef.current?.data
    }
    return pointer.has(dataContextRef.current?.data, selector)
      ? pointer.get(dataContextRef.current.data, selector)
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

  const getData = useCallback(
    (path: Path, options?: { includeCurrentPath?: boolean }) => {
      if (isPath(path)) {
        const value = getValueByPath(path)

        if (options?.includeCurrentPath && path !== '/') {
          const data = {}
          pointer.set(data, path, value)
          return data
        }

        return value
      }
    },
    [getValueByPath]
  )

  const getValue = useCallback(
    (source: Path | Value) => {
      if (typeof source === 'string' && isPath(source)) {
        return getValueByPath(source)
      }

      return source
    },
    [getValueByPath]
  )

  if (pathProp) {
    value = getValue(pathProp)
  }

  return {
    getValue,
    getValueByPath,
    getValueByIteratePath,
    getData,
    value,
  }
}

function isPath(path: Path | unknown) {
  return typeof path === 'string' && path.startsWith('/')
}
