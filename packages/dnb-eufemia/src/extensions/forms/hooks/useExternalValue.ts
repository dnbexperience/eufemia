import { useContext, useMemo } from 'react'
import pointer from '../utils/json-pointer'
import { FieldProps, Path } from '../types'
import DataContext from '../DataContext/Context'
import IterateElementContext from '../Iterate/IterateItemContext'

export type Props<Value> = {
  path?: Path | undefined
  itemPath?: Path
  value?: Value
  transformers?: React.MutableRefObject<{
    fromExternal: FieldProps<Value>['fromExternal']
  }>
  emptyValue?: FieldProps<Value>['emptyValue']
}

export default function useExternalValue<Value>(props: Props<Value>) {
  const {
    path,
    itemPath,
    value,
    transformers,
    emptyValue = undefined,
  } = props
  const { data } = useContext(DataContext) || {}
  const iterateItemContext = useContext(IterateElementContext)
  const inIterate = Boolean(iterateItemContext)
  const { value: iterateElementValue } = iterateItemContext || {}

  return useMemo(() => {
    if (value !== emptyValue) {
      // Value-prop sent directly to the field has highest priority, overriding any surrounding source
      return transformers?.current?.fromExternal?.(value) ?? emptyValue
    }

    if (inIterate && itemPath) {
      // This field is inside an iterate, and has a pointer from the base of the element being iterated
      if (itemPath === '/') {
        return iterateElementValue ?? emptyValue
      }

      if (pointer.has(iterateElementValue, itemPath)) {
        return pointer.get(iterateElementValue, itemPath) ?? emptyValue
      }
    }

    if (data && path) {
      // There is a surrounding data context and a path for where in the source to find the data
      if (path === '/') {
        return data ?? emptyValue
      }

      if (pointer.has(data, path)) {
        return pointer.get(data, path) ?? emptyValue
      }
    }

    return emptyValue
  }, [
    data,
    emptyValue,
    inIterate,
    itemPath,
    iterateElementValue,
    path,
    transformers,
    value,
  ])
}
