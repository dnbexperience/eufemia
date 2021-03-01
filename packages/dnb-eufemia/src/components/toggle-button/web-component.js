/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import ToggleButton from './ToggleButton'
export default ToggleButton
export * from './ToggleButton'

registerElement(
  ToggleButton.tagName,
  ToggleButton,
  ToggleButton.defaultProps
)
