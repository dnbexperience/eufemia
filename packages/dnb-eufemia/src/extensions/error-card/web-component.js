/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import ErrorCard from './ErrorCard'
export default ErrorCard
export * from './ErrorCard'

registerElement(ErrorCard)
