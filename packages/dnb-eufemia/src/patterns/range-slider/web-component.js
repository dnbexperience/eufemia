/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import RangeSlider from './RangeSlider'
export default RangeSlider
export * from './RangeSlider'

registerElement(RangeSlider.tagName, RangeSlider, RangeSlider.defaultProps)
