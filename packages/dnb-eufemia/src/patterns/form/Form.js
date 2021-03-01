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

export default class Form extends React.PureComponent {
  static tagName = 'dnb-form'

  static propTypes = {
    class: PropTypes.string,
    range_val: PropTypes.string,

    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }

  static defaultProps = {
    class: null,
    range_val: null,

    className: null,
    children: null
  }

  state = { value: null }

  static enableWebComponent() {
    registerElement(Form.tagName, Form, Form.defaultProps)
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
