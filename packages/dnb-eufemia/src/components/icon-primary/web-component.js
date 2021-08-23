/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import IconPrimary from './IconPrimary'
export default IconPrimary
export * from './IconPrimary'

registerElement(
  IconPrimary?.tagName,
  IconPrimary,
  IconPrimary.defaultProps
)
