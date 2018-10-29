/**
 * Web Input Component
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Icon from '../icon/IconWithAllIcons'
import {
  registerElement,
  validateDOMAttributes,
  processChildren,
  pickRenderProps,
  dispatchCustomElementEvent
  // setCustomElementMethod
} from '../../shared/component-helper'
// import './style/dnb-input.scss' // no good solution to import the style here

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
  autocomplete: PropTypes.string,
  search_button_title: PropTypes.string,
  placeholder: PropTypes.string,
  description: PropTypes.string,
  font_class: PropTypes.string,
  align: PropTypes.string,
  extra_information: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,
  attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  // React props
  className: PropTypes.string,
  inputElement: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

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
  autocomplete: 'off',
  search_button_title: '',
  placeholder: null,
  description: null,
  font_class: null,
  align: null,
  extra_information: null,
  disabled: false,
  class: null,
  attributes: null,

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
export default class Input extends Component {
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

    // pass along all props we wish to have as params
    this.renderProps = pickRenderProps(props, renderProps)

    // make sure we dont trigger getDerivedStateFromProps on startup
    this.state._listenForPropChanges = true
    this.state.value = Input.getValue(props)

    // This is only to show, that we also can add a custom method to the custom element, and call it like so:
    // this._ref.current.focus() // current would be the Custom Element - we may delay it for 1 tick, to make sure we call if after it is set
    // We also have to ahve this method in here
    // setCustomElementMethod(this, 'focus', () => {
    //   setTimeout(() => {
    //     try {
    //       this._ref.current.focus()
    //     } catch (e) {
    //       //
    //     }
    //   }, 100)
    // })
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
      autocomplete,
      type,
      size,
      id,
      disabled,
      placeholder,
      description,
      font_class,
      align,
      extra_information
    } = this.props

    const classes = classnames(
      'dnb-input',
      `dnb-input--${type}`, //type_modifier
      extra_information ? 'dnb-input--has-extra-information' : null,
      size ? 'dnb-input--' + size : '',
      this.props.class,
      this.props.className
    )

    const { inputElement: Elem, ...renderProps } = this.renderProps

    const inputParams = {
      ...renderProps,
      className: classnames(
        'dnb-input__input',
        font_class ? font_class : 'typo-light',
        type === 'search' ? 'dnb-input__input--search' : null,
        align ? `dnb-input__align--${align}` : null
      ),
      autoComplete: autocomplete,
      value: this.state.value || '',
      type,
      id,
      // align,
      disabled:
        typeof disabled === 'string'
          ? disabled === 'true'
          : Boolean(disabled),
      name: id,
      onChange: this.onChangeHandler,
      onKeyDown: this.onKeyDownHandler,
      onFocus: this.onFocusHandler,
      onBlur: this.onBlurHandler
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, inputParams)

    if (description) inputParams['aria-describedby'] = id + '-description'

    const shellParams = {
      'data-input-state': this.state.inputState,
      'data-has-content':
        String(this.state.value || '').length > 0 ? 'true' : 'false'
    }

    return (
      <span className={classes}>
        <span className="dnb-input__shell" {...shellParams}>
          {(type === 'text' || type === 'number' || type === 'search') &&
            ((typeof Elem === 'function' ? (
              <Elem innerRef={this._ref} {...inputParams} />
            ) : null) || <input ref={this._ref} {...inputParams} />)}

          {type === 'search' && (
            <Submit
              {...this.props}
              value={inputParams.value}
              title={this.props.search_button_title}
            />
          )}

          {placeholder && (
            <span
              className={classnames(
                'dnb-input__placeholder',
                font_class ? font_class : 'typo-book',
                align ? `dnb-input__align--${align}` : null
              )}
            >
              {placeholder}
            </span>
          )}
        </span>

        {this.props.description && (
          <span
            className="dnb-input__description"
            id={id + '-description'}
          >
            {this.props.description}
          </span>
        )}

        {extra_information && (
          <span className="dnb-input__extra-information">
            {extra_information}
          </span>
        )}
      </span>
    )
  }
}

class Submit extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
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
    icon_size: 20,

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
    const { title } = this.props
    const params = {
      type: 'submit',
      title
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <span
        className="dnb-input__search-submit"
        data-input-state={this.state.focusState}
      >
        <button
          className="dnb-input__search-submit__button"
          onClick={this.onSubmitHandler}
          onFocus={this.onFocusHandler}
          onBlur={this.onBlurHandler}
          {...params}
        >
          <Icon icon="search" icon_size={this.props.icon_size} />
        </button>
      </span>
    )
  }
}
