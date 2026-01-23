// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Web ToggleButton Component
 *
 */

import React from 'react'
import clsx from 'clsx'
import {
  warn,
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
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

const defaultProps = {
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

const parseChecked = (state) => /true|on/.test(String(state))

/**
 * The toggle-button component is our enhancement of the classic toggle-button button.
 */
function ToggleButton(localProps: ToggleButtonProps) {
  const toggleButtonGroupContext = React.useContext(
    ToggleButtonGroupContext
  )
  const sharedContext = React.useContext(Context)

  // Merge props early so we have proper defaults
  // from internal context - extract only the props we want to merge
  const toggleButtonGroupProps = {
    size: toggleButtonGroupContext.size,
    variant: toggleButtonGroupContext.variant,
    leftComponent: toggleButtonGroupContext.leftComponent,
    disabled: toggleButtonGroupContext.disabled,
    skeleton: toggleButtonGroupContext.skeleton,
    status: toggleButtonGroupContext.status,
  }

  const contextProps = extendPropsWithContext(
    localProps,
    defaultProps,
    toggleButtonGroupProps
  )

  // use only the props from context, who are available here anyway
  const props = extendPropsWithContext(
    localProps,
    defaultProps,
    contextProps,
    sharedContext.translation.ToggleButton,
    pickFormElementProps(sharedContext.formElement),
    sharedContext.ToggleButton
  )

  const _refButton = React.useRef(null)
  const _idRef = React.useRef(props.id || makeUniqueId())
  const _id = _idRef.current

  const [checked, setChecked] = React.useState(() => {
    // set the startup checked values from context, if they exists
    if (
      toggleButtonGroupContext.name &&
      typeof props.value !== 'undefined'
    ) {
      if (typeof toggleButtonGroupContext.value !== 'undefined') {
        return toggleButtonGroupContext.value === props.value
      } else if (
        toggleButtonGroupContext.values &&
        Array.isArray(toggleButtonGroupContext.values)
      ) {
        return toggleButtonGroupContext.values.includes(props.value)
      } else if (parseChecked(props.checked)) {
        // Initial checked state from props
        return true
      }
    }
    // Default: parse the checked prop
    return parseChecked(props.checked)
  })

  const prevCheckedRef = React.useRef(props.checked)
  const prevStateCheckedRef = React.useRef(checked)
  const isInitialMount = React.useRef(true)

  // Handle initial context update if checked prop is set
  React.useEffect(() => {
    if (!isInitialMount.current) {
      return
    }
    isInitialMount.current = false

    if (
      toggleButtonGroupContext.name &&
      typeof props.value !== 'undefined' &&
      parseChecked(props.checked)
    ) {
      if (toggleButtonGroupContext.setContext) {
        if (toggleButtonGroupContext.multiselect) {
          toggleButtonGroupContext.setContext((tmp) => {
            return {
              values:
                tmp && Array.isArray(tmp.values)
                  ? [...tmp.values, props.value]
                  : [props.value],
            }
          })
        } else {
          toggleButtonGroupContext.setContext({
            value: props.value,
          })
        }
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // getDerivedStateFromProps equivalent
  React.useEffect(() => {
    if (props.checked !== prevCheckedRef.current) {
      setChecked(parseChecked(props.checked))
    }
    prevCheckedRef.current = props.checked
  }, [props.checked])

  // onStateUpdate equivalent
  React.useEffect(() => {
    if (checked !== prevStateCheckedRef.current) {
      dispatchCustomElementEvent({ props }, 'onStateUpdate', {
        checked,
      })
    }
    prevStateCheckedRef.current = checked
  }, [checked, props])

  const callOnChange = ({ checked: newChecked, event }) => {
    if (toggleButtonGroupContext.onChange) {
      toggleButtonGroupContext.onChange({
        value: props.value,
        event,
      })
    }
    dispatchCustomElementEvent({ props }, 'onChange', {
      checked: newChecked,
      value: props.value,
      event,
    })
  }

  const onClickHandler = ({ event }) => {
    if (isTrue(props.readOnly)) {
      return event?.preventDefault()
    }

    // only select a value once
    if (
      !isTrue(toggleButtonGroupContext.multiselect) &&
      props.value === toggleButtonGroupContext.value
    ) {
      return
    }

    // else we change the checked state
    const newChecked = !checked
    setChecked(newChecked)
    callOnChange({ checked: newChecked, event })

    if (_refButton.current && newChecked) {
      // simulate focus for firefox and safari
      // so we can get rid of the hover ring after click
      try {
        _refButton.current._ref.current.focus()
      } catch (e) {
        warn(e)
      }
    }
  }

  const onKeyDownHandler = (event) => {
    switch (keycode(event)) {
      case 'enter':
        onClickHandler({ event })
        break
    }
  }

  const onKeyUpHandler = (event) => {
    switch (keycode(event)) {
      case 'enter':
        onClickHandler({ event })
        break
    }
  }

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

    id: _ignoreId, // eslint-disable-line
    // group: _group, // eslint-disable-line
    checked: _ignoreChecked, // eslint-disable-line
    children,
    onChange, // eslint-disable-line
    onStateUpdate, // eslint-disable-line

    ...rest
  } = props

  let displayChecked = checked

  if (
    !isTrue(toggleButtonGroupContext.multiselect) &&
    typeof toggleButtonGroupContext.value !== 'undefined'
  ) {
    const contextValue = toggleButtonGroupContext.value
    if (typeof propValue === 'string' || typeof propValue === 'number') {
      displayChecked = propValue === contextValue
    }
  } else if (
    isTrue(toggleButtonGroupContext.multiselect) &&
    typeof toggleButtonGroupContext.values !== 'undefined'
  ) {
    const contextValues = toggleButtonGroupContext.values
    if (typeof propValue === 'string' || typeof propValue === 'number') {
      displayChecked = contextValues.includes(propValue)
    }
  }

  const id = _id
  const showStatus = getStatusState(status)

  const mainParams = {
    className: clsx(
      'dnb-toggle-button',
      status && `dnb-toggle-button__status--${statusState}`,
      displayChecked && `dnb-toggle-button--checked`,
      labelDirection && `dnb-toggle-button--${labelDirection}`,
      createSpacingClasses(props),
      className
    ),
  }

  // to remove spacing props
  validateDOMAttributes(localProps, rest)

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
      role === 'radio' || role === 'checkbox' ? 'checked' : 'pressed'
    }`]: String(displayChecked || false),
    role,
    ...rest,
  }

  const componentParams = {
    checked: displayChecked,
    disabled,
    element: 'span',
    'data-checked': String(displayChecked || false),
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
      usedLeftComponent = <Radio id={`${id}-radio`} {...componentParams} />
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
            ref={_refButton}
            onClick={onClickHandler}
            onKeyDown={onKeyDownHandler}
            onKeyUp={onKeyUpHandler}
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
}

ToggleButton._formElement = true
ToggleButton._supportsSpacingProps = true
ToggleButton.Group = ToggleButtonGroup

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
