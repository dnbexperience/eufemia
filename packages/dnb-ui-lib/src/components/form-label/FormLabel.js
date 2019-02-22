/**
 * Web FormLabel Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  registerElement,
  validateDOMAttributes,
  processChildren
} from '../../shared/component-helper'
// import './style/dnb-form-label.scss' // no good solution to import the style here

const renderProps = {
  render_content: null
}

export const propTypes = {
  for_id: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.string,
  class: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
  for_id: null,
  title: null,
  text: null,
  id: null,
  class: null,
  disabled: false,
  /** React props */
  className: null,
  children: null,
  // Web Component props
  ...renderProps
}

export default class FormLabel extends PureComponent {
  static tagName = 'dnb-form-label'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent() {
    registerElement(FormLabel.tagName, FormLabel, defaultProps)
  }

  static getContent(props) {
    if (props.text) return props.text
    if (typeof props.render_content === 'function')
      props.render_content(props)
    return processChildren(props)
  }

  render() {
    const {
      for_id,
      title,
      className,
      id,
      disabled,
      class: _className
      // ...otherProps
    } = this.props

    const content = FormLabel.getContent(this.props)

    const params = {
      className: classnames('dnb-form-label', className, _className),
      htmlFor: for_id,
      id,
      title,
      disabled
      // ...otherProps
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return <label {...params}>{content}</label>
  }
}
