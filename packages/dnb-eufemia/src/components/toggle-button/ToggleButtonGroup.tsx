/**
 * Web ToggleButtonGroup Component
 */

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import React, { useContext, useRef, useState, useCallback } from 'react'
import clsx from 'clsx'
import useId from '../../shared/helpers/useId'
import {
  extendExistingPropsWithContext,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  combineLabelledBy,
  dispatchCustomElementEvent,
  removeUndefinedProps,
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

const toggleButtonGroupDefaultProps: Partial<ToggleButtonGroupProps> = {
  label: null,
  labelDirection: 'vertical',
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

  className: null,
  children: null,

  onChange: null,
}

function parseValues(props: ToggleButtonGroupProps) {
  if (typeof props.values === 'string' && props.values[0] === '[') {
    return JSON.parse(props.values)
  }
  return props.values
}

function ToggleButtonGroup(ownProps: ToggleButtonGroupProps) {
  const context = useContext(Context)

  const id = useId(ownProps.id)
  const _name = useId(ownProps.name)

  const [value, setValue] = useState<ToggleButtonGroupValue | undefined>(
    ownProps.value
  )
  const [values, setValues] = useState<
    ToggleButtonGroupValue[] | undefined
  >(() => (ownProps.values ? parseValues(ownProps) : undefined))
  const [prevPropsValue, setPrevPropsValue] = useState(ownProps.value)
  const [prevPropsValues, setPrevPropsValues] = useState(ownProps.values)

  const prevContextRef = useRef<Record<string, unknown> | undefined>(
    undefined
  )

  const ownPropsRef = useRef(ownProps)
  ownPropsRef.current = ownProps

  const valuesRef = useRef(values)
  valuesRef.current = values

  // Sync value from props (replaces getDerivedStateFromProps)
  if (
    typeof ownProps.value !== 'undefined' &&
    ownProps.value !== prevPropsValue
  ) {
    setPrevPropsValue(ownProps.value)
    setValue(ownProps.value)
  }

  if (
    typeof ownProps.values !== 'undefined' &&
    ownProps.values !== prevPropsValues
  ) {
    setPrevPropsValues(ownProps.values)
    setValues(parseValues(ownProps))
  }

  const onChangeHandler = useCallback(
    ({
      value: newValue,
      event,
    }: {
      value: ToggleButtonGroupValue
      event: React.SyntheticEvent
    }) => {
      const currentValues = [...(valuesRef.current || [])]

      if (ownPropsRef.current.multiselect) {
        if (!currentValues.includes(newValue)) {
          currentValues.push(newValue)
        } else {
          currentValues.splice(currentValues.indexOf(newValue), 1)
        }
      }

      setValue(newValue)
      setValues([...currentValues])

      dispatchCustomElementEvent(
        { props: ownPropsRef.current },
        'onChange',
        {
          value: newValue,
          values: currentValues,
          event,
        }
      )
    },
    []
  )

  const resolvedProps = {
    ...toggleButtonGroupDefaultProps,
    ...removeUndefinedProps({ ...ownProps }),
  }

  const props = extendExistingPropsWithContext(
    resolvedProps,
    toggleButtonGroupDefaultProps,
    (
      context.getTranslation(ownProps) as Record<
        string,
        Record<string, string>
      >
    ).ToggleButton,
    pickFormElementProps(context?.formElement),
    context?.ToggleButtonGroup
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
    id: _id,
    name: _propName,
    value: _value,
    values: _values,
    children,
    onChange,

    ...rest
  } = props

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
  validateDOMAttributes(ownProps, params)

  const setContext = useCallback(
    (
      contextArg:
        | Record<string, unknown>
        | ((
            prevContext: Record<string, unknown> | undefined
          ) => Record<string, unknown>)
    ) => {
      let resolved: Record<string, unknown>
      if (typeof contextArg === 'function') {
        resolved = contextArg(prevContextRef.current)
      } else {
        resolved = contextArg
      }
      prevContextRef.current = { ...prevContextRef.current, ...resolved }

      if ('value' in resolved) {
        setValue(resolved.value as ToggleButtonGroupValue)
      }
      if ('values' in resolved) {
        setValues(resolved.values as ToggleButtonGroupValue[])
      }
    },
    []
  )

  const groupContext = {
    name: _name,
    value,
    values,
    size,
    multiselect: multiselect,
    variant,
    leftComponent,
    disabled,
    skeleton,
    setContext,
    onChange: onChangeHandler,
  }

  const Fieldset = label ? 'fieldset' : 'div'

  return (
    <ToggleButtonGroupContext value={groupContext}>
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
                vertical={false}
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
                {children as React.ReactNode}

                {suffix && (
                  <Suffix
                    className="dnb-toggle-button-group__suffix"
                    id={id + '-suffix'} // used for "aria-describedby"
                    context={props}
                  >
                    {suffix as React.ReactNode}
                  </Suffix>
                )}
              </span>
            </Space>
          </Flex.Container>
        </Fieldset>
      </div>
    </ToggleButtonGroupContext>
  )
}

withComponentMarkers(ToggleButtonGroup, {
  _supportsSpacingProps: true,
})

export default ToggleButtonGroup

// Type definitions
import type { ButtonSize } from '../Button'
import type { FormStatusBaseProps } from '../FormStatus'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps, SpaceType } from '../../shared/types'

export type ToggleButtonGroupVariant = 'default' | 'checkbox' | 'radio'
export type ToggleButtonGroupSuffix =
  | string
  | (() => React.ReactNode)
  | React.ReactNode
export type ToggleButtonGroupLayoutDirection = 'column' | 'row'
export type ToggleButtonGroupValue =
  | string
  | number
  | Record<string, unknown>
  | unknown[]
export type ToggleButtonGroupValues = string | ToggleButtonGroupValue[]
export type ToggleButtonGroupChildren =
  | string
  | (() => React.ReactNode)
  | React.ReactNode

export type ToggleButtonGroupChangeEvent = {
  value: ToggleButtonGroupValue
  values: ToggleButtonGroupValues
  event: React.SyntheticEvent
}

export type ToggleButtonGroupProps = Omit<
  React.HTMLProps<HTMLElement>,
  'label' | 'value' | 'children' | 'onChange' | 'size'
> &
  Omit<SpacingProps, 'top' | 'right' | 'bottom' | 'left'> &
  FormStatusBaseProps & {
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
    readOnly?: boolean
    className?: string
    children?: ToggleButtonGroupChildren
    onChange?: (event: ToggleButtonGroupChangeEvent) => void
    // Additional properties that are used in tests and stories
    top?: SpaceType
    right?: SpaceType
    bottom?: SpaceType
    left?: SpaceType
    multiselect?: boolean
    name?: string
    vertical?: boolean
  }
