/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Form from './Form'
export default Form
export * from './Form'

registerElement(Form.tagName, Form, Form.defaultProps)
