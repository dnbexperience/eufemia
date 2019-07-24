/**
 * Web Space Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  extend,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import { createSpacingClasses } from './SpacingHelper'

const renderProps = {
  render_content: null
}

export const propTypes = {
  id: PropTypes.string,
  element: PropTypes.string,
  inline: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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

export const defaultProps = {
  id: null,
  element: 'div',
  inline: false,
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

  constructor(props) {
    super(props)
    this._id = props.id || `dnb-space-${Math.round(Math.random() * 999)}` // cause we need an id anyway
  }

  render() {
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    let {
      element,
      inline,
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

    const id = this._id
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

    const context = extend(this.context, {
      formRow: {
        useId: () => {
          if (this.isIsUsed) {
            // make a new ID, as we used one
            return `dnb-space-${Math.round(Math.random() * 999)}` // cause we need an id anyway
          }
          this.isIsUsed = true
          return id
        },
        top,
        right,
        bottom,
        left
      }
    })

    return (
      <Context.Provider value={context}>
        <Element element={element} {...params}>
          {children}
        </Element>
      </Context.Provider>
    )
  }
}

const Element = ({ element: E, children, ...props }) => {
  return <E {...props}>{children}</E>
}
Element.propTypes = {
  children: PropTypes.node,
  element: PropTypes.string
}
Element.defaultProps = {
  children: null,
  element: 'div'
}
