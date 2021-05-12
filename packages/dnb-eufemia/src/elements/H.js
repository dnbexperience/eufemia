/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'
import { setNextLevel } from '../components/heading/HeadingHelpers'

export default class H extends React.PureComponent {
  static propTypes = {
    ...spacingPropTypes,

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
      'x-small',
    ]),
    style_type: PropTypes.string, // deprecated
    children: PropTypes.node,
  }
  static defaultProps = {
    className: null,
    level: null,
    is: 'h1',
    size: 'xx-large',
    style_type: null, // deprecated
    children: null,
  }

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
