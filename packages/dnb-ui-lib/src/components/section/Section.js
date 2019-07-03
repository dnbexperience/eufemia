/**
 * Web Section Component
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
  style_type: PropTypes.string,
  spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  element: PropTypes.string,
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
  style: null,
  style_type: 'mint-green-12',
  element: 'section',
  class: null,

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class Section extends PureComponent {
  static tagName = 'dnb-section'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent() {
    registerElement(Section.tagName, Section, defaultProps)
  }

  static getContent(props) {
    if (props.text) return props.text
    if (typeof props.render_content === 'function')
      props.render_content(props)
    return processChildren(props)
  }

  render() {
    const {
      element,
      style,
      style_type,
      spacing,
      className,
      class: _className,

      ...attributes
    } = this.props

    const content = Section.getContent(this.props)

    const params = {
      className: classnames(
        'dnb-section',
        `dnb-section--${typeof style === 'string' ? style : style_type}`,
        (isTrue(spacing) || spacing) &&
          `dnb-section--spacing${
            !/true|false/.test(String(spacing)) ? '-' + spacing : ''
          }`,
        className,
        _className
      ),
      ...attributes
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <Element is={element || 'section'} {...params}>
        {content}
      </Element>
    )
  }
}

const Element = ({ is: Element, children, ...rest }) => (
  <Element {...rest}>{children}</Element>
)
Element.propTypes = {
  is: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
