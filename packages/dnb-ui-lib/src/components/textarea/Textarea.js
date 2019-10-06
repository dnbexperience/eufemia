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
  on_focus: null,
  on_blur: null,
  on_state_update: null
}

export const propTypes = {
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
  textarea_state: PropTypes.string,
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  global_status_id: PropTypes.string,
  placeholder: PropTypes.string,
  align: PropTypes.oneOf(['left', 'right']),
  stretch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,
  textarea_class: PropTypes.string,
  textarea_attributes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
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
  on_change: PropTypes.func,
  on_focus: PropTypes.func,
  on_blur: PropTypes.func,
  on_state_update: PropTypes.func
}

export const defaultProps = {
  value: 'initval',
  id: null,
  label: null,
  label_direction: null,
  status: null,
  textarea_state: null,
  status_state: 'error',
  status_animation: null,
  global_status_id: null,
  placeholder: null,
  align: null,
  stretch: null,
  disabled: null,
  textarea_class: null,
  class: null,
  textarea_attributes: null,
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
  static contextType = Context

  static enableWebComponent() {
    registerElement(Textarea.tagName, Textarea, defaultProps)
  }

  static getDerivedStateFromProps(props, state) {
    const value = Textarea.getValue(props)
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
    if (props.textarea_state) {
      state.textareaState = props.textarea_state
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
    if (value === '' || Textarea.hasValue(value)) {
      return value
    }
    return props.value
  }

  state = {
    textareaState: 'virgin',
    value: null,
    _value: null
  }

  constructor(props) {
    super(props)

    this._ref = React.createRef()
    this._id = props.id || makeUniqueId() // cause we need an id anyway

    // make sure we dont trigger getDerivedStateFromProps on startup
    this.state._listenForPropChanges = true
    if (props.textarea_state) {
      this.state.textareaState = props.textarea_state
    }
    this.state._value = props.value
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
      textareaState: Textarea.hasValue(value) ? 'dirty' : 'initial'
    })
    dispatchCustomElementEvent(this, 'on_blur', { value, event })
  }
  onChangeHandler = event => {
    const { value } = event.target
    this.setState({ value, _listenForPropChanges: false })
    dispatchCustomElementEvent(this, 'on_change', { value, event })
  }
  render() {
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    const {
      label,
      label_direction,
      status,
      status_state,
      status_animation,
      global_status_id,
      disabled,
      stretch,
      placeholder,
      align,
      textarea_class,
      readOnly,
      textarea_attributes,
      class: _className,
      className,

      id: _id, //eslint-disable-line
      children, //eslint-disable-line
      value: _value, //eslint-disable-line
      textareaElement: _textareaElement, //eslint-disable-line

      ...attributes
    } = props

    const { value, textareaState } = this.state

    const id = this._id
    const showStatus = status && status !== 'error'
    const hasValue = Textarea.hasValue(value)

    // pass along all props we wish to have as params
    let {
      textareaElement: TextareaElement,
      ...renderProps
    } = pickRenderProps(this.props, Textarea.renderProps)

    const textareaAttributes = textarea_attributes
      ? typeof textarea_attributes === 'string'
        ? JSON.parse(textarea_attributes)
        : textarea_attributes
      : {}

    const textareaParams = {
      ...renderProps,
      className: classnames('dnb-textarea__textarea', textarea_class),
      role: 'textbox',
      value: hasValue ? value : '',
      id,
      disabled,
      name: id,
      ...attributes,
      ...textareaAttributes,
      onChange: this.onChangeHandler,
      onFocus: this.onFocusHandler,
      onBlur: this.onBlurHandler
    }

    // we may considder using: aria-details
    if (showStatus) {
      textareaParams['aria-describedby'] = id + '-status'
    }
    if (readOnly) {
      textareaParams['aria-readonly'] = textareaParams.readOnly = true
    }

    const shellParams = {
      className: 'dnb-textarea__shell'
    }
    if (isTrue(disabled)) {
      shellParams['aria-disabled'] = true
    }

    const mainParams = {
      className: classnames(
        'dnb-textarea',
        `dnb-textarea--${textareaState}`,
        hasValue && 'dnb-textarea--has-content',
        align && `dnb-textarea__align--${align}`,
        status && `dnb-textarea__status--${status_state}`,
        label_direction && `dnb-textarea--${label_direction}`,
        isTrue(stretch) && `dnb-textarea--stretch`,
        createSpacingClasses(props),
        _className,
        className
      )
    }

    const innerParams = {
      className: 'dnb-textarea__inner'
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
      <span {...mainParams}>
        {label && (
          <FormLabel
            id={id + '-label'}
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
              text_id={id + '-status'} // used for "aria-describedby"
              text={status}
              status={status_state}
              animation={status_animation}
            />
          )}

          <span {...shellParams}>
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
        </span>
      </span>
    )
  }
}
