/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Slider from './Slider'
export default Slider
export * from './Slider'

registerElement(Slider.tagName, Slider, Slider.defaultProps)
