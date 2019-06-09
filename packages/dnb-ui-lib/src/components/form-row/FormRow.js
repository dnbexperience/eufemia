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
import FormLabel from '../form-label/FormLabel'

const renderProps = {
  render_content: null
}

export const propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
  label: null,
  size: null,
  direction: 'horizontal',
  vertical: null,
  disabled: null,
  class: null,

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
  static contextType = FormContext

  static enableWebComponent() {
    registerElement(FormRow.tagName, FormRow, defaultProps)
  }

  static getContent(props) {
    if (typeof props.render_content === 'function')
      props.render_content(props)
    return processChildren(props)
  }

  constructor(props) {
    super(props)
    this._id =
      props.id || `dnb-form-row-${Math.round(Math.random() * 999)}` // cause we need an id anyway
  }

  render() {
    const {
      label,
      size,
      direction,
      vertical,
      disabled,
      id, // eslint-disable-line
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

    // if (!(this.context && this.context.formRow)) {
    //   params.className = classnames(
    //     `dnb-form-row--${isTrue(vertical) ? 'vertical' : direction}`,
    //     size && `dnb-form-row__size--${isTrue(size) ? 'default' : size}`,
    //     params.className
    //   )
    //   console.log('params.className', params.className)
    // }
    // console.log('this.context.formRow', this.context.formRow)
    // if (this.context && this.context.formRow) {
    //   // return content
    //   // return <div {...params}>{content}</div>
    // }

    let context
    if (this.context) {
      context = { ...this.props, id: this._id, ...this.context }
    } else {
      context = {
        formRow: { ...this.props, id: this._id }
      }
    }

    return (
      <FormContext.Provider value={context}>
        <div {...params}>
          {label && (
            <FormLabel
              // id={id + '-label'}
              // for_id={id}
              text={label}
              disabled={isTrue(disabled)}
              className="dnb-form-row__label"
            />
          )}
          {content}
        </div>
      </FormContext.Provider>
    )
  }
}
