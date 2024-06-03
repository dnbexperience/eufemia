import { useContext, useRef } from 'react'
import { ValueProps } from '../types'
import useExternalValue from './useExternalValue'
import usePath from './usePath'
import DataContext from '../DataContext/Context'

export type Props<Value> = ValueProps<Value>

export default function useValueProps<
  Value = unknown,
  Props extends ValueProps<Value> = ValueProps<Value>,
>(props: Props): Props & ValueProps<Value> {
  const {
    path: pathProp,
    itemPath,
    value,
    defaultValue,
    transformIn = (value: Value) => value,
    toInput = (value: Value) => value,
    fromExternal = (value: Value) => value,
  } = props

  const transformers = useRef({
    transformIn,
    toInput,
    fromExternal,
  })

  const { path } = usePath({ path: pathProp, itemPath })

  const externalValue =
    useExternalValue<Value>({
      path,
      itemPath,
      value,
      transformers,
    }) ?? defaultValue

  const dataContext = useContext(DataContext)
  dataContext?.setValueProps?.(path, props)

  return {
    ...props,
    value: transformers.current.transformIn(
      transformers.current.toInput(externalValue)
    ),
  }
}
