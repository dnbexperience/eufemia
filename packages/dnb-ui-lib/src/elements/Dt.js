/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import E from './Element'

const Dt = (p = {}) => <E is="dt" {...p} />
Dt.tagName = 'dnb-dt'
Dt.propTypes = {
  children: PropTypes.node
}
Dt.defaultProps = {
  children: null
}

export default Dt
