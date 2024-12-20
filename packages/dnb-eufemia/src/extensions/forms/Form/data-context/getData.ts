import pointer from '../../utils/json-pointer'
import {
  SharedStateId,
  createReferenceKey,
  createSharedState,
} from '../../../../shared/helpers/useSharedState'
import { SharedAttachments } from '../../DataContext/Provider'
import type { Path } from '../../types'
import type {
  UseDataReturnGetValue,
  UseDataReturnFilterData,
  UseDataReturnVisibleData,
} from './useData'

type SetDataReturn<Data> = {
  data: Data
  getValue: UseDataReturnGetValue<Data>
  filterData: UseDataReturnFilterData<Data>
  reduceToVisibleFields: UseDataReturnVisibleData<Data>
}

export default function getData<Data>(
  id: SharedStateId
): SetDataReturn<Data> {
  const sharedState = createSharedState(id)
  const sharedAttachments = createSharedState<SharedAttachments<Data>>(
    createReferenceKey(id, 'attachments')
  )

  const data = sharedState.get() as Data

  const filterData: SetDataReturn<Data>['filterData'] = (filter) =>
    sharedAttachments.data?.filterDataHandler?.(data, filter)

  const reduceToVisibleFields: SetDataReturn<Data>['reduceToVisibleFields'] =
    (data, options) =>
      sharedAttachments.data?.visibleDataHandler?.(data, options)

  const getValue = (path: Path) => {
    if (pointer.has(data, path)) {
      return pointer.get(data, path)
    }

    return undefined
  }

  return {
    data,
    getValue,
    filterData,
    reduceToVisibleFields,
  }
}
