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
    as: PropTypes.string,

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
    children: PropTypes.node,
  }
  static defaultProps = {
    className: null,
    level: null,
    as: 'h1',
    size: 'xx-large',
    children: null,
  }

  constructor(props) {
    super(props)
    if (props.level === 'use') {
      setNextLevel(parseFloat(String(props.as || props.is).substr(1)))
    }
  }

  render() {
    let {
      as,
      is,
      level, // eslint-disable-line
      size,
      className,
      ...props
    } = this.props

    return (
      <E
        as={as || is}
        internalClass={classnames(size && `dnb-h--${size}`, className)}
        {...props}
      />
    )
  }
}
