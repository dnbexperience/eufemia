/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import MessageBubble from './MessageBubble'
export default MessageBubble
export * from './MessageBubble'

registerElement(
  MessageBubble.tagName,
  MessageBubble,
  MessageBubble.defaultProps
)
