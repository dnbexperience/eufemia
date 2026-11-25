import type { ReactNode } from 'react'
import type { SharedStateId } from '../../../../shared/helpers/useSharedState'
import {
  createSharedState,
  createReferenceKey,
  isServerEnvironment,
} from '../../../../shared/helpers/useSharedState'
import { warnOnServer } from '../DataContext/warnOnServer'

export type InfoOverlayContent =
  | 'success'
  | 'error'
  | ReactNode
  | undefined

export default function setContent(
  id: SharedStateId,
  content: InfoOverlayContent
) {
  // On the server, the process-wide store would share the content with other requests
  if (isServerEnvironment()) {
    warnOnServer(
      'Form.InfoOverlay.setContent',
      id,
      'has no effect during server rendering. Show the content in the browser, for example after submit.'
    )
    return // stop here
  }

  const sharedState = createSharedState(
    createReferenceKey(id, 'info-overlay')
  )
  sharedState.extend({ content })
}
