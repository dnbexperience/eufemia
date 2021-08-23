/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../../shared/custom-element'
import RadioGroup from '../RadioGroup'
export default RadioGroup
export * from '../RadioGroup'

registerElement(RadioGroup?.tagName, RadioGroup, RadioGroup.defaultProps)
