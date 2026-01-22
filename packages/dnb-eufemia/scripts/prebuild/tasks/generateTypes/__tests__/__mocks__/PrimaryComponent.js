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

const PrimaryComponent = (props) => {
  const {
    boolean = null,
    number = null,
    spacing = null,
    top = null,
    secondaryFoo,
    secondarySpacing,
    children = null,
  } = props

  return [
    boolean,
    number,
    spacing,
    top,
    secondaryFoo,
    secondarySpacing,
    children,
  ]
}

PrimaryComponent.propTypes = {
  boolean: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  spacing: PropTypes.shape(primaryPropTypes),
  top: primaryPropTypes.top,
  ...primaryPropTypes,
  ...secondaryPropTypes,
  ...ClassComponent.propTypes,
  secondaryFoo: secondaryPropTypes.secondary,
  secondarySpacing: PropTypes.shape(secondaryPropTypes),

  children: PropTypes.node,
}

PrimaryComponent.defaultProps = {
  boolean: null,
  number: null,

  spacing: null,
  top: null,
  ...primaryDefaultProps,
  ...secondaryDefaultProps,
  ...ClassComponent.defaultProps,

  children: null,
}

PrimaryComponent.Secondary = SecondaryComponent
PrimaryComponent.SecondaryDuplication = SecondaryComponent

export default PrimaryComponent

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
  secondaryFoo: secondaryPropTypes.secondary,
  secondarySpacing: PropTypes.shape(secondaryPropTypes),

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
