/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Modal from './Modal'
export default Modal
export * from './Modal'

registerElement(Modal?.tagName, Modal, Modal.defaultProps)
