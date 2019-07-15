/**
 * Web FormSet Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  extend,
  registerElement,
  validateDOMAttributes,
  processChildren,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Context from '../../shared/Context'
import { propTypes as availableFormRowProps } from '../form-row/FormRow'

const renderProps = {
  render_content: null
}

export const propTypes = {
  id: PropTypes.string,
  element: PropTypes.string,
  no_form: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  prevent_submit: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
  element: 'form',
  no_form: false,
  prevent_submit: false,
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

  onSubmitHandler = event => {
    const { prevent_submit } = this.props
    if (isTrue(prevent_submit)) {
      event.preventDefault()
    }
    dispatchCustomElementEvent(this, 'on_submit', { event })
  }

  render() {
    const {
      element,
      no_form,
      prevent_submit, // eslint-disable-line
      disabled, // eslint-disable-line
      id, // eslint-disable-line
      className,
      class: _className,

      ...rest
    } = this.props

    const formRowProps = Object.entries(rest).reduce((acc, [k, v]) => {
      if (
        typeof availableFormRowProps[k] !== 'undefined' &&
        k !== 'id' &&
        k !== 'children' &&
        k !== 'render_content'
      ) {
        acc[k] = v
      }
      return acc
    }, {})
    const attributes = Object.entries(rest).reduce((acc, [k, v]) => {
      if (typeof formRowProps[k] === 'undefined') {
        acc[k] = v
      }
      return acc
    }, {})

    const params = {
      className: classnames(
        'dnb-form-set',
        createSpacingClasses(this.props),
        className,
        _className
      ),
      ...attributes
    }

    if (!isTrue(no_form)) {
      params.onSubmit = this.onSubmitHandler
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const content = FormSet.getContent(this.props)

    const context = extend(this.context, {
      formRow: {
        ...formRowProps,
        disabled,
        isInsideFormSet: true
      }
    })

    return (
      <Context.Provider value={context}>
        <Element is={isTrue(no_form) ? 'div' : element} {...params}>
          {content}
        </Element>
      </Context.Provider>
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
