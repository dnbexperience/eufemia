/**
 * Test mock file
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import SecondaryComponent, {
  secondaryDefaultProps,
  secondaryPropTypes,
} from './SecondaryComponent'
import ClassComponent from './ClassComponent'

export const primaryPropTypes = {
  top: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  right: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  bottom: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  left: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
}

export const primaryDefaultProps = {
  space: null,
  top: null,
  right: null,
  bottom: null,
  left: null,
}

export default class PrimaryComponent extends React.PureComponent {
  static propTypes = {
    boolean: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    spacing: PropTypes.shape(primaryPropTypes),
    top: primaryPropTypes.top,
    ...primaryPropTypes,
    ...secondaryPropTypes,
    ...ClassComponent.propTypes,
    secondary_foo: secondaryPropTypes.secondary,
    secondary_spacing: PropTypes.shape(secondaryPropTypes),

    children: PropTypes.node,
  }

  static defaultProps = {
    boolean: null,
    number: null,

    spacing: null,
    top: null,
    ...primaryDefaultProps,
    ...secondaryDefaultProps,
    ...ClassComponent.defaultProps,

    children: null,
  }

  static Secondary = SecondaryComponent
  static SecondaryDuplication = SecondaryComponent

  render() {
    return [
      this.props.boolean,
      this.props.number,
      this.props.spacing,
      this.props.top,
      this.props.secondary_foo,
      this.props.secondary_spacing,
      this.props.children,
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
  top: primaryPropTypes.top,
  ...primaryPropTypes,
  ...secondaryPropTypes,
  secondary_foo: secondaryPropTypes.secondary,
  secondary_spacing: PropTypes.shape(secondaryPropTypes),

  children: PropTypes.node,
}
Element.defaultProps = {
  boolean: null,
  number: null,

  spacing: null,
  top: null,
  ...primaryDefaultProps,

  children: null,
}
