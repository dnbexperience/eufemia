/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import FormLabel from './FormLabel'
export default FormLabel
export * from './FormLabel'

registerElement(FormLabel.tagName, FormLabel, FormLabel.defaultProps)
