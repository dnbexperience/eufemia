/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import E from './Element'
import { setNextLevel } from '../components/heading/HeadingProvider'

const H = ({ is, level, style_type, size, className, ...props }) => {
  if (style_type) {
    size = style_type // deprecated
  }
  if (level === 'auto') {
    setNextLevel(parseFloat(is.substr(1)))
  }
  return (
    <E
      is={is}
      {...props}
      className={classnames(size && `dnb-h--${size}`, className)}
      hasTagClass
    />
  )
}
H.propTypes = {
  className: PropTypes.string,
  is: PropTypes.string,
  level: PropTypes.string,
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
  level: null,
  is: 'h1',
  size: 'xx-large',
  style_type: null // deprecated
}
export default H
