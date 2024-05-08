/**
 * Web Checkbox Component
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import classnames from 'classnames'
import keycode from 'keycode'

import {
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  extendPropsWithContext,
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import useId from '../../shared/helpers/useId'
import type { SpacingProps } from '../space/types'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import { convertSnakeCaseProps } from '../../shared/helpers/withSnakeCaseProps'

import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText,
} from '../FormStatus'
import type { SkeletonShow } from '../Skeleton'
import type { GlobalStatusConfigObject } from '../GlobalStatus'

import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import CheckIcon from './CheckIcon'

export type CheckboxLabelPosition = 'left' | 'right'
export type CheckboxSize = 'default' | 'medium' | 'large'
export type CheckboxAttributes = string | Record<string, unknown>
export type OnChangeParams = {
  checked: boolean
  event: React.ChangeEvent<HTMLInputElement> | KeyboardEvent
}

export type CheckboxProps = {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: React.ReactNode
  /**
   * Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
   */
  labelPosition?: CheckboxLabelPosition
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean
  /**
   * The `title` of the input - describing it a bit further for accessibility reasons.
   */
  title?: string
  /**
   * Determine whether the checkbox is checked or not. The default is `false`.
   */
  checked?: boolean | undefined | null
  /**
   * The size of the checkbox. For now there is "medium" (default) and "large".
   */
  size?: CheckboxSize
  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText
  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  statusState?: FormStatusState
  /**
   * Use an object to define additional FormStatus properties. See [FormStatus](/uilib/components/form-status/properties/)
   */
  statusProps?: FormStatusProps
  statusNoAnimation?: boolean
  /**
   * The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status)
   */
  globalStatus?: GlobalStatusConfigObject
  /**
   * Text describing the content of the Checkbox more than the label. You can also send in a React component, so it gets wrapped inside the Checkbox component.
   */
  suffix?: React.ReactNode
  value?: string
  element?: React.ElementType
  attributes?: CheckboxAttributes
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  /**
   * Will be called on state changes made by the user. Returns an boolean `{ checked, event }`.
   */
  onChange?: (args: OnChangeParams) => void
  /**
   * By providing a React.ref we can get the internally used input element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  innerRef?:
    | React.MutableRefObject<HTMLInputElement>
    | ((elem: HTMLInputElement) => void)
} & SpacingProps &
  Omit<
    React.HTMLProps<HTMLInputElement>,
    'ref' | 'label' | 'size' | 'onChange'
  > &
  DeprecatedCheckboxProps

// depracated, can be removed in v11
type DeprecatedCheckboxProps = {
  /** @deprecated use the `label` prop instead */
  children?: React.ReactNode
  /**  @deprecated use `onChange` */
  on_change?: (args: OnChangeParams) => void
  /**  @deprecated use `labelPosition` */
  label_position?: CheckboxLabelPosition
  /**  @deprecated use `labelSrOnly` */
  label_sr_only?: boolean
  /**  @deprecated use `statusState` */
  status_state?: FormStatusState
  /**  @deprecated use `statusProps` */
  status_props?: FormStatusProps
  /**  @deprecated use `statusNoAnimation` */
  status_no_animation?: boolean
}

const defaultProps: CheckboxProps = {
  statusState: 'error',
}

function Checkbox(localProps: CheckboxProps) {
  const context = useContext(Context)

  const props = extractPropsFromContext()

  const {
    value,
    status,
    statusState,
    statusProps,
    statusNoAnimation,
    globalStatus,
    suffix,
    size,
    label,
    labelPosition,
    labelSrOnly,
    title,
    element,
    disabled,
    readOnly,
    skeleton,
    className,
    id: idProp,
    checked,
    onChange,
    innerRef,
    ...rest
  } = props

  const id = useId(idProp)

  const isFn = typeof innerRef === 'function'
  const refHook = useRef<HTMLInputElement>()
  const ref = (!isFn && innerRef) || refHook

  useEffect(() => {
    if (isFn) {
      innerRef?.(ref.current)
    }
  }, [innerRef, isFn, ref])

  const [isChecked, setIsChecked] = useState<boolean>(checked ?? false)
  const [prevChecked, setPrevChecked] = useState<boolean>(checked)

  useEffect(() => {
    if (checked !== prevChecked) {
      setIsChecked(!!checked)
      setPrevChecked(!!checked)
    }
  }, [checked, prevChecked])

  const callOnChange = useCallback(
    (args: OnChangeParams) => {
      onChange?.(args)
    },
    [onChange]
  )

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement> | KeyboardEvent) => {
      if (readOnly) {
        return event.preventDefault()
      }
      const updatedCheck = !isChecked

      setIsChecked(updatedCheck)
      callOnChange({ checked: updatedCheck, event })

      // help firefox and safari to have an correct state after a click
      if (ref.current) {
        ref.current.focus()
      }
    },
    [callOnChange, isChecked, readOnly, ref]
  )

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(event)
    },
    [handleChange]
  )

  const onKeyDownHandler = useCallback(
    (event: KeyboardEvent) => {
      switch (keycode(event)) {
        case 'enter':
          handleChange(event)
          break
      }
    },
    [handleChange]
  )

  const mainParams = {
    className: classnames(
      'dnb-checkbox',
      status && `dnb-checkbox__status--${statusState}`,
      size && `dnb-checkbox--${size}`,
      label && `dnb-checkbox--label-position-${labelPosition || 'right'}`,
      'dnb-form-component',
      createSkeletonClass(null, skeleton),
      createSpacingClasses(props),
      className
    ),
  }

  const showStatus = getStatusState(status)

  const inputParams = handleInputAttributes()

  const statusComp = (
    <FormStatus
      show={showStatus}
      id={id + '-form-status'}
      globalStatus={globalStatus}
      label={label}
      text_id={id + '-status'} // used for "aria-describedby"
      width_selector={id + ', ' + id + '-label'}
      text={status}
      state={statusState}
      no_animation={statusNoAnimation}
      skeleton={skeleton}
      {...statusProps}
    />
  )

  const Element = element || 'input'

  return (
    <span {...mainParams}>
      <span className="dnb-checkbox__order">
        {label && (
          <FormLabel
            id={id + '-label'}
            forId={id}
            text={label}
            disabled={disabled}
            skeleton={skeleton}
            srOnly={labelSrOnly}
          />
        )}

        <span className="dnb-checkbox__inner">
          <AlignmentHelper />
          {labelPosition === 'left' && statusComp}

          <span className="dnb-checkbox__shell">
            <Element
              id={id}
              name={id}
              type="checkbox"
              title={title}
              className="dnb-checkbox__input"
              value={isChecked ? value || '' : ''}
              disabled={disabled}
              {...inputParams}
              onChange={onChangeHandler}
              onKeyDown={onKeyDownHandler}
              ref={ref}
            />

            <span
              className={classnames(
                'dnb-checkbox__button',
                createSkeletonClass('shape', skeleton, context)
              )}
              aria-hidden
            >
              <span className="dnb-checkbox__focus" />
            </span>

            <CheckIcon size={size} />
          </span>
        </span>

        {suffix && (
          <Suffix
            className="dnb-checkbox__suffix"
            id={id + '-suffix'} // used for "aria-describedby"
            context={props}
          >
            {suffix}
          </Suffix>
        )}
      </span>

      {(labelPosition === 'right' || !labelPosition) && statusComp}
    </span>
  )

  /**
   * Adds aria attributes, calls validateDOMAttributes and skeletonDOMAttributes and returns the result
   */
  function handleInputAttributes() {
    const inputParams = {
      disabled,
      checked: isChecked,
      readOnly,
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
      inputParams['aria-readonly'] = inputParams.readOnly = true
    }

    // also used for code markup simulation
    return validateDOMAttributes(
      props,
      skeletonDOMAttributes(inputParams, skeleton, context)
    )
  }

  function extractPropsFromContext() {
    return extendPropsWithContext(
      convertSnakeCaseProps(localProps),
      defaultProps,
      context.Checkbox,
      {
        skeleton: context?.Checkbox,
      },
      // Deprecated – can be removed in v11
      pickFormElementProps(context?.FormRow),
      pickFormElementProps(context?.formElement)
    )
  }
}

export default Checkbox
