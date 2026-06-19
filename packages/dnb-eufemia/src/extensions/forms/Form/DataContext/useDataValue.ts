import { useContext } from 'react'
import type { Path } from '../../types'
import DataContextRefContext from '../../DataContext/DataContextRefContext'
import useFormDataValue from '../../hooks/useDataValue'

export type UseDataValueReturn<Value> = Value | undefined

/**
 * Provides a path-scoped form data value subscription.
 */
export default function useDataValue<Value = unknown>(
  path: Path
): UseDataValueReturn<Value> {
  const dataContextRef = useContext(DataContextRefContext)
  const { value } = useFormDataValue<Value>(path)

  if (!dataContextRef?.current?.hasContext) {
    throw new Error(
      'useDataValue needs to run inside DataContext (Form.Handler)'
    )
  }

  return value
}
