/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const Th = (p = {}) => (
  <E
    is="th"
    {...p}
    internalClass="dnb-table__th"
    skeleton_method="font-only"
  />
)
Th.tagName = 'dnb-table__th'

export default Th
