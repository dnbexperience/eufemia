/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'

const Dt = (p = {}) => <E is="dt" {...p} />
Dt.tagName = 'dnb-dt'
Dt.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node
}
Dt.defaultProps = {
  children: null
}

export default Dt
