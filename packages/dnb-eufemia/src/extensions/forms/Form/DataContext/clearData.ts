import type { SharedStateId } from '../../../../shared/helpers/useSharedState'
import {
  createReferenceKey,
  createSharedState,
  isServerEnvironment,
} from '../../../../shared/helpers/useSharedState'
import type { SharedAttachments } from '../../DataContext/Provider'
import { warnOnServer } from './warnOnServer'

export default function clearData(id: SharedStateId) {
  // On the server, the form data lives in the store of each render, which this helper cannot reach
  if (isServerEnvironment()) {
    warnOnServer(
      'Form.clearData',
      id,
      'has no effect during server rendering. Each server render starts without data.'
    )
    return // stop here
  }

  const sharedAttachments = createSharedState<SharedAttachments<unknown>>(
    createReferenceKey(id, 'attachments')
  )
  sharedAttachments.data?.clearData?.()
}
