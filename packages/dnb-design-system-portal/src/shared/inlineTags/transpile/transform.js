/** source: https://github.com/FormidableLabs/react-live/tree/master/src/utils/transpile */

import { transform as _transform } from 'buble'
import assign from 'core-js/fn/object/assign'

export const _poly = { assign }

const opts = {
  objectAssign: '_poly.assign',
  transforms: {
    dangerousForOf: true,
    dangerousTaggedTemplateString: true
  }
}

export default code => _transform(code, opts).code
