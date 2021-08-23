/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Checkbox from './Checkbox'
export default Checkbox
export * from './Checkbox'

registerElement(Checkbox?.tagName, Checkbox, Checkbox.defaultProps)
