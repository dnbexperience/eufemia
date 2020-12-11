/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import E from './Element'

const Dd = (p = {}) => <E is="dd" {...p} />
Dd.tagName = 'dnb-dd'
Dd.propTypes = {
  children: PropTypes.node
}
Dd.defaultProps = {
  children: null
}

export default Dd
