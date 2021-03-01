/**
 * Web ViewTitle Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  registerElement,
  validateDOMAttributes,
  processChildren
} from '../../shared/component-helper'
// import './style/dnb-view-title.scss' // no good solution to import the style here

export default class ViewTitle extends React.PureComponent {
  static tagName = 'dnb-view-title'

  static propTypes = {
    text: PropTypes.string,
    tag: PropTypes.string,
    class: PropTypes.string,

    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ])
  }

  static defaultProps = {
    text: null,
    tag: 'h1',
    class: null,

    className: null,
    children: null
  }

  static enableWebComponent() {
    registerElement(ViewTitle.tagName, ViewTitle, ViewTitle.defaultProps)
  }

  static getText(props) {
    if (typeof props.text === 'string') {
      return props.text
    }
    return processChildren(props)
  }

  render() {
    const { tag: Component, className, class: _className } = this.props

    const text = ViewTitle.getText(this.props)

    const params = {
      className: classnames('dnb-view-title', className, _className)
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return <Component {...params}>{text}</Component>
  }
}
