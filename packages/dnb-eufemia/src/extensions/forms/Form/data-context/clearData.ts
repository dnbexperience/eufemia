import { createSharedState } from '../../../../shared/helpers/useSharedState'
import { SharedAttachments } from '../../DataContext/Provider'

export default function clearData(id: string) {
  const sharedAttachments = createSharedState<SharedAttachments<unknown>>(
    id + '-attachments'
  )
  sharedAttachments.data.clearData?.()
}
