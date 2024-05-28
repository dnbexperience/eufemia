import { useContext, useMemo, useRef } from 'react'
import { ValueProps } from '../types'
import useExternalValue from './useExternalValue'
import usePath from './usePath'
import DataContext from '../DataContext/Context'
import { convertJsxToString } from '../../../shared/component-helper'
import IterateElementContext from '../Iterate/IterateElementContext'

export type Props<Value> = ValueProps<Value>

export default function useValueProps<
  Value = unknown,
  Props extends ValueProps<Value> = ValueProps<Value>,
>(props: Props): Props & ValueProps<Value> {
  const {
    path: pathProp,
    label: labelProp,
    itemPath,
    value,
    transformIn = (value: Value) => value,
    toInput = (value: Value) => value,
    fromExternal = (value: Value) => value,
  } = props

  const iterateElementContext = useContext(IterateElementContext)
  const { index: iterateIndex } = iterateElementContext ?? {}

  const transformers = useRef({
    transformIn,
    toInput,
    fromExternal,
  })

  const { path } = usePath({ path: pathProp, itemPath })

  const externalValue = useExternalValue<Value>({
    path,
    itemPath,
    value,
    transformers,
  })

  const dataContext = useContext(DataContext)
  dataContext?.setValueProps?.(path, props)

  const label = useMemo(() => {
    if (iterateIndex !== undefined) {
      return convertJsxToString(labelProp).replace(
        '{itemNr}',
        String(iterateIndex + 1)
      )
    }
    return labelProp
  }, [iterateIndex, labelProp])

  return {
    ...props,
    label,
    value: transformers.current.transformIn(
      transformers.current.toInput(externalValue)
    ),
  }
}
