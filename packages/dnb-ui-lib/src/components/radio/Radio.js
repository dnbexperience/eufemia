/**
 * Web Radio Component
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
import RadioGroup from './RadioGroup'
import RadioGroupContext from './RadioGroupContext'

const renderProps = {
  on_change: null,
  on_state_update: null
}

export const propTypes = {
  label: PropTypes.string,
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
 * The radio component is our enhancement of the classic radio button.
 */
export default class Radio extends Component {
  static tagName = 'dnb-radio'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps
  static contextType = RadioGroupContext
  static Group = RadioGroup

  static enableWebComponent() {
    registerElement(Radio.tagName, Radio, defaultProps)
  }

  static parseChecked = state => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      state.checked = Radio.parseChecked(props.checked)
    }
    state._listenForPropChanges = true

    return state
  }

  constructor(props) {
    super(props)
    this._refInput = React.createRef()
    this._id = props.id || `dnb-radio-${Math.round(Math.random() * 999)}` // cause we need an id anyway
    this.state = {
      _listenForPropChanges: true
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      Radio.parseChecked(this.props.checked) !==
      Radio.parseChecked(nextProps.checked)
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
    dispatchCustomElementEvent(this, 'on_key_down', { event })
  }

  onChangeHandler = event => {
    if (String(this.props.readOnly) === 'true') {
      return // TODO: check if event.preventDefault() is not needed?
    }
    const { group } = this.props
    const checked = !this.state.checked
    const value = event.target.value
    if (this.context.onChange) {
      this.context.onChange({
        value,
        event
      })
    }
    dispatchCustomElementEvent(this, 'on_change', {
      group,
      checked,
      value,
      event
    })
    if (typeof this.context.value === 'undefined' && group) {
      setTimeout(() => {
        this.setState({ checked, _listenForPropChanges: false })
      }, 1) // in case we have a false "hasContext" but a "group", then we have to use a delay, to overwrite the uncrontrolled state
    } else {
      this.setState({ checked, _listenForPropChanges: false })
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
      checked = this.context.value === value
      group = this.context.name
      disabled = this.context.disabled
    }

    const id = this._id
    const showStatus = status && status !== 'error'

    const classes = classnames(
      'dnb-radio',
      showStatus && 'dnb-radio__form-status',
      status && `dnb-radio__status--${status_state}`,
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
          <span className="dnb-radio__shell">
            <input
              type="checkbox"
              value={value}
              id={id}
              name={group}
              className="dnb-radio__input"
              checked={checked}
              aria-checked={checked}
              title={title}
              disabled={disabled}
              ref={this._refInput}
              {...inputParams}
              onChange={this.onChangeHandler}
              onKeyDown={this.onKeyDownHandler}
            />
            <span aria-hidden className="dnb-radio__button">
              <span className="dnb-radio__focus" />
            </span>
            <CheckGfx className="dnb-radio__gfx" />
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

const CheckGfx = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path d="M5.86 12.95a.75.75 0 1 0-1.22.86l1.22-.86zm2.15 4.34l.62-.42-.01-.01-.61.43zm.94.52l.02-.75-.02.75zm.98-.46l-.6-.47v.01l.6.46zm9.4-10.7a.75.75 0 0 0-1.17-.93l1.18.93zm-14.7 7.16l2.76 3.91 1.23-.86-2.76-3.91-1.22.86zm2.75 3.9c.35.52.93.84 1.55.85l.04-1.5a.43.43 0 0 1-.34-.19l-1.25.84zm1.55.85c.62.02 1.22-.26 1.6-.76l-1.2-.9a.43.43 0 0 1-.36.16l-.04 1.5zm1.59-.75l8.82-11.16-1.18-.93-8.82 11.16 1.18.93z" />
  </svg>
)
