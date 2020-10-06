/**
 * Web Grid Component
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
// import './style/dnb-grid.scss' // no good solution to import the style here

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

export default class Grid extends React.PureComponent {
  static tagName = 'dnb-grid'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent() {
    registerElement(Grid.tagName, Grid, defaultProps)
  }

  static getContent(props) {
    if (typeof props.render_content === 'function') {
      return props.render_content(props)
    }
    return processChildren(props)
  }

  render() {
    const { className, class: _className } = this.props

    const content = Grid.getContent(this.props)

    const params = {
      className: classnames('dnb-grid', className, _className)
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return <div {...params}>{content}</div>
  }
}
