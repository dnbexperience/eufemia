/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import GlobalError from './GlobalError'
export default GlobalError
export * from './GlobalError'

registerElement(GlobalError.tagName, GlobalError, GlobalError.defaultProps)
