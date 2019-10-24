/**
 * Web Checkbox Component
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import Context from '../../shared/Context'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'

const renderProps = {
  on_change: null,
  on_state_update: null
}

const propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  label_position: PropTypes.oneOf(['left', 'right']),
  title: PropTypes.string,
  default_state: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  global_status_id: PropTypes.string,
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

const defaultProps = {
  label: null,
  label_position: null,
  title: null,
  default_state: null,
  checked: 'default', //we have to send this as a string
  disabled: null,
  id: null,
  status: null,
  status_state: 'error',
  status_animation: null,
  global_status_id: null,
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
 * The checkbox component is our enhancement of the classic checkbox button. It acts like a checkbox. Example: On/off, yes/no.
 */
export default class Checkbox extends Component {
  static tagName = 'dnb-checkbox'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps
  static contextType = Context

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
    this._id = props.id || makeUniqueId() // cause we need an id anyway
    this.state = {
      _listenForPropChanges: true,
      hasDefaultState: props.default_state !== null,
      checked: Checkbox.parseChecked(props.default_state || props.checked)
    }
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
    if (isTrue(this.props.readOnly)) {
      return event.preventDefault()
    }
    const checked = !this.state.checked
    this.setState({ checked, _listenForPropChanges: false })
    dispatchCustomElementEvent(this, 'on_change', { checked, event })

    // help firefox and safari to have an correct state after a click
    if (this._refInput.current) {
      this._refInput.current.focus()
    }
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
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    const {
      value,
      status,
      status_state,
      status_animation,
      global_status_id,
      label,
      label_position,
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
    } = props

    const { checked } = this.state

    const id = this._id
    const showStatus = status && status !== 'error'

    const mainParams = {
      className: classnames(
        'dnb-checkbox',
        status && `dnb-checkbox__status--${status_state}`,
        label &&
          `dnb-checkbox--label-position-${label_position || 'right'}`,
        createSpacingClasses(props),
        className,
        _className
      )
    }

    const inputParams = {
      disabled,
      checked,
      onMouseOut: this.onMouseOutHandler, // for resetting the button to the default state
      ...rest
    }

    if (showStatus) {
      inputParams['aria-describedby'] = id + '-status'
    }
    if (readOnly) {
      inputParams['aria-readonly'] = inputParams.readOnly = true
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, inputParams)

    const statusComp = showStatus && (
      <FormStatus
        id={id + '-form-status'}
        global_status_id={global_status_id}
        text_id={id + '-status'} // used for "aria-describedby"
        width_selector={id + ', ' + id + '-label'}
        text={status}
        status={status_state}
        animation={status_animation}
      />
    )

    return (
      <span {...mainParams}>
        <span className="dnb-checkbox__order">
          {label && (
            <FormLabel
              id={id + '-label'}
              for_id={id}
              text={label}
              disabled={disabled}
            />
          )}
          <span className="dnb-checkbox__inner">
            {label_position === 'left' && statusComp}
            <span className="dnb-checkbox__shell">
              <input
                id={id}
                name={id}
                type="checkbox"
                title={title}
                aria-checked={checked}
                className="dnb-checkbox__input"
                value={checked ? value || '' : ''}
                disabled={isTrue(disabled)}
                {...inputParams}
                onChange={this.onChangeHandler}
                onKeyDown={this.onKeyDownHandler}
                ref={this._refInput}
              />
              <span className="dnb-checkbox__helper" aria-hidden>
                {'-'}
              </span>
              <span className="dnb-checkbox__button" aria-hidden>
                <span className="dnb-checkbox__focus" />
              </span>
              <CheckSVG />
            </span>
          </span>
        </span>
        {(label_position === 'right' || !label_position) && statusComp}
      </span>
    )
  }
}

export const CheckSVG = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="dnb-checkbox__gfx"
    aria-hidden
    {...props}
  >
    <path d="M5.86 12.95a.75.75 0 1 0-1.22.86l1.22-.86zm2.15 4.34l.62-.42-.01-.01-.61.43zm.94.52l.02-.75-.02.75zm.98-.46l-.6-.47v.01l.6.46zm9.4-10.7a.75.75 0 0 0-1.17-.93l1.18.93zm-14.7 7.16l2.76 3.91 1.23-.86-2.76-3.91-1.22.86zm2.75 3.9c.35.52.93.84 1.55.85l.04-1.5a.43.43 0 0 1-.34-.19l-1.25.84zm1.55.85c.62.02 1.22-.26 1.6-.76l-1.2-.9a.43.43 0 0 1-.36.16l-.04 1.5zm1.59-.75l8.82-11.16-1.18-.93-8.82 11.16 1.18.93z" />
  </svg>
)
