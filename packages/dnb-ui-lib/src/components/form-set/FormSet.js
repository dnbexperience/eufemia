/**
 * Web FormSet Component
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
import Context from '../../shared/Context'
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

export default class FormSet extends PureComponent {
  static tagName = 'dnb-form-set'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(FormSet.tagName, FormSet, defaultProps)
  }

  static getContent(props) {
    if (typeof props.render_content === 'function')
      props.render_content(props)
    return processChildren(props)
  }

  constructor(props) {
    super(props)
    this._id =
      props.id || `dnb-form-set-${Math.round(Math.random() * 999)}` // cause we need an id anyway
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

    const content = FormSet.getContent(this.props)

    const params = {
      className: classnames(
        'dnb-form-set',
        `dnb-form-set--${isTrue(vertical) ? 'vertical' : direction}`,
        size && `dnb-form-set__size--${isTrue(size) ? 'default' : size}`,
        className,
        _className
      ),
      ...attributes
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    // if (!(this.context && this.context.FormSet)) {
    //   params.className = classnames(
    //     `dnb-form-set--${isTrue(vertical) ? 'vertical' : direction}`,
    //     size && `dnb-form-set__size--${isTrue(size) ? 'default' : size}`,
    //     params.className
    //   )
    //   console.log('params.className', params.className)
    // }
    // console.log('this.context.FormSet', this.context.FormSet)
    // if (this.context && this.context.FormSet) {
    //   // return content
    //   // return <div {...params}>{content}</div>
    // }

    let context
    if (this.context) {
      context = { ...this.props, id: this._id, ...this.context }
    } else {
      context = {
        FormSet: { ...this.props, id: this._id }
      }
    }

    return (
      <Context.Provider value={context}>
        <div {...params}>
          {label && (
            <FormLabel
              // id={id + '-label'}
              // for_id={id}
              text={label}
              disabled={isTrue(disabled)}
              className="dnb-form-set__label"
            />
          )}
          {content}
        </div>
      </Context.Provider>
    )
  }
}
