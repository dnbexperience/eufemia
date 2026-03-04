/**
 * Web Input Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import clsx from 'clsx'
import {
  warn,
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  processChildren,
  getStatusState,
  combineDescribedBy,
  dispatchCustomElementEvent,
  convertJsxToString,
} from '../../shared/component-helper'
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
export type InputSuffix = string | React.ReactNode
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
  className?: string
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
  className?: string
  onSubmit?: (event: InputEvent) => void
  onSubmitFocus?: (event: InputEvent<React.FocusEvent>) => void
  onSubmitBlur?: (event: InputEvent<React.FocusEvent>) => void
}

interface InputComponentState {
  inputState: string
  value: string | number | null
  _value: string | number | null
  focusState?: string
}

export class InputClass extends React.PureComponent<
  InputProps,
  InputComponentState
> {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  _ref: React.RefObject<HTMLInputElement | null>
  _id: string
  _selectAllTimeout: ReturnType<typeof setTimeout> | undefined

  static defaultProps = {
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

  static getDerivedStateFromProps(
    props: InputProps,
    state: InputComponentState
  ) {
    const value = InputClass.getValue(props)
    if (
      value !== 'initval' &&
      value !== state.value &&
      value !== state._value
    ) {
      state.value = value
    }
    if (props.inputState) {
      state.inputState = props.inputState
    }
    state._value = props.value
    return state
  }

  static hasValue(value: string | number | null | undefined) {
    return (
      ((typeof value === 'string' || typeof value === 'number') &&
        String(value).length > 0) ||
      false
    )
  }

  static getValue(props: InputProps) {
    const value = processChildren(props)
    if (value === '' || InputClass.hasValue(value)) {
      return value
    }
    return props.value
  }

  state: InputComponentState = {
    inputState: 'virgin',
    value: null,
    _value: null,
    focusState: undefined,
  }

  constructor(
    props: InputProps,
    context: React.ContextType<typeof Context>
  ) {
    super(props)

    this._ref = React.createRef()

    const formElement = context?.formElement as
      | (typeof context.formElement & { useId?: () => string })
      | undefined

    this._id = props.id || formElement?.useId?.() || makeUniqueId() // cause we need an id anyway

    if (props.clear && props.iconPosition === 'right') {
      warn('You cannot have a clear button and iconPosition="right"')
    }

    // make sure we trigger getDerivedStateFromProps on startup
  }
  componentWillUnmount() {
    clearTimeout(this._selectAllTimeout)
  }
  componentDidMount() {
    this.updateInputValue()
  }
  componentDidUpdate() {
    this.updateInputValue()
  }
  updateInputValue = () => {
    // Only update the input value if it's not a custom inputElement.
    // The custom inputElement will handle the value.
    // This is used in the InputMasked component.
    if (this._ref.current && !this.props.inputElement) {
      const value = this.state.value
      const hasValue = InputClass.hasValue(value)
      this._ref.current.value = hasValue ? String(value) : ''
    }
  }
  onFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target
    this.setState({
      inputState: 'focus',
    })

    dispatchCustomElementEvent(this, 'onFocus', { value, event })

    if (this.props.selectAll && this._ref.current) {
      clearTimeout(this._selectAllTimeout)
      this._selectAllTimeout = setTimeout(() => {
        try {
          this._ref.current.select()
        } catch (e) {
          warn(e)
        }
      }, 1) // safari needs a delay
    }
  }
  onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target
    const result = dispatchCustomElementEvent(this, 'onBlur', {
      value,
      event,
    })
    if (result !== false) {
      this.setState({
        inputState:
          InputClass.hasValue(value) && value !== this.state._value
            ? 'dirty'
            : 'initial',
      })
    }
  }
  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const result = dispatchCustomElementEvent(this, 'onChange', {
      value,
      event,
    })
    if (result === false) {
      this.updateInputValue()
      return // stop here
    }
    if (typeof result === 'string') {
      this.setState({ value: result })
    } else {
      this.setState({ value })
    }
  }
  onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value
    dispatchCustomElementEvent(this, 'onKeyDown', { value, event })
    if (event.key === 'Enter') {
      dispatchCustomElementEvent(this, 'onSubmit', { value, event })
    }
  }
  clearValue = (event: React.MouseEvent) => {
    const previousValue = this.state.value
    const value = ''
    this.setState({ value })
    dispatchCustomElementEvent(this, 'onChange', { value, event })
    dispatchCustomElementEvent(this, 'onClear', {
      value,
      previousValue,
      event,
    })
    this._ref.current.focus({ preventScroll: true })
  }
  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      InputClass.defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.getTranslation(this.props).Input,
      pickFormElementProps(this.context?.formElement),
      this.context.Input
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

      id: _id, //eslint-disable-line
      children, //eslint-disable-line
      value: _value, //eslint-disable-line
      selectAll, //eslint-disable-line
      inputElement: _input_element, //eslint-disable-line
      ref: _ref, //eslint-disable-line
      inputState: _inputState, //eslint-disable-line

      onSubmit, //eslint-disable-line
      onClear, //eslint-disable-line

      ...inputSubmitButtonAttributes
    } = props as Record<string, any>

    const {
      onSubmitBlur, //eslint-disable-line
      onSubmitFocus, //eslint-disable-line
      ...attributes
    } = inputSubmitButtonAttributes

    const { value, focusState } = this.state
    let { inputState } = this.state

    if (disabled || skeleton) {
      inputState = 'disabled'
    }
    const sizeIsNumber = parseFloat(size) > 0

    const id = this._id
    const showStatus = getStatusState(status)
    const hasSubmitButton =
      submitElement || (submitElement !== false && type === 'search')
    const hasValue = InputClass.hasValue(value)

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
      'data-input-state': inputState,
      'data-has-content': hasValue ? 'true' : 'false',
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
      onChange: this.onChangeHandler,
      onKeyDown: this.onKeyDownHandler,
      onFocus: this.onFocusHandler,
      onBlur: this.onBlurHandler,
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
        createSkeletonClass('shape', skeleton, this.context)
      ),
    }

    skeletonDOMAttributes(inputParams, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, inputParams)
    validateDOMAttributes(null, shellParams)

    if (InputElement && typeof InputElement === 'function') {
      InputElement = (
        InputElement as (
          params: InputElementRenderProps,
          ref: React.RefObject<HTMLInputElement | null>
        ) => React.ReactNode
      )({ ...inputParams, value }, this._ref)
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
                <input ref={this._ref} {...inputParams} />
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

              {!hasValue && placeholder && focusState !== 'focus' && (
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
                    aria-hidden={!hasValue}
                    attributes={{ className: 'dnb-input__clear-button' }}
                    id={id + '-clear-button'}
                    type="button"
                    variant="tertiary"
                    aria-controls={id}
                    aria-label={clearButtonTitle}
                    tooltip={hasValue && clearButtonTitle}
                    icon="close"
                    iconSize={size === 'small' ? 'small' : undefined}
                    skeleton={skeleton}
                    disabled={disabled || !hasValue}
                    onClick={this.clearValue}
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
                    value={hasValue ? value : ''}
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
}

interface InputSubmitButtonState {
  focusState: string
}

class InputSubmitButton extends React.PureComponent<
  SubmitButtonProps & {
    value?: string
    attributes?: Record<string, unknown>
    tooltip?: React.ReactNode
  },
  InputSubmitButtonState
> {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  _buttonRef: React.RefObject<HTMLElement | null>
  static defaultProps = {
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

  state = { focusState: 'virgin' }

  constructor(props: SubmitButtonProps & { value?: string }) {
    super(props)
    this._buttonRef = React.createRef()
  }

  onSubmitFocusHandler = (event: React.FocusEvent) => {
    const value = this.props.value
    this.setState({
      focusState: 'focus',
    })
    dispatchCustomElementEvent(this, 'onSubmitFocus', { value, event })
  }
  onSubmitBlurHandler = (event: React.FocusEvent) => {
    const value = this.props.value
    this.setState({
      focusState: 'dirty',
    })
    dispatchCustomElementEvent(this, 'onSubmitBlur', { value, event })
  }
  onSubmitHandler = (event: React.MouseEvent) => {
    const value = this.props.value
    dispatchCustomElementEvent(this, 'onSubmit', { value, event })
  }
  render() {
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

      onSubmitBlur, //eslint-disable-line
      onSubmitFocus, //eslint-disable-line

      ...rest
    } = this.props

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
      this.context
    )

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <span
        className="dnb-input__submit-button"
        data-input-state={this.state.focusState}
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
          onClick={this.onSubmitHandler}
          onFocus={this.onSubmitFocusHandler}
          onBlur={this.onSubmitBlurHandler}
          ref={this._buttonRef}
          {...(params as Record<string, unknown>)}
          {...(statusProps as Record<string, unknown>)}
        />
      </span>
    )
  }
}

function SubmitButton({
  ref,
  ...props
}: SubmitButtonProps & { ref?: React.Ref<HTMLElement> }) {
  const instanceRef = React.useCallback(
    (instance: InputSubmitButton | null) => {
      const el = instance?._buttonRef?.current ?? null
      if (typeof ref === 'function') {
        ref(el)
      } else if (ref) {
        ref.current = el
      }
    },
    [ref]
  )

  return (
    <InputSubmitButton
      ref={(ref ? instanceRef : undefined) as React.Ref<InputSubmitButton>}
      {...props}
    />
  )
}

export { SubmitButton }

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

type InputComponent = ((props: InputProps) => React.JSX.Element) & {
  defaultProps: object
  getValue: typeof InputClass.getValue
  hasValue: typeof InputClass.hasValue
  _formElement: boolean
  _supportsSpacingProps: boolean
}

/**
 * Function wrapper that forwards `ref` to the inner DOM element of the class component.
 */
const Input: InputComponent = Object.assign(
  function Input({ ref, ...props }: InputProps) {
    const instanceRef = React.useCallback(
      (instance: InputClass | null) => {
        const el = instance?._ref?.current ?? null
        if (typeof ref === 'function') {
          ref(el)
        } else if (ref) {
          ;(ref as React.MutableRefObject<HTMLElement | null>).current = el
        }
      },
      [ref]
    )

    return (
      <InputClass
        ref={
          (ref ? instanceRef : undefined) as React.Ref<InputClass> &
            React.Ref<HTMLInputElement>
        }
        {...props}
      />
    )
  },
  {
    defaultProps: InputClass.defaultProps as object,
    getValue: InputClass.getValue,
    hasValue: InputClass.hasValue,
    _formElement: true as const,
    _supportsSpacingProps: true as const,
  }
)

export default Input
