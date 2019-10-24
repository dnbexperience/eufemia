/**
 * Web Section Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  isTrue,
  registerElement,
  validateDOMAttributes,
  processChildren,
  extendPropsWithContext
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

const renderProps = {
  render_content: null
}

const propTypes = {
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

const defaultProps = {
  style_type: null,
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
  static contextType = Context

  static enableWebComponent() {
    registerElement(Section.tagName, Section, defaultProps)
  }

  static getContent(props) {
    if (props.text) return props.text
    if (typeof props.render_content === 'function')
      props.render_content(props)
    return processChildren(props)
  }

  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }

  render() {
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    const {
      element,
      style_type,
      spacing,
      className,
      class: _className,

      ...attributes
    } = props

    const content = Section.getContent(this.props)

    const params = {
      className: classnames(
        'dnb-section',
        `dnb-section--${style_type || 'mint-green-12'}`,
        (isTrue(spacing) || spacing) &&
          `dnb-section--spacing${
            !/true|false/.test(String(spacing)) ? '-' + spacing : ''
          }`,
        createSpacingClasses(props),
        className,
        _className
      ),
      ...attributes
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <Element is={element || 'section'} {...params} ref={this._ref}>
        {content}
      </Element>
    )
  }
}

const Element = React.forwardRef(
  ({ is: Element, children, ...rest }, ref) => (
    <Element {...rest} ref={ref}>
      {children}
    </Element>
  )
)
Element.propTypes = {
  is: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
