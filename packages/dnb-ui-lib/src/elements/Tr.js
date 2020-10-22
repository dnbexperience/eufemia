/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const Tr = (p = {}) => (
  <E
    is="tr"
    {...p}
    internalClass="dnb-table__tr"
    skeleton_method="font-only"
  />
)
Tr.tagName = 'dnb-table__tr'

export default Tr
