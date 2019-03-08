/**
 * Web Input Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Button, { propTypes as ButtonPropTypes } from '../button/Button'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import {
  registerElement,
  validateDOMAttributes,
  processChildren,
  pickRenderProps,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { isIE11 } from '../../shared/helpers'

const renderProps = {
  on_change: null,
  on_submit: null,
  on_focus: null,
  on_blur: null,
  on_submit_focus: null,
  on_submit_blur: null
}

export const propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  label: PropTypes.string,
  status: PropTypes.string,
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  autocomplete: PropTypes.oneOf(['on', 'off']),
  submit_button_title: PropTypes.string,
  placeholder: PropTypes.string,
  description: PropTypes.string,
  align: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,
  input_class: PropTypes.string,
  attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  // Submit button
  submit_button_variant: ButtonPropTypes.variant,
  submit_button_icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),

  // React props
  className: PropTypes.string,
  inputElement: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),

  // Web Component props
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,
  on_change: PropTypes.func,
  on_submit: PropTypes.func,
  on_focus: PropTypes.func,
  on_blur: PropTypes.func,
  on_submit_focus: PropTypes.func,
  on_submit_blur: PropTypes.func
}

export const defaultProps = {
  type: 'text',
  size: null,
  value: null,
  id: null,
  label: null,
  status: null,
  status_state: 'error',
  status_animation: null,
  autocomplete: 'off',
  placeholder: null,
  description: null,
  align: null,
  disabled: false,
  input_class: null,
  class: null,
  attributes: null,
  readOnly: false,

  // Submit button
  submit_button_title: null,
  submit_button_variant: 'secondary',
  submit_button_icon: 'search',

  // React props
  className: null,
  inputElement: null,
  children: null,

  // Web Component props
  custom_element: null,
  custom_method: null,
  ...renderProps
}

/**
 * The input component is an umbrella component for all inputs which share the same style as the classic `text` input field. Radio buttons and other form elements are not included here.
 */
export default class Input extends PureComponent {
  static tagName = 'dnb-input'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  static enableWebComponent() {
    registerElement(Input.tagName, Input, defaultProps)
  }

  static getDerivedStateFromProps(props, state) {
    const value = Input.getValue(props)
    if (
      state._listenForPropChanges &&
      value !== null &&
      value !== state.value
    ) {
      state.value = value
    }
    if (props.disabled) {
      state.inputState = 'disabled'
    }
    state._listenForPropChanges = true
    return state
  }

  static getValue(props) {
    if (props.value) return props.value
    return processChildren(props)
  }

  state = { inputState: 'virgin', value: null }

  constructor(props) {
    super(props)

    this._ref = React.createRef()
    this._id = props.id || `dnb-input-${Math.round(Math.random() * 999)}` // cause we need an id anyway

    // pass along all props we wish to have as params
    this.renderProps = pickRenderProps(props, renderProps)

    // make sure we dont trigger getDerivedStateFromProps on startup
    this.state._listenForPropChanges = true
    this.state.value = Input.getValue(props)
  }
  onFocusHandler = event => {
    const value = event.target.value
    this.setState({
      value,
      _listenForPropChanges: false,
      inputState: 'focus'
    })
    dispatchCustomElementEvent(this, 'on_focus', { value, event })
  }
  onBlurHandler = event => {
    const value = event.target.value
    this.setState({
      value,
      _listenForPropChanges: false,
      inputState: 'dirty'
    })
    dispatchCustomElementEvent(this, 'on_blur', { value, event })
  }
  onChangeHandler = event => {
    const value = event.target.value
    this.setState({ value, _listenForPropChanges: false })
    event.preventDefault()
    dispatchCustomElementEvent(this, 'on_change', { value, event })
  }
  onKeyDownHandler = event => {
    if (event.key === 'Enter') {
      const value = event.target.value
      event.preventDefault()
      dispatchCustomElementEvent(this, 'on_submit', { value, event })
    }
  }
  render() {
    const {
      type,
      size,
      label,
      status,
      status_state,
      status_animation,
      disabled,
      placeholder,
      description,
      align,
      input_class,
      submit_button_title,
      submit_button_variant,
      submit_button_icon,
      on_submit,
      autocomplete,
      readOnly,
      class: _className,
      className,

      id: _id /* eslint-disable-line */,
      children /* eslint-disable-line */,
      value: _value /* eslint-disable-line */,
      inputElement /* eslint-disable-line */,

      ...attributes
    } = this.props

    const { value } = this.state

    const id = this._id
    const showStatus = status && status !== 'error'
    const hasSubmitButton = on_submit || type === 'search'

    const classes = classnames(
      'dnb-input',
      `dnb-input--${type}`, //type_modifier
      size && `dnb-input--${size}`,
      hasSubmitButton && 'dnb-input--has-submit-button',
      align && `dnb-input__align--${align}`,
      showStatus && 'dnb-input__form-status',
      status && `dnb-input__status--${status_state}`,
      _className,
      className
    )

    const { inputElement: Elem, ...renderProps } = this.renderProps

    const inputParams = {
      ...renderProps,
      className: classnames('dnb-input__input', input_class),
      autoComplete: autocomplete,
      value: value || '',
      type,
      id,
      disabled,
      name: id,
      onChange: this.onChangeHandler,
      onKeyDown: this.onKeyDownHandler,
      onFocus: this.onFocusHandler,
      onBlur: this.onBlurHandler,
      ...attributes
    }

    // we may considder using: aria-details
    if (showStatus) {
      inputParams['aria-describedby'] = id + '-status'
    } else if (description) {
      inputParams['aria-describedby'] = id + '-description'
    }
    if (type === 'search') {
      inputParams.autoComplete = 'off'
    }
    if (readOnly) {
      inputParams['aria-readonly'] = inputParams.readOnly = true
    }
    if (label) {
      inputParams['aria-labelledby'] = id + '-label'
    }

    const shellParams = {
      'data-input-state': this.state.inputState,
      'data-has-content': String(value || '').length > 0 ? 'true' : 'false'
    }
    if (disabled) {
      shellParams['aria-disabled'] = true
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, inputParams)
    validateDOMAttributes(null, shellParams)

    return (
      <>
        {label && (
          <FormLabel
            id={id + '-label'}
            aria-hidden
            for_id={id}
            text={label}
            disabled={disabled}
          />
        )}
        <span className={classes}>
          <span className="dnb-input__shell" {...shellParams}>
            {(type === 'text' || type === 'number' || type === 'search') &&
              ((typeof Elem === 'function' ? (
                <Elem innerRef={this._ref} {...inputParams} />
              ) : null) || <input ref={this._ref} {...inputParams} />)}

            {placeholder && !isIE11 && (
              <span
                aria-hidden
                className={classnames(
                  'dnb-input__placeholder',
                  align ? `dnb-input__align--${align}` : null
                )}
              >
                {placeholder}
              </span>
            )}
          </span>

          {hasSubmitButton && (
            <Submit
              {...this.props}
              value={inputParams.value}
              icon={submit_button_icon}
              title={submit_button_title}
              variant={submit_button_variant}
            />
          )}

          {showStatus && (
            <FormStatus
              text={status}
              status={status_state}
              text_id={id + '-status'} // used for "aria-describedby"
              animation={status_animation}
            />
          )}
        </span>

        {this.props.description && (
          <span
            className="dnb-input__description"
            id={id + '-description'} // used for "aria-describedby"
          >
            {this.props.description}
          </span>
        )}
      </>
    )
  }
}

class Submit extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    title: PropTypes.string,
    variant: ButtonPropTypes.variant,
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ]),
    icon_size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    // React props
    onSubmit: PropTypes.func,
    onSubmitFocus: PropTypes.func,
    onSubmitBlur: PropTypes.func,

    // Web Component props
    on_submit: PropTypes.func,
    on_submit_focus: PropTypes.func,
    on_submit_blur: PropTypes.func
  }

  static defaultProps = {
    title: null,
    disabled: false,
    variant: 'secondary',
    icon: 'search',
    icon_size: 'medium',

    // React props
    onSubmit: null,
    onSubmitFocus: null,
    onSubmitBlur: null,

    // Web Component props
    on_submit: null,
    on_submit_focus: null,
    on_submit_blur: null
  }

  state = { focusState: 'virgin' }

  onFocusHandler = event => {
    const value = this.props.value
    this.setState({
      focusState: 'focus'
    })
    dispatchCustomElementEvent(this, 'on_submit_focus', { value, event })
  }
  onBlurHandler = event => {
    const value = this.props.value
    this.setState({
      focusState: 'dirty'
    })
    dispatchCustomElementEvent(this, 'on_submit_blur', { value, event })
  }
  onSubmitHandler = event => {
    const value = this.props.value
    dispatchCustomElementEvent(this, 'on_submit', { value, event })
  }
  render() {
    const { title, disabled, variant, icon, icon_size } = this.props

    const params = {
      type: 'submit',
      title,
      disabled
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <span
        className="dnb-input__submit-button"
        data-input-state={this.state.focusState}
      >
        <Button
          className="dnb-input__submit-button__button"
          variant={variant}
          icon={icon}
          size={icon_size}
          onClick={this.onSubmitHandler}
          onFocus={this.onFocusHandler}
          onBlur={this.onBlurHandler}
          {...params}
        />
      </span>
    )
  }
}
