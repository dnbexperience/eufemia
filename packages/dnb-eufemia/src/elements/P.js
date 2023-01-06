/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'

const P = ({
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
      as={element}
      {...props}
      className={classnames('dnb-p', modifier, className)}
    />
  )
}
P.tagName = 'dnb-p'
P.propTypes = {
  ...spacingPropTypes,

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
    'xx-large',
  ]),
  modifier: PropTypes.string,
  children: PropTypes.node,
}
P.defaultProps = {
  element: 'p',
  className: null,
  small: null,
  medium: null,
  bold: null,
  size: null,
  modifier: null,
  children: null,
}
export default P
