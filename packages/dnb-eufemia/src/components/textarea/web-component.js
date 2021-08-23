/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Textarea from './Textarea'
export default Textarea
export * from './Textarea'

registerElement(Textarea?.tagName, Textarea, Textarea.defaultProps)
