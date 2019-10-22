/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import ViewTitle from './ViewTitle'
export default ViewTitle
export * from './ViewTitle'

registerElement(ViewTitle.tagName, ViewTitle, ViewTitle.defaultProps)
