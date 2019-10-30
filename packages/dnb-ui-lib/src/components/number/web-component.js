/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Number from './Number'
export default Number
export * from './Number'

registerElement(Number.tagName, Number, Number.defaultProps)
