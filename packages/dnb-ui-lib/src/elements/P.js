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
  if (typeof modifier === 'string' && / /.test(modifier)) {
    modifier = modifier.split(/ /g)
  } else if (!Array.isArray(modifier)) {
    modifier = [modifier]
  }

  if (style_type) {
    modifier.push(style_type) // deprecated
  }

  if (medium === true) {
    modifier.push('medium')
  } else if (bold === true) {
    modifier.push('bold')
  }

  modifier = modifier.filter(Boolean).reduce((acc, cur) => {
    if (['x-small', 'small'].includes(cur)) {
      return `${acc} dnb-p__size--${cur}`
    }
    return `${acc} dnb-p--${cur}`
  }, '')

  if (size) {
    className = classnames(className, `dnb-p__size--${size}`)
  } else if (small === true) {
    className = classnames(className, 'dnb-p__size--small')
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
