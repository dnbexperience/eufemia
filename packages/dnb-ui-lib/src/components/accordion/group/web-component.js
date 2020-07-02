/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../../shared/custom-element'
import AccordionGroup from '../AccordionGroup'
export default AccordionGroup
export * from '../AccordionGroup'

registerElement(
  AccordionGroup.tagName,
  AccordionGroup,
  AccordionGroup.defaultProps
)
