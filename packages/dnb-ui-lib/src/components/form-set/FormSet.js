/**
 * Web FormSet Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  makeUniqueId,
  extend,
  registerElement,
  validateDOMAttributes,
  processChildren,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Context from '../../shared/Context'
import hashSum from '../../shared/libs/HashSum'
import { propTypes as availableFormRowProps } from '../form-row/FormRow'

const renderProps = {
  render_content: null
}

const propTypes = {
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
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,
  render_content: PropTypes.func
}

const defaultProps = {
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
  custom_element: null,
  custom_method: null,
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
    this._id = props.id || makeUniqueId() // cause we need an id anyway
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
        k !== 'label' &&
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

    // check if context has changed, if yes, then update the cache
    if (hashSum(this._cachedContext) !== hashSum(this.context)) {
      this._cachedContext = this.context

      const formRow = {
        ...formRowProps,
        disabled
        // isInsideFormSet: true // Not used yet
      }
      this._contextWeUse = extend(this.context, {
        formRow
      })
    }

    return (
      <Context.Provider value={this._contextWeUse}>
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
