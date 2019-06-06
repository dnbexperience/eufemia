/**
 * Web FormSection Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  registerElement,
  validateDOMAttributes,
  processChildren
} from '../../shared/component-helper'

const renderProps = {
  render_content: null
}

export const propTypes = {
  style: PropTypes.string,
  spacing: PropTypes.string,
  class: PropTypes.string,

  /** React props */
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),

  // Web Component props
  render_content: PropTypes.func
}

export const defaultProps = {
  style: 'mint-green-12',
  class: null,

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class FormSection extends PureComponent {
  static tagName = 'dnb-form-section'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent() {
    registerElement(FormSection.tagName, FormSection, defaultProps)
  }

  static getContent(props) {
    if (props.text) return props.text
    if (typeof props.render_content === 'function')
      props.render_content(props)
    return processChildren(props)
  }

  render() {
    const {
      style,
      spacing,
      className,
      class: _className,

      ...attributes
    } = this.props

    const content = FormSection.getContent(this.props)

    const params = {
      className: classnames(
        'dnb-form-section',
        `dnb-form-section--${style}`,
        (isTrue(spacing) || spacing) &&
          `dnb-form-section--spacing${
            !/true|false/.test(String(spacing)) ? '-' + spacing : ''
          }`,
        className,
        _className
      ),
      ...attributes
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return <section {...params}>{content}</section>
  }
}
