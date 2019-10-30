/**
 * Web Input Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Button from '../button/Button'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  processChildren,
  pickRenderProps,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import Context from '../../shared/Context'

const renderProps = {
  on_change: null,
  on_submit: null,
  on_focus: null,
  on_blur: null,
  on_submit_focus: null,
  on_submit_blur: null,
  on_state_update: null
}

const propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  label_direction: PropTypes.oneOf(['horizontal', 'vertical']),
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  input_state: PropTypes.string,
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  global_status_id: PropTypes.string,
  autocomplete: PropTypes.oneOf(['on', 'off']),
  submit_button_title: PropTypes.string,
  placeholder: PropTypes.string,
  description: PropTypes.string, // deprecated
  suffix: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  align: PropTypes.string,
  selectall: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  stretch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,
  input_class: PropTypes.string,
  input_attributes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  // Submit button
  submit_button_variant: Button.propTypes.variant,
  submit_button_icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),

  // React props
  className: PropTypes.string,
  inputElement: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
  submit_element: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),

  // Web Component props
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,
  on_change: PropTypes.func,
  on_submit: PropTypes.func,
  on_focus: PropTypes.func,
  on_blur: PropTypes.func,
  on_submit_focus: PropTypes.func,
  on_submit_blur: PropTypes.func,
  on_state_update: PropTypes.func
}

const defaultProps = {
  type: 'text',
  size: null,
  value: 'initval',
  id: null,
  label: null,
  label_direction: null,
  status: null,
  input_state: null,
  status_state: 'error',
  status_animation: null,
  global_status_id: null,
  autocomplete: 'off',
  placeholder: null,
  description: null, // deprecated
  suffix: null,
  align: null,
  selectall: null,
  stretch: null,
  disabled: null,
  input_class: null,
  class: null,
  input_attributes: null,
  readOnly: false,

  // Submit button
  submit_button_title: null,
  submit_button_variant: 'secondary',
  submit_button_icon: 'search',

  // React props
  className: null,
  inputElement: null,
  children: null,
  submit_element: null,

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
  static contextType = Context

  static enableWebComponent() {
    registerElement(Input.tagName, Input, defaultProps)
  }

  static getDerivedStateFromProps(props, state) {
    const value = Input.getValue(props)
    if (
      state._listenForPropChanges &&
      value !== 'initval' &&
      value !== state.value
    ) {
      if (
        value !== state.value &&
        value !== state._value &&
        typeof props.on_state_update === 'function'
      ) {
        dispatchCustomElementEvent({ props }, 'on_state_update', { value })
      }
      state.value = value
    }
    if (props.input_state) {
      state.inputState = props.input_state
    }
    state._listenForPropChanges = true
    return state
  }

  static hasValue(value) {
    return (
      ((typeof value === 'string' || typeof value === 'number') &&
        String(value).length > 0) ||
      false
    )
  }

  static getValue(props) {
    const value = processChildren(props)
    if (value === '' || Input.hasValue(value)) {
      return value
    }
    return props.value
  }

  state = { inputState: 'virgin', value: null, _value: null }

  constructor(props, context) {
    super(props)

    this._ref = React.createRef()
    this._id =
      props.id ||
      (context.formRow &&
        typeof context.formRow.useId === 'function' &&
        context.formRow.useId()) ||
      makeUniqueId() // cause we need an id anyway

    // make sure we dont trigger getDerivedStateFromProps on startup
    this.state._listenForPropChanges = true
    this.state._value = props.value
  }
  onFocusHandler = event => {
    const { value } = event.target
    this.setState({
      value,
      _listenForPropChanges: false,
      inputState: 'focus'
    })

    if (isTrue(this.props.selectall) && this._ref.current) {
      setTimeout(() => {
        try {
          this._ref.current.select()
        } catch (e) {
          console.log(e)
        }
      }, 1) // safari needs a delay
    }

    dispatchCustomElementEvent(this, 'on_focus', { value, event })
  }
  onBlurHandler = event => {
    const { value } = event.target
    this.setState({
      value,
      _listenForPropChanges: false,
      inputState: Input.hasValue(value) ? 'dirty' : 'initial'
    })
    dispatchCustomElementEvent(this, 'on_blur', { value, event })
  }
  onChangeHandler = event => {
    const { value } = event.target
    this.setState({ value, _listenForPropChanges: false })
    dispatchCustomElementEvent(this, 'on_change', { value, event })
  }
  onKeyDownHandler = event => {
    const value = event.target.value
    dispatchCustomElementEvent(this, 'on_key_down', { value, event })
    if (event.key === 'Enter') {
      dispatchCustomElementEvent(this, 'on_submit', { value, event })
    }
  }
  render() {
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    const {
      type,
      size,
      label,
      label_direction,
      status,
      status_state,
      status_animation,
      global_status_id,
      disabled,
      placeholder,
      description, // deprecated
      suffix,
      align,
      input_class,
      submit_button_title,
      submit_button_variant,
      submit_button_icon,
      submit_element,
      autocomplete,
      readOnly,
      stretch,
      input_attributes,
      class: _className,
      className,

      id: _id, //eslint-disable-line
      children, //eslint-disable-line
      value: _value, //eslint-disable-line
      selectall, //eslint-disable-line
      on_submit, //eslint-disable-line
      inputElement: _inputElement, //eslint-disable-line

      ...attributes
    } = props

    let { value, inputState } = this.state

    if (disabled) {
      inputState = 'disabled'
    }
    const sizeIsNumber = parseFloat(size) > 0

    const id = this._id
    const showStatus = status && status !== 'error'
    const hasSubmitButton = submit_element || type === 'search'
    const hasValue = Input.hasValue(value)

    const mainParams = {
      className: classnames(
        'dnb-input',
        `dnb-input--${type}`, //type_modifier
        size && !sizeIsNumber && `dnb-input--${size}`,
        hasSubmitButton && 'dnb-input--has-submit-element',
        align && `dnb-input__align--${align}`,
        status && `dnb-input__status--${status_state}`,
        label_direction && `dnb-input--${label_direction}`,
        isTrue(stretch) && `dnb-input--stretch`,
        createSpacingClasses(props),
        _className,
        className
      )
    }

    const innerParams = {
      className: 'dnb-input__inner'
    }

    // pass along all props we wish to have as params
    let { inputElement: InputElement, ...renderProps } = pickRenderProps(
      this.props,
      Input.renderProps
    )

    const inputAttributes = input_attributes
      ? typeof input_attributes === 'string'
        ? JSON.parse(input_attributes)
        : input_attributes
      : {}

    const inputParams = {
      ...renderProps,
      className: classnames('dnb-input__input', input_class),
      autoComplete: autocomplete,
      value: hasValue ? value : '',
      type,
      id,
      disabled: isTrue(disabled),
      name: id,
      ...attributes,
      ...inputAttributes,
      onChange: this.onChangeHandler,
      onKeyDown: this.onKeyDownHandler,
      onFocus: this.onFocusHandler,
      onBlur: this.onBlurHandler
    }

    if (sizeIsNumber) {
      inputParams.size = size
    }

    // we may considder using: aria-details
    if (showStatus || (suffix || description)) {
      inputParams['aria-describedby'] = `${
        showStatus ? id + '-status' : ''
      } ${suffix || description ? id + '-description' : ''}`
    }
    if (type === 'search') {
      inputParams.autoComplete = 'off'
    }
    if (readOnly) {
      inputParams['aria-readonly'] = inputParams.readOnly = true
    }

    const shellParams = {
      'data-input-state': inputState,
      'data-has-content': hasValue ? 'true' : 'false'
    }
    if (isTrue(disabled)) {
      shellParams['aria-disabled'] = true
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, inputParams)
    validateDOMAttributes(null, shellParams)

    if (InputElement && typeof InputElement === 'function') {
      InputElement = InputElement(inputParams, this._ref)
    } else if (!InputElement && _inputElement) {
      InputElement = _inputElement
    }

    return (
      <span {...mainParams}>
        {label && (
          <FormLabel
            id={id + '-label'} // used for "aria-describedby"
            for_id={id}
            text={label}
            disabled={disabled}
            direction={label_direction}
          />
        )}

        <span {...innerParams}>
          {showStatus && (
            <FormStatus
              id={id + '-form-status'}
              global_status_id={global_status_id}
              text={status}
              status={status_state}
              text_id={id + '-status'} // used for "aria-describedby"
              animation={status_animation}
            />
          )}

          <span className="dnb-input__row">
            <span className="dnb-input__shell" {...shellParams}>
              {InputElement || <input ref={this._ref} {...inputParams} />}

              {placeholder && (
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
              <span className="dnb-input__submit-element">
                {submit_element ? (
                  submit_element
                ) : (
                  <SubmitButton
                    {...attributes}
                    value={inputParams.value}
                    icon={submit_button_icon}
                    icon_size={size === 'large' ? 'medium' : size}
                    title={submit_button_title}
                    variant={submit_button_variant}
                    disabled={disabled}
                    size={size}
                    on_submit={on_submit}
                  />
                )}
              </span>
            )}
            {(suffix || description) && (
              <span
                className="dnb-input__description"
                id={id + '-description'} // used for "aria-describedby"
              >
                {suffix || description}
              </span>
            )}
          </span>
        </span>
      </span>
    )
  }
}

class SubmitButton extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    title: PropTypes.string,
    variant: Button.propTypes.variant,
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ]),
    icon_size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,

    // Web Component props
    on_submit: PropTypes.func,
    on_submit_focus: PropTypes.func,
    on_submit_blur: PropTypes.func
  }

  static defaultProps = {
    id: null,
    value: null,
    title: null,
    disabled: false,
    variant: 'secondary',
    icon: 'search',
    icon_size: null,
    className: null,

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
    const {
      id,
      title,
      disabled,
      variant,
      icon,
      icon_size,
      className,
      ...rest
    } = this.props

    const params = {
      id,
      type: 'submit',
      title,
      disabled,
      ...rest
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <span
        className="dnb-input__submit-button"
        data-input-state={this.state.focusState}
      >
        <Button
          className={classnames(
            'dnb-input__submit-button__button',
            className
          )}
          variant={variant}
          icon={icon}
          icon_size={icon_size}
          onClick={this.onSubmitHandler}
          onFocus={this.onFocusHandler}
          onBlur={this.onBlurHandler}
          {...params}
        />
      </span>
    )
  }
}

export { SubmitButton }
