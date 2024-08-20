import { useContext, useMemo } from 'react'
import pointer from 'json-pointer'
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
  const dataContext = useContext(DataContext)
  const iterateItemContext = useContext(IterateElementContext)
  const inIterate = Boolean(iterateItemContext)
  const { value: iterateElementValue } = iterateItemContext ?? {}

  return useMemo(() => {
    if (value !== emptyValue) {
      // Value-prop sent directly to the field has highest priority, overriding any surrounding source
      return transformers?.current?.fromExternal?.(value)
    }

    if (inIterate && itemPath) {
      // This field is inside an iterate, and has a pointer from the base of the element being iterated
      if (itemPath === '/') {
        return iterateElementValue
      }

      return pointer.has(iterateElementValue, itemPath)
        ? pointer.get(iterateElementValue, itemPath)
        : emptyValue
    }

    if (dataContext.data && path) {
      // There is a surrounding data context and a path for where in the source to find the data
      if (path === '/') {
        return dataContext.data
      }

      return pointer.has(dataContext.data, path)
        ? pointer.get(dataContext.data, path)
        : emptyValue
    }

    return emptyValue
  }, [
    dataContext.data,
    emptyValue,
    inIterate,
    itemPath,
    iterateElementValue,
    path,
    transformers,
    value,
  ])
}
