/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import DescriptionList from './DescriptionList'
export default DescriptionList
export * from './DescriptionList'

registerElement(
  DescriptionList.tagName,
  DescriptionList,
  DescriptionList.defaultProps
)
