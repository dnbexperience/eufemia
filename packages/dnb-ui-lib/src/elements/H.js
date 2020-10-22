/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import E from './Element'
import { setNextLevel } from '../components/heading/HeadingHelpers'

class H extends React.PureComponent {
  constructor(props) {
    super(props)
    if (props.level === 'use') {
      setNextLevel(parseFloat(props.is.substr(1)))
    }
  }

  render() {
    let {
      is,
      level, // eslint-disable-line
      style_type,
      size,
      className,
      ...props
    } = this.props

    if (style_type) {
      size = style_type // deprecated
    }

    return (
      <E
        is={is}
        internalClass={classnames(size && `dnb-h--${size}`, className)}
        {...props}
      />
    )
  }
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
