import {
  SharedStateId,
  createSharedState,
} from '../../../../shared/helpers/useSharedState'

export default function setData<Data>(id: SharedStateId, data: Data) {
  const sharedState = createSharedState(id)
  sharedState.extend(data)
}
