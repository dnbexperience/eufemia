/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import ProgressIndicator from './ProgressIndicator'
export default ProgressIndicator
export * from './ProgressIndicator'

registerElement(
  ProgressIndicator?.tagName,
  ProgressIndicator,
  ProgressIndicator.defaultProps
)
