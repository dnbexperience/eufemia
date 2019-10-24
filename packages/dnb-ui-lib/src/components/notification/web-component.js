/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import notification from './notification'
export default notification
export * from './notification'

registerElement(
  notification.tagName,
  notification,
  notification.defaultProps
)
