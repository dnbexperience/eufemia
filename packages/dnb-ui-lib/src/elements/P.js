/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import E from './Element'

const P = ({
  style_type,
  modifier,
  element,
  className,
  small,
  medium,
  bold,
  size,

  ...props
}) => {
  if (style_type) {
    modifier = style_type // deprecated
  }

  if (typeof modifier === 'string' && / /.test(modifier)) {
    modifier = modifier.split(/ /g)
  } else if (!modifier) {
    modifier = []
  }

  if (size) {
    modifier.push(size)
  } else if (small === true) {
    modifier.push('small')
  } else if (medium === true) {
    modifier.push('medium')
  }
  if (bold === true) {
    modifier.push('bold')
  }

  if (Array.isArray(modifier)) {
    modifier = modifier.reduce((acc, cur) => `${acc} dnb-p--${cur}`, '')
  } else {
    modifier = `dnb-p--${modifier}`
  }

  return (
    <E
      is={element}
      {...props}
      className={classnames('dnb-p', modifier, className)}
    />
  )
}
P.tagName = 'dnb-p'
P.propTypes = {
  element: PropTypes.node,
  className: PropTypes.string,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  bold: PropTypes.bool,
  size: PropTypes.oneOf([
    'x-small',
    'small',
    'basis',
    'medium',
    'large',
    'x-large',
    'xx-large'
  ]),
  style_type: PropTypes.string, // deprecated
  modifier: PropTypes.string
}
P.defaultProps = {
  element: 'p',
  className: null,
  small: null,
  medium: null,
  bold: null,
  size: null,
  style_type: null, // deprecated
  modifier: null
}
export default P
