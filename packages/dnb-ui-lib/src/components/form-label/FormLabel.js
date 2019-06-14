/**
 * Web FormLabel Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  extendPropsWithContext,
  isTrue,
  registerElement,
  validateDOMAttributes,
  processChildren
} from '../../shared/component-helper'
import Context from '../../shared/Context'

const renderProps = {
  render_content: null
}

export const propTypes = {
  for_id: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.string,
  class: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

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
  for_id: null,
  title: null,
  text: null,
  id: null,
  class: null,
  disabled: null,
  direction: null,
  vertical: null,

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class FormLabel extends PureComponent {
  static tagName = 'dnb-form-label'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(FormLabel.tagName, FormLabel, defaultProps)
  }

  static getContent(props) {
    if (props.text) return props.text
    if (typeof props.render_content === 'function')
      props.render_content(props)
    return processChildren(props)
  }

  render() {
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    const {
      for_id,
      title,
      className,
      id,
      disabled,
      direction,
      vertical,
      class: _className,

      text: _text, // eslint-disable-line

      ...attributes
    } = props

    const content = FormLabel.getContent(this.props)

    const params = {
      className: classnames(
        'dnb-form-label',
        (isTrue(vertical) || direction) &&
          `dnb-form-label--${isTrue(vertical) ? 'vertical' : direction}`,
        className,
        _className
      ),
      htmlFor: for_id,
      id,
      title,
      disabled: isTrue(disabled),
      ...attributes
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return <label {...params}>{content}</label>
  }
}
