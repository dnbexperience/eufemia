/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Section from './Section'
export default Section
export * from './Section'

registerElement(Section.tagName, Section, Section.defaultProps)
