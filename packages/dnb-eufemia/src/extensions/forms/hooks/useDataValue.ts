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

  const { makePath } = usePath()

  const getValue = useCallback(
    (source: Path | Value) => {
      if (typeof source === 'string') {
        const path = makePath(source)
        return pointer.has(dataContextRef.current?.data, path)
          ? pointer.get(dataContextRef.current.data, path)
          : undefined
      }

      return source
    },
    [makePath]
  )

  if (pathProp) {
    value = getValue(pathProp)
  }

  return { getValue, value }
}
