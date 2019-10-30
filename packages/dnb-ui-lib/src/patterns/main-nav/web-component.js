/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import MainNav from './MainNav'
export default MainNav
export * from './MainNav'

registerElement(MainNav.tagName, MainNav, MainNav.defaultProps)
