/**
 * Web RadioGroup Component
 */

import React, { useContext, useRef, useState, useCallback } from 'react'
import clsx from 'clsx'
import useId from '../../shared/helpers/useId'
import {
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  combineLabelledBy,
  dispatchCustomElementEvent,
  removeUndefinedProps,
} from '../../shared/component-helper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import { createSpacingClasses } from '../space/SpacingHelper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import Space from '../Space'
import FormLabel from '../FormLabel'
import FormStatus from '../FormStatus'
import Flex from '../Flex'
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import RadioGroupContext from './RadioGroupContext'
import type {
  FormStatusBaseProps,
  FormStatusText,
  FormStatusState,
} from '../FormStatus'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../../shared/types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type RadioGroupLabelPosition = 'left' | 'right'
export type RadioGroupSize = 'default' | 'medium' | 'large'
export type RadioGroupSuffix = string | React.ReactNode
export type RadioGroupLayoutDirection = 'column' | 'row'
export type RadioGroupAttributes = string | Record<string, unknown>
export type RadioGroupChildren = string | React.ReactNode

export type RadioGroupChangeEvent = {
  value: string
  event: React.SyntheticEvent
}

export type RadioGroupProps = {
  label?: React.ReactNode
  labelDirection?: 'vertical' | 'horizontal'
  labelSrOnly?: boolean
  labelPosition?: RadioGroupLabelPosition
  title?: string
  disabled?: boolean
  skeleton?: SkeletonShow
  id?: string
  name?: string
  size?: RadioGroupSize
  status?: FormStatusText
  statusState?: FormStatusState
  statusProps?: FormStatusBaseProps
  statusNoAnimation?: boolean
  globalStatus?: FormStatusBaseProps['globalStatus']
  suffix?: RadioGroupSuffix
  vertical?: boolean
  layoutDirection?: RadioGroupLayoutDirection
  value?: string
  attributes?: RadioGroupAttributes
  style?: React.CSSProperties
  className?: string
  children?: RadioGroupChildren
  onChange?: (event: RadioGroupChangeEvent) => void
} & SpacingProps

const radioGroupDefaultProps = {
  label: null,
  labelDirection: 'vertical',
  labelSrOnly: null,
  labelPosition: null,
  title: null,
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
  attributes: null,

  className: null,
  children: null,

  onChange: null,
}

const parseChecked = (state: string | boolean | null | undefined) =>
  /true|on/.test(String(state))

/**
 * The radio component is our enhancement of the classic radio button. It acts like a radio. Example: On/off, yes/no.
 */
function RadioGroup(ownProps: RadioGroupProps) {
  const context = useContext(Context)

  const ownPropsRef = useRef(ownProps)
  ownPropsRef.current = ownProps

  const id = useId(ownProps.id)
  const nameRef = useRef(ownProps.name || id)

  const [value, setValue] = useState<string | undefined>(ownProps.value)
  const [prevPropsValue, setPrevPropsValue] = useState(ownProps.value)

  // Track whether the internal state was just set by a change event
  const skipNextPropSync = useRef(false)

  // Sync value state from props
  // skipNextPropSync is always reset after each render opportunity,
  // matching the class component's _listenForPropChanges pattern.
  if (ownProps.value !== prevPropsValue) {
    setPrevPropsValue(ownProps.value)
    if (!skipNextPropSync.current) {
      setValue(ownProps.value)
    }
  }
  skipNextPropSync.current = false

  const onChangeHandler = useCallback(
    ({
      value: newValue,
      event,
    }: {
      value: string
      event: React.SyntheticEvent
    }) => {
      skipNextPropSync.current = true
      setValue(newValue)
      dispatchCustomElementEvent(
        { props: ownPropsRef.current },
        'onChange',
        {
          value: newValue,
          event,
        }
      )
    },
    []
  )

  const resolvedProps = {
    ...radioGroupDefaultProps,
    ...removeUndefinedProps({ ...ownProps }),
  }

  // Uses extendPropsWithContextInClassComponent (onlyMergeExistingProps: true)
  // to prevent context props not defined in radioGroupDefaultProps from
  // leaking into the component and potentially reaching DOM attributes.
  const props = extendPropsWithContextInClassComponent(
    resolvedProps,
    radioGroupDefaultProps,
    pickFormElementProps(context?.formElement),
    (context as Record<string, unknown>)?.RadioGroup as
      | Record<string, unknown>
      | undefined
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
    labelPosition,
    vertical,
    layoutDirection,
    size,
    disabled,
    skeleton,
    className,

    id: _id,
    name: _name,
    value: _value,
    children,
    onChange,

    ...rest
  } = props

  const showStatus = getStatusState(status)

  const classes = clsx(
    'dnb-radio-group',
    status && `dnb-radio-group__status--${statusState}`,
    `dnb-radio-group--${layoutDirection}`,
    'dnb-form-component',
    createSpacingClasses(props),
    className
  )

  const params = { ...rest }
  const legendId = id + '-label'

  if (showStatus || suffix) {
    params['aria-describedby'] = combineDescribedBy(
      params,
      showStatus ? id + '-status' : null,
      suffix ? id + '-suffix' : null
    )
  }
  if (label) {
    params['aria-labelledby'] = combineLabelledBy(params, legendId)
  }

  // also used for code markup simulation
  validateDOMAttributes(ownProps, params)

  const groupContext = {
    name: nameRef.current,
    value,
    size,
    disabled,
    labelPosition,
    onChange: onChangeHandler,
  }

  const Fieldset = label ? 'fieldset' : 'div'

  return (
    <RadioGroupContext value={groupContext}>
      <div className={classes}>
        <AlignmentHelper />
        <Fieldset
          className="dnb-radio-group__fieldset"
          aria-labelledby={label ? legendId : undefined}
          role="radiogroup"
        >
          <Flex.Container
            direction={
              vertical || labelDirection === 'vertical'
                ? 'vertical'
                : 'horizontal'
            }
            align="stretch"
            gap={vertical ? 'x-small' : 'small'}
          >
            {label && (
              <FormLabel
                element="legend"
                id={legendId}
                srOnly={labelSrOnly}
              >
                {label}
              </FormLabel>
            )}

            <Space
              element="span"
              id={id}
              className="dnb-radio-group__shell"
              {...params}
            >
              {children as React.ReactNode}

              {suffix && (
                <Suffix
                  className="dnb-radio-group__suffix"
                  id={id + '-suffix'} // used for "aria-describedby"
                  context={props}
                >
                  {suffix as React.ReactNode}
                </Suffix>
              )}

              <FormStatus
                show={showStatus}
                id={id + '-form-status'}
                globalStatus={globalStatus}
                label={label}
                text={status}
                state={statusState}
                textId={id + '-status'} // used for "aria-describedby"
                widthSelector={id + ', ' + legendId}
                noAnimation={statusNoAnimation}
                skeleton={skeleton}
                {...statusProps}
              />
            </Space>
          </Flex.Container>
        </Fieldset>
      </div>
    </RadioGroupContext>
  )
}

withComponentMarkers(RadioGroup, { _supportsSpacingProps: true })

export { parseChecked as RadioGroupParseChecked }
export default RadioGroup
