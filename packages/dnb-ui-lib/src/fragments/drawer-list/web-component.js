/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import DrawerList from './DrawerList'
export default DrawerList
export * from './DrawerList'

registerElement(DrawerList.tagName, DrawerList, DrawerList.defaultProps)
