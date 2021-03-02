/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Heading from './Heading'
export default Heading
export * from './Heading'

registerElement(Heading.tagName, Heading, Heading.defaultProps)
