import {
  SharedStateId,
  createReferenceKey,
  createSharedState,
} from '../../../../shared/helpers/useSharedState'
import { SharedAttachments } from '../../DataContext/Provider'

export default function clearData(id: SharedStateId) {
  const sharedAttachments = createSharedState<SharedAttachments<unknown>>(
    createReferenceKey(id, 'attachments')
  )
  sharedAttachments.data.clearData?.()
}
