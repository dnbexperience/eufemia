/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import FieldsetDescription from './FieldsetDescription'
export default FieldsetDescription
export * from './FieldsetDescription'

registerElement(
  FieldsetDescription.tagName,
  FieldsetDescription,
  FieldsetDescription.defaultProps
)
