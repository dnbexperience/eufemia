/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Switch from './Switch'
export default Switch
export * from './Switch'

registerElement(Switch.tagName, Switch, Switch.defaultProps)
