/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import FormRow from './FormRow'
export default FormRow
export * from './FormRow'

registerElement(FormRow?.tagName, FormRow, FormRow.defaultProps)
