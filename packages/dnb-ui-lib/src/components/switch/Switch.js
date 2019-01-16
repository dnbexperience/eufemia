/**
 * Web Switch Component
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  registerElement,
  validateDOMAttributes,
  processChildren,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
// import './style/dnb-switch.scss' // no good solution to import the style here

const renderProps = {
  on_change: null,
  on_state_update: null
}

export const propTypes = {
  text_positive: PropTypes.string,
  text_negative: PropTypes.string,
  title: PropTypes.string,
  default_state: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  value: PropTypes.string,
  attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  labelledby: PropTypes.string,
  class: PropTypes.string,

  /// React props
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  // Web Component props
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,
  on_change: PropTypes.func,
  on_state_update: PropTypes.func
}

export const defaultProps = {
  text_positive: 'Ja', // Yes
  text_negative: 'Nei', // No
  title: null,
  default_state: null,
  checked: 'default', //we have to send this as a string
  disabled: false,
  id: null,
  value: null,
  attributes: null,
  labelledby: null,
  class: null,

  // React props
  onClick: null,
  className: null,
  children: null,

  // Web Component props
  custom_element: null,
  custom_method: null,
  ...renderProps
}

/**
 * The switch component is our enhancement of the classic radio button. It acts like a switch. Example: On/off, yes/no.
 */
export default class Switch extends Component {
  static tagName = 'dnb-switch'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  static enableWebComponent() {
    registerElement(Switch.tagName, Switch, defaultProps)
  }

  static parseChecked = state => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (state.hasDefaultState) {
        state.checked = Switch.parseChecked(props.default_state)
        state.hasDefaultState = false
      } else if (props.checked !== 'default') {
        state.checked = Switch.parseChecked(props.checked)
      }
    }
    state._listenForPropChanges = true

    return state
  }

  static getTitle(props) {
    if (props.title) return props.title
    return processChildren(props)
  }

  constructor(props) {
    super(props)
    this._refLabel = React.createRef()
    this._refInput = React.createRef()
    this._id = props.id || `dnb-switch-${Math.round(Math.random() * 999)}` // cause we need an id anyway
    this.state = {
      _listenForPropChanges: true,
      hasDefaultState: props.default_state !== null,
      checked: Switch.parseChecked(props.default_state || props.checked)
    }
    this.helperParams = { onMouseDown: e => e.preventDefault() }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      Switch.parseChecked(this.props.checked) !==
      Switch.parseChecked(nextProps.checked)
    ) {
      const { checked } = nextState
      dispatchCustomElementEvent(this, 'on_state_update', { checked })
    }
    return true
  }

  onKeyDownHandler = event => {
    switch (keycode(event)) {
      case 'enter':
        this.onChangeHandler(event)
        break
    }
  }

  onChangeHandler = event => {
    const checked = !this.state.checked
    this.setState({ checked, _listenForPropChanges: false })
    dispatchCustomElementEvent(this, 'on_change', { checked, event })
  }

  render() {
    const classes = classnames(
      'dnb-switch',
      this.props.class,
      this.props.className
    )

    const title = Switch.getTitle(this.props)
    const { disabled, labelledby } = this.props
    const { checked } = this.state

    const params = {
      disabled,
      checked
    }
    if (labelledby) {
      params['aria-labelledby'] = labelledby
    }
    const labelParams = { disabled }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)
    validateDOMAttributes(null, labelParams)

    return (
      <span className={classes}>
        <label
          id={`${this._id}-internal`}
          className="dnb-switch__inner"
          htmlFor={this._id}
          title={title}
          ref={this._refLabel}
          {...labelParams}
        >
          <input
            type="checkbox"
            className="dnb-switch__input"
            name={this._id}
            id={this._id}
            role="switch"
            aria-hidden="true"
            aria-checked={this.state.checked}
            value={this.state.checked ? this.props.value || '' : ''}
            onChange={this.onChangeHandler}
            onKeyDown={this.onKeyDownHandler}
            ref={this._refInput}
            {...params}
          />
          <span
            draggable="true"
            className="dnb-switch__background"
            aria-hidden="true"
            onDragStart={this.onChangeHandler}
            {...this.helperParams}
          />
          <span className="dnb-switch__button">
            {this.state.checked ? (
              <span className="dnb-switch__text-item dnb-switch__text-item--positive">
                {this.props.text_positive}
              </span>
            ) : (
              <span className="dnb-switch__text-item dnb-switch__text-item--negative">
                {this.props.text_negative}
              </span>
            )}
            <span className="dnb-switch__focus" aria-hidden="true">
              <span className="dnb-switch__focus__inner" />
            </span>
          </span>
        </label>
      </span>
    )
  }
}
