/**
 * Web Input Component
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react'
import useMountEffect from '../../shared/helpers/useMountEffect'
import clsx from 'clsx'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { ComponentMarkers } from '../../shared/helpers/withComponentMarkers'
import useId from '../../shared/helpers/useId'
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
import { extendPropsWithContext } from '../../shared/helpers/extendPropsWithContext'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import Button from '../button/Button'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import IconPrimary from '../icon-primary/IconPrimary'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'

import type {
  ButtonIconPosition,
  ButtonSize,
  ButtonVariant,
} from '../Button'
import type { FormStatusBaseProps } from '../FormStatus'
import type { IconIcon, IconSize } from '../Icon'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../space/types'

export type InputSize = 'default' | 'small' | 'medium' | 'large' | number
export type InputValue = string | number
export type InputSuffix = React.ReactNode
export type InputAlign = 'left' | 'center' | 'right'
export type InputInputAttributes = string | Record<string, unknown>
export type InputElementRenderProps = {
  className: string
  autoComplete: string
  type: string
  id: string
  disabled: boolean
  name: string
  value: string | number | null
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>
  onFocus: React.FocusEventHandler<HTMLInputElement>
  onBlur: React.FocusEventHandler<HTMLInputElement>
  [key: string]: unknown
}
export type InputInputElement =
  | React.ComponentType
  | React.ReactNode
  | ((
      params: InputElementRenderProps,
      ref: React.RefObject<HTMLInputElement | null>
    ) => React.ReactNode)
export type InputSubmitElement = React.ComponentType | React.ReactNode
export type InputSubmitButtonIcon = string | React.ReactNode
export type InputChildren = React.ReactNode

export type InputEvent<E = React.SyntheticEvent> = {
  value: string
  event: E
}

export type InputChangeEvent = InputEvent<
  React.ChangeEvent<HTMLInputElement> | React.MouseEvent
>
export type InputFocusEvent = InputEvent<
  React.FocusEvent<HTMLInputElement>
>
export type InputKeyDownEvent = InputEvent<
  React.KeyboardEvent<HTMLInputElement>
>
export type InputClearEvent = {
  value: string
  previousValue: string | number | null
  event: React.MouseEvent
}

export interface InputProps
  extends Omit<
      React.HTMLProps<HTMLInputElement>,
      | 'ref'
      | 'children'
      | 'onChange'
      | 'onKeyDown'
      | 'onSubmit'
      | 'onFocus'
      | 'onBlur'
      | 'size'
      | 'label'
      | 'placeholder'
    >,
    SpacingProps,
    FormStatusBaseProps {
  /**
   * Choose between `text`, `number`, `email`, `password`, `url`, `tel` and `search`.
   */
  type?: string
  /**
   * The sizes you can choose is `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute.
   */
  size?: InputSize
  /**
   * The content value of the input.
   */
  value?: InputValue
  id?: string
  /**
   * Prepends the Form Label component. If no ID is provided, a random ID is created.
   */
  label?: React.ReactNode
  /**
   * Use `labelDirection="vertical"` to change the label layout direction. Defaults to `horizontal`.
   */
  labelDirection?: 'vertical' | 'horizontal'
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean
  /**
   * Defines a custom visual state of the input. Use it only if you have to simulate a custom state. Currently are three statuses `virgin` , `focus` and `dirty`. Defaults to `null`.
   */
  inputState?: string
  /**
   * Defaults to `off`. Set to `on` or any of [allowed `attributes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete). Keep in mind, 1. you may have to define a `name`, 2. have the input as a descendant of a `<form>` element, 3. and have a submit button inside the form.
   */
  autocomplete?: string
  /**
   * Title attribute for the search/submit button. Only relevant when `type="search"`.
   */
  submitButtonTitle?: string
  clearButtonTitle?: string
  /**
   * The placeholder which shows up once the input value is empty.
   */
  placeholder?: React.ReactNode
  /**
   * If set to `true`, then a clear button will be shown which lets the user clear any given input value.
   */
  clear?: boolean
  /**
   * Set to `true` in case the `placeholder` has to be kept during focus. By default, the placeholder disappears on focus.
   */
  keepPlaceholder?: boolean
  /**
   * Text describing the content of the input more than the label. you can also send in a React component, so it gets wrapped inside the Input component.
   */
  suffix?: InputSuffix
  /**
   * Defines the text alignment of the input. Can be `left`, `right` or `center`. Defaults to `left`.
   */
  align?: InputAlign
  /**
   * If set to `true`, then the whole input value gets selected on the entry focus. A second click will place the cursor on the wanted position.
   */
  selectAll?: boolean
  /**
   * If set to `true`, then the input field will be 100% in `width`.
   */
  stretch?: boolean
  disabled?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  /**
   * In case we have to set a custom input class.
   */
  inputClass?: string
  /**
   * Provide the Input element with any attributes by using an Object `inputAttributes={{size:'2'}}` or a JSON Object `inputAttributes='{"size":"2"}'`. **NB:** Keep in mind, that also every not listed component property will be sent along and set as an Input element attribute.
   */
  inputAttributes?: InputInputAttributes
  /**
   * By providing a new component we can change the internally used element. Also supports a string only, like `inputElement="input"`.
   */
  inputElement?: InputInputElement
  /**
   * Icon to show before or after the input / placeholder. Can be either a string defining a primary icon or a Component using an SVG icon of either 16px or 24px.
   */
  icon?: IconIcon
  /**
   * The icon size of the icon shows. Defaults to `medium`.
   */
  iconSize?: IconSize
  /**
   * Defines the position of icon inside the input. Set to `left` or `right`. Defaults to `left` if not set.
   */
  iconPosition?: ButtonIconPosition
  /**
   * By providing a React.ref we can get the internally used input element (DOM). E.g. `ref={myRef}` by using `React.useRef()`.
   */
  ref?: React.Ref<HTMLInputElement>
  readOnly?: boolean
  /**
   * By providing a new component to be rendered inside the "shell" – we can add a freely customizable internal element. Used by the Autocomplete component.
   */
  innerElement?: React.ReactNode
  /**
   * Accepts a React element which will show up like the "submit button" would do on `type="search"`.
   */
  submitElement?: InputSubmitElement
  submitButtonVariant?: ButtonVariant
  submitButtonIcon?: InputSubmitButtonIcon
  submitButtonStatus?: string
  children?: InputChildren
  onChange?: (event: InputChangeEvent) => void
  onKeyDown?: (event: InputKeyDownEvent) => void
  onSubmit?: (event: InputEvent) => void
  onFocus?: (event: InputFocusEvent) => void
  onBlur?: (event: InputFocusEvent) => void
  onSubmitFocus?: (event: InputEvent<React.FocusEvent>) => void
  onSubmitBlur?: (event: InputEvent<React.FocusEvent>) => void
  onClear?: (event: InputClearEvent) => void
}

export interface SubmitButtonProps
  extends Omit<
      React.HTMLProps<HTMLButtonElement>,
      'ref' | 'size' | 'onSubmit'
    >,
    FormStatusBaseProps {
  id?: string
  /**
   * The content value of the input.
   */
  value?: string
  title?: string
  variant?: ButtonVariant
  /**
   * The sizes you can choose is `small`, `default`, `medium` and `large`.
   */
  size?: ButtonSize
  disabled?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  /**
   * Icon to show before or after the input / placeholder. Can be either a string defining a primary icon or a Component using an SVG icon of either 16px or 24px.
   */
  icon?: IconIcon
  /**
   * The icon size of the icon shows. Defaults to `medium`.
   */
  iconSize?: IconSize
  onSubmit?: (event: InputEvent) => void
  onSubmitFocus?: (event: InputEvent<React.FocusEvent>) => void
  onSubmitBlur?: (event: InputEvent<React.FocusEvent>) => void
}

export const inputDefaultProps = {
  type: 'text',
  size: null,
  value: 'initval',
  id: null,
  label: null,
  labelDirection: null,
  labelSrOnly: null,
  status: null,
  globalStatus: null,
  statusState: 'error',
  statusProps: null,
  statusNoAnimation: null,
  inputState: null,
  autocomplete: 'off',
  placeholder: null,
  clear: null,
  keepPlaceholder: null,
  suffix: null,
  align: null,
  selectAll: null,
  stretch: null,
  disabled: null,
  skeleton: null,
  inputClass: null,
  inputAttributes: null,
  inputElement: null,
  ref: null,
  icon: null,
  iconSize: null,
  iconPosition: 'left',
  readOnly: false,
  innerElement: null,

  // Submit button
  submitElement: null,
  submitButtonTitle: null,
  clearButtonTitle: null,
  submitButtonVariant: 'secondary',
  submitButtonIcon: 'loupe',
  submitButtonStatus: null,

  className: null,
  children: null,

  onChange: null,
  onKeyDown: null,
  onSubmit: null,
  onFocus: null,
  onBlur: null,
  onSubmitFocus: null,
  onSubmitBlur: null,
  onClear: null,
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

  const combinedRef = useCallback(
    (instance: HTMLInputElement | null) => {
      inputRef.current = instance

      if (typeof ref === 'function') {
        ref(instance)
      } else if (ref) {
        ref.current = instance
      }
    },
    [ref]
  )

  const formElement = context?.formElement as
    | (typeof context.formElement & { useId?: () => string })
    | undefined

  const _id = useId(restProps.id || formElement?.useId?.())

  const selectAllTimeoutRef =
    useRef<ReturnType<typeof setTimeout>>(undefined)

  // getDerivedStateFromProps equivalent
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
  // Setter intentionally unused — calling setFocusState triggers re-renders
  // that break timing-sensitive consumers (e.g. Autocomplete blur handling).
  // The focusState is only read in the placeholder visibility check below.
  const [focusState, _setFocusState] = useState<string | undefined>(
    undefined
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

  // getDerivedStateFromProps: sync value from props
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
    if (restProps.clear && restProps.iconPosition === 'right') {
      warn('You cannot have a clear button and iconPosition="right"')
    }

    return () => {
      clearTimeout(selectAllTimeoutRef.current)
    }
  })

  const onFocusHandler = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
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
            warn(e)
          }
        }, 1) // safari needs a delay
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.selectAll, props.onFocus]
  )

  const onBlurHandler = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
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
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
    (event: React.KeyboardEvent<HTMLInputElement>) => {
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
    (event: React.MouseEvent) => {
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
    clear,
    keepPlaceholder,
    suffix,
    align,
    inputClass,
    submitButtonTitle,
    clearButtonTitle,
    submitButtonVariant,
    submitButtonIcon,
    submitButtonStatus,
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
    inputElement: _input_element, //eslint-disable-line
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
  const hasSubmitButton =
    submitElement || (submitElement !== false && type === 'search')
  const hasVal = hasValue(value)

  const usedIconSize =
    size === 'large' && (iconSize === 'default' || !iconSize)
      ? 'medium'
      : iconSize

  const mainParams = {
    className: clsx(
      'dnb-input',
      'dnb-input__border--tokens',
      type && `dnb-input--${type}`,
      size && !sizeIsNumber && `dnb-input--${size}`,
      hasSubmitButton && 'dnb-input--has-submit-element',
      innerElement && 'dnb-input--has-inner-element',
      clear && 'dnb-input--has-clear-button',
      align && `dnb-input__align--${align}`,
      status && `dnb-input__status--${statusState}`,
      disabled && 'dnb-input--disabled',
      icon && `dnb-input--icon-position-${iconPosition}`,
      icon && 'dnb-input--has-icon',
      icon && usedIconSize && `dnb-input--icon-size-${usedIconSize}`,
      labelDirection && `dnb-input--${labelDirection}`,
      stretch && `dnb-input--stretch`,
      keepPlaceholder && 'dnb-input--keep-placeholder',
      'dnb-form-component',
      createSpacingClasses(props),
      className
    ),
    'data-input-state': usedInputState,
    'data-has-content': hasVal ? 'true' : 'false',
  }

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
    className: clsx('dnb-input__input', inputClass),
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
      hasSubmitButton && !submitElement ? id + '-submit-button' : null,
      showStatus ? id + '-status' : null,
      suffix ? id + '-suffix' : null
    )
  }
  if (readOnly) {
    inputParams['aria-readonly'] = inputParams.readOnly = true
  }

  const shellParams = {
    className: clsx(
      'dnb-input__shell',
      'dnb-input__border',
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
        ref: React.RefObject<HTMLInputElement | null>
      ) => React.ReactNode
    )({ ...inputParams, value }, inputRef)
  } else if (!InputElement && _input_element) {
    InputElement = _input_element
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

        <span className="dnb-input__row">
          <span {...shellParams}>
            {(InputElement as React.ReactNode) || (
              <input ref={combinedRef} {...inputParams} />
            )}

            {innerElement && (
              <span className="dnb-input__inner__element dnb-p">
                {innerElement}
              </span>
            )}

            {icon && (
              <InputIcon
                className="dnb-input__icon"
                icon={icon}
                size={usedIconSize}
              />
            )}

            {!hasVal && placeholder && focusState !== 'focus' && (
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

            {clear && iconPosition !== 'right' && (
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
              {submitElement ? (
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
                  iconSize={
                    size === 'medium' || size === 'large'
                      ? 'medium'
                      : 'default'
                  }
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

const inputSubmitButtonDefaultProps = {
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
}: SubmitButtonProps & {
  value?: string
  attributes?: Record<string, unknown>
  tooltip?: React.ReactNode
  ref?: React.Ref<HTMLElement>
}) {
  const context = useContext(Context)
  const buttonRef = useRef<HTMLElement | null>(null)

  const combinedButtonRef = useCallback(
    (instance: HTMLElement | null) => {
      buttonRef.current = instance

      if (typeof ref === 'function') {
        ref(instance)
      } else if (ref) {
        ref.current = instance
      }
    },
    [ref]
  )

  const [focusState, setFocusState] = useState('virgin')

  const props = {
    ...inputSubmitButtonDefaultProps,
    ...removeUndefinedProps({ ...ownProps }),
  }

  const onSubmitFocusHandler = useCallback(
    (event: React.FocusEvent) => {
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
    (event: React.FocusEvent) => {
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
    (event: React.MouseEvent) => {
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

type InputIconProps = React.ComponentProps<typeof IconPrimary>

// We memoize by type, in case we send in a ProgressIndicator (Autocomplete)
const InputIcon = React.memo(
  (props: InputIconProps) => <IconPrimary {...props} />,
  ({ icon: prev }: InputIconProps, { icon: next }: InputIconProps) => {
    // Memoize string icons when they are the same
    if (typeof prev === 'string' && typeof next === 'string') {
      return prev === next
    }

    // Check if it's a ProgressIndicator (React element)
    const isProgressIndicator = (icon: unknown) => {
      if (!React.isValidElement(icon)) {
        return false // stop here
      }

      const type = icon.type as { displayName?: string; name?: string }

      return (
        type?.displayName === 'ProgressIndicator' ||
        type?.name === 'ProgressIndicator'
      )
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

type InputComponentType = ((props: InputProps) => React.JSX.Element) & {
  getValue: typeof getValue
  hasValue: typeof hasValue
} & ComponentMarkers

const MemoizedInputComponent = React.memo(InputComponent)

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
