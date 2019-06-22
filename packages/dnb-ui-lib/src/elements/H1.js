/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import E from './Element'

const H1 = ({ style_type, className, ...p }) => {
  if (style_type) {
    className = classnames(`dnb-h1--${style_type}`, className)
  }
  return <E is="h1" {...p} className={className} />
}
H1.tagName = 'dnb-h1'
H1.propTypes = {
  className: PropTypes.string,
  style_type: PropTypes.string
}
H1.defaultProps = {
  className: null,
  style_type: null
}
export default H1
