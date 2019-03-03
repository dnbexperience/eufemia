/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import E from './index'

const Img = p => <E is="img" {...p} />
Img.propTypes = {
  src: PropTypes.string.isRequired,
  children: PropTypes.node
}
Img.defaultProps = {
  children: null
}

export default Img
