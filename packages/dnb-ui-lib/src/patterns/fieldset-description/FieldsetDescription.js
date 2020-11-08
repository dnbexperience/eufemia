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

export default class FieldsetDescription extends React.PureComponent {
  static tagName = 'dnb-fieldset-description'

  static propTypes = {
    text: PropTypes.string,
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
    class: null,
    className: null,
    children: null
  }

  static enableWebComponent() {
    registerElement(
      FieldsetDescription.tagName,
      FieldsetDescription,
      FieldsetDescription.defaultProps
    )
  }

  // static getContent(props) {
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
