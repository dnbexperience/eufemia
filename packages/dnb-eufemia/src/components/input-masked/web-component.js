/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import InputMasked from './InputMasked'
export default InputMasked
export * from './InputMasked'

registerElement(InputMasked.tagName, InputMasked, InputMasked.defaultProps)
