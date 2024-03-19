import {
  SharedStateId,
  createSharedState,
} from '../../../../shared/helpers/useSharedState'
import type {
  FilterData,
  FilterDataHandler,
} from '../../DataContext/Context'

type SharedAttachment<Data> = {
  filterDataHandler: FilterDataHandler<Data>
}

type SetDataReturn<Data> = {
  data: Data
  filterData: (filterDataHandler: FilterData) => Partial<Data>
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

  return {
    data,
    filterData,
  }
}
