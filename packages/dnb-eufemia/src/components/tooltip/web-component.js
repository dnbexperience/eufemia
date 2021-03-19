/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Tooltip from './Tooltip'
export default Tooltip
export * from './Tooltip'

registerElement(Tooltip.tagName, Tooltip, Tooltip.defaultProps)
