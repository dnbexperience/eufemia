/**
 * Web Input Component
 */

import {
  isValidElement,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type {
  ChangeEvent,
  ComponentProps,
  FocusEvent,
  JSX,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  Ref,
  RefObject,
} from 'react'
import { clsx } from 'clsx'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import useMountEffect from '../../shared/helpers/useMountEffect'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { extendPropsWithContext } from '../../shared/helpers/extendPropsWithContext'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import useId from '../../shared/helpers/useId'
import Suffix from '../../shared/helpers/Suffix'
import {
  warn,
  removeUndefinedProps,
  validateDOMAttributes,
  processChildren,
  getStatusState,
  combineDescribedBy,
  dispatchCustomElementEvent,
  convertJsxToString,
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { useSpacing } from '../space/SpacingUtils'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import Button from '../button/Button'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import IconPrimary from '../icon-primary/IconPrimary'
import Context from '../../shared/Context'

import type { ComponentMarkers } from '../../shared/helpers/withComponentMarkers'
import type { ButtonVariant } from '../Button'
import type {
  InputElementRenderProps,
  InputProps,
  InputSubmitButtonProps,
} from './types'

export type * from './types'

export const inputDefaultProps: Partial<InputProps> = {
  type: 'text',
  value: 'initval',
  labelDirection: 'vertical',
  statusState: 'error',
  autocomplete: 'off',
  iconPosition: 'left',
  readOnly: false,
  submitButtonVariant: 'secondary',
  submitButtonIcon: 'loupe',
}

function hasValue(value: string | number | null | undefined) {
  return (
    ((typeof value === 'string' || typeof value === 'number') &&
      String(value).length > 0) ||
    false
  )
}

function getValue(props: InputProps) {
  const value = processChildren(props)
  if (value === '' || hasValue(value)) {
    return value
  }
  return props.value
}

function InputComponent({ ref, ...restProps }: InputProps) {
  const context = useContext(Context)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const combinedRef = useCombinedRef(ref, inputRef)

  const formElement = context?.formElement as
    | (typeof context.formElement & { useId?: () => string })
    | undefined

  const _id = useId(restProps.id || formElement?.useId?.())

  const selectAllTimeoutRef =
    useRef<ReturnType<typeof setTimeout>>(undefined)

  const initialValue = useMemo(() => {
    const v = getValue(restProps)
    if (v !== 'initval' && hasValue(v as string)) {
      return v
    }
    return null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [value, setValue] = useState<string | number | null>(
    initialValue as string | number | null
  )
  const [inputState, setInputState] = useState(
    restProps.inputState || 'virgin'
  )
  const prevValuePropRef = useRef<string | number | null | undefined>(
    restProps.value
  )

  // use only the props from context, who are available here anyway
  const props = extendPropsWithContext(
    {
      ...inputDefaultProps,
      ...removeUndefinedProps({ ...restProps }),
    },
    inputDefaultProps,
    { skeleton: context?.skeleton },
    context.getTranslation(restProps).Input,
    pickFormElementProps(context?.formElement),
    context.Input
  )

  // Sync value from props
  const propValue = getValue(restProps)
  if (
    propValue !== 'initval' &&
    propValue !== value &&
    propValue !== prevValuePropRef.current
  ) {
    setValue(propValue as string | number | null)
  }
  prevValuePropRef.current = restProps.value

  if (restProps.inputState && restProps.inputState !== inputState) {
    setInputState(restProps.inputState)
  }

  // Update input DOM value
  const updateInputValue = useCallback(() => {
    if (inputRef.current && !restProps.inputElement) {
      const hasVal = hasValue(value)
      const newValue = hasVal ? String(value) : ''
      if (inputRef.current.value !== newValue) {
        inputRef.current.value = newValue
      }
    }
  }, [value, restProps.inputElement])

  // No dependency array — must run after every render because the <input>
  // is uncontrolled (no `value` prop). External code (e.g. formElement.reset(),
  // Autocomplete's delayed value sync) can mutate the DOM value, and this
  // effect re-applies the React state to keep them in sync.
  useEffect(() => {
    updateInputValue()
  })

  useMountEffect(() => {
    if (restProps.showClearButton && restProps.iconPosition === 'right') {
      warn('You cannot have a clear button and iconPosition="right"')
    }

    return () => {
      clearTimeout(selectAllTimeoutRef.current)
    }
  })

  const onFocusHandler = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const { value: eventValue } = event.target
      setInputState('focus')

      dispatchCustomElementEvent(props, 'onFocus', {
        value: eventValue,
        event,
      })

      if (props.selectAll && inputRef.current) {
        clearTimeout(selectAllTimeoutRef.current)
        selectAllTimeoutRef.current = setTimeout(() => {
          try {
            inputRef.current.select()
          } catch (e) {
            warn('Input: Failed to select all text:', e)
          }
        }, 1) // safari needs a delay
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.selectAll, props.onFocus]
  )

  const onBlurHandler = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const { value: eventValue } = event.target
      const result = dispatchCustomElementEvent(props, 'onBlur', {
        value: eventValue,
        event,
      })
      if (result !== false) {
        setInputState(
          hasValue(eventValue) &&
            eventValue !== String(prevValuePropRef.current)
            ? 'dirty'
            : 'initial'
        )
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onBlur]
  )

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value: eventValue } = event.target
      const result = dispatchCustomElementEvent(props, 'onChange', {
        value: eventValue,
        event,
      })
      if (result === false) {
        updateInputValue()
        return // stop here
      }
      if (typeof result === 'string') {
        setValue(result)
      } else {
        setValue(eventValue)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onChange, updateInputValue]
  )

  const onKeyDownHandler = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const eventValue = (event.target as HTMLInputElement).value
      dispatchCustomElementEvent(props, 'onKeyDown', {
        value: eventValue,
        event,
      })
      if (event.key === 'Enter') {
        dispatchCustomElementEvent(props, 'onSubmit', {
          value: eventValue,
          event,
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onKeyDown, props.onSubmit]
  )

  const clearValueHandler = useCallback(
    (event: MouseEvent) => {
      const previousValue = value
      const clearedValue = ''
      setValue(clearedValue)
      dispatchCustomElementEvent(props, 'onChange', {
        value: clearedValue,
        event,
      })
      dispatchCustomElementEvent(props, 'onClear', {
        value: clearedValue,
        previousValue,
        event,
      })
      inputRef.current.focus({ preventScroll: true })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, props.onChange, props.onClear]
  )

  const {
    type,
    size,
    label,
    labelDirection,
    labelSrOnly,
    status,
    globalStatus,
    statusState,
    statusProps,
    statusNoAnimation,
    disabled,
    skeleton,
    placeholder,
    showClearButton,
    keepPlaceholder,
    _omitInputShellClass,
    suffix,
    align,
    inputClassName,
    submitButtonTitle,
    clearButtonTitle,
    submitButtonVariant,
    submitButtonIcon,
    submitButtonStatus,
    showSubmitButton,
    submitElement,
    innerElement,
    autocomplete,
    readOnly,
    stretch,
    inputAttributes,
    icon,
    iconPosition,
    iconSize,
    className,

    id: _id_unused, //eslint-disable-line
    children, //eslint-disable-line
    value: _value, //eslint-disable-line
    selectAll, //eslint-disable-line
    inputElement: _inputElement, //eslint-disable-line
    ref: _ref, //eslint-disable-line
    inputState: _inputState, //eslint-disable-line

    onSubmit, //eslint-disable-line
    onClear, //eslint-disable-line

    ...inputSubmitButtonAttributes
  } = props

  const {
    onSubmitBlur, //eslint-disable-line
    onSubmitFocus, //eslint-disable-line
    ...attributes
  } = inputSubmitButtonAttributes

  let usedInputState = inputState
  if (disabled || skeleton) {
    usedInputState = 'disabled'
  }
  const sizeIsNumber = parseFloat(size) > 0

  const id = _id
  const showStatus = getStatusState(status)
  const showDefaultSubmitButton = type === 'search' && showSubmitButton
  const hasCustomSubmitElement = Boolean(submitElement)
  const hasSubmitButton = showDefaultSubmitButton || hasCustomSubmitElement
  const hasVal = hasValue(value)
  const usedIcon =
    icon || (type === 'search' && !hasSubmitButton ? 'loupe' : null)

  const usedIconSize =
    size === 'large' && (iconSize === 'default' || !iconSize)
      ? 'medium'
      : iconSize

  const mainParams = useSpacing(props, {
    className: clsx(
      'dnb-input',
      'dnb-input__border--tokens',
      type && `dnb-input--${type}`,
      size && !sizeIsNumber && `dnb-input--${size}`,
      hasSubmitButton && 'dnb-input--has-submit-element',
      innerElement && 'dnb-input--has-inner-element',
      showClearButton && 'dnb-input--has-clear-button',
      align && `dnb-input__align--${align}`,
      status && `dnb-input__status--${statusState}`,
      disabled && 'dnb-input--disabled',
      usedIcon && `dnb-input--icon-position-${iconPosition}`,
      usedIcon && 'dnb-input--has-icon',
      usedIcon && usedIconSize && `dnb-input--icon-size-${usedIconSize}`,
      labelDirection && `dnb-input--${labelDirection}`,
      stretch && `dnb-input--stretch`,
      keepPlaceholder && 'dnb-input--keep-placeholder',
      'dnb-form-component',
      className
    ),
    'data-input-state': usedInputState,
    'data-has-content': hasVal ? 'true' : 'false',
  })

  const innerParams = {
    className: 'dnb-input__inner',
  }

  // pass along all props we wish to have as params
  let { inputElement: InputElement } = props

  const usedInputAttributes = inputAttributes
    ? typeof inputAttributes === 'string'
      ? JSON.parse(inputAttributes)
      : inputAttributes
    : {}

  const inputParams = {
    className: clsx('dnb-input__input', inputClassName),
    autoComplete: autocomplete,
    type,
    id,
    disabled: disabled,
    name: id,
    'aria-placeholder': placeholder
      ? convertJsxToString(placeholder)
      : undefined,
    ...attributes,
    ...usedInputAttributes,
    onChange: onChangeHandler,
    onKeyDown: onKeyDownHandler,
    onFocus: onFocusHandler,
    onBlur: onBlurHandler,
  }

  // aria-placeholder is only valid on textbox and searchbox roles
  if (
    inputParams['role'] &&
    inputParams['role'] !== 'textbox' &&
    inputParams['role'] !== 'searchbox'
  ) {
    delete inputParams['aria-placeholder']
  }

  if (sizeIsNumber) {
    inputParams.size = size
  }

  // we may consider using: aria-details
  if (showStatus || suffix || hasSubmitButton) {
    inputParams['aria-describedby'] = combineDescribedBy(
      inputParams,
      showDefaultSubmitButton ? id + '-submit-button' : null,
      showStatus ? id + '-status' : null,
      suffix ? id + '-suffix' : null
    )
  }
  if (readOnly) {
    inputParams['aria-readonly'] = inputParams.readOnly = true
  }

  const shellParams = {
    className: clsx(
      !_omitInputShellClass && 'dnb-input__shell',
      !_omitInputShellClass && 'dnb-input__border',
      createSkeletonClass('shape', skeleton, context)
    ),
  }

  skeletonDOMAttributes(inputParams, skeleton, context)

  // also used for code markup simulation
  validateDOMAttributes(restProps, inputParams)
  validateDOMAttributes(null, shellParams)

  if (InputElement && typeof InputElement === 'function') {
    InputElement = (
      InputElement as (
        params: InputElementRenderProps,
        ref: RefObject<HTMLInputElement | null>
      ) => ReactNode
    )({ ...inputParams, value }, inputRef)
  } else if (!InputElement && _inputElement) {
    InputElement = _inputElement
  }

  return (
    <span {...mainParams}>
      {label && (
        <FormLabel
          id={id + '-label'}
          forId={id}
          text={label}
          labelDirection={labelDirection}
          srOnly={labelSrOnly}
          disabled={disabled}
          skeleton={skeleton}
        />
      )}

      <span {...innerParams}>
        <AlignmentHelper />

        <FormStatus
          show={showStatus}
          id={id + '-form-status'}
          globalStatus={globalStatus}
          label={label}
          text={status}
          state={statusState}
          textId={id + '-status'} // used for "aria-describedby"
          noAnimation={statusNoAnimation}
          skeleton={skeleton}
          {...statusProps}
        />

        <span className="dnb-input__row dnb-indicator-border-glow__target dnb-indicator-border-glow__target--row">
          <span {...shellParams}>
            {(InputElement as ReactNode) || (
              <input ref={combinedRef} {...inputParams} />
            )}

            {innerElement && (
              <span className="dnb-input__inner__element dnb-p">
                {innerElement}
              </span>
            )}

            {usedIcon && (
              <InputIcon
                className="dnb-input__icon"
                icon={usedIcon}
                size={usedIconSize}
              />
            )}

            {!hasVal && placeholder && (
              <span
                id={id + '-placeholder'}
                className={clsx(
                  'dnb-input__placeholder',
                  align ? `dnb-input__align--${align}` : null
                )}
                role="presentation"
                aria-hidden
              >
                {placeholder}
              </span>
            )}

            {showClearButton && iconPosition !== 'right' && (
              <span className="dnb-input--clear dnb-input__submit-element">
                <InputSubmitButton
                  aria-hidden={!hasVal}
                  attributes={{ className: 'dnb-input__clear-button' }}
                  id={id + '-clear-button'}
                  type="button"
                  variant="tertiary"
                  aria-controls={id}
                  aria-label={clearButtonTitle}
                  tooltip={hasVal && clearButtonTitle}
                  icon="close"
                  iconSize={size === 'small' ? 'small' : undefined}
                  skeleton={skeleton}
                  disabled={disabled || !hasVal}
                  onClick={clearValueHandler}
                />
              </span>
            )}
          </span>
          {hasSubmitButton && (
            <span className="dnb-input__submit-element">
              {hasCustomSubmitElement ? (
                submitElement
              ) : (
                <InputSubmitButton
                  {...inputSubmitButtonAttributes}
                  id={id + '-submit-button'}
                  value={hasVal ? value : ''}
                  icon={submitButtonIcon}
                  status={
                    submitButtonStatus || status ? statusState : null
                  }
                  statusState={statusState}
                  iconSize={size === 'large' ? 'medium' : 'default'}
                  title={submitButtonTitle}
                  variant={submitButtonVariant}
                  disabled={disabled}
                  skeleton={skeleton}
                  size={size}
                  onSubmit={onSubmit}
                  {...statusProps}
                />
              )}
            </span>
          )}
          {suffix && (
            <Suffix
              className="dnb-input__suffix"
              id={id + '-suffix'} // used for "aria-describedby"
              context={props}
            >
              {suffix}
            </Suffix>
          )}
        </span>
      </span>
    </span>
  )
}

const inputSubmitButtonDefaultProps: Partial<InputSubmitButtonProps> = {
  id: null,
  value: null,
  title: null,
  disabled: false,
  skeleton: false,
  variant: 'secondary',
  icon: 'loupe',
  iconSize: null,
  status: null,
  statusState: 'error',
  statusProps: null,
  className: null,

  onSubmit: null,
  onSubmitFocus: null,
  onSubmitBlur: null,
}

function InputSubmitButton({
  ref,
  ...ownProps
}: InputSubmitButtonProps & {
  value?: string
  attributes?: Record<string, unknown>
  tooltip?: ReactNode
  ref?: Ref<HTMLElement>
}) {
  const context = useContext(Context)
  const buttonRef = useRef<HTMLElement | null>(null)
  const combinedButtonRef = useCombinedRef(ref, buttonRef)

  const [focusState, setFocusState] = useState('virgin')

  const props = {
    ...inputSubmitButtonDefaultProps,
    ...removeUndefinedProps({ ...ownProps }),
  }

  const onSubmitFocusHandler = useCallback(
    (event: FocusEvent) => {
      const submitValue = props.value
      setFocusState('focus')
      dispatchCustomElementEvent(props, 'onSubmitFocus', {
        value: submitValue,
        event,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.value, props.onSubmitFocus]
  )

  const onSubmitBlurHandler = useCallback(
    (event: FocusEvent) => {
      const submitValue = props.value
      setFocusState('dirty')
      dispatchCustomElementEvent(props, 'onSubmitBlur', {
        value: submitValue,
        event,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.value, props.onSubmitBlur]
  )

  const onSubmitHandler = useCallback(
    (event: MouseEvent) => {
      const submitValue = props.value
      dispatchCustomElementEvent(props, 'onSubmit', {
        value: submitValue,
        event,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.value, props.onSubmit]
  )

  const {
    id,
    title,
    disabled,
    skeleton,
    variant,
    icon,
    iconSize,
    status,
    statusState,
    statusProps,
    className,

    onSubmitBlur: _onSubmitBlur, //eslint-disable-line
    onSubmitFocus: _onSubmitFocus, //eslint-disable-line

    ...rest
  } = props

  const params = {
    id,
    type: 'submit',
    'aria-label': title,
    disabled,
    ...rest,
  }

  skeletonDOMAttributes(
    params as Record<string, unknown>,
    skeleton,
    context
  )

  // also used for code markup simulation
  validateDOMAttributes(ownProps, params)

  return (
    <span
      className="dnb-input__submit-button"
      data-input-state={focusState}
    >
      <Button
        className={clsx(
          'dnb-input__submit-button__button',
          'dnb-button--input-button',
          className
        )}
        variant={variant as ButtonVariant}
        icon={icon}
        iconSize={iconSize}
        status={status}
        statusState={statusState}
        onClick={onSubmitHandler}
        onFocus={onSubmitFocusHandler}
        onBlur={onSubmitBlurHandler}
        ref={combinedButtonRef}
        {...(params as Record<string, unknown>)}
        {...(statusProps as Record<string, unknown>)}
      />
    </span>
  )
}

export { InputSubmitButton as SubmitButton }

type InputIconProps = ComponentProps<typeof IconPrimary>

// We memoize by type, in case we send in a ProgressIndicator (Autocomplete)
const InputIcon = memo(
  (props: InputIconProps) => <IconPrimary {...props} />,
  ({ icon: prev }: InputIconProps, { icon: next }: InputIconProps) => {
    // Memoize string icons when they are the same
    if (typeof prev === 'string' && typeof next === 'string') {
      return prev === next
    }

    // Check if it's a ProgressIndicator (React element)
    const isProgressIndicator = (icon: unknown) => {
      if (!isValidElement(icon)) {
        return false // stop here
      }

      const type = icon.type as { displayName?: string; name?: string }

      return type?.displayName === 'ProgressIndicator'
    }

    // Only memoize if both are ProgressIndicators and types match
    if (isProgressIndicator(prev) && isProgressIndicator(next)) {
      return typeof prev === typeof next
    }

    // For all other icons, don't memoize (always re-render)
    return false
  }
)
InputIcon.displayName = 'InputIcon'

type InputComponentType = ((props: InputProps) => JSX.Element) & {
  getValue: typeof getValue
  hasValue: typeof hasValue
} & ComponentMarkers

const MemoizedInputComponent = memo(InputComponent)

const Input: InputComponentType = Object.assign(
  function Input(props: InputProps) {
    return <MemoizedInputComponent {...props} />
  },
  {
    getValue,
    hasValue,
  }
)

withComponentMarkers(Input, {
  _formElement: true,
  _supportsSpacingProps: true,
})

export default Input
