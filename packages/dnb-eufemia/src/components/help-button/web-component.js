/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import HelpButton from './HelpButton'
export default HelpButton
export * from './HelpButton'

registerElement(HelpButton?.tagName, HelpButton, HelpButton.defaultProps)
