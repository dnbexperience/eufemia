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
  makeUniqueId,
  registerElement,
  extendPropsWithContext,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import Radio from '../radio/Radio'
import Checkbox from '../checkbox/Checkbox'
import Button from '../button/Button'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import ToggleButtonGroup from './ToggleButtonGroup'
import ToggleButtonGroupContext from './ToggleButtonGroupContext'
import Context from '../../shared/Context'

const renderProps = {
  on_change: null,
  on_state_update: null
}

export const propTypes = {
  text: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  label_direction: PropTypes.oneOf(['horizontal', 'vertical']),
  title: PropTypes.string,
  checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  variant: PropTypes.oneOf(['default', 'checkbox', 'radio']),
  left_component: PropTypes.node,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  // group: PropTypes.string,
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  global_status_id: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  icon_position: PropTypes.string,
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
  text: null,
  label: null,
  label_direction: null,
  title: null,
  checked: null,
  variant: null,
  left_component: null,
  disabled: null,
  id: null,
  // group: null,
  status: null,
  status_state: 'error',
  status_animation: null,
  global_status_id: null,
  value: '',
  icon: null,
  icon_position: 'right',
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

  constructor(props, context) {
    super(props)
    this._id = props.id || makeUniqueId() // cause we need an id anyway
    this._refButton = React.createRef()

    this.state = {
      _listenForPropChanges: true
    }

    // set the startup checked values from context, if they exists
    if (context.name && typeof props.value !== 'undefined') {
      if (typeof context.value !== 'undefined') {
        this.state.checked = context.value === props.value
        this.state._listenForPropChanges = false
      } else if (context.values && Array.isArray(context.values)) {
        this.state.checked = context.values.includes(props.value)
        this.state._listenForPropChanges = false

        // make sure we update the context
        // with a possible custom set "checked" state
      } else if (ToggleButton.parseChecked(props.checked)) {
        if (context.setContext) {
          if (context.multiselect) {
            context.setContext(tmp => {
              return {
                values:
                  // in case we have set before a new context (other component)
                  // we fill combine theese arrays
                  tmp && Array.isArray(tmp.values)
                    ? [...tmp.values, props.value]
                    : [props.value]
              }
            })
          } else {
            context.setContext({
              value: props.value
            })
          }
        }
      }
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
    switch (keycode(event)) {
      case 'enter':
        this.onClickHandler(event)
        break
    }
  }

  onKeyUpHandler = event => {
    switch (keycode(event)) {
      case 'enter':
        this.onClickHandler(event)
        break
    }
  }

  onClickHandler = ({ event }) => {
    if (isTrue(this.props.readOnly)) {
      return event.preventDefault()
    }

    // only select a value once
    if (
      !isTrue(this.context.multiselect) &&
      this.props.value === this.context.value
    ) {
      return
    }

    // else we change the checked sstate
    const checked = !this.state.checked
    this.setState({
      // reset the status state, because the user has mad an action
      // status_state: null,
      checked,
      _listenForPropChanges: false
    })
    this.callOnChange({ checked, event })

    if (this._refButton.current && checked) {
      // simulate focus for firefox and safari
      // so we can get rid of the hover ring after click
      try {
        this._refButton.current._ref.current.focus()
      } catch (e) {
        console.log(e)
      }
    }
  }

  callOnChange = ({ checked, event }) => {
    const { value } = this.props
    if (this.context.onChange) {
      this.context.onChange({
        value,
        event
      })
    }
    dispatchCustomElementEvent(this, 'on_change', {
      checked,
      value,
      event
    })
  }

  render() {
    return (
      <Context.Consumer>
        {({ formRow }) => {
          // consume the formRow context
          let props = formRow
            ? // use only the props from context, who are available here anyway
              extendPropsWithContext(this.props, formRow)
            : this.props

          // consume the toggleButton context
          props = this.context.name
            ? // use only the props from context, who are available here anyway
              extendPropsWithContext(this.props, this.context)
            : props

          const {
            status,
            status_state,
            status_animation,
            global_status_id,
            label,
            label_direction,
            text,
            title,
            readOnly,
            className,
            class: _className,
            disabled,
            variant,
            left_component,

            id: _id, // eslint-disable-line
            // group: _group, // eslint-disable-line
            value: _value, // eslint-disable-line
            checked: _checked, // eslint-disable-line
            attributes, // eslint-disable-line
            children, // eslint-disable-line
            on_change, // eslint-disable-line
            on_state_update, // eslint-disable-line
            custom_method, // eslint-disable-line
            custom_element, // eslint-disable-line

            ...rest
          } = props

          let { checked } = this.state

          if (
            !isTrue(this.context.multiselect) &&
            typeof this.context.value !== 'undefined'
          ) {
            checked = _value === this.context.value
          }

          const id = this._id
          const showStatus = status && status !== 'error'

          const mainParams = {
            className: classnames(
              'dnb-toggle-button',
              status && `dnb-toggle-button__status--${status_state}`,
              checked && `dnb-toggle-button--checked`,
              label_direction && `dnb-toggle-button--${label_direction}`,
              createSpacingClasses(props),
              className,
              _className
            )
          }

          const buttonParams = {
            id,
            disabled,
            text,
            title,
            ['aria-pressed']: String(checked),
            ...rest
          }

          // to remove spacing props
          validateDOMAttributes(this.props, buttonParams)

          const componentParams = {
            checked,
            disabled,
            ['aria-hidden']: true,
            tabIndex: '-1'
          }

          if (status) {
            // do not send along the message, but only the status states
            if (status_state === 'info') {
              componentParams.status_state = 'info'
            } else {
              componentParams.status = 'error'
            }
          }

          if (showStatus) {
            buttonParams['aria-describedby'] = id + '-status'
          }
          if (readOnly) {
            buttonParams['aria-readonly'] = buttonParams.readOnly = true
          }

          let leftComponent = null
          switch (variant) {
            case 'radio':
              leftComponent = (
                <Radio id={`${id}-radio`} {...componentParams} />
              )
              break

            case 'checkbox':
              leftComponent = (
                <Checkbox id={`${id}-checkbox`} {...componentParams} />
              )
              break

            case 'default':
            default:
              leftComponent = left_component
              break
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
              <span className="dnb-toggle-button__inner">
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

                <span className="dnb-toggle-button__shell">
                  <Button
                    variant="secondary"
                    className="dnb-toggle-button__button"
                    {...buttonParams}
                    ref={this._refButton}
                    onClick={this.onClickHandler}
                    onKeyDown={this.onKeyDownHandler}
                    onKeyUp={this.onKeyUpHandler}
                  >
                    {leftComponent && (
                      <span className="dnb-toggle-button__component">
                        {leftComponent}
                      </span>
                    )}
                  </Button>
                </span>
              </span>
            </span>
          )
        }}
      </Context.Consumer>
    )
  }
}
