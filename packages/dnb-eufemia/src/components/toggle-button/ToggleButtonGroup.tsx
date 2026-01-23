// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Web ToggleButtonGroup Component
 *
 */

import React from 'react'
import clsx from 'clsx'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  combineLabelledBy,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import FormLabel from '../FormLabel'
import FormStatus from '../FormStatus'
import Flex from '../Flex'
import Space from '../Space'
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import ToggleButtonGroupContext from './ToggleButtonGroupContext'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'

const defaultProps = {
  label: null,
  labelDirection: null,
  labelSrOnly: null,
  title: null,
  multiselect: null,
  variant: null,
  leftComponent: null,
  disabled: null,
  skeleton: null,
  id: null,
  name: null,
  size: null,
  status: null,
  statusState: 'error',
  statusProps: null,
  statusNoAnimation: null,
  globalStatus: null,
  suffix: null,
  vertical: null,
  layoutDirection: 'row',
  value: undefined,
  values: undefined,
  attributes: null,

  className: null,
  children: null,

  onChange: null,
}

const getValues = (props) => {
  if (typeof props.values === 'string' && props.values[0] === '[') {
    return JSON.parse(props.values)
  }
  return props.values
}

function ToggleButtonGroup(localProps: ToggleButtonGroupProps) {
  const sharedContext = React.useContext(Context)

  const _idRef = React.useRef(localProps.id || makeUniqueId())
  const _nameRef = React.useRef(localProps.name || makeUniqueId())
  const _id = _idRef.current
  const _name = _nameRef.current

  const [value, setValue] = React.useState(localProps.value)
  const [values, setValues] = React.useState(() => getValues(localProps))

  const prevValueRef = React.useRef(localProps.value)
  const prevValuesRef = React.useRef(localProps.values)

  // getDerivedStateFromProps equivalent
  React.useEffect(() => {
    if (
      typeof localProps.value !== 'undefined' &&
      localProps.value !== prevValueRef.current
    ) {
      setValue(localProps.value)
    }
    prevValueRef.current = localProps.value
  }, [localProps.value])

  React.useEffect(() => {
    if (
      typeof localProps.values !== 'undefined' &&
      localProps.values !== prevValuesRef.current
    ) {
      setValues(getValues(localProps))
    }
    prevValuesRef.current = localProps.values
  }, [localProps.values])

  const onChangeHandler = React.useCallback(
    ({ value: newValue, event }) => {
      const updatedValues = values || []

      if (isTrue(localProps.multiselect)) {
        if (!updatedValues.includes(newValue)) {
          updatedValues.push(newValue)
        } else {
          updatedValues.splice(updatedValues.indexOf(newValue), 1)
        }
      }

      setValue(newValue)
      setValues(updatedValues)

      dispatchCustomElementEvent({ props: localProps }, 'onChange', {
        value: newValue,
        values: updatedValues,
        event,
      })
    },
    [localProps, values]
  )

  const setContext = React.useCallback((context) => {
    // also look for a function, where we are able to fill old values
    // this is used in the "constructor" inside the ToggleButton.js component
    if (typeof context === 'function') {
      context = context(tmpContextRef.current)
    }
    tmpContextRef.current = { ...tmpContextRef.current, ...context }

    if (context.value !== undefined) {
      setValue(context.value)
    }
    if (context.values !== undefined) {
      setValues(context.values)
    }
  }, [])

  const tmpContextRef = React.useRef({})

  // use only the props from context, who are available here anyway
  const props = extendPropsWithContext(
    localProps,
    defaultProps,
    sharedContext.getTranslation(localProps).ToggleButton,
    pickFormElementProps(sharedContext?.formElement),
    sharedContext.ToggleButtonGroup
  )

  const {
    status,
    statusState,
    statusProps,
    statusNoAnimation,
    globalStatus,
    suffix,
    labelDirection,
    labelSrOnly,
    vertical,
    layoutDirection,
    label,
    variant,
    leftComponent,
    size,
    disabled,
    skeleton,
    className,

    multiselect,
    id: _ignoreId, // eslint-disable-line
    name: _ignoreName, // eslint-disable-line
    value: _ignoreValue, // eslint-disable-line
    values: _ignoreValues, // eslint-disable-line
    children, // eslint-disable-line
    onChange, // eslint-disable-line

    ...rest
  } = props

  const id = _id
  const showStatus = getStatusState(status)

  const classes = clsx(
    'dnb-toggle-button-group',
    status && `dnb-toggle-button-group__status--${statusState}`,
    !label && 'dnb-toggle-button-group--no-label',
    `dnb-toggle-button-group--${layoutDirection}`,
    'dnb-form-component',
    createSpacingClasses(props),
    className
  )

  const params = {
    ...rest,
  }

  if (showStatus || suffix) {
    params['aria-describedby'] = combineDescribedBy(
      params,
      showStatus ? id + '-status' : null,
      suffix ? id + '-suffix' : null
    )
  }
  if (label) {
    params['aria-labelledby'] = combineLabelledBy(params, id + '-label')
  }

  // also used for code markup simulation
  validateDOMAttributes(localProps, params)

  const context = {
    name: _name,
    value,
    values,
    size,
    multiselect: isTrue(multiselect),
    variant,
    leftComponent,
    disabled,
    skeleton,
    setContext,
    onChange: onChangeHandler,
  }

  const Fieldset = label ? 'fieldset' : 'div'

  return (
    <ToggleButtonGroupContext.Provider value={context}>
      <div className={classes}>
        <AlignmentHelper />
        <Fieldset
          className="dnb-toggle-button-group__fieldset"
          aria-labelledby={label ? id + '-label' : undefined}
          role={variant === 'radio' ? 'radiogroup' : 'group'}
        >
          <Flex.Container
            direction={
              vertical || labelDirection === 'vertical'
                ? 'vertical'
                : 'horizontal'
            }
            gap={vertical ? 'x-small' : 'small'}
          >
            {label && (
              <FormLabel
                element="legend"
                id={id + '-label'}
                srOnly={labelSrOnly}
              >
                {label}
              </FormLabel>
            )}

            <Space
              element="span"
              id={id}
              className="dnb-toggle-button-group__shell"
              {...params}
            >
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

              <span
                className={clsx(
                  'dnb-toggle-button-group__shell__children',
                  `dnb-toggle-button-group__shell__children--${layoutDirection}`
                )}
              >
                {children}

                {suffix && (
                  <Suffix
                    className="dnb-toggle-button-group__suffix"
                    id={id + '-suffix'} // used for "aria-describedby"
                    context={props}
                  >
                    {suffix}
                  </Suffix>
                )}
              </span>
            </Space>
          </Flex.Container>
        </Fieldset>
      </div>
    </ToggleButtonGroupContext.Provider>
  )
}

ToggleButtonGroup._supportsSpacingProps = true

export default ToggleButtonGroup as React.ComponentClass<ToggleButtonGroupProps>

// Type definitions
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText,
} from '../FormStatus'
import type { ButtonSize } from '../Button'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps, SpaceType } from '../space/types'
import type { GlobalStatusConfigObject } from '../GlobalStatus'

export type ToggleButtonGroupVariant = 'default' | 'checkbox' | 'radio'
export type ToggleButtonGroupSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
export type ToggleButtonGroupLayoutDirection = 'column' | 'row'
export type ToggleButtonGroupValue =
  | string
  | number
  | Record<string, unknown>
  | any[]
export type ToggleButtonGroupValues = string | any[]
export type ToggleButtonGroupAttributes = string | Record<string, unknown>
export type ToggleButtonGroupChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode

export interface ToggleButtonGroupProps
  extends Omit<React.HTMLProps<HTMLElement>, 'label' | 'value'>,
    Omit<SpacingProps, 'top' | 'right' | 'bottom' | 'left'> {
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
   * Determine whether the ToggleButtonGroup is checked or not. The default will be `false`.
   */
  checked?: boolean
  variant?: ToggleButtonGroupVariant
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
   * Text describing the content of the ToggleButtonGroup more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButtonGroup component.
   */
  suffix?: ToggleButtonGroupSuffix
  /**
   * Defines the `value` as a string. Use it to get the value during the `onChange` event listener callback in the **ToggleButtonGroup**.
   */
  value?: ToggleButtonGroupValue
  /**
   * The size of the button. For now there is `small`, `medium`, `default` and `large`.
   */
  size?: ButtonSize
  /**
   * Defines the layout direction of the ToggleButtonGroup. Set to `column` or `row`. Defaults to `row` if not set.
   */
  layoutDirection?: ToggleButtonGroupLayoutDirection
  /**
   * Defines the `values` as a string. Use it to get the values during the `onChange` event listener callback in the **ToggleButtonGroup**.
   */
  values?: ToggleButtonGroupValues
  attributes?: ToggleButtonGroupAttributes
  readOnly?: boolean
  className?: string
  children?: ToggleButtonGroupChildren
  onChange?: (...args: any[]) => any
  onStateUpdate?: (...args: any[]) => any
  // Additional properties that are used in tests and stories
  onChange?: (...args: any[]) => any
  top?: SpaceType
  right?: SpaceType
  bottom?: SpaceType
  left?: SpaceType
  multiselect?: boolean
  name?: string
  vertical?: boolean
}
