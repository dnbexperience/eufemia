/**
 * Web Textarea Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import {
  registerElement,
  validateDOMAttributes,
  processChildren,
  pickRenderProps,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
// import { isIE11 } from '../../shared/helpers'

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
  // textarea_state: PropTypes.string,
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  // autocomplete: PropTypes.oneOf(['on', 'off']),
  submit_button_title: PropTypes.string,
  placeholder: PropTypes.string,
  description: PropTypes.string,
  align: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,
  textarea_class: PropTypes.string,
  attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  // React props
  className: PropTypes.string,
  textareaElement: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),

  // Web Component props
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,
  on_change: PropTypes.func
  // on_focus: PropTypes.func,
  // on_blur: PropTypes.func,
  // on_submit_focus: PropTypes.func,
  // on_submit_blur: PropTypes.func
}

export const defaultProps = {
  type: 'text',
  size: null,
  value: null,
  id: null,
  label: null,
  status: null,
  // textarea_state: null,
  status_state: 'error',
  status_animation: null,
  // autocomplete: 'off',
  placeholder: null,
  description: null,
  align: null,
  disabled: false,
  textarea_class: null,
  class: null,
  attributes: null,
  readOnly: false,

  // React props
  className: null,
  textareaElement: null,
  children: null,

  // Web Component props
  custom_element: null,
  custom_method: null,
  ...renderProps
}

/**
 * The textarea component is an umbrella component for all textareas which share the same style as the classic `text` textarea field. Radio buttons and other form elements are not included here.
 */
export default class Textarea extends PureComponent {
  static tagName = 'dnb-textarea'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  static enableWebComponent() {
    registerElement(Textarea.tagName, Textarea, defaultProps)
  }

  static getDerivedStateFromProps(props, state) {
    const value = Textarea.getValue(props)
    if (
      state._listenForPropChanges &&
      value !== null &&
      value !== state.value
    ) {
      state.value = value
    }
    // if (props.disabled) {
    //   state.textareaState = 'disabled'
    // }
    // if (props.textarea_state) {
    //   state.textareaState = props.textarea_state
    // }
    state._listenForPropChanges = true
    return state
  }

  static getValue(props) {
    if (props.value) return props.value
    return processChildren(props)
  }

  state = {
    // textareaState: 'virgin',
    value: null
  }

  constructor(props) {
    super(props)

    this._ref = React.createRef()
    this._id =
      props.id || `dnb-textarea-${Math.round(Math.random() * 999)}` // cause we need an id anyway

    // pass along all props we wish to have as params
    this.renderProps = pickRenderProps(props, renderProps)

    // make sure we dont trigger getDerivedStateFromProps on startup
    this.state._listenForPropChanges = true
    this.state.value = Textarea.getValue(props)
    // if (props.textarea_state) {
    //   this.state.textareaState = props.textarea_state
    // }
  }
  // onFocusHandler = event => {
  //   const { value } = event.target
  //   this.setState({
  //     value,
  //     _listenForPropChanges: false,
  //     textareaState: 'focus'
  //   })
  //   dispatchCustomElementEvent(this, 'on_focus', { value, event })
  // }
  // onBlurHandler = event => {
  //   const { value } = event.target
  //   this.setState({
  //     value,
  //     _listenForPropChanges: false,
  //     textareaState: String(value || '').length > 0 ? 'dirty' : 'initial'
  //   })
  //   dispatchCustomElementEvent(this, 'on_blur', { value, event })
  // }
  onChangeHandler = event => {
    const { value } = event.target
    this.setState({ value, _listenForPropChanges: false })
    dispatchCustomElementEvent(this, 'on_change', { value, event })
  }
  // onKeyDownHandler = event => {
  //   if (event.key === 'Enter') {
  //     const { value } = event.target
  //     dispatchCustomElementEvent(this, 'on_submit', { value, event })
  //   }
  // }
  render() {
    const {
      type,
      // size,
      label,
      status,
      status_state,
      status_animation,
      disabled,
      // placeholder,
      description,
      align,
      textarea_class,
      // submit_button_title,
      // submit_button_variant,
      // submit_button_icon,
      // submitButton,
      // autocomplete,
      readOnly,
      class: _className,
      className,

      id: _id, //eslint-disable-line
      children, //eslint-disable-line
      value: _value, //eslint-disable-line
      on_submit, //eslint-disable-line
      textareaElement: _textareaElement, //eslint-disable-line

      ...attributes
    } = this.props

    const {
      value
      // , textareaState
    } = this.state

    const id = this._id
    const showStatus = status && status !== 'error'
    // const hasSubmitButton = submitButton || type === 'search'

    const classes = classnames(
      'dnb-textarea',
      `dnb-textarea--${type}`, //type_modifier
      // size && `dnb-textarea--${size}`,
      // hasSubmitButton && 'dnb-textarea--has-submit-button',
      align && `dnb-textarea__align--${align}`,
      showStatus && 'dnb-textarea__form-status',
      status && `dnb-textarea__status--${status_state}`,
      _className,
      className
    )

    let {
      textareaElement: TextareaElement,
      ...renderProps
    } = this.renderProps

    const textareaParams = {
      ...renderProps,
      className: classnames('dnb-textarea__textarea', textarea_class),
      // autoComplete: autocomplete,
      value: value || '',
      // type,
      id,
      disabled,
      name: id,
      ...attributes,
      onChange: this.onChangeHandler
      // onKeyDown: this.onKeyDownHandler,
      // onFocus: this.onFocusHandler,
      // onBlur: this.onBlurHandler
    }

    // we may considder using: aria-details
    if (showStatus) {
      textareaParams['aria-describedby'] = id + '-status'
    } else if (description) {
      textareaParams['aria-describedby'] = id + '-description'
    }
    // if (type === 'search') {
    //   textareaParams.autoComplete = 'off'
    // }
    if (readOnly) {
      textareaParams['aria-readonly'] = textareaParams.readOnly = true
    }
    if (label) {
      textareaParams['aria-labelledby'] = id + '-label'
    }

    const shellParams = {
      // 'data-textarea-state': textareaState,
      // 'data-has-content': String(value || '').length > 0 ? 'true' : 'false'
    }
    if (disabled) {
      shellParams['aria-disabled'] = true
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, textareaParams)
    validateDOMAttributes(null, shellParams)

    if (TextareaElement && typeof TextareaElement === 'function') {
      TextareaElement = TextareaElement(textareaParams, this._ref)
    } else if (!TextareaElement && _textareaElement) {
      TextareaElement = _textareaElement
    }

    return (
      <>
        {label && (
          <FormLabel
            id={id + '-label'}
            for_id={id}
            text={label}
            disabled={disabled}
          />
        )}
        <span className={classes}>
          <span className="dnb-textarea__shell" {...shellParams}>
            {TextareaElement || (
              <textarea ref={this._ref} {...textareaParams} />
            )}

            {/* {placeholder && !isIE11 && (
              <span
                aria-hidden
                className={classnames(
                  'dnb-textarea__placeholder',
                  align ? `dnb-textarea__align--${align}` : null
                )}
              >
                {placeholder}
              </span>
            )} */}
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

        {this.props.description && (
          <span
            className="dnb-textarea__description"
            id={id + '-description'} // used for "aria-describedby"
          >
            {this.props.description}
          </span>
        )}
      </>
    )
  }
}
