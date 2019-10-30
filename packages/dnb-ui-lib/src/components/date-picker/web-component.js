/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import DatePicker from './DatePicker'
export default DatePicker
export * from './DatePicker'

registerElement(DatePicker.tagName, DatePicker, DatePicker.defaultProps)
