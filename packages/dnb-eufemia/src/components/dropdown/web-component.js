/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Dropdown from './Dropdown'
export default Dropdown
export * from './Dropdown'

registerElement(Dropdown?.tagName, Dropdown, Dropdown.defaultProps)
