/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import ActionNav from './ActionNav'
export default ActionNav
export * from './ActionNav'

registerElement(ActionNav.tagName, ActionNav, ActionNav.defaultProps)
