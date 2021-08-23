/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import GlobalStatus from './GlobalStatus'
export default GlobalStatus
export * from './GlobalStatus'

registerElement(
  GlobalStatus?.tagName,
  GlobalStatus,
  GlobalStatus.defaultProps
)
