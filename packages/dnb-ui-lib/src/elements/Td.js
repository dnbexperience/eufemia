/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'

const Td = (p = {}) => (
  <E
    is="td"
    {...p}
    internalClass="dnb-table__td"
    skeleton_method="font-only"
  />
)
Td.tagName = 'dnb-table__td'

export default Td
