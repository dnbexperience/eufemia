/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../../shared/custom-element'
import ToggleButtonGroup from '../ToggleButtonGroup'
export default ToggleButtonGroup
export * from '../ToggleButtonGroup'

registerElement(
  ToggleButtonGroup.tagName,
  ToggleButtonGroup,
  ToggleButtonGroup.defaultProps
)
