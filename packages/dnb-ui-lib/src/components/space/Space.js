/**
 * Web Space Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import { createSpacingClasses } from './SpacingHelper'

const renderProps = {
  render_content: null
}

const propTypes = {
  id: PropTypes.string,
  element: PropTypes.string,
  inline: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collapse: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  top: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  right: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  bottom: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  left: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
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

const defaultProps = {
  id: null,
  element: 'div',
  inline: null,
  collapse: null,
  top: null,
  right: null,
  bottom: null,
  left: null,
  class: null,

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class Space extends PureComponent {
  static tagName = 'dnb-space'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(Space.tagName, Space, defaultProps)
  }

  static getContent(props) {
    if (typeof props.render_content === 'function')
      props.render_content(props)

    return typeof props.children === 'function'
      ? props.children(props)
      : props.children
  }

  render() {
    // consume the space context
    const props = this.context.space
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.space)
      : this.props

    let {
      element,
      inline,
      collapse,
      top,
      right,
      bottom,
      left,
      id: _id, // eslint-disable-line
      className,
      class: _className,

      ...attributes
    } = props

    // in case we have a label already, we split this out and use this one instead
    const children = Space.getContent(this.props)

    const params = {
      className: classnames(
        'dnb-space',
        isTrue(inline) && 'dnb-space--inline',
        createSpacingClasses({ top, right, bottom, left }),
        className,
        _className
      ),
      ...attributes
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <Element element={element} collapse={collapse} {...params}>
        {children}
      </Element>
    )
  }
}

const Element = ({ element: E, collapse, children, ...props }) => {
  return collapse === false || collapse === 'false' ? (
    <E className="dnb-space--no-collapse">
      <E {...props}>{children}</E>
    </E>
  ) : (
    <E {...props}>{children}</E>
  )
}
Element.propTypes = {
  children: PropTypes.node,
  element: PropTypes.string,
  collapse: PropTypes.bool
}
Element.defaultProps = {
  children: null,
  element: 'div',
  collapse: true
}
