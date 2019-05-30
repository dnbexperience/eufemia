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

const renderProps = {
  on_change: null,
  on_focus: null,
  on_blur: null
}

export const propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  label: PropTypes.string,
  status: PropTypes.string,
  textarea_state: PropTypes.string,
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  submit_button_title: PropTypes.string,
  placeholder: PropTypes.string,
  description: PropTypes.string,
  align: PropTypes.oneOf(['left', 'right']),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,
  textarea_class: PropTypes.string,
  attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cols: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

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
  value: null,
  id: null,
  label: null,
  status: null,
  textarea_state: null,
  status_state: 'error',
  status_animation: null,
  placeholder: null,
  description: null,
  align: null,
  disabled: false,
  textarea_class: null,
  class: null,
  attributes: null,
  readOnly: false,
  rows: null,
  cols: null,

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
    if (props.disabled) {
      state.textareaState = 'disabled'
    }
    if (props.textarea_state) {
      state.textareaState = props.textarea_state
    }
    state._listenForPropChanges = true
    return state
  }

  static getValue(props) {
    if (props.value) return props.value
    return processChildren(props)
  }

  state = {
    textareaState: 'virgin',
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
    if (props.textarea_state) {
      this.state.textareaState = props.textarea_state
    }
  }
  onFocusHandler = event => {
    const { value } = event.target
    this.setState({
      value,
      _listenForPropChanges: false,
      textareaState: 'focus'
    })
    dispatchCustomElementEvent(this, 'on_focus', { value, event })
  }
  onBlurHandler = event => {
    const { value } = event.target
    this.setState({
      value,
      _listenForPropChanges: false,
      textareaState: String(value || '').length > 0 ? 'dirty' : 'initial'
    })
    dispatchCustomElementEvent(this, 'on_blur', { value, event })
  }
  onChangeHandler = event => {
    const { value } = event.target
    this.setState({ value, _listenForPropChanges: false })
    dispatchCustomElementEvent(this, 'on_change', { value, event })
  }
  render() {
    const {
      label,
      status,
      status_state,
      status_animation,
      disabled,
      placeholder,
      description,
      align,
      textarea_class,
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

    const { value, textareaState } = this.state

    const id = this._id
    const showStatus = status && status !== 'error'

    const classes = classnames(
      'dnb-textarea',
      `dnb-textarea--${textareaState}`,
      String(value || '').length > 0 && 'dnb-textarea--has-content',
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
      value: value || '',
      id,
      disabled,
      name: id,
      ...attributes,
      onChange: this.onChangeHandler,
      onFocus: this.onFocusHandler,
      onBlur: this.onBlurHandler
    }

    // we may considder using: aria-details
    if (showStatus) {
      textareaParams['aria-describedby'] = id + '-status'
    } else if (description) {
      textareaParams['aria-describedby'] = id + '-description'
    }
    if (readOnly) {
      textareaParams['aria-readonly'] = textareaParams.readOnly = true
    }
    if (label) {
      textareaParams['aria-labelledby'] = id + '-label'
    }

    const shellParams = {}
    if (disabled) {
      shellParams['aria-disabled'] = true
    }

    // to show the ending dots on a placeholder, if the text is longer
    const placeholderStyle =
      parseFloat(this.props.rows) > 0
        ? {
            '--textarea-rows': parseFloat(this.props.rows)
            // '--textarea-cols': parseFloat(this.props.cols)
          }
        : null

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

            {placeholder && (
              <span
                aria-hidden
                className={classnames(
                  'dnb-textarea__placeholder',
                  align ? `dnb-textarea__align--${align}` : null
                )}
                style={placeholderStyle}
              >
                {placeholder}
              </span>
            )}
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
