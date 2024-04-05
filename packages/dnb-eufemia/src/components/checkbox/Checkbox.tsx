/**
 * Web Checkbox Component
 *
 */

import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  makeUniqueId,
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

// types
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText,
} from '../FormStatus'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../space/types'
import type { GlobalStatusConfigObject } from '../GlobalStatus'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import CheckIcon from './CheckIcon'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'

export type CheckboxLabelPosition = 'left' | 'right'
export type CheckboxSize = 'default' | 'medium' | 'large'
export type CheckboxAttributes = string | Record<string, unknown>
export type OnChangeParams = {
  checked: boolean
  event: React.ChangeEvent<HTMLInputElement>
}

/**
 * The checkbox component is our enhancement of the classic checkbox button. It acts like a checkbox. Example: On/off, yes/no.
 */

export type CheckboxProps = {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: React.ReactNode
  /**
   * Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
   */
  label_position?: CheckboxLabelPosition
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: boolean
  /**
   * The `title` of the input - describing it a bit further for accessibility reasons.
   */
  title?: string
  /**
   * Determine whether the checkbox is checked or not. The default is `false`.
   */
  checked?: boolean | undefined | null
  disabled?: boolean
  id?: string
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
  status_state?: FormStatusState
  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: FormStatusProps
  status_no_animation?: boolean
  /**
   * The <a href="/uilib/components/global-status/properties/#configuration-object">configuration</a> used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  globalStatus?: GlobalStatusConfigObject
  /**
   * Text describing the content of the Checkbox more than the label. You can also send in a React component, so it gets wrapped inside the Checkbox component.
   */
  suffix?: React.ReactNode
  value?: string
  element?: React.ElementType
  attributes?: CheckboxAttributes
  readOnly?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  class?: string
  className?: string
  /**
   * Will be called on state changes made by the user. Returns an boolean `{ checked, event }`.
   */
  on_change?: (args: OnChangeParams) => void
  onChange?: (args: OnChangeParams) => void

  on_state_update?: ({ checked }: { checked: boolean }) => void
  /**
   * By providing a React.ref we can get the internally used input element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  innerRef?:
    | React.MutableRefObject<HTMLInputElement>
    | ((elem: HTMLInputElement) => void)
} & SpacingProps &
  Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'label' | 'size'>

function Checkbox(localProps: CheckboxProps) {
  const defaultProps: CheckboxProps = {
    id: makeUniqueId(),
    status_state: 'error',
  }

  const context = React.useContext(Context)

  const props = extendPropsWithContext(
    localProps,
    defaultProps,
    context.Checkbox,
    {
      skeleton: context?.Checkbox,
    },
    // Deprecated – can be removed in v11
    pickFormElementProps(context?.FormRow),
    pickFormElementProps(context?.formElement)
  )

  const {
    value,
    status,
    status_state,
    status_props,
    status_no_animation,
    globalStatus,
    suffix,
    size,
    label,
    label_position,
    label_sr_only,
    title,
    element,
    disabled,
    readOnly,
    skeleton,
    className,
    class: _className,
    id,
    checked,
    on_change,
    onChange,
    on_state_update,
    innerRef,
    ...rest
  } = props

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

  useEffect(() => {
    if (on_state_update) {
      on_state_update({ checked: isChecked })
    }
  }, [isChecked, on_state_update])

  function onKeyDownHandler(event) {
    switch (keycode(event)) {
      case 'enter':
        onChangeHandler(event)
        break
    }
  }

  const callOnChange = (args: OnChangeParams) => {
    onChange?.(args)
    on_change?.(args)
  }

  function onChangeHandler(event) {
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
  }

  const showStatus = getStatusState(status)

  const mainParams = {
    className: classnames(
      'dnb-checkbox',
      status && `dnb-checkbox__status--${status_state}`,
      size && `dnb-checkbox--${size}`,
      label && `dnb-checkbox--label-position-${label_position || 'right'}`,
      'dnb-form-component',
      createSkeletonClass(null, skeleton),
      createSpacingClasses(props),
      className,
      _className
    ),
  }

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

  skeletonDOMAttributes(inputParams, skeleton, context)

  // also used for code markup simulation
  validateDOMAttributes(props, inputParams)

  const statusComp = (
    <FormStatus
      show={showStatus}
      id={id + '-form-status'}
      globalStatus={globalStatus}
      label={label}
      text_id={id + '-status'} // used for "aria-describedby"
      width_selector={id + ', ' + id + '-label'}
      text={status}
      state={status_state}
      no_animation={status_no_animation}
      skeleton={skeleton}
      {...status_props}
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
            srOnly={label_sr_only}
          />
        )}

        <span className="dnb-checkbox__inner">
          <AlignmentHelper />
          {label_position === 'left' && statusComp}

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

      {(label_position === 'right' || !label_position) && statusComp}
    </span>
  )
}

export default Checkbox
