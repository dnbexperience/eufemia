/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import FormStatus from './FormStatus'
export default FormStatus
export * from './FormStatus'

registerElement(FormStatus?.tagName, FormStatus, FormStatus.defaultProps)
