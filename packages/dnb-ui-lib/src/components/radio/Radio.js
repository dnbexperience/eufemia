/**
 * Web Radio Component
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
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'

import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import RadioGroup from './RadioGroup'
import RadioGroupContext from './RadioGroupContext'
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'

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
  label_sr_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label_position: PropTypes.oneOf(['left', 'right']),
  checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  group: PropTypes.string,
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  global_status_id: PropTypes.string,
  suffix: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
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
  label_sr_only: null,
  label_position: null,
  checked: null,
  disabled: false,
  id: null,
  group: null,
  status: null,
  status_state: 'error',
  status_animation: null,
  global_status_id: null,
  suffix: null,
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
    this._id = props.id || makeUniqueId() // cause we need an id anyway
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
    const key = keycode(event)
    // only have key support if there is only a single radio
    if (this.isInNoGroup()) {
      switch (key) {
        case 'enter':
          this.onChangeHandler(event)
          break
      }
    } else if (this.isContextGroupOrSingle()) {
      switch (key) {
        case 'space':
        case 'enter': {
          const { value } = this.context
          if (value !== null && typeof value !== 'undefined') {
            event.preventDefault()
          }
          if (key === 'enter') {
            const checked = !this.state.checked
            this.setState({ checked, _listenForPropChanges: false })
          }
          break
        }
      }
    } else {
      // else we only use the native support, and don't want space support
      // because only arrow keys has to be used
      switch (key) {
        case 'space': {
          event.preventDefault()
          break
        }
      }
    }
    dispatchCustomElementEvent(this, 'on_key_down', { event })
  }

  onChangeHandler = _event => {
    const event = _event
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
          this.callOnChange({ value, checked, event })
        )
      }, 1)
    } else {
      this.setState({ checked, _listenForPropChanges: false })
      this.callOnChange({ value, checked, event })
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
    // only have click support if there are more plain radio
    if (!this.isPlainGroup()) {
      return
    }
    const value = event.target.value
    const checked = event.target.checked
    this.callOnChange({ value, checked, event })
  }

  callOnChange = ({ value, checked, event }) => {
    const { group } = this.props
    if (this.context.onChange) {
      this.context.onChange({
        value
      })
    }
    dispatchCustomElementEvent(this, 'on_change', {
      group,
      checked,
      value,
      event
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
    return (
      <Context.Consumer>
        {context => {
          // use only the props from context, who are available here anyway
          const props = extendPropsWithContext(
            this.props,
            defaultProps,
            this.context, // internal context
            context.formRow
          )

          const {
            status,
            status_state,
            status_animation,
            global_status_id,
            suffix,
            label,
            label_sr_only,
            label_position,
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
          } = props

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

          const mainParams = {
            className: classnames(
              'dnb-radio',
              status && `dnb-radio__status--${status_state}`,
              label &&
                `dnb-radio--label-position-${label_position || 'right'}`,
              createSpacingClasses(props),
              className,
              _className
            )
          }

          const inputParams = {
            role: hasContext || group ? 'radio' : null,
            type: hasContext || group ? 'radio' : 'checkbox', // overwriting the type
            ...rest,
            onMouseOut: this.onMouseOutHandler // for resetting the button to the default state
          }

          if (showStatus || suffix) {
            inputParams['aria-describedby'] = `${
              showStatus ? id + '-status' : ''
            } ${suffix ? id + '-suffix' : ''}`
          }
          if (readOnly) {
            inputParams['aria-readonly'] = inputParams.readOnly = true
          }

          if (!group) {
            inputParams.type = 'checkbox'
            inputParams.role = 'radio' // breaks axe test
          }

          // also used for code markup simulation
          validateDOMAttributes(this.props, inputParams)

          const labelComp = label && (
            <FormLabel
              id={id + '-label'}
              for_id={id}
              text={label}
              disabled={disabled}
              sr_only={label_sr_only}
            />
          )

          return (
            <span {...mainParams}>
              <span className="dnb-radio__order">
                {label_position === 'left' && labelComp}

                <span className="dnb-radio__inner">
                  <AlignmentHelper />

                  {showStatus && (
                    <FormStatus
                      id={id + '-form-status'}
                      global_status_id={global_status_id}
                      text_id={id + '-status'} // used for "aria-describedby"
                      width_selector={id + ', ' + id + '-label'}
                      text={status}
                      status={status_state}
                      animation={status_animation}
                    />
                  )}

                  <span className="dnb-radio__row">
                    <span className="dnb-radio__shell">
                      <input
                        type="radio"
                        value={value}
                        id={id}
                        name={group}
                        className="dnb-radio__input"
                        checked={checked}
                        aria-checked={checked}
                        disabled={isTrue(disabled)}
                        ref={this._refInput}
                        {...inputParams}
                        onChange={this.onChangeHandler}
                        onClick={this.onClickHandler}
                        onKeyDown={this.onKeyDownHandler}
                      />

                      <span className="dnb-radio__button" aria-hidden />
                      <span className="dnb-radio__focus" aria-hidden />
                      <span className="dnb-radio__dot" aria-hidden />
                    </span>

                    {label_position !== 'left' && labelComp}

                    {suffix && (
                      <span
                        className="dnb-radio__suffix"
                        id={id + '-suffix'} // used for "aria-describedby"
                      >
                        <Suffix {...props}>{suffix}</Suffix>
                      </span>
                    )}
                  </span>
                </span>
              </span>
            </span>
          )
        }}
      </Context.Consumer>
    )
  }
}
