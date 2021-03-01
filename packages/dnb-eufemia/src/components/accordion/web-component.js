/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Accordion from './Accordion'
export default Accordion
export * from './Accordion'

registerElement(Accordion.tagName, Accordion, Accordion.defaultProps)
