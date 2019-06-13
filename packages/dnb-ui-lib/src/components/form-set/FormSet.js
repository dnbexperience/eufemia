/**
 * Web FormSet Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  // isTrue,
  extend,
  registerElement,
  validateDOMAttributes,
  processChildren
} from '../../shared/component-helper'
import Context from '../../shared/Context'

const renderProps = {
  render_content: null
}

export const propTypes = {
  id: PropTypes.string,
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
      size,
      direction,
      vertical,
      disabled, // eslint-disable-line
      id, // eslint-disable-line
      className,
      class: _className,

      ...attributes
    } = this.props

    const content = FormSet.getContent(this.props)

    const params = {
      className: classnames(
        'dnb-form-set',
        // (isTrue(vertical) || direction) && `dnb-form-set--${isTrue(vertical) ? 'vertical' : direction}`,
        // size && `dnb-form-set__size--${isTrue(size) ? 'default' : size}`,
        className,
        _className
      ),
      ...attributes
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const context = extend(this.context, {
      formRow: { size, direction, vertical, disabled }
    })

    return (
      <Context.Provider value={context}>
        <div {...params}>{content}</div>
      </Context.Provider>
    )
  }
}
