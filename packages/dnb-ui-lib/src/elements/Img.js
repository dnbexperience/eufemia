/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import E from './Element'

const Img = p => <E is="img" {...p} />
Img.tagName = 'dnb-img'
Img.propTypes = {
  src: PropTypes.string.isRequired,
  children: PropTypes.node
}
Img.defaultProps = {
  children: null
}

export default Img
