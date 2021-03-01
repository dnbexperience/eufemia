/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import LineTitle from './LineTitle'
export default LineTitle
export * from './LineTitle'

registerElement(LineTitle.tagName, LineTitle, LineTitle.defaultProps)
