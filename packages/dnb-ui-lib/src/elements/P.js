/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import E from './Element'

const P = ({ style_type, className, ...p }) => {
  if (style_type) {
    if (/ /.test(style_type)) {
      style_type = style_type.split(/ /g).reduce((acc, cur) => {
        return `${acc} dnb-p--${cur}`
      }, '')
      className = classnames(style_type, className)
    } else {
      className = classnames(`dnb-p--${style_type}`, className)
    }
  }
  return <E is="p" {...p} className={className} />
}
P.tagName = 'dnb-p'
P.propTypes = {
  className: PropTypes.string,
  style_type: PropTypes.string
}
P.defaultProps = {
  className: null,
  style_type: null
}
export default P
