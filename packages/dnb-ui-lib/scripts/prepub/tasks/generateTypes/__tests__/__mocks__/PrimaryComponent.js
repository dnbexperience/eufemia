/**
 * Test mock file
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  defaultProps as secondaryDefaultProps,
  propTypes as secondaryPropTypes
} from './SecondaryComponent'

export const primaryPropTypes = {
  top: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  right: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  bottom: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  left: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ])
}

export const primaryDefaultProps = {
  space: null,
  top: null,
  right: null,
  bottom: null,
  left: null
}

export default class PrimaryComponent extends React.PureComponent {
  static propTypes = {
    boolean: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    spacing: PropTypes.shape(primaryPropTypes),
    foo: primaryPropTypes.top,
    ...primaryPropTypes,
    ...secondaryPropTypes,
    secondary_foo: secondaryPropTypes.secondary,
    secondary_spacing: PropTypes.shape(secondaryPropTypes),

    children: PropTypes.node
  }

  static defaultProps = {
    boolean: null,
    number: null,

    spacing: null,
    foo: null,
    ...primaryDefaultProps,
    ...secondaryDefaultProps,

    children: null
  }

  render() {
    return [
      this.props.boolean,
      this.props.number,
      this.props.spacing,
      this.props.foo,
      this.props.secondary_foo,
      this.props.secondary_spacing,
      this.props.children
    ]
  }
}

const Element = () => {
  return null
}
Element.propTypes = {
  boolean: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  spacing: PropTypes.shape(primaryPropTypes),
  foo: primaryPropTypes.top,
  ...primaryPropTypes,
  ...secondaryPropTypes,
  secondary_foo: secondaryPropTypes.secondary,
  secondary_spacing: PropTypes.shape(secondaryPropTypes),

  children: PropTypes.node
}
Element.defaultProps = {
  boolean: null,
  number: null,

  spacing: null,
  foo: null,
  ...primaryDefaultProps,

  children: null
}
