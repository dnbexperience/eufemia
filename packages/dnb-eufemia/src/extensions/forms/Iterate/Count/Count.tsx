import { useCallback } from 'react'
import pointer from '../../utils/json-pointer'
import { Path } from '../../types'
import { useData, getData } from '../../Form'
import { SharedStateId } from '../../../../shared/helpers/useSharedState'

export type Props = {
  /**
   * The path (JSON Pointer) to the array or object to count.
   */
  path: Path

  /**
   * A Form.Handler or DataContext `id` for when called outside of the context.
   */
  id?: SharedStateId

  /**
   * A filter function to filter the data before counting.
   */
  filter?: (item: unknown) => boolean
}

export function Count(props: Props) {
  const { data } = useData(props.id)
  return countData(data, props)
}

function countData(data: unknown, { path, filter }: Props) {
  if (pointer.has(data, path)) {
    const value = pointer.get(data, path)
    if (Array.isArray(value)) {
      return filter ? value.filter(filter).length : value.length
    } else if (typeof value === 'object' && value) {
      return filter
        ? Object.entries(value).filter(filter).length
        : Object.keys(value).length
    }
  }

  return NaN
}

export function count(props: Props) {
  const { data } = getData(props.id)
  return countData(data, props)
}

export function useCount(id: SharedStateId = undefined) {
  const { data } = useData(id)

  const count = useCallback(
    (path: Props['path'], filter?: Props['filter']) => {
      return countData(data, { path, filter })
    },
    [data]
  )

  return { count }
}
