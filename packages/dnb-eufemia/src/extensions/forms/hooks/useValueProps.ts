import { useRef } from 'react'
import { ValueProps } from '../types'
import { useExternalValue } from './useFieldProps'

export type Props<Value> = ValueProps<Value>

export default function useValueProps<
  Value = unknown,
  Props extends ValueProps<Value> = ValueProps<Value>,
>(props: Props): Props & ValueProps<Value> {
  const {
    path,
    itemPath,
    transformIn = (value: Value) => value,
    toInput = (value: Value) => value,
    fromExternal = (value: Value) => value,
  } = props

  const transformers = useRef({
    transformIn,
    toInput,
    fromExternal,
  })

  const externalValue = useExternalValue<Value>({
    path,
    itemPath,
    props,
    transformers,
  })

  return {
    ...props,
    value: transformers.current.transformIn(
      transformers.current.toInput(externalValue)
    ),
  }
}
