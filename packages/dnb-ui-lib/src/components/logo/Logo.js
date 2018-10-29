/**
 * Web Logo Component
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { registerElement } from '../../shared/component-helper'
// import './style/dnb-logo.scss' // no good solution to import the style here

const renderProps = {}

export const propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  class: PropTypes.string,
  /** React props */
  className: PropTypes.string
  // Web Component props
}

export const defaultProps = {
  size: null,
  width: null,
  height: null,
  color: null,
  class: null,
  /** React props */
  className: null,
  // Web Component props
  ...renderProps
}

export default class Logo extends Component {
  static tagName = 'dnb-logo'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent() {
    registerElement(Logo.tagName, Logo, defaultProps)
  }

  render() {
    const { className, class: _className, ...rest } = this.props

    const rootParams = {
      className: classnames('dnb-logo', className, _className)
    }

    const svgParams = {
      viewBox: '0 0 24 20',
      alt: 'DNB Logo',
      ...rest
    }
    if (parseFloat(this.props.size) > -1)
      svgParams['width'] = this.props.size
    if (parseFloat(this.props.width) > -1)
      svgParams['width'] = this.props.width
    if (parseFloat(this.props.height) > -1)
      svgParams['height'] = this.props.height
    if (this.props.color) svgParams['color'] = this.props.color

    return (
      <span {...rootParams}>
        <svg {...svgParams}>
          <path d="M9.1,18.9V8.4c0-0.1,0-0.2,0.1-0.2c0,0,0,0,0.1,0c0.1,0,0.1,0,0.2,0.1l4.7,6V5.1h0.7v10.5c0,0.1,0,0.2-0.1,0.2c0,0,0,0-0.1,0c-0.1,0-0.1,0-0.2-0.1L9.8,9.8v9.1H9.1z M16.8,15.8c-0.1,0-0.2-0.1-0.2-0.2l0,0V8.4c0-0.1,0.1-0.2,0.2-0.2l0,0H19c0.8,0,1.3,0.1,1.7,0.4c0.5,0.3,0.7,0.9,0.7,1.6c0,0.6-0.2,1.1-0.6,1.5l0,0l0,0c0.1,0.1,0.3,0.1,0.4,0.2c0.5,0.4,0.7,0.9,0.7,1.5c0,0.4-0.1,0.7-0.2,1.1c-0.1,0.3-0.3,0.5-0.6,0.7c-0.6,0.4-1.2,0.5-1.9,0.5H16.8z M17.3,15.1h2c2,0,2-1.2,2-1.6c0-0.8-0.7-1.4-1.7-1.4h-2.3L17.3,15.1L17.3,15.1z M17.3,11.5h2.3c0.3,0,1.2-0.1,1.2-1.2c0-0.6-0.2-0.9-0.4-1C19.9,9,19.5,8.9,19,8.9h-1.7L17.3,11.5L17.3,11.5z M2.2,15.8c-0.1,0-0.2-0.1-0.2-0.2l0,0V8.4c0-0.1,0.1-0.2,0.2-0.2l0,0h2.1c0.5,0,0.9,0.1,1.3,0.2c0.5,0.2,0.9,0.5,1.2,0.9c0.8,0.9,0.8,2.2,0.8,2.7c0,0.6-0.1,1.7-0.8,2.6c-0.3,0.4-0.7,0.7-1.2,0.9c-0.4,0.2-0.9,0.2-1.3,0.2H2.2z M2.7,15.1h1.6c0.8,0,1.5-0.3,2-0.9C6.9,13.5,7,12.5,7,12c0-0.3,0-1.5-0.7-2.3c-0.5-0.6-1.2-0.9-2-0.9H2.7V15.1z" />
        </svg>
      </span>
    )
  }
}
