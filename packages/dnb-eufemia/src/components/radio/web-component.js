/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Radio from './Radio'
export default Radio
export * from './Radio'

registerElement(Radio.tagName, Radio, Radio.defaultProps)
