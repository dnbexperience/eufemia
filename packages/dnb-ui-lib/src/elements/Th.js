/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
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
Th.propTypes = {
  children: PropTypes.node
}
Th.defaultProps = {
  children: null
}

export default Th
