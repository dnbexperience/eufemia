/**
 * Web FieldsetDescription Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
// import classnames from 'classnames'
import {
  registerElement,
  validateDOMAttributes
} from '../../shared/component-helper'
// import './style/dnb-fieldset-description.scss' // no good solution to import the style here

const renderProps = {
  // render_content: null
}

const propTypes = {
  text: PropTypes.string,
  class: PropTypes.string,
  /** React props */
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  // Web Component props
  // render_content: PropTypes.func
}

const defaultProps = {
  text: null,
  class: null,
  /** React props */
  className: null,
  children: null,
  // Web Component props
  ...renderProps
}

export default class FieldsetDescription extends React.PureComponent {
  static tagName = 'dnb-fieldset-description'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent() {
    registerElement(
      FieldsetDescription.tagName,
      FieldsetDescription,
      defaultProps
    )
  }

  // static getContent(props) {
  //   if (typeof props.render_content === 'function') {
  //     return props.render_content(props)
  //   }
  //   return null
  // }

  render() {
    const { text, className, class: _className } = this.props

    const params = {
      className: `dnb-fieldset-description ${
        className || _className || ''
      }`
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <div {...params}>
        <p className="dnb-fieldset-description__text">{text}</p>
      </div>
    )
  }
}
