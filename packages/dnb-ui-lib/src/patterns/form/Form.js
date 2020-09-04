/**
 * Web Form Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  registerElement,
  validateDOMAttributes
} from '../../shared/component-helper'
// import './style/dnb-form.scss' // no good solution to import the style here

const renderProps = {}

const propTypes = {
  class: PropTypes.string,
  range_val: PropTypes.string,
  /** React props */
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  // Web Component props
}

const defaultProps = {
  class: null,
  range_val: null,
  /** React props */
  className: null,
  children: null,
  // Web Component props
  ...renderProps
}

export default class Form extends React.PureComponent {
  static tagName = 'dnb-form'
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = { value: null }

  static enableWebComponent() {
    registerElement(Form.tagName, Form, defaultProps)
  }

  constructor(props) {
    super(props)
    this.state.value = props.range_val
  }

  render() {
    const { children, className, class: _className } = this.props

    const params = {
      className: classnames('dnb-form', className, _className)
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return <form {...params}>{children}</form>
  }
}
