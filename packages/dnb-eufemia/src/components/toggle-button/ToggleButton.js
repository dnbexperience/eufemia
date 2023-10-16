/**
 * Web ToggleButton Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  warn,
  isTrue,
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { includeValidProps } from '../form-row/FormRowHelpers'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'

import Radio from '../radio/Radio'
import Checkbox from '../checkbox/Checkbox'
import Button from '../button/Button'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import ToggleButtonGroup from './ToggleButtonGroup'
import ToggleButtonGroupContext from './ToggleButtonGroupContext'
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'

/**
 * The toggle-button component is our enhancement of the classic toggle-button button.
 */
export default class ToggleButton extends React.PureComponent {
  static Group = ToggleButtonGroup

  static contextType = ToggleButtonGroupContext

  static propTypes = {
    text: PropTypes.string,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    label_direction: PropTypes.oneOf(['horizontal', 'vertical']),
    label_sr_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    title: PropTypes.string,
    checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    variant: PropTypes.oneOf(['default', 'checkbox', 'radio']),
    left_component: PropTypes.node,
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    id: PropTypes.string,
    // group: PropTypes.string,
    status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.func,
      PropTypes.node,
    ]),
    status_state: PropTypes.string,
    status_props: PropTypes.object,
    status_no_animation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    globalStatus: PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    }),
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
      PropTypes.array,
    ]),
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func,
    ]),
    icon_position: PropTypes.oneOf(['left', 'right']),
    icon_size: PropTypes.string,
    attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    ...spacingPropTypes,

    class: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    on_change: PropTypes.func,
    on_state_update: PropTypes.func,
  }

  static defaultProps = {
    text: null,
    label: null,
    label_direction: null,
    label_sr_only: null,
    title: null,
    checked: undefined,
    variant: null,
    left_component: null,
    disabled: null,
    skeleton: null,
    id: null,
    // group: null,
    status: null,
    status_state: 'error',
    status_props: null,
    status_no_animation: null,
    globalStatus: null,
    suffix: null,
    value: '',
    icon: null,
    icon_position: 'right',
    icon_size: null,
    attributes: null,
    readOnly: false,
    class: null,

    className: null,
    children: null,

    on_change: null,
    on_state_update: null,
  }

  static parseChecked = (state) => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.checked !== state._checked) {
        state.checked = ToggleButton.parseChecked(props.checked)
      }
    }
    state._listenForPropChanges = true

    if (state.checked !== state.__checked) {
      dispatchCustomElementEvent({ props }, 'on_state_update', {
        checked: state.checked,
      })
    }

    state._checked = props.checked
    state.__checked = state.checked

    return state
  }

  constructor(props, context) {
    super(props)
    this._id = props.id || makeUniqueId() // cause we need an id anyway
    this._refButton = React.createRef()

    this.state = {
      _listenForPropChanges: true,
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
            context.setContext((tmp) => {
              return {
                values:
                  // in case we have set before a new context (other component)
                  // we fill combine these arrays
                  tmp && Array.isArray(tmp.values)
                    ? [...tmp.values, props.value]
                    : [props.value],
              }
            })
          } else {
            context.setContext({
              value: props.value,
            })
          }
        }
      }
    }
  }

  onKeyDownHandler = (event) => {
    switch (keycode(event)) {
      case 'enter':
        this.onClickHandler({ event })
        break
    }
  }

  onKeyUpHandler = (event) => {
    switch (keycode(event)) {
      case 'enter':
        this.onClickHandler({ event })
        break
    }
  }

  onClickHandler = ({ event }) => {
    if (isTrue(this.props.readOnly)) {
      return event.preventDefault()
    }
    event.persist()

    // only select a value once
    if (
      !isTrue(this.context.multiselect) &&
      this.props.value === this.context.value
    ) {
      return
    }

    // else we change the checked state
    const checked = !this.state.checked
    this.setState({
      checked,
      _listenForPropChanges: false,
    })
    this.callOnChange({ checked, event })

    if (this._refButton.current && checked) {
      // simulate focus for firefox and safari
      // so we can get rid of the hover ring after click
      try {
        this._refButton.current._ref.current.focus()
      } catch (e) {
        warn(e)
      }
    }
  }

  callOnChange = ({ checked, event }) => {
    const { value } = this.props
    if (this.context.onChange) {
      this.context.onChange({
        value,
        event,
      })
    }
    dispatchCustomElementEvent(this, 'on_change', {
      checked,
      value,
      event,
    })
  }

  render() {
    return (
      <Context.Consumer>
        {(context) => {
          // from internal context
          const contextProps = extendPropsWithContextInClassComponent(
            this.props,
            ToggleButton.defaultProps,
            this.context
          )

          // use only the props from context, who are available here anyway
          const props = extendPropsWithContextInClassComponent(
            this.props,
            ToggleButton.defaultProps,
            contextProps,
            context.translation.ToggleButton,
            includeValidProps(context.FormRow),
            context.ToggleButton
          )

          const {
            status,
            status_state,
            status_props,
            status_no_animation,
            globalStatus,
            suffix,
            label,
            label_direction,
            label_sr_only,
            text,
            title,
            readOnly,
            className,
            class: _className,
            disabled,
            skeleton,
            variant,
            left_component,
            icon,
            icon_size,
            icon_position,
            value: propValue,

            id: _id, // eslint-disable-line
            // group: _group, // eslint-disable-line
            checked: _checked, // eslint-disable-line
            children,
            on_change, // eslint-disable-line
            on_state_update, // eslint-disable-line

            ...rest
          } = props

          let { checked } = this.state

          if (
            !isTrue(this.context.multiselect) &&
            typeof this.context.value !== 'undefined'
          ) {
            const contextValue = this.context.value
            if (
              typeof propValue === 'string' ||
              typeof propValue === 'number'
            ) {
              checked = propValue === contextValue
            }
          } else if (
            isTrue(this.context.multiselect) &&
            typeof this.context.values !== 'undefined'
          ) {
            const contextValues = this.context.values
            if (
              typeof propValue === 'string' ||
              typeof propValue === 'number'
            ) {
              checked = contextValues.includes(propValue)
            }
          }

          const id = this._id
          const showStatus = getStatusState(status)

          const mainParams = {
            className: classnames(
              'dnb-toggle-button',
              status && `dnb-toggle-button__status--${status_state}`,
              checked && `dnb-toggle-button--checked`,
              label_direction && `dnb-toggle-button--${label_direction}`,
              createSpacingClasses(props),
              className,
              _className
            ),
          }

          // to remove spacing props
          validateDOMAttributes(this.props, rest)

          const buttonParams = {
            id,
            disabled,
            skeleton,
            text: text || children,
            title,
            icon,
            icon_size,
            icon_position,
            'aria-pressed': String(checked || false),
            ...rest,
          }

          const componentParams = {
            checked,
            disabled,
            element: 'span',
            'data-checked': String(checked || false),
            'aria-checked': undefined,
            role: undefined,
            type: undefined,
            name: null,
            title: null,
          }

          if (status) {
            // do not send along the message, but only the status states
            if (status_state === 'info') {
              componentParams.status_state = 'info'
            } else {
              componentParams.status = 'error'
            }
          }

          if (showStatus || suffix) {
            buttonParams['aria-describedby'] = combineDescribedBy(
              buttonParams,
              showStatus ? id + '-status' : null,
              suffix ? id + '-suffix' : null
            )
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
                  skeleton={skeleton}
                  label_direction={label_direction}
                  sr_only={label_sr_only}
                />
              )}
              <span className="dnb-toggle-button__inner">
                <FormStatus
                  show={showStatus}
                  id={id + '-form-status'}
                  globalStatus={globalStatus}
                  label={label}
                  text_id={id + '-status'} // used for "aria-describedby"
                  text={status}
                  state={status_state}
                  no_animation={status_no_animation}
                  skeleton={skeleton}
                  {...status_props}
                />

                <span className="dnb-toggle-button__shell">
                  <AlignmentHelper />

                  <Button
                    variant="secondary"
                    className="dnb-toggle-button__button"
                    custom_content={
                      leftComponent && (
                        <span className="dnb-toggle-button__component">
                          {leftComponent}
                        </span>
                      )
                    }
                    {...buttonParams}
                    ref={this._refButton}
                    onClick={this.onClickHandler}
                    onKeyDown={this.onKeyDownHandler}
                    onKeyUp={this.onKeyUpHandler}
                  />

                  {suffix && (
                    <Suffix
                      className="dnb-toggle-button__suffix"
                      id={id + '-suffix'} // used for "aria-describedby"
                      context={props}
                    >
                      {suffix}
                    </Suffix>
                  )}
                </span>
              </span>
            </span>
          )
        }}
      </Context.Consumer>
    )
  }
}

ToggleButton._supportsSpacingProps = true
