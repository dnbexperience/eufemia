/**
 * Web ToggleButton Component
 */

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { memo, useCallback, useContext, useRef, useState } from 'react'
import type {
  HTMLProps,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  SyntheticEvent,
} from 'react'
import clsx from 'clsx'
import useId from '../../shared/helpers/useId'
import {
  warn,
  extendExistingPropsWithContext,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  dispatchCustomElementEvent,
  removeUndefinedProps,
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import { applySpacing } from '../space/SpacingUtils'

import Radio from '../radio/Radio'
import Checkbox from '../checkbox/Checkbox'
import Button from '../button/Button'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import ToggleButtonGroup from './ToggleButtonGroup'
import ToggleButtonGroupContext, {
  type ToggleButtonGroupContextValue,
} from './ToggleButtonGroupContext'
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'

const toggleButtonDefaultProps: Partial<ToggleButtonProps> = {
  text: null,
  label: null,
  labelDirection: 'vertical',
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
  readOnly: false,

  className: null,
  children: null,

  onChange: null,
}

const parseChecked = (state: unknown) => /true|on/.test(String(state))

function getInitialChecked(
  props: ToggleButtonProps,
  groupContext: ToggleButtonGroupContextValue
): boolean {
  if (groupContext.name && typeof props.value !== 'undefined') {
    if (typeof groupContext.value !== 'undefined') {
      return groupContext.value === props.value
    }

    if (groupContext.values && Array.isArray(groupContext.values)) {
      return groupContext.values.includes(props.value)
    }
  }

  return parseChecked(props.checked)
}

/**
 * The toggle-button component is based on the button component.
 */
function ToggleButton(ownProps: ToggleButtonProps) {
  const groupContext = useContext(ToggleButtonGroupContext)
  const context = useContext(Context)
  const refButton = useRef<HTMLButtonElement>(null)

  const ownPropsRef = useRef(ownProps)
  ownPropsRef.current = ownProps

  const groupContextRef = useRef(groupContext)
  groupContextRef.current = groupContext

  const id = useId(ownProps.id)

  const [checked, setChecked] = useState(() =>
    getInitialChecked(ownProps, groupContext)
  )
  const [prevPropsChecked, setPrevPropsChecked] = useState(
    ownProps.checked
  )

  // Track whether the internal state was just set by a click
  const skipNextPropSync = useRef(false)

  // Sync checked state from props.
  if (ownProps.checked !== prevPropsChecked) {
    setPrevPropsChecked(ownProps.checked)
    if (!skipNextPropSync.current) {
      const newChecked = parseChecked(ownProps.checked)
      setChecked(newChecked)
    }
  }
  skipNextPropSync.current = false

  // Register initial checked value with group context
  const didInitRef = useRef(false)
  if (!didInitRef.current) {
    didInitRef.current = true

    if (
      groupContext.name &&
      typeof ownProps.value !== 'undefined' &&
      typeof groupContext.value === 'undefined' &&
      !(groupContext.values && Array.isArray(groupContext.values)) &&
      parseChecked(ownProps.checked) &&
      groupContext.setContext
    ) {
      if (groupContext.multiselect) {
        groupContext.setContext((prevContext) => ({
          values:
            prevContext && Array.isArray(prevContext.values)
              ? [...prevContext.values, ownProps.value]
              : [ownProps.value],
        }))
      } else {
        groupContext.setContext({
          value: ownProps.value,
        })
      }
    }
  }

  const callOnChange = useCallback(
    ({
      checked: isChecked,
      event,
    }: {
      checked: boolean
      event: SyntheticEvent
    }) => {
      const value = ownPropsRef.current.value ?? ''
      if (groupContextRef.current.onChange) {
        groupContextRef.current.onChange({
          value,
          event,
        })
      }
      dispatchCustomElementEvent(
        { props: ownPropsRef.current },
        'onChange',
        {
          checked: isChecked,
          value,
          event,
        }
      )
    },
    []
  )

  const checkedRef = useRef(checked)
  checkedRef.current = checked

  const onClickHandler = useCallback(
    ({ event }: { event: SyntheticEvent }) => {
      if (ownPropsRef.current.readOnly) {
        return event.preventDefault()
      }

      // only select a value once
      if (
        groupContextRef.current.name &&
        !groupContextRef.current.multiselect &&
        ownPropsRef.current.value === groupContextRef.current.value
      ) {
        return // stop here
      }

      // else we change the checked state
      const newChecked = !checkedRef.current
      skipNextPropSync.current = true
      setChecked(newChecked)
      callOnChange({ checked: newChecked, event })

      if (refButton.current && newChecked) {
        // simulate focus for firefox and safari
        // so we can get rid of the hover ring after click
        try {
          refButton.current.focus()
        } catch (e) {
          warn(e)
        }
      }
    },
    [callOnChange]
  )

  const onKeyDownHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onClickHandler({ event })
      }
    },
    [onClickHandler]
  )

  const onKeyUpHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onClickHandler({ event })
      }
    },
    [onClickHandler]
  )

  const resolvedProps = {
    ...toggleButtonDefaultProps,
    ...removeUndefinedProps({ ...ownProps }),
  }

  const contextProps = extendExistingPropsWithContext(
    resolvedProps,
    toggleButtonDefaultProps,
    groupContext as Record<string, unknown>
  )

  // use only the props from context, who are available here anyway
  const props = extendExistingPropsWithContext(
    resolvedProps,
    toggleButtonDefaultProps,
    contextProps,
    (context.translation as Record<string, unknown>)
      ?.ToggleButton as Record<string, unknown>,
    pickFormElementProps(context.formElement as Record<string, unknown>),
    (context as Record<string, unknown>).ToggleButton as Record<
      string,
      unknown
    >
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

    id: _id,
    checked: _checked,
    children,
    onChange,

    ...rest
  } = props

  let resolvedChecked = checked

  if (
    !groupContext.multiselect &&
    typeof groupContext.value !== 'undefined'
  ) {
    const contextValue = groupContext.value
    if (typeof propValue === 'string' || typeof propValue === 'number') {
      resolvedChecked = propValue === contextValue
    }
  } else if (
    groupContext.multiselect &&
    typeof groupContext.values !== 'undefined'
  ) {
    const contextValues = groupContext.values
    if (typeof propValue === 'string' || typeof propValue === 'number') {
      resolvedChecked = contextValues.includes(propValue)
    }
  }

  const showStatus = getStatusState(status)

  const mainParams = applySpacing(props, {
    className: clsx(
      'dnb-toggle-button',
      status && `dnb-toggle-button__status--${statusState}`,
      resolvedChecked && `dnb-toggle-button--checked`,
      labelDirection && `dnb-toggle-button--${labelDirection}`,
      className
    ),
  })

  // to remove spacing props
  validateDOMAttributes(ownProps, rest)

  const buttonParams: Record<string, unknown> = {
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
    }`]: String(resolvedChecked || false),
    role,
    ...rest,
  }

  const componentParams: Record<string, unknown> = {
    checked: resolvedChecked,
    disabled,
    element: 'span',
    'data-checked': String(resolvedChecked || false),
    'aria-checked': undefined,
    role: undefined,
    type: undefined,
    name: null,
    title: null,
  }

  if (status) {
    // do not send along the message, but only the status states
    if (statusState === 'information') {
      componentParams.statusState = 'information'
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
    buttonParams['aria-readonly'] = true
    buttonParams['readOnly'] = true
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
            ref={refButton}
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
              {suffix as ReactNode}
            </Suffix>
          )}
        </span>
      </span>
    </span>
  )
}

const MemoizedToggleButton = memo(ToggleButton) as unknown as {
  (props: ToggleButtonProps): ReactElement
  Group: typeof ToggleButtonGroup
}

MemoizedToggleButton.Group = ToggleButtonGroup

withComponentMarkers(MemoizedToggleButton, {
  _formElement: true,
  _supportsSpacingProps: true,
})

export default MemoizedToggleButton as unknown as ToggleButtonComponent

// Type definitions
import type {
  ButtonIconPosition,
  ButtonSize,
  ButtonTooltip,
} from '../Button'
import type { IconIcon, IconSize } from '../Icon'
import type { FormStatusBaseProps } from '../FormStatus'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps, SpaceType } from '../space/types'

export type ToggleButtonVariant = 'default' | 'checkbox' | 'radio'
export type ToggleButtonSuffix = string | (() => ReactNode) | ReactNode
export type ToggleButtonValue =
  | string
  | number
  | Record<string, unknown>
  | unknown[]
export type ToggleButtonChildren = string | (() => ReactNode)

export type ToggleButtonChangeEvent = {
  checked: boolean
  value: ToggleButtonValue
  event: SyntheticEvent
}

export type ToggleButtonProps = Omit<
  HTMLProps<HTMLButtonElement>,
  'ref' | 'label' | 'value' | 'children' | 'onChange' | 'size'
> &
  Omit<SpacingProps, 'top' | 'right' | 'bottom' | 'left'> &
  FormStatusBaseProps & {
    /**
     * The text shown in the ToggleButton.
     */
    text?: ReactNode
    /**
     * Use either the `label` property or provide a custom one.
     */
    label?: string | ReactNode
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
    leftComponent?: ReactNode
    disabled?: boolean
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow
    id?: string
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
     * The size of the button. For now there are `small`, `medium`, `default` and `large`.
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
    readOnly?: boolean
    className?: string
    children?: ToggleButtonChildren
    onChange?: (event: ToggleButtonChangeEvent) => void
    // Additional properties that are used in tests and stories
    top?: SpaceType
    right?: SpaceType
    bottom?: SpaceType
    left?: SpaceType
  }

// Type for the component with static properties
export type ToggleButtonComponent = {
  (props: ToggleButtonProps): ReactElement
  Group: typeof ToggleButtonGroup
}
