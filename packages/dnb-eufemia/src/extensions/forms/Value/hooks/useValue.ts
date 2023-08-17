import { useContext, useMemo } from 'react'
import pointer from 'json-pointer'
import DataContext from '../../DataContext'
import type { ValueProps } from '../../value-types'

export default function useValue<Props extends ValueProps<any>>(
  props: Props
): Props {
  const { path } = props
  const dataContext = useContext(DataContext.Context)

  if (path && path.substring(0, 1) !== '/') {
    throw new Error(
      'Invalid path. Input path JSON Pointers  must be from root (starting with a /).'
    )
  }

  const value = useMemo(() => {
    return (
      props.value ??
      (dataContext.data &&
      path !== undefined &&
      pointer.has(dataContext.data, path)
        ? pointer.get(dataContext.data, path)
        : undefined)
    )
  }, [path, props.value, dataContext.data])

  return {
    ...props,
    value,
  }
}
