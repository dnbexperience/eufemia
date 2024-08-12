import { createSharedState } from '../../../../shared/helpers/useSharedState'

export default function clearData(id: string) {
  const sharedAttachments = createSharedState(id + '-attachments')
  sharedAttachments.set({})

  const sharedData = createSharedState(id)
  sharedData.update({ resetForm: true })
}
