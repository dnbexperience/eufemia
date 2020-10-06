/**
 * Web Footer Component
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
// import './style/dnb-footer.scss' // no good solution to import the style here

const renderProps = {
  render_content: null
}

const propTypes = {
  class: PropTypes.string,
  /** React props */
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  // Web Component props
  render_content: PropTypes.func
}

const defaultProps = {
  class: null,
  /** React props */
  className: null,
  children: null,
  // Web Component props
  ...renderProps
}

export default class Footer extends React.PureComponent {
  static tagName = 'dnb-footer'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent() {
    registerElement(Footer.tagName, Footer, defaultProps)
  }

  static getContent(props) {
    if (typeof props.render_content === 'function') {
      return props.render_content(props)
    }
    return processChildren(props)
  }

  render() {
    const { className, class: _className } = this.props

    const content = Footer.getContent(this.props)

    const params = {
      className: classnames('dnb-footer', className, _className)
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return <div {...params}>{content}</div>
  }
}
