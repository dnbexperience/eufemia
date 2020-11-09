/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import E from './Element'

const Div = (p) => <E is="div" skeleton_method="shape" {...p} />
Div.tagName = 'dnb-div'
Div.propTypes = {
  children: PropTypes.node
}
Div.defaultProps = {
  children: null
}

export default Div
