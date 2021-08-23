/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import NumberFormat from './NumberFormat'
export default NumberFormat
export * from './NumberFormat'

registerElement(
  NumberFormat?.tagName,
  NumberFormat,
  NumberFormat.defaultProps
)
