/**
 * Web Checkbox Component
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
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass
} from '../skeleton/SkeletonHelper'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
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
  on_state_update: PropTypes.func
}

const defaultProps = {
  label: null,
  label_position: null,
  title: null,
  default_state: undefined,
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
 * The checkbox component is our enhancement of the classic checkbox button. It acts like a checkbox. Example: On/off, yes/no.
 */
export default class Checkbox extends React.PureComponent {
  static tagName = 'dnb-checkbox'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(Checkbox.tagName, Checkbox, defaultProps)
  }

  static parseChecked = (state) => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (
        typeof props.default_state !== 'undefined' &&
        typeof state.checked === 'undefined'
      ) {
        state.checked = Checkbox.parseChecked(props.default_state)
      } else if (props.checked !== state._checked) {
        state.checked = Checkbox.parseChecked(props.checked)
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
      { skeleton: this.context && this.context.skeleton },
      this.context.formRow
    )

    const {
      value,
      status,
      status_state,
      status_animation,
      global_status_id,
      suffix,
      size,
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
        size && `dnb-checkbox--${size}`,
        label &&
          `dnb-checkbox--label-position-${label_position || 'right'}`,
        'dnb-form-component',
        createSkeletonClass(null, skeleton),
        createSpacingClasses(props),
        className,
        _className
      )
    }

    const inputParams = {
      disabled,
      checked,
      ...rest
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

    skeletonDOMAttributes(inputParams, skeleton, this.context)

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
              skeleton={skeleton}
              sr_only={label_sr_only}
            />
          )}

          <span className="dnb-checkbox__inner">
            <AlignmentHelper />
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

              <span
                className={classnames(
                  'dnb-checkbox__button',
                  createSkeletonClass('shape', skeleton, this.context)
                )}
                aria-hidden
              >
                <span className="dnb-checkbox__focus" />
              </span>

              <CheckSVG />
            </span>
          </span>

          {suffix && (
            <span
              className="dnb-checkbox__suffix"
              id={id + '-suffix'} // used for "aria-describedby"
            >
              <Suffix {...props}>{suffix}</Suffix>
            </span>
          )}
        </span>

        {(label_position === 'right' || !label_position) && statusComp}
      </span>
    )
  }
}

// The new checkbox has too low contrast, as it is too thin on web
export const CheckSVG = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="dnb-checkbox__gfx"
    aria-hidden
    {...props}
  >
    <path
      d="M1.5 15L7.5 21L22.5 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// export const CheckSVG_old = (props) => (
//   <svg
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     className="dnb-checkbox__gfx"
//     aria-hidden
//     {...props}
//   >
//     <path d="M5.86 12.95a.75.75 0 1 0-1.22.86l1.22-.86zm2.15 4.34l.62-.42-.01-.01-.61.43zm.94.52l.02-.75-.02.75zm.98-.46l-.6-.47v.01l.6.46zm9.4-10.7a.75.75 0 0 0-1.17-.93l1.18.93zm-14.7 7.16l2.76 3.91 1.23-.86-2.76-3.91-1.22.86zm2.75 3.9c.35.52.93.84 1.55.85l.04-1.5a.43.43 0 0 1-.34-.19l-1.25.84zm1.55.85c.62.02 1.22-.26 1.6-.76l-1.2-.9a.43.43 0 0 1-.36.16l-.04 1.5zm1.59-.75l8.82-11.16-1.18-.93-8.82 11.16 1.18.93z" />
//   </svg>
// )
