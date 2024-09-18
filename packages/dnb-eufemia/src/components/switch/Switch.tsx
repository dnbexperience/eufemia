import React, {
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import classnames from 'classnames'
import {
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import FormLabel from '../form-label/FormLabel'
import FormStatus, {
  FormStatusState,
  FormStatusText,
} from '../form-status/FormStatus'
import { convertSnakeCaseProps } from '../../shared/helpers/withSnakeCaseProps'
import useId from '../../shared/helpers/useId'
import { GlobalStatusConfigObject } from '../GlobalStatus'
import { SkeletonShow } from '../Skeleton'
import { SpacingProps } from '../space/types'

export type SwitchLabelPosition = 'left' | 'right'
export type SwitchSize = 'default' | 'medium' | 'large'
export type SwitchAttributes = string | Record<string, unknown>
export type SwitchOnChange = (args: {
  checked: boolean
  event: MouseEvent | TouchEvent | KeyboardEvent
}) => void

export type SwitchProps = {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: React.ReactNode
  /**
   * Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
   */
  labelPosition?: SwitchLabelPosition
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean
  /**
   * <em>(required)</em> the `title` of the input - describing it a bit further for accessibility reasons.
   */
  title?: string
  /**
   * Determine whether the switch is checked or not. The default will be `false`.
   */
  checked?: boolean
  disabled?: boolean
  id?: string
  /**
   * The size of the switch. For now there is "medium" (default) and "large".
   */
  size?: SwitchSize
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
  statusProps?: Record<string, unknown>
  /**
   * The <a href="/uilib/components/global-status/properties/#configuration-object">configuration</a> used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  globalStatus?: GlobalStatusConfigObject
  statusNoAnimation?: boolean
  /**
   * Text describing the content of the Switch more than the label. You can also send in a React component, so it gets wrapped inside the Switch component.
   */
  suffix?: React.ReactNode
  value?: string
  attributes?: SwitchAttributes
  readOnly?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  className?: string
  children?: React.ReactNode
  /**
   * Will be called on state changes made by the user. Returns a boolean `{ checked, event }`.
   */
  onChange?: SwitchOnChange
  /**
   * Will be called on state changes made by the user, but with a delay. This way the user sees the animation before e.g. an error will be removed. Returns a boolean `{ checked, event }`.
   */
  onChangeEnd?: SwitchOnChange
  onStateUpdate?: SwitchOnChange
  /**
   * By providing a React.ref we can get the internally used input element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  innerRef?:
    | React.MutableRefObject<HTMLInputElement>
    | ((elem: HTMLInputElement) => void)
} & Omit<
  React.HTMLProps<HTMLElement>,
  'ref' | 'size' | 'onChange' | 'innerRef'
> &
  SpacingProps &
  DeprecatedSwitchProps

// deprecated, can be removed in v11
type DeprecatedSwitchProps = {
  /**  @deprecated use `labelPosition` */
  label_position?: SwitchLabelPosition
  /**  @deprecated use `labelSrOnly` */
  label_sr_only?: boolean
  /**  @deprecated use `statusState` */
  status_state?: FormStatusState
  /**  @deprecated use `statusProps` */
  status_props?: Record<string, unknown>
  /**  @deprecated use `onChange` */
  on_change?: SwitchOnChange
  /**  @deprecated use `onChangeEnd` */
  on_change_end?: SwitchOnChange
  /**  @deprecated use `onStateUpdate` */
  on_state_update?: SwitchOnChange
  /**  @deprecated use `statusNoAnimation` */
  status_no_animation?: boolean
}

const defaultProps = {
  statusState: 'error',
}

export default function Switch(props: SwitchProps) {
  const context = useContext(Context)

  const allProps = extractPropsFromContext()

  const {
    value,
    size,
    status,
    statusState,
    statusProps,
    globalStatus,
    statusNoAnimation,
    suffix,
    label,
    labelPosition,
    labelSrOnly,
    title,
    disabled,
    readOnly,
    skeleton,
    className,
    id: idProp,
    checked: checkedProp,
    onChange,
    onChangeEnd,
    innerRef: innerRefProp,
    ...rest
  } = allProps

  const [isChecked, setIsChecked] = useState(checkedProp ?? false)
  const [prevChecked, setPrevChecked] = useState(checkedProp)

  const isFn = typeof innerRefProp === 'function'
  const refHook = useRef<HTMLInputElement>()
  const innerRef = (!isFn && innerRefProp) || refHook

  useEffect(() => {
    if (isFn) {
      innerRefProp?.(refHook.current)
    }
  }, [innerRefProp, isFn, refHook])

  const id = useId(idProp)

  useEffect(() => {
    if (checkedProp !== prevChecked) {
      setIsChecked(!!checkedProp)
      setPrevChecked(!!checkedProp)
    }
  }, [checkedProp, prevChecked])

  const helperParams = { onMouseDown: (e) => e.preventDefault() }

  const callOnChange = useCallback(
    ({ checked, event }) => {
      onChange?.({ checked, event })
    },
    [onChange]
  )

  const onChangeHandler = useCallback(
    (event) => {
      if (readOnly) {
        return event.preventDefault()
      }
      const updatedChecked = !isChecked

      setIsChecked(updatedChecked)
      callOnChange({ checked: updatedChecked, event })

      if (onChangeEnd) {
        if (event && event.persist) {
          event.persist()
        }
        setTimeout(
          () => onChangeEnd({ checked: updatedChecked, event }),
          500
        )
      }

      // help firefox and safari to have an correct state after a click
      if (innerRef.current) {
        innerRef.current.focus()
      }
    },
    [callOnChange, innerRef, isChecked, onChangeEnd, readOnly]
  )

  const onKeyDownHandler = useCallback(
    (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Enter':
          onChangeHandler(event)
          break
      }
    },
    [onChangeHandler]
  )

  const showStatus = getStatusState(status)

  const mainParams = {
    className: classnames(
      'dnb-switch',
      size && `dnb-switch--${size}`,
      status && `dnb-switch__status--${statusState}`,
      `dnb-switch--label-position-${labelPosition || 'right'}`,
      'dnb-form-component',
      createSkeletonClass(null, skeleton),
      createSpacingClasses(props),
      className
    ),
  }

  const inputParams = {
    disabled,
    checked: isChecked,
    ...rest,
  }

  if (showStatus || suffix) {
    inputParams['aria-describedby'] = combineDescribedBy(
      inputParams,
      showStatus ? id + '-status' : null,
      suffix ? id + '-suffix' : null
    )
  }
  if (readOnly) {
    inputParams['aria-readonly'] = readOnly
  }

  skeletonDOMAttributes(inputParams, skeleton, context)
  validateDOMAttributes(props, inputParams)

  const labelComp = label && (
    <FormLabel
      id={id + '-label'}
      forId={id}
      text={label}
      disabled={disabled}
      skeleton={skeleton}
      srOnly={labelSrOnly}
    />
  )

  return (
    <span {...mainParams}>
      <span className="dnb-switch__order">
        {labelPosition === 'left' && labelComp}

        <span className="dnb-switch__inner">
          <AlignmentHelper />

          <FormStatus
            show={showStatus}
            id={id + '-form-status'}
            globalStatus={globalStatus}
            label={label}
            width_selector={id + ', ' + id + '-label'}
            text={status}
            state={statusState}
            skeleton={skeleton}
            no_animation={statusNoAnimation}
            {...statusProps}
          />

          <span className="dnb-switch__shell">
            {(labelPosition === 'right' || !labelPosition) && labelComp}

            <span className="dnb-switch__row">
              <input
                id={id}
                name={id}
                type="checkbox"
                role="switch"
                title={title}
                aria-checked={isChecked}
                className="dnb-switch__input"
                value={isChecked ? value || '' : ''}
                ref={innerRef}
                {...inputParams}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
              />
              <span
                draggable
                aria-hidden
                className="dnb-switch__background"
                onDragStart={onChangeHandler}
                {...helperParams}
              />
              <span
                className={classnames(
                  'dnb-switch__button',
                  createSkeletonClass('shape', skeleton, context)
                )}
                aria-hidden
              >
                <span className="dnb-switch__focus">
                  <span className="dnb-switch__focus__inner" />
                </span>
              </span>
            </span>

            {suffix && (
              <Suffix
                className="dnb-switch__suffix"
                id={id + '-suffix'} // used for "aria-describedby"
                context={props}
              >
                {suffix}
              </Suffix>
            )}
          </span>
        </span>
      </span>
    </span>
  )

  function extractPropsFromContext() {
    return extendPropsWithContext(
      convertSnakeCaseProps(props),
      defaultProps,
      { skeleton: context?.skeleton },
      // Deprecated – can be removed in v11
      pickFormElementProps(context?.FormRow),
      pickFormElementProps(context?.formElement),
      context.Switch
    )
  }
}
