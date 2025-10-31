/**
 * Web Input Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  warn,
  isTrue,
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  processChildren,
  getStatusState,
  convertStatusToStateOnly,
  combineDescribedBy,
  dispatchCustomElementEvent,
  convertJsxToString,
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import Button, { buttonVariantPropType } from '../button/Button'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import IconPrimary from '../icon-primary/IconPrimary'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'

export const inputPropTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['default', 'small', 'medium', 'large']),
    PropTypes.number,
  ]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  labelDirection: PropTypes.oneOf(['horizontal', 'vertical']),
  labelSrOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
    PropTypes.node,
  ]),
  globalStatus: PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  }),
  statusState: PropTypes.string,
  statusProps: PropTypes.object,
  statusNoAnimation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  inputState: PropTypes.string,
  autocomplete: PropTypes.string,
  submitButtonTitle: PropTypes.string,
  clearButtonTitle: PropTypes.string,
  placeholder: PropTypes.node,
  clear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  keepPlaceholder: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  suffix: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  selectall: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  stretch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  inputClass: PropTypes.string,
  inputAttributes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  inputElement: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconPosition: PropTypes.oneOf(['left', 'right']),
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  innerElement: PropTypes.node,

  // Submit button
  submitElement: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  submitButtonVariant: buttonVariantPropType.variant,
  submitButtonIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
  submitButtonStatus: PropTypes.string,

  ...spacingPropTypes,

  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  on_change: PropTypes.func,
  on_key_down: PropTypes.func,
  on_submit: PropTypes.func,
  on_focus: PropTypes.func,
  on_blur: PropTypes.func,
  on_submit_focus: PropTypes.func,
  on_submit_blur: PropTypes.func,
  on_state_update: PropTypes.func,
  on_clear: PropTypes.func,
}

export default class Input extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    ...inputPropTypes,
  }

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
    selectall: null,
    stretch: null,
    disabled: null,
    skeleton: null,
    inputClass: null,
    inputAttributes: null,
    inputElement: null,
    innerRef: null,
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

    on_change: null,
    on_key_down: null,
    on_submit: null,
    on_focus: null,
    on_blur: null,
    on_submit_focus: null,
    on_submit_blur: null,
    on_state_update: null,
    on_clear: null,
  }

  static getDerivedStateFromProps(props, state) {
    const value = Input.getValue(props)
    if (
      value !== 'initval' &&
      value !== state.value &&
      value !== state._value
    ) {
      if (
        value !== state.value &&
        typeof props.on_state_update === 'function'
      ) {
        dispatchCustomElementEvent({ props }, 'on_state_update', { value })
      }
      state.value = value
    }
    if (props.inputState) {
      state.inputState = props.inputState
    }
    state._value = props.value
    return state
  }

  static hasValue(value) {
    return (
      ((typeof value === 'string' || typeof value === 'number') &&
        String(value).length > 0) ||
      false
    )
  }

  static getValue(props) {
    const value = processChildren(props)
    if (value === '' || Input.hasValue(value)) {
      return value
    }
    return props.value
  }

  state = { inputState: 'virgin', value: null, _value: null }

  constructor(props, context) {
    super(props)

    this._ref = props.innerRef || React.createRef()

    this._id =
      props.id ||
      // Deprecated – can be removed in v11
      (context.FormRow &&
        typeof context.FormRow.useId === 'function' &&
        context.FormRow.useId()) ||
      (context.formElement &&
        typeof context.formElement.useId === 'function' &&
        context.formElement.useId()) ||
      makeUniqueId() // cause we need an id anyway

    if (isTrue(props.clear) && props.iconPosition === 'right') {
      warn('You cannot have a clear button and iconPosition="right"')
    }

    // make sure we trigger getDerivedStateFromProps on startup
  }
  componentWillUnmount() {
    clearTimeout(this._selectallTimeout)
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
      const hasValue = Input.hasValue(value)
      this._ref.current.value = hasValue ? value : ''
    }
  }
  onFocusHandler = (event) => {
    const { value } = event.target
    this.setState({
      inputState: 'focus',
    })

    dispatchCustomElementEvent(this, 'on_focus', { value, event })

    if (isTrue(this.props.selectall) && this._ref.current) {
      clearTimeout(this._selectallTimeout)
      this._selectallTimeout = setTimeout(() => {
        try {
          this._ref.current.select()
        } catch (e) {
          warn(e)
        }
      }, 1) // safari needs a delay
    }
  }
  onBlurHandler = (event) => {
    const { value } = event.target
    const result = dispatchCustomElementEvent(this, 'on_blur', {
      value,
      event,
    })
    if (result !== false) {
      this.setState({
        inputState:
          Input.hasValue(value) && value !== this.state._value
            ? 'dirty'
            : 'initial',
      })
    }
  }
  onChangeHandler = (event) => {
    const { value } = event.target
    const result = dispatchCustomElementEvent(this, 'on_change', {
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
  onKeyDownHandler = (event) => {
    const value = event.target.value
    dispatchCustomElementEvent(this, 'on_key_down', { value, event })
    if (event.key === 'Enter') {
      dispatchCustomElementEvent(this, 'on_submit', { value, event })
    }
  }
  clearValue = (event) => {
    const previousValue = this.state.value
    const value = ''
    this.setState({ value })
    dispatchCustomElementEvent(this, 'on_change', { value, event })
    dispatchCustomElementEvent(this, 'on_clear', {
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
      Input.defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.getTranslation(this.props).Input,
      // Deprecated – can be removed in v11
      pickFormElementProps(this.context?.FormRow),
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
      selectall, //eslint-disable-line
      on_submit, //eslint-disable-line
      inputElement: _input_element, //eslint-disable-line
      innerRef: _innerRef, //eslint-disable-line
      inputState: _inputState, //eslint-disable-line

      ...attributes
    } = props

    let { value, focusState, inputState } = this.state

    if (isTrue(disabled) || isTrue(skeleton)) {
      inputState = 'disabled'
    }
    const sizeIsNumber = parseFloat(size) > 0

    const id = this._id
    const showStatus = getStatusState(status)
    const hasSubmitButton =
      submitElement || (submitElement !== false && type === 'search')
    const hasValue = Input.hasValue(value)

    const usedIconSize =
      size === 'large' && (iconSize === 'default' || !iconSize)
        ? 'medium'
        : iconSize

    const mainParams = {
      className: classnames(
        'dnb-input',
        'dnb-input__border--tokens',
        type && `dnb-input--${type}`,
        size && !sizeIsNumber && `dnb-input--${size}`,
        hasSubmitButton && 'dnb-input--has-submit-element',
        innerElement && 'dnb-input--has-inner-element',
        isTrue(clear) && 'dnb-input--has-clear-button',
        align && `dnb-input__align--${align}`,
        status && `dnb-input__status--${statusState}`,
        disabled && 'dnb-input--disabled',
        icon && `dnb-input--icon-position-${iconPosition}`,
        icon && 'dnb-input--has-icon',
        icon && usedIconSize && `dnb-input--icon-size-${usedIconSize}`,
        labelDirection && `dnb-input--${labelDirection}`,
        isTrue(stretch) && `dnb-input--stretch`,
        isTrue(keepPlaceholder) && 'dnb-input--keep-placeholder',
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
      className: classnames('dnb-input__input', inputClass),
      autoComplete: autocomplete,
      type,
      id,
      disabled: isTrue(disabled),
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
      className: classnames(
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
      InputElement = InputElement({ ...inputParams, value }, this._ref)
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
              {InputElement || <input ref={this._ref} {...inputParams} />}

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
                  className={classnames(
                    'dnb-input__placeholder',
                    align ? `dnb-input__align--${align}` : null
                  )}
                  role="presentation"
                  aria-hidden
                >
                  {placeholder}
                </span>
              )}

              {isTrue(clear) && iconPosition !== 'right' && (
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
                    disabled={isTrue(disabled) || !hasValue}
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
                    {...attributes}
                    id={id + '-submit-button'}
                    value={hasValue ? value : ''}
                    icon={submitButtonIcon}
                    status={convertStatusToStateOnly(
                      submitButtonStatus || status,
                      statusState
                    )}
                    statusState={statusState}
                    iconSize={
                      size === 'medium' || size === 'large'
                        ? 'medium'
                        : 'default'
                    }
                    title={submitButtonTitle}
                    variant={submitButtonVariant}
                    disabled={isTrue(disabled)}
                    skeleton={isTrue(skeleton)}
                    size={size}
                    on_submit={on_submit}
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

class InputSubmitButton extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    title: PropTypes.string,
    variant: buttonVariantPropType.variant,
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func,
    ]),
    iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.func,
      PropTypes.node,
    ]),
    statusState: PropTypes.string,
    statusProps: PropTypes.object,
    className: PropTypes.string,

    on_submit: PropTypes.func,
    on_submit_focus: PropTypes.func,
    on_submit_blur: PropTypes.func,
  }

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

    on_submit: null,
    on_submit_focus: null,
    on_submit_blur: null,
  }

  state = { focusState: 'virgin' }

  onSubmitFocusHandler = (event) => {
    const value = this.props.value
    this.setState({
      focusState: 'focus',
    })
    dispatchCustomElementEvent(this, 'on_submit_focus', { value, event })
  }
  onSubmitBlurHandler = (event) => {
    const value = this.props.value
    this.setState({
      focusState: 'dirty',
    })
    dispatchCustomElementEvent(this, 'on_submit_blur', { value, event })
  }
  onSubmitHandler = (event) => {
    const value = this.props.value
    dispatchCustomElementEvent(this, 'on_submit', { value, event })
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
      ...rest
    } = this.props

    const params = {
      id,
      type: 'submit',
      'aria-label': title,
      disabled,
      ...rest,
    }

    skeletonDOMAttributes(params, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <span
        className="dnb-input__submit-button"
        data-input-state={this.state.focusState}
      >
        <Button
          className={classnames(
            'dnb-input__submit-button__button',
            'dnb-button--input-button',
            className
          )}
          variant={variant}
          icon={icon}
          iconSize={iconSize}
          status={status}
          statusState={statusState}
          onClick={this.onSubmitHandler}
          onFocus={this.onSubmitFocusHandler}
          onBlur={this.onSubmitBlurHandler}
          {...params}
          {...statusProps}
        />
      </span>
    )
  }
}

const SubmitButton = React.forwardRef((props, ref) => (
  <InputSubmitButton innerRef={ref} {...props} />
))

export { SubmitButton }

// We memoize by type, in case we send in a ProgressIndicator (Autocomplete)
const InputIcon = React.memo(
  (props) => <IconPrimary {...props} />,
  ({ icon: prev }, { icon: next }) => {
    if (typeof prev === 'string' && typeof next === 'string') {
      return false
    }
    return typeof prev === typeof next
  }
)
InputIcon.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
}

Input._formElement = true
Input._supportsSpacingProps = true
