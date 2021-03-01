/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
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
Td.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node
}
Td.defaultProps = {
  children: null
}

export default Td
