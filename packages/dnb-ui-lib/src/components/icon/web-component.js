/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Icon from './Icon'
export default Icon
export * from './Icon'

registerElement(Icon.tagName, Icon, Icon.defaultProps)
