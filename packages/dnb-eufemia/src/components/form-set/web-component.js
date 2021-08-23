/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import FormSet from './FormSet'
export default FormSet
export * from './FormSet'

registerElement(FormSet?.tagName, FormSet, FormSet.defaultProps)
