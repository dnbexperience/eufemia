/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Button from './Button'
export default Button
export * from './Button'

registerElement(Button.tagName, Button, Button.defaultProps)
