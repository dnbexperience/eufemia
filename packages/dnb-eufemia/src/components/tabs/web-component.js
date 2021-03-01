/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Tabs from './Tabs'
export default Tabs
export * from './Tabs'

registerElement(Tabs.tagName, Tabs, Tabs.defaultProps)
