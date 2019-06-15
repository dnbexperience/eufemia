/**
 * Web ToggleButton Component
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  isTrue,
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import ToggleButtonGroup from './ToggleButtonGroup'
import ToggleButtonGroupContext from './ToggleButtonGroupContext'

const renderProps = {
  on_change: null,
  on_state_update: null
}

export const propTypes = {
  label: PropTypes.string,
  label_position: PropTypes.oneOf(['left', 'right']),
  title: PropTypes.string,
  checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  group: PropTypes.string,
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
  label_position: 'right',
  title: null,
  checked: null,
  disabled: false,
  id: null,
  group: null,
  status: null,
  status_state: 'error',
  status_animation: null,
  value: '',
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
 * The toggle-button component is our enhancement of the classic toggle-button button.
 */
export default class ToggleButton extends Component {
  static tagName = 'dnb-toggle-button'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps
  static contextType = ToggleButtonGroupContext
  static Group = ToggleButtonGroup

  static enableWebComponent() {
    registerElement(ToggleButton.tagName, ToggleButton, defaultProps)
  }

  static parseChecked = state => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      state.checked = ToggleButton.parseChecked(props.checked)
    }
    state._listenForPropChanges = true

    return state
  }

  constructor(props) {
    super(props)
    this._refInput = React.createRef()
    this._id =
      props.id || `dnb-toggle-button-${Math.round(Math.random() * 999)}` // cause we need an id anyway
    this.state = {
      _listenForPropChanges: true
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      ToggleButton.parseChecked(this.props.checked) !==
      ToggleButton.parseChecked(nextProps.checked)
    ) {
      const { checked } = nextState
      dispatchCustomElementEvent(this, 'on_state_update', { checked })
    }
    return true
  }

  onKeyDownHandler = event => {
    // only have key support if there is only a single toggle-button
    if (this.isInNoGroup()) {
      switch (keycode(event)) {
        case 'enter':
          this.onChangeHandler(event)
          break
      }
    } else {
      // else we only use the native support, and don't want space support
      // because only arrow keys has to be used
      switch (keycode(event)) {
        case 'space':
          event.preventDefault()
          break
      }
    }
    dispatchCustomElementEvent(this, 'on_key_down', { event })
  }

  onChangeHandler = event => {
    if (isTrue(this.props.readOnly)) {
      return event.preventDefault()
    }
    const value = event.target.value
    const checked = !this.state.checked

    // delay in case we have a props group only
    if (this.isPlainGroup()) {
      // in case we have a false "hasContext" but a "group"
      // then we have to use a delay, to overwrite the uncrontrolled state
      setTimeout(() => {
        this.setState({ checked, _listenForPropChanges: false }, () =>
          this.callOnChange({ value, checked })
        )
      }, 1)
    } else {
      this.setState({ checked, _listenForPropChanges: false })
      this.callOnChange({ value, checked })
    }
  }

  // only support on change if there is either:
  // 1. context group usage
  // 2. or a single, no group usage
  isContextGroupOrSingle = () =>
    typeof this.context.value !== 'undefined' && !this.props.group
  isPlainGroup = () =>
    typeof this.context.value === 'undefined' && this.props.group
  isInNoGroup = () =>
    typeof this.context.value === 'undefined' && !this.props.group

  onClickHandler = event => {
    if (isTrue(this.props.readOnly)) {
      return event.preventDefault()
    }
    // only have click support if there are more plain toggle-button
    if (!this.isPlainGroup()) {
      return
    }
    const value = event.target.value
    const checked = event.target.checked
    this.callOnChange({ value, checked })
  }

  callOnChange = ({ value, checked }) => {
    const { group } = this.props
    if (this.context.onChange) {
      this.context.onChange({
        value
      })
    }
    dispatchCustomElementEvent(this, 'on_change', {
      group,
      checked,
      value
    })

    // help firefox and safari to have an correct state after a click
    if (this._refInput.current) {
      this._refInput.current.focus()
    }
  }

  onMouseOutHandler = event => {
    dispatchCustomElementEvent(this, 'on_mouse_out', { event })
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
      status,
      status_state,
      status_animation,
      label,
      label_position,
      title,
      readOnly,
      className,
      class: _className,

      id: _id, // eslint-disable-line
      group: _group, // eslint-disable-line
      value: _value, // eslint-disable-line
      checked: _checked, // eslint-disable-line
      disabled: _disabled, // eslint-disable-line
      attributes, // eslint-disable-line
      children, // eslint-disable-line
      on_change, // eslint-disable-line
      on_state_update, // eslint-disable-line
      custom_method, // eslint-disable-line
      custom_element, // eslint-disable-line

      ...rest
    } = this.props

    let { checked } = this.state
    let { value, group, disabled } = this.props

    const hasContext = typeof this.context.value !== 'undefined'
    if (hasContext) {
      if (this.context.value !== null) {
        checked = this.context.value === value
      }
      group = this.context.name
      disabled = isTrue(this.context.disabled)
    }

    const id = this._id
    const showStatus = status && status !== 'error'

    const classes = classnames(
      'dnb-toggle-button',
      status && `dnb-toggle-button__status--${status_state}`,
      label_position &&
        `dnb-toggle-button--label-position-${label_position}`,
      className,
      _className
    )

    const inputParams = {
      role: hasContext || group ? 'radio' : null,
      type: hasContext || group ? 'radio' : 'checkbox', // overwriting the type
      ...rest,
      onMouseOut: this.onMouseOutHandler // for resetting the button to the default state
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
        <span className={classes}>
          {label && (
            <FormLabel
              id={id + '-label'}
              for_id={id}
              aria-hidden={!this.isInNoGroup()}
              text={label}
              disabled={isTrue(disabled)}
            />
          )}
          <span className="dnb-toggle-button__shell">
            <input
              type="checkbox"
              value={value}
              id={id}
              name={group}
              className="dnb-toggle-button__input"
              checked={checked}
              aria-checked={checked}
              title={title}
              aria-label={title}
              disabled={isTrue(disabled)}
              ref={this._refInput}
              {...inputParams}
              onChange={this.onChangeHandler}
              onClick={this.onClickHandler}
              onKeyDown={this.onKeyDownHandler}
            />
            <span aria-hidden className="dnb-toggle-button__button" />
            <span className="dnb-toggle-button__focus" />
            <span className="dnb-toggle-button__dot" />
          </span>
        </span>
        {showStatus && (
          <FormStatus
            text={status}
            status={status_state}
            text_id={id + '-status'} // used for "aria-describedby"
            animation={status_animation}
          />
        )}
      </>
    )
  }
}
