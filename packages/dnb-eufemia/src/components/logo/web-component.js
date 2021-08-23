/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Logo from './Logo'
export default Logo
export * from './Logo'

registerElement(Logo?.tagName, Logo, Logo.defaultProps)
