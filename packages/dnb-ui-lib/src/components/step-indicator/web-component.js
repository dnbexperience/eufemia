/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import StepIndicator from './StepIndicator'
export default StepIndicator
export * from './StepIndicator'

registerElement(
  StepIndicator.tagName,
  StepIndicator,
  StepIndicator.defaultProps
)
