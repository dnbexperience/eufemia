/**
 * Web Section Component
 *
 */

import React from 'react'
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

export default class Section extends React.PureComponent {
  static tagName = 'dnb-section'
  static contextType = Context

  static propTypes = {
    style_type: PropTypes.string,
    spacing: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['large', 'medium', 'small', 'default'])
    ]),
    element: PropTypes.string,
    class: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }

  static defaultProps = {
    style_type: null,
    element: 'section',
    spacing: null,
    class: null,
    className: null,
    children: null
  }

  static enableWebComponent() {
    registerElement(Section.tagName, Section, Section.defaultProps)
  }

  static getContent(props) {
    return processChildren(props)
  }

  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      Section.defaultProps,
      this.context.formRow
    )

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

    const Element = element || 'section'

    return (
      <Element {...params} ref={this._ref}>
        {content}
      </Element>
    )
  }
}
