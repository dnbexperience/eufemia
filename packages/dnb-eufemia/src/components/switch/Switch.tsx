import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import type { KeyboardEvent, MouseEvent, MouseEventHandler } from 'react'
import { clsx } from 'clsx'
import {
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { useSpacing } from '../space/SpacingUtils'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import useId from '../../shared/helpers/useId'
import { check as CheckIcon } from '../../icons'
import type { SwitchProps } from './types'

export * from './types'

const switchDefaultProps: Partial<SwitchProps> = {
  statusState: 'error',
}

function Switch(props: SwitchProps) {
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
    onClick,
    ref: refProp,
    ...rest
  } = allProps

  const [, forceUpdate] = useReducer(() => ({}), {})
  const id = useId(idProp)
  const isFn = typeof refProp === 'function'
  const refHook = useRef<HTMLInputElement>(undefined)
  const inputRef = (!isFn && refProp) || refHook

  const preventChangeRef = useRef(false)
  const isCheckedRef = useRef(checkedProp ?? false)
  const prevCheckedRef = useRef(checkedProp)

  useEffect(() => {
    if (isFn) {
      refProp?.(refHook.current)
    }
  }, [refProp, isFn, refHook])

  useEffect(() => {
    if (checkedProp !== prevCheckedRef.current) {
      isCheckedRef.current = !!checkedProp
      prevCheckedRef.current = !!checkedProp
      forceUpdate()
    }
  }, [checkedProp])

  const callOnChange = useCallback(
    ({ checked, event }) => {
      onChange?.({ checked, event })
    },
    [onChange]
  )

  const onChangeHandler = useCallback(
    (event) => {
      if (preventChangeRef.current) {
        preventChangeRef.current = false

        // Revert the checked state that was toggled by the browser's
        // activation behavior, since the change is being prevented
        if (inputRef.current) {
          inputRef.current.checked = isCheckedRef.current
        }

        return // stop here
      }

      const updatedChecked = !isCheckedRef.current

      isCheckedRef.current = updatedChecked
      forceUpdate()
      callOnChange({ checked: updatedChecked, event })

      if (onChangeEnd) {
        setTimeout(
          () => onChangeEnd({ checked: updatedChecked, event }),
          500
        )
      }

      // help firefox and safari to have a correct state after a click
      if (inputRef.current) {
        inputRef.current.focus()
      }
    },
    [callOnChange, inputRef, onChangeEnd]
  )

  const onClickHandler: MouseEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      preventChangeRef.current = false

      const preventDefault = () => {
        preventChangeRef.current = true
      }

      if (readOnly) {
        preventChangeRef.current = true
        return // stop here
      }

      onClick?.({
        checked: isCheckedRef.current,
        event,
        ...event,
        preventDefault,
      })
    },
    [onClick, readOnly]
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

  const showStatus = useMemo(() => getStatusState(status), [status])

  const mainParams = useSpacing(props, {
    className: clsx(
      'dnb-switch',
      size && `dnb-switch--${size}`,
      status && `dnb-switch__status--${statusState}`,
      context?.theme?.surface === 'dark' && 'dnb-switch--surface-dark',
      `dnb-switch--label-position-${labelPosition || 'right'}`,
      'dnb-form-component',
      createSkeletonClass(null, skeleton),
      className
    ),
  })

  const inputParams = {
    disabled,
    checked: isCheckedRef.current,
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

  const helperParams = useMemo(
    () => ({
      onMouseDown: (e: MouseEvent<HTMLSpanElement>) => e.preventDefault(),
    }),
    []
  )

  const labelComp = useMemo(
    () =>
      label && (
        <FormLabel
          id={id + '-label'}
          forId={id}
          text={label}
          disabled={disabled}
          skeleton={skeleton}
          srOnly={labelSrOnly}
          vertical={false}
        />
      ),
    [disabled, id, label, labelSrOnly, skeleton]
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
            textId={id + '-status'} // used for "aria-describedby"
            widthSelector={id + ', ' + id + '-label'}
            text={status}
            state={statusState}
            skeleton={skeleton}
            noAnimation={statusNoAnimation}
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
                aria-checked={isCheckedRef.current}
                className="dnb-switch__input"
                value={isCheckedRef.current ? value || '' : ''}
                ref={inputRef}
                {...inputParams}
                onChange={onChangeHandler}
                onClick={onClickHandler}
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
                className={clsx(
                  'dnb-switch__button',
                  createSkeletonClass('shape', skeleton, context)
                )}
                aria-hidden
              >
                {isCheckedRef.current && (
                  <CheckIcon className="dnb-switch__icon" />
                )}
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
      props,
      switchDefaultProps,
      { skeleton: context?.skeleton },
      pickFormElementProps(context?.formElement),
      context.Switch
    )
  }
}

withComponentMarkers(Switch, {
  _formElement: true,
})

export default Switch
