/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import E from './Element'

const H = ({ size, style_type, className, ...props }) => {
  if (style_type) {
    size = style_type // deprecated
  }
  return (
    <E
      is="h1"
      {...props}
      className={classnames(size && `dnb-h--${size}`, className)}
    />
  )
}
H.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf([
    'xx-large',
    'x-large',
    'large',
    'medium',
    'basis',
    'small',
    'x-small'
  ]),
  style_type: PropTypes.string // deprecated
}
H.defaultProps = {
  className: null,
  size: 'xx-large',
  style_type: null // deprecated
}
export default H
