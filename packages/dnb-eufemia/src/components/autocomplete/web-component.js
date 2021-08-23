/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import Autocomplete from './Autocomplete'
export default Autocomplete
export * from './Autocomplete'

registerElement(
  Autocomplete?.tagName,
  Autocomplete,
  Autocomplete.defaultProps
)
