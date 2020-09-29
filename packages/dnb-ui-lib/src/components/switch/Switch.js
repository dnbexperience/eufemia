/**
 * Web Switch Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  skeletonElement,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'

const renderProps = {
  on_change: null,
  on_change_end: null,
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
  default_state: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // Deprecated
  checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  size: PropTypes.oneOf(['default', 'medium', 'large']),
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
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,

  /// React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  // Web Component props
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,
  on_change: PropTypes.func,
  on_change_end: PropTypes.func,
  on_state_update: PropTypes.func
}

const defaultProps = {
  label: null,
  label_position: null,
  title: null,
  default_state: undefined, // Deprecated
  checked: undefined,
  disabled: null,
  id: null,
  size: null,
  status: null,
  status_state: 'error',
  status_animation: null,
  global_status_id: null,
  suffix: null,
  value: null,
  attributes: null,
  readOnly: false,
  skeleton: null,
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
 * The switch component is our enhancement of the classic radio button. It acts like a switch. Example: On/off, yes/no.
 */
export default class Switch extends React.PureComponent {
  static tagName = 'dnb-switch'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(Switch.tagName, Switch, defaultProps)
  }

  static parseChecked = (state) => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (
        typeof props.default_state !== 'undefined' &&
        typeof state.checked === 'undefined'
      ) {
        state.checked = Switch.parseChecked(props.default_state)
      } else if (props.checked !== state._checked) {
        state.checked = Switch.parseChecked(props.checked)
      }
      if (typeof props.checked !== 'undefined') {
        state._checked = props.checked
      }
    }
    state._listenForPropChanges = true

    if (state.checked !== state.__checked) {
      dispatchCustomElementEvent({ props }, 'on_state_update', {
        checked: state.checked
      })
    }

    if (typeof state.checked === 'undefined') {
      state.checked = false
    }
    state.__checked = state.checked

    return state
  }

  constructor(props) {
    super(props)
    this._refInput = React.createRef()
    this._id = props.id || makeUniqueId() // cause we need an id anyway
    this.state = {
      _listenForPropChanges: true
    }
    this.helperParams = { onMouseDown: (e) => e.preventDefault() }
  }

  componentWillUnmount() {
    clearTimeout(this._onChangeEndId)
  }

  onKeyDownHandler = (event) => {
    switch (keycode(event)) {
      case 'enter':
        this.onChangeHandler(event)
        break
    }
  }

  onChangeHandler = (event) => {
    if (isTrue(this.props.readOnly)) {
      return event.preventDefault()
    }
    const checked = !this.state.checked
    this.setState({ checked, _listenForPropChanges: false })
    dispatchCustomElementEvent(this, 'on_change', { checked, event })

    if (this.props.on_change_end) {
      clearTimeout(this._onChangeEndId)
      if (event && event.persist) {
        event.persist()
      }
      this._onChangeEndId = setTimeout(
        () =>
          dispatchCustomElementEvent(this, 'on_change_end', {
            checked,
            event
          }),
        500
      )
    }

    // help firefox and safari to have an correct state after a click
    if (this._refInput.current) {
      this._refInput.current.focus()
    }
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      defaultProps,
      this.context.formRow,
      { skeleton: this.context?.skeleton },
      this.context.translation.Switch
    )

    const {
      value,
      size,
      status,
      status_state,
      status_animation,
      global_status_id,
      suffix,
      label,
      label_position,
      label_sr_only,
      title,
      disabled,
      readOnly,
      skeleton,
      className,
      class: _className,

      id: _id, // eslint-disable-line
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
        'dnb-switch',
        size && `dnb-switch--${size}`,
        status && `dnb-switch__status--${status_state}`,
        `dnb-switch--label-position-${label_position || 'right'}`,
        'dnb-form-component',
        createSpacingClasses(props),
        className,
        _className
      )
    }

    const inputParams = {
      disabled: isTrue(disabled),
      checked,
      ...rest
    }

    if (isTrue(skeleton)) {
      skeletonElement(inputParams, this.context)
    }

    if (showStatus || suffix) {
      inputParams['aria-describedby'] = [
        showStatus ? id + '-status' : null,
        suffix ? id + '-suffix' : null
      ]
        .filter(Boolean)
        .join(' ')
    }
    if (readOnly) {
      inputParams['aria-readonly'] = inputParams.readOnly = true
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, inputParams)

    const labelComp = label && (
      <FormLabel
        id={id + '-label'}
        for_id={id}
        text={label}
        disabled={disabled}
        skeleton={skeleton}
        sr_only={label_sr_only}
      />
    )

    return (
      <span {...mainParams}>
        <span className="dnb-switch__order">
          {label_position === 'left' && labelComp}

          <span className="dnb-switch__inner">
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

            <span className="dnb-switch__shell">
              {(label_position === 'right' || !label_position) &&
                labelComp}

              <span className="dnb-switch__row">
                <input
                  id={id}
                  name={id}
                  type="checkbox"
                  role="switch"
                  title={title}
                  aria-checked={checked}
                  className="dnb-switch__input"
                  value={checked ? value || '' : ''}
                  ref={this._refInput}
                  {...inputParams}
                  onChange={this.onChangeHandler}
                  onKeyDown={this.onKeyDownHandler}
                />
                <span
                  draggable
                  aria-hidden
                  className="dnb-switch__background"
                  onDragStart={this.onChangeHandler}
                  {...this.helperParams}
                />
                <span
                  className={classnames(
                    'dnb-switch__button',
                    isTrue(skeleton) && 'dnb-skeleton'
                  )}
                  aria-hidden
                >
                  <span className="dnb-switch__focus">
                    <span className="dnb-switch__focus__inner" />
                  </span>
                </span>
              </span>

              {suffix && (
                <span
                  className="dnb-switch__suffix"
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
  }
}
