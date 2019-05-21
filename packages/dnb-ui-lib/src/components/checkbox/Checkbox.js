/**
 * Web Checkbox Component
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'

const renderProps = {
  on_change: null,
  on_state_update: null
}

export const propTypes = {
  label: PropTypes.string,
  title: PropTypes.string,
  default_state: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  status: PropTypes.string,
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  value: PropTypes.string,
  attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,

  /// React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  // Web Component props
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,
  on_change: PropTypes.func,
  on_state_update: PropTypes.func
}

export const defaultProps = {
  label: null,
  title: null,
  default_state: null,
  checked: 'default', //we have to send this as a string
  disabled: false,
  id: null,
  status: null,
  status_state: 'error',
  status_animation: null,
  value: null,
  attributes: null,
  readOnly: false,
  class: null,

  // React props
  className: null,
  children: null,

  // Web Component props
  custom_element: null,
  custom_method: null,
  ...renderProps
}

/**
 * The checkbox component is our enhancement of the classic radio button. It acts like a checkbox. Example: On/off, yes/no.
 */
export default class Checkbox extends Component {
  static tagName = 'dnb-checkbox'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  static enableWebComponent() {
    registerElement(Checkbox.tagName, Checkbox, defaultProps)
  }

  static parseChecked = state => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (state.hasDefaultState) {
        state.checked = Checkbox.parseChecked(props.default_state)
        state.hasDefaultState = false
      } else if (props.checked !== 'default') {
        state.checked = Checkbox.parseChecked(props.checked)
      }
    }
    state._listenForPropChanges = true

    return state
  }

  constructor(props) {
    super(props)
    this._refInput = React.createRef()
    this._id =
      props.id || `dnb-checkbox-${Math.round(Math.random() * 999)}` // cause we need an id anyway
    this.state = {
      _listenForPropChanges: true,
      hasDefaultState: props.default_state !== null,
      checked: Checkbox.parseChecked(props.default_state || props.checked)
    }
    this.helperParams = { onMouseDown: e => e.preventDefault() }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      Checkbox.parseChecked(this.props.checked) !==
      Checkbox.parseChecked(nextProps.checked)
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
    if (String(this.props.readOnly) === 'true') {
      return event.preventDefault()
    }
    const checked = !this.state.checked
    this.setState({ checked, _listenForPropChanges: false })
    dispatchCustomElementEvent(this, 'on_change', { checked, event })
  }

  onMouseOutHandler = () => {
    // this way we keep the new state after the user changed the state, without getting the error state back vissually
    if (this.props.status && this.props.status_state === 'error') {
      return
    }
    if (this._refInput.current) {
      this._refInput.current.blur()
    }
  }

  render() {
    const {
      value,
      status,
      status_state,
      status_animation,
      label,
      title,
      disabled,
      readOnly,
      className,
      class: _className,

      id: _id, // eslint-disable-line
      default_state: _default_state, // eslint-disable-line
      checked: _checked, // eslint-disable-line
      attributes, // eslint-disable-line
      children, // eslint-disable-line
      on_change, // eslint-disable-line
      on_state_update, // eslint-disable-line
      custom_method, // eslint-disable-line
      custom_element, // eslint-disable-line

      ...rest
    } = this.props

    const { checked } = this.state

    const id = this._id
    const showStatus = status && status !== 'error'

    const classes = classnames(
      'dnb-checkbox',
      showStatus && 'dnb-checkbox__form-status',
      status && `dnb-checkbox__status--${status_state}`,
      className,
      _className
    )

    const inputParams = {
      disabled,
      checked,
      onMouseOut: this.onMouseOutHandler, // for resetting the button to the default state
      ...rest
    }

    if (showStatus) {
      inputParams['aria-describedby'] = id + '-status'
    }
    if (label) {
      inputParams['aria-labelledby'] = id + '-label'
    }
    if (readOnly) {
      inputParams['aria-readonly'] = inputParams.readOnly = true
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, inputParams)

    return (
      <>
        {label && (
          <FormLabel
            id={id + '-label'}
            for_id={id}
            aria-hidden
            text={label}
            disabled={disabled}
          />
        )}
        <span className={classes}>
          <span className="dnb-checkbox__shell">
            <input
              id={id}
              name={id}
              type="checkbox"
              // role="checkbox"
              title={title}
              aria-checked={checked}
              className="dnb-checkbox__input"
              value={checked ? value || '' : ''}
              onChange={this.onChangeHandler}
              onKeyDown={this.onKeyDownHandler}
              ref={this._refInput}
              {...inputParams}
            />
            <span
              draggable
              aria-hidden
              className="dnb-checkbox__background"
              onDragStart={this.onChangeHandler}
              {...this.helperParams}
            />
            {/* <span aria-hidden className="dnb-checkbox__button">
              <span className="dnb-checkbox__focus">
                <span className="dnb-checkbox__focus__inner" />
              </span>
            </span> */}
          </span>
          {showStatus && (
            <FormStatus
              text={status}
              status={status_state}
              text_id={id + '-status'} // used for "aria-describedby"
              animation={status_animation}
            />
          )}
        </span>
      </>
    )
  }
}
