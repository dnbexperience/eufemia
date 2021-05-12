/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
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
Tr.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node,
}
Tr.defaultProps = {
  children: null,
}

export default Tr
