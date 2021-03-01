/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import ScrollView from './ScrollView'
export default ScrollView
export * from './ScrollView'

registerElement(ScrollView.tagName, ScrollView, ScrollView.defaultProps)
