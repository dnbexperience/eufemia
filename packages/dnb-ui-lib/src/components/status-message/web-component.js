/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import FormStatus from '../form-status/FormStatus'
export default FormStatus
export * from '../form-status/FormStatus'

registerElement(FormStatus.tagName, FormStatus, FormStatus.defaultProps)
