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

export default class Grid extends React.PureComponent {
  static tagName = 'dnb-grid'

  static propTypes = {
    class: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ])
  }

  static defaultProps = {
    class: null,
    className: null,
    children: null
  }

  static enableWebComponent() {
    registerElement(Grid.tagName, Grid, Grid.defaultProps)
  }

  static getContent(props) {
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
