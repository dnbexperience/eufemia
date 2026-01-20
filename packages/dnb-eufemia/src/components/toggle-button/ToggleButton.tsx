// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Web ToggleButton Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import clsx from 'clsx'
import {
  warn,
  isTrue,
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  dispatchCustomElementEvent,
  keycode,
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import { createSpacingClasses } from '../space/SpacingHelper'

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
class ToggleButton extends React.PureComponent<ToggleButtonProps> {
  static Group = ToggleButtonGroup

  static contextType = ToggleButtonGroupContext

  static defaultProps = {
    text: null,
    label: null,
    labelDirection: null,
    labelSrOnly: null,
    title: null,
    checked: undefined,
    variant: null,
    size: null,
    leftComponent: null,
    disabled: null,
    skeleton: null,
    id: null,
    status: null,
    statusState: 'error',
    statusProps: null,
    statusNoAnimation: null,
    globalStatus: null,
    suffix: null,
    value: '',
    role: undefined,
    icon: null,
    iconPosition: 'right',
    iconSize: null,
    attributes: null,
    readOnly: false,

    className: null,
    children: null,

    onChange: null,
    onStateUpdate: null,
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
      dispatchCustomElementEvent({ props }, 'onStateUpdate', {
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
    dispatchCustomElementEvent(this, 'onChange', {
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
            pickFormElementProps(context.formElement),
            context.ToggleButton
          )

          const {
            status,
            statusState,
            statusProps,
            statusNoAnimation,
            globalStatus,
            suffix,
            label,
            labelDirection,
            labelSrOnly,
            text,
            title,
            readOnly,
            className,
            disabled,
            skeleton,
            variant,
            leftComponent,
            icon,
            iconSize,
            iconPosition,
            value: propValue,
            role,

            id: _id, // eslint-disable-line
            // group: _group, // eslint-disable-line
            checked: _checked, // eslint-disable-line
            children,
            onChange, // eslint-disable-line
            onStateUpdate, // eslint-disable-line

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
            className: clsx(
              'dnb-toggle-button',
              status && `dnb-toggle-button__status--${statusState}`,
              checked && `dnb-toggle-button--checked`,
              labelDirection && `dnb-toggle-button--${labelDirection}`,
              createSpacingClasses(props),
              className
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
            iconSize: iconSize,
            iconPosition: iconPosition,
            [`aria-${
              role === 'radio' || role === 'checkbox'
                ? 'checked'
                : 'pressed'
            }`]: String(checked || false),
            role,
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
            if (statusState === 'info') {
              componentParams.statusState = 'info'
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

          let usedLeftComponent = null
          switch (variant) {
            case 'radio':
              usedLeftComponent = (
                <Radio id={`${id}-radio`} {...componentParams} />
              )
              break

            case 'checkbox':
              usedLeftComponent = (
                <Checkbox id={`${id}-checkbox`} {...componentParams} />
              )
              break

            case 'default':
            default:
              usedLeftComponent = leftComponent
              break
          }

          return (
            <span {...mainParams}>
              {label && (
                <FormLabel
                  id={id + '-label'}
                  forId={id}
                  text={label}
                  disabled={disabled}
                  skeleton={skeleton}
                  labelDirection={labelDirection}
                  srOnly={labelSrOnly}
                />
              )}
              <span className="dnb-toggle-button__inner">
                <FormStatus
                  show={showStatus}
                  id={id + '-form-status'}
                  globalStatus={globalStatus}
                  label={label}
                  textId={id + '-status'} // used for "aria-describedby"
                  text={status}
                  state={statusState}
                  noAnimation={statusNoAnimation}
                  skeleton={skeleton}
                  {...statusProps}
                />

                <span className="dnb-toggle-button__shell">
                  <AlignmentHelper />

                  <Button
                    variant="secondary"
                    className="dnb-toggle-button__button"
                    customContent={
                      usedLeftComponent && (
                        <span className="dnb-toggle-button__component">
                          {usedLeftComponent}
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

ToggleButton._formElement = true
ToggleButton._supportsSpacingProps = true

export default ToggleButton as ToggleButtonComponent

// Type definitions
import type {
  ButtonIconPosition,
  ButtonSize,
  ButtonTooltip,
} from '../Button'
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText,
} from '../FormStatus'
import type { GlobalStatusConfigObject } from '../GlobalStatus'
import type { IconIcon, IconSize } from '../Icon'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps, SpaceType } from '../space/types'
import type { ToggleButtonGroupProps } from './ToggleButtonGroup'

export type ToggleButtonVariant = 'default' | 'checkbox' | 'radio'
export type ToggleButtonSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
export type ToggleButtonValue =
  | string
  | number
  | Record<string, unknown>
  | any[]
export type ToggleButtonAttributes = string | Record<string, unknown>
export type ToggleButtonChildren = string | ((...args: any[]) => any)

export interface ToggleButtonProps
  extends Omit<
      React.HTMLProps<HTMLButtonElement>,
      'ref' | 'label' | 'value'
    >,
    Omit<SpacingProps, 'top' | 'right' | 'bottom' | 'left'> {
  /**
   * The text shown in the ToggleButton.
   */
  text?: React.ReactNode
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: string | React.ReactNode
  labelDirection?: 'horizontal' | 'vertical'
  labelSrOnly?: boolean
  /**
   * The `title` of the input - describing it a bit further for accessibility reasons.
   */
  title?: string
  /**
   * Determine whether the ToggleButton is checked or not. The default will be `false`.
   */
  checked?: boolean
  variant?: ToggleButtonVariant
  leftComponent?: React.ReactNode
  disabled?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  id?: string
  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText
  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  statusState?: FormStatusState
  /**
   * Use an object to define additional FormStatus properties.
   */
  statusProps?: FormStatusProps
  statusNoAnimation?: boolean
  /**
   * The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).
   */
  globalStatus?: GlobalStatusConfigObject
  /**
   * Text describing the content of the ToggleButton more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButton component.
   */
  suffix?: ToggleButtonSuffix
  /**
   * Provide a string or a React Element to be shown as the tooltip content.
   */
  tooltip?: ButtonTooltip
  /**
   * Defines the `value` as a string. Use it to get the value during the `onChange` event listener callback in the **ToggleButtonGroup**.
   */
  value?: ToggleButtonValue
  /**
   * The size of the button. For now there is `small`, `medium`, `default` and `large`.
   */
  size?: ButtonSize
  /**
   * Icon to be included in the toggle button.
   */
  icon?: IconIcon
  /**
   * Position of the icon inside the toggle button. Set to `left` or `right`. Defaults to `right` if not set.
   */
  iconPosition?: ButtonIconPosition
  /**
   * Define icon width and height. Defaults to `16px`.
   */
  iconSize?: IconSize
  attributes?: ToggleButtonAttributes
  readOnly?: boolean
  className?: string
  children?: ToggleButtonChildren
  onChange?: (...args: any[]) => any
  onStateUpdate?: (...args: any[]) => any
  // Additional properties that are used in tests and stories
  top?: SpaceType
  right?: SpaceType
  bottom?: SpaceType
  left?: SpaceType
}

// Interface for the component with static properties
export interface ToggleButtonComponent
  extends React.ComponentClass<ToggleButtonProps> {
  Group: React.ComponentClass<ToggleButtonGroupProps>
  _formElement: boolean
  _supportsSpacingProps: boolean
}
