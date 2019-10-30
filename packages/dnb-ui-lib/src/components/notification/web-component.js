/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Notification from './Notification'
export default Notification
export * from './Notification'

registerElement(
  Notification.tagName,
  Notification,
  Notification.defaultProps
)
