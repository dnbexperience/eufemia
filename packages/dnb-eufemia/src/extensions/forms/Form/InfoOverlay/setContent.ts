import type {
  SharedStateId} from '../../../../shared/helpers/useSharedState';
import {
  createSharedState,
  createReferenceKey,
} from '../../../../shared/helpers/useSharedState'

export type InfoOverlayContent =
  | 'success'
  | 'error'
  | React.ReactNode
  | undefined

export default function setContent(
  id: SharedStateId,
  content: InfoOverlayContent
) {
  const sharedState = createSharedState(
    createReferenceKey(id, 'info-overlay')
  )
  sharedState.extend({ content })
}
