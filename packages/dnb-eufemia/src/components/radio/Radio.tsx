/**
 * Web Radio Component
 */

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import React, { useContext, useRef, useState, useCallback } from 'react'
import clsx from 'clsx'
import useId from '../../shared/helpers/useId'
import {
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  dispatchCustomElementEvent,
  removeUndefinedProps,
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import RadioGroup from './RadioGroup'
import RadioGroupContext from './RadioGroupContext'
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'

import type { SkeletonShow } from '../Skeleton'
import type { FormStatusBaseProps } from '../FormStatus'
import type { SpacingProps } from '../space/types'

export type RadioLabel = string | React.ReactNode
export type RadioLabelPosition = 'left' | 'right'
export type RadioSize = 'default' | 'medium' | 'large'
export type RadioSuffix = string | React.ReactNode
export type RadioChildren = string | React.ReactNode

export type RadioEvent<E = React.SyntheticEvent> = {
  group?: string
  checked: boolean
  value: string
  event: E
}

export type RadioChangeEvent = RadioEvent<
  | React.ChangeEvent<HTMLInputElement>
  | React.KeyboardEvent<HTMLInputElement>
  | React.MouseEvent<HTMLInputElement>
>

export type RadioProps = {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: RadioLabel
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean
  /**
   * Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
   */
  labelPosition?: RadioLabelPosition
  /**
   * Determine whether the radio is checked or not. Default will be `false`.
   */
  checked?: boolean
  disabled?: boolean
  id?: string
  element?: React.ElementType
  /**
   * Use a unique group identifier to define the Radio buttons that belongs together.
   */
  group?: string
  /**
   * The size of the Radio button. For now there is **medium** (default) and **large**.
   */
  size?: RadioSize
  suffix?: RadioSuffix
  /**
   * Defines the `value` as a string. Use it to get the value during the `onChange` event listener callback in the **RadioGroup**.
   */
  value: string
  skeleton?: SkeletonShow
  readOnly?: boolean
  className?: string
  children?: RadioChildren
  onChange?: (event: RadioChangeEvent) => void
  /**
   * By providing a React.ref we can get the internally used input element (DOM). E.g. `ref={myRef}` by using `React.useRef()`.
   */
  ref?: React.Ref<HTMLInputElement>
} & Omit<
  React.HTMLProps<HTMLElement>,
  'ref' | 'onChange' | 'label' | 'size' | 'children'
> &
  SpacingProps &
  FormStatusBaseProps

const radioDefaultProps = {
  label: null,
  labelSrOnly: null,
  labelPosition: null,
  checked: null,
  disabled: null,
  id: null,
  size: null,
  element: 'input',
  group: null,
  status: null,
  statusState: 'error',
  statusProps: null,
  statusNoAnimation: null,
  globalStatus: null,
  suffix: null,
  value: '',
  readOnly: false,
  skeleton: null,

  className: null,
  children: null,

  onChange: null,

  ref: null,
}

const parseChecked = (state: string | boolean | null | undefined) =>
  /true|on/.test(String(state))

/**
 * The radio component is our enhancement of the classic radio button.
 */
function RadioInner({ ref: externalRef, ...ownProps }: RadioProps) {
  const groupContext = useContext(RadioGroupContext)
  const context = useContext(Context)
  const inputRef = useRef<HTMLInputElement>(null)

  const ownPropsRef = useRef(ownProps)
  ownPropsRef.current = ownProps

  const groupContextRef = useRef(groupContext)
  groupContextRef.current = groupContext

  const id = useId(ownProps.id)

  const [checkedState, setCheckedState] = useState(() =>
    parseChecked(ownProps.checked)
  )
  const [prevPropsChecked, setPrevPropsChecked] = useState(
    ownProps.checked
  )

  // Track whether the internal state was just set by a change event
  const skipNextPropSync = useRef(false)

  // Sync checked state from props
  // skipNextPropSync is always reset after each render opportunity.
  if (ownProps.checked !== prevPropsChecked) {
    setPrevPropsChecked(ownProps.checked)
    if (!skipNextPropSync.current) {
      setCheckedState(parseChecked(ownProps.checked))
    }
  }
  skipNextPropSync.current = false

  // Helper functions matching class component methods
  const isContextGroupOrSingle = useCallback(
    () => typeof groupContext.value !== 'undefined' && !ownProps.group,
    [groupContext.value, ownProps.group]
  )

  const isPlainGroup = useCallback(
    () => typeof groupContext.value === 'undefined' && ownProps.group,
    [groupContext.value, ownProps.group]
  )

  const isInNoGroup = useCallback(
    () => typeof groupContext.value === 'undefined' && !ownProps.group,
    [groupContext.value, ownProps.group]
  )

  const callOnChange = useCallback(
    ({
      value,
      checked: isChecked,
      event,
    }: {
      value: string
      checked: boolean
      event: React.SyntheticEvent
    }) => {
      const { group } = ownPropsRef.current
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
          group,
          checked: isChecked,
          value,
          event,
        }
      )

      // help firefox and safari to have a correct state after a click
      if (inputRef.current) {
        inputRef.current.focus()
      }
    },
    []
  )

  const onChangeHandler = useCallback(
    (
      _event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent
    ) => {
      const event = _event
      if (ownPropsRef.current.readOnly) {
        return event.preventDefault()
      }
      const value = (event.target as HTMLInputElement).value
      const newChecked = !checkedState

      // delay in case we have a props group only
      if (isPlainGroup()) {
        // in case we have a false "hasContext" but a "group"
        // then we have to use a delay, to overwrite the uncontrolled state
        setTimeout(() => {
          skipNextPropSync.current = true
          setCheckedState(newChecked)
          callOnChange({ value, checked: newChecked, event })
        }, 1)
      } else {
        skipNextPropSync.current = true
        setCheckedState(newChecked)
        callOnChange({ value, checked: newChecked, event })
      }
    },
    [checkedState, isPlainGroup, callOnChange]
  )

  const onKeyDownHandler = useCallback(
    (event: React.KeyboardEvent) => {
      const key = event.key
      // only have key support if there is only a single radio
      if (isInNoGroup()) {
        if (key === 'Enter') {
          onChangeHandler(event)
        }
      } else if (isContextGroupOrSingle()) {
        if (key === 'Enter' || key === ' ') {
          const { value } = groupContextRef.current
          if (value !== null && typeof value !== 'undefined') {
            event.preventDefault()
          }
          onChangeHandler(event)
        }
      } else {
        // else we only use the native support, and don't want space support
        // because only arrow keys has to be used
        if (key === ' ') {
          event.preventDefault()
        }
      }
      dispatchCustomElementEvent(
        { props: ownPropsRef.current },
        'onKeyDown',
        {
          event,
        }
      )
    },
    [isInNoGroup, isContextGroupOrSingle, onChangeHandler]
  )

  const onClickHandler = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      if (ownPropsRef.current.readOnly) {
        return event.preventDefault()
      }
      // only have click support if there are more plain radio
      if (!isPlainGroup()) {
        return // stop here
      }
      const value = (event.target as HTMLInputElement).value
      const isChecked = (event.target as HTMLInputElement).checked
      callOnChange({ value, checked: isChecked, event })
    },
    [isPlainGroup, callOnChange]
  )

  // Strip undefined values so they fall through to defaults,
  // preserving the legacy React defaultProps behavior.
  const resolvedProps = {
    ...radioDefaultProps,
    ...removeUndefinedProps({ ...ownProps }),
  }

  // Uses extendPropsWithContextInClassComponent (onlyMergeExistingProps: true)
  // to prevent context props not defined in radioDefaultProps from
  // leaking into the component and potentially reaching DOM attributes.
  const contextProps = extendPropsWithContextInClassComponent(
    resolvedProps,
    radioDefaultProps,
    groupContext as Record<string, unknown>
  )

  // use only the props from context, who are available here anyway
  const props = extendPropsWithContextInClassComponent(
    resolvedProps,
    radioDefaultProps,
    contextProps,
    { skeleton: context?.skeleton },
    pickFormElementProps(context.formElement),
    (context as Record<string, unknown>)?.Radio as
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
    element,
    label,
    labelSrOnly,
    labelPosition,
    size,
    readOnly,
    skeleton,
    className,
    id: _id,
    group: _group,
    value: _value,
    checked: _checked,
    disabled: _disabled,
    children,
    onChange,
    ref: _ref,

    ...rest
  } = props

  // Re-apply any explicitly-passed extra props from ownProps that aren't
  // part of radioDefaultProps (e.g. role: undefined, type: undefined from
  // ToggleButton). removeUndefinedProps strips these from resolvedProps,
  // but they must flow through to inputParams to override computed values.
  for (const key of Object.keys(ownProps)) {
    if (!(key in radioDefaultProps)) {
      ;(rest as Record<string, unknown>)[key] = (
        ownProps as Record<string, unknown>
      )[key]
    }
  }

  let checked = checkedState
  const { value } = props
  let { group, disabled } = props // get it from context also

  const hasContext = typeof groupContext.name !== 'undefined'

  if (hasContext) {
    if (typeof groupContext.value !== 'undefined') {
      checked = groupContext.value === value
    }
    group = groupContext.name
    if (groupContext.disabled && disabled !== false) {
      disabled = true
    }
  } else if (typeof rest.name !== 'undefined') {
    group = rest.name
  }

  const showStatus = getStatusState(status)

  const mainParams = {
    className: clsx(
      'dnb-radio',
      status && `dnb-radio__status--${statusState}`,
      size && `dnb-radio--${size}`,
      label && `dnb-radio--label-position-${labelPosition || 'right'}`,
      createSpacingClasses(props),
      className
    ),
  }

  let inputParams: Record<string, unknown> = {
    role: hasContext || group ? 'radio' : null,
    type: hasContext || group ? 'radio' : 'checkbox', // overwriting the type
  }

  if (!group) {
    inputParams.type = 'checkbox'
    inputParams.role = 'radio' // breaks axe test
  }

  if (showStatus || suffix) {
    inputParams['aria-describedby'] = combineDescribedBy(
      inputParams,
      showStatus ? id + '-status' : null,
      suffix ? id + '-suffix' : null
    )
  }
  if (readOnly) {
    inputParams['aria-readonly'] = inputParams.readOnly = true
  }

  inputParams = Object.assign(inputParams, rest)

  skeletonDOMAttributes(inputParams, skeleton, context)

  // also used for code markup simulation
  validateDOMAttributes(ownProps, inputParams)

  const labelComp = label && (
    <FormLabel
      id={id + '-label'}
      forId={id}
      text={label as React.ReactNode}
      disabled={disabled}
      skeleton={skeleton}
      srOnly={labelSrOnly}
      vertical={false}
    />
  )

  const Element = element || 'input'

  // Forward ref to external ref
  const combinedRef = useCallback(
    (el: HTMLInputElement | null) => {
      ;(
        inputRef as React.MutableRefObject<HTMLInputElement | null>
      ).current = el
      if (typeof externalRef === 'function') {
        externalRef(el)
      } else if (externalRef) {
        ;(
          externalRef as React.MutableRefObject<HTMLInputElement | null>
        ).current = el
      }
    },
    [externalRef]
  )

  return (
    <span {...mainParams}>
      <span className="dnb-radio__order">
        {labelPosition === 'left' && labelComp}

        <span className="dnb-radio__inner">
          <AlignmentHelper />

          <FormStatus
            show={showStatus}
            id={id + '-form-status'}
            globalStatus={globalStatus}
            label={label as React.ReactNode}
            textId={id + '-status'} // used for "aria-describedby"
            widthSelector={id + ', ' + id + '-label'}
            text={status}
            state={statusState}
            noAnimation={statusNoAnimation}
            skeleton={skeleton}
            {...statusProps}
          />

          <span className="dnb-radio__row">
            <span className="dnb-radio__shell">
              <Element
                type="radio"
                value={value}
                id={id}
                name={group}
                className="dnb-radio__input"
                checked={checked}
                aria-checked={isPlainGroup() ? undefined : checked}
                disabled={disabled}
                ref={combinedRef}
                {...inputParams}
                onChange={onChangeHandler}
                onClick={onClickHandler}
                onKeyDown={onKeyDownHandler}
              />

              <span
                className={clsx(
                  'dnb-radio__button',
                  createSkeletonClass('shape', skeleton, context)
                )}
                aria-hidden
              />
              <span className="dnb-radio__focus" aria-hidden />
              <span
                className={clsx(
                  'dnb-radio__dot',
                  createSkeletonClass('font', skeleton, context)
                )}
                aria-hidden
              />
            </span>

            {labelPosition !== 'left' && labelComp}

            {suffix && (
              <Suffix
                className="dnb-radio__suffix"
                id={id + '-suffix'} // used for "aria-describedby"
                context={props}
              >
                {suffix as React.ReactNode}
              </Suffix>
            )}
          </span>
        </span>
      </span>
    </span>
  )
}

const Radio = React.memo(RadioInner) as unknown as typeof RadioInner & {
  Group: typeof RadioGroup
  parseChecked: typeof parseChecked
}

Radio.Group = RadioGroup
Radio.parseChecked = parseChecked

withComponentMarkers(Radio, {
  _formElement: true,
  _supportsSpacingProps: true,
})

export default Radio
