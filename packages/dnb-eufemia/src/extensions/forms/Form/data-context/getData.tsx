import pointer from 'json-pointer'
import {
  SharedStateId,
  createSharedState,
} from '../../../../shared/helpers/useSharedState'
import type { FilterDataHandler } from '../../DataContext/Context'
import type { Path } from '../../types'
import type {
  UseDataReturnGetValue,
  UseDataReturnFilterData,
} from './useData'

type SharedAttachment<Data> = {
  filterDataHandler: FilterDataHandler<Data>
}

type SetDataReturn<Data> = {
  data: Data
  getValue: UseDataReturnGetValue<Data>
  filterData: UseDataReturnFilterData<Data>
}

export default function getData<Data>(
  id: SharedStateId
): SetDataReturn<Data> {
  const sharedState = createSharedState(id)
  const sharedAttachments = createSharedState<SharedAttachment<Data>>(
    id + '-attachments'
  )

  const data = sharedState.get() as Data

  const filterData: SetDataReturn<Data>['filterData'] = (filter) =>
    sharedAttachments.data?.filterDataHandler?.(data, filter)

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
  }
}
