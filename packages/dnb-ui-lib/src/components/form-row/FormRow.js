/**
 * Web FormRow Component
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
import FormContext from './FormContext'

const renderProps = {
  render_content: null
}

export const propTypes = {
  size: PropTypes.string,
  class: PropTypes.string,
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
  size: null,
  class: null,
  direction: 'horizontal',
  vertical: null,

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class FormRow extends PureComponent {
  static tagName = 'dnb-form-row'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent() {
    registerElement(FormRow.tagName, FormRow, defaultProps)
  }

  static getContent(props) {
    if (typeof props.render_content === 'function')
      props.render_content(props)
    return processChildren(props)
  }

  render() {
    const {
      size,
      direction,
      vertical,
      className,
      class: _className,

      ...attributes
    } = this.props

    const content = FormRow.getContent(this.props)

    const params = {
      className: classnames(
        'dnb-form-row',
        `dnb-form-row--${isTrue(vertical) ? 'vertical' : direction}`,
        size && `dnb-form-row__size--${isTrue(size) ? 'default' : size}`,
        className,
        _className
      ),
      ...attributes
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const context = {
      formRow: {
        direction,
        vertical,
        size
      }
    }

    return (
      <FormContext.Provider value={context}>
        <div {...params}>{content}</div>
      </FormContext.Provider>
    )
  }
}
