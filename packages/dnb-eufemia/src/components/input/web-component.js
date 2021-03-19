/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Input from './Input'
export default Input
export * from './Input'

registerElement(Input.tagName, Input, Input.defaultProps)
