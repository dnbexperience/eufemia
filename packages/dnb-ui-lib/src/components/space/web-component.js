/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Space from './Space'
export default Space
export * from './Space'

registerElement(Space.tagName, Space, Space.defaultProps)
