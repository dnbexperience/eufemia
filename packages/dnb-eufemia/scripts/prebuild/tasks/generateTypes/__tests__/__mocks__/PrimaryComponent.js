/**
 * Test mock file
 *
 */

import React from 'react'
import SecondaryComponent from './SecondaryComponent'

export const primaryDefaultProps = {
  space: null,
  top: null,
  right: null,
  bottom: null,
  left: null,
}

export default class PrimaryComponent extends React.PureComponent {
  static Secondary = SecondaryComponent
  static SecondaryDuplication = SecondaryComponent

  render() {
    return [
      this.props.boolean,
      this.props.number,
      this.props.spacing,
      this.props.top,
      this.props.secondaryFoo,
      this.props.secondarySpacing,
      this.props.children,
    ]
  }
}
