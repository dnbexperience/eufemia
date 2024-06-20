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
import FormStatus from '../form-status/FormStatus'
import { SwitchProps } from './types'
import { convertSnakeCaseProps } from '../../shared/helpers/withSnakeCaseProps'
import useId from '../../shared/helpers/useId'

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

  const isFn = typeof innerRefProp === 'function'
  const refHook = useRef<HTMLInputElement>()
  const innerRef = (!isFn && innerRefProp) || refHook

  useEffect(() => {
    if (isFn) {
      innerRefProp?.(refHook.current)
    }
  }, [innerRefProp, isFn, refHook])

  const id = useId(idProp)

  const [isChecked, setIsChecked] = useState(checkedProp ?? false)
  const [prevChecked, setPrevChecked] = useState(checkedProp)

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
        case 'Enter': // test
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
  // also used for code markup simulation
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
