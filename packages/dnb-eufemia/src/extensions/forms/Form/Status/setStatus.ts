import {
  SharedStateId,
  createSharedState,
} from '../../../../shared/helpers/useSharedState'

export type Status = 'success' | 'error' | undefined

export default function setStatus(id: SharedStateId, status: Status) {
  const sharedState = createSharedState(id)
  sharedState.extend({ activeStatus: status })
}
