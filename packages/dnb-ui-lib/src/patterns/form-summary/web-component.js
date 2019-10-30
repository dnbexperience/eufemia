/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import FormSummary from './FormSummary'
export default FormSummary
export * from './FormSummary'

registerElement(FormSummary.tagName, FormSummary, FormSummary.defaultProps)
