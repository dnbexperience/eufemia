/**
 * Web Textarea Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import TextCounter from '../../fragments/text-counter/TextCounter'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  processChildren,
  getStatusState,
  combineDescribedBy,
  warn,
  dispatchCustomElementEvent,
  convertJsxToString,
} from '../../shared/component-helper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import AlignmentHelper from '../../shared/AlignmentHelper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'

/**
 * The textarea component is an umbrella component for all textareas which share the same style as the classic `text` textarea field.
 */
export default class Textarea extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    value: PropTypes.string,
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
    textareaState: PropTypes.string,
    statusState: PropTypes.string,
    statusProps: PropTypes.object,
    statusNoAnimation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    globalStatus: PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    }),
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    placeholder: PropTypes.node,
    keepPlaceholder: PropTypes.bool,
    align: PropTypes.oneOf(['left', 'right']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    stretch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    characterCounter: PropTypes.oneOfType([
      PropTypes.shape({
        max: PropTypes.number,
        variant: PropTypes.oneOf(['down', 'up']),
      }),
      PropTypes.number,
    ]),
    autoresize: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    autoresizeMaxRows: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    textareaClass: PropTypes.string,
    textareaAttributes: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    cols: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

    ...spacingPropTypes,

    className: PropTypes.string,
    textareaElement: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onStateUpdate: PropTypes.func,
  }

  static defaultProps = {
    value: 'initval',
    id: null,
    label: null,
    labelDirection: null,
    labelSrOnly: null,
    status: null,
    textareaState: null,
    statusState: 'error',
    statusProps: null,
    statusNoAnimation: null,
    globalStatus: null,
    suffix: null,
    placeholder: null,
    keepPlaceholder: null,
    align: null,
    size: null,
    stretch: null,
    disabled: null,
    skeleton: null,
    autoresize: null,
    autoresizeMaxRows: null,
    characterCounter: null,
    textareaClass: null,
    textareaAttributes: null,
    readOnly: false,
    rows: null,
    cols: null,
    innerRef: null,

    className: null,
    textareaElement: null,
    children: null,

    onChange: null,
    onFocus: null,
    onBlur: null,
    onKeyDown: null,
    onStateUpdate: null,
  }

  static getDerivedStateFromProps(props, state) {
    const value = Textarea.getValue(props)
    if (
      value !== 'initval' &&
      value !== state.value &&
      value !== state._value
    ) {
      if (
        value !== state.value &&
        typeof props.onStateUpdate === 'function'
      ) {
        dispatchCustomElementEvent({ props }, 'onStateUpdate', { value })
      }
      state.value = value
    }
    if (props.textareaState) {
      state.textareaState = props.textareaState
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
    if (value === '' || Textarea.hasValue(value)) {
      return value
    }
    return props.value
  }

  state = {
    textareaState: 'virgin',
    value: null,
    _value: null,
  }

  constructor(props) {
    super(props)

    this._ref = React.createRef()
    this._id = props.id || makeUniqueId() // cause we need an id anyway

    if (props.textareaState) {
      this.state.textareaState = props.textareaState
    }

    try {
      if (typeof navigator !== 'undefined') {
        this.resizeModifier =
          /Firefox|Edg/.test(navigator.userAgent) ||
          (/Chrome/.test(navigator.userAgent) &&
            /Win/.test(navigator.platform))
            ? 'large'
            : false

        if (!this.resizeModifier) {
          this.resizeModifier =
            /Safari|Chrome/.test(navigator.userAgent) &&
            /Mac/.test(navigator.platform)
              ? 'medium'
              : false
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  componentDidMount() {
    const props = this.getProps()
    if (props.innerRef) {
      typeof props.innerRef === 'function'
        ? props.innerRef(this._ref.current)
        : (props.innerRef.current = this._ref.current)
    }

    if (isTrue(props.autoresize) && typeof window !== 'undefined') {
      this.setAutosize()
      try {
        // eslint-disable-next-line compat/compat
        this.resizeObserver = new ResizeObserver((entries) => {
          window.requestAnimationFrame(() => {
            if (!Array.isArray(entries) || !entries.length) {
              return
            }
            this.setAutosize()
          })
        })
        this.resizeObserver.observe(document.body)
      } catch (e) {
        window.addEventListener('resize', this.setAutosize)
      }
    }
  }
  componentWillUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.setAutosize)
    }
  }
  onFocusHandler = (event) => {
    const { value } = this._ref.current
    this.setState({
      value,
      textareaState: 'focus',
    })
    dispatchCustomElementEvent(this, 'onFocus', { value, event })
  }
  onBlurHandler = (event) => {
    const { value } = event.target
    this.setState({
      value,
      textareaState: Textarea.hasValue(value) ? 'dirty' : 'initial',
    })
    dispatchCustomElementEvent(this, 'onBlur', { value, event })
  }
  onChangeHandler = (event) => {
    const { value } = event.target

    const props = this.getProps()
    const autoresize = isTrue(props.autoresize)

    if (autoresize) {
      this.prepareAutosize()
    }

    const rows = this.getRows(value)

    const ret = dispatchCustomElementEvent(this, 'onChange', {
      value,
      rows,
      event,
    })
    if (ret !== false) {
      this.setState({ value })
      if (autoresize) {
        this.setAutosize(rows)
      }
    }
  }
  onKeyDownHandler = (event) => {
    const rows = this.getRows()
    const { value } = event.target
    dispatchCustomElementEvent(this, 'onKeyDown', {
      value,
      rows,
      event,
    })
  }
  prepareAutosize = () => {
    const elem = this._ref.current
    if (!elem) {
      return // stop here if no element was gotten
    }
    try {
      elem.style.height = 'auto'
    } catch (e) {
      warn(e)
    }
  }
  setAutosize = (rows = null) => {
    const elem = this._ref.current
    if (!elem) {
      return // stop here if no element was gotten
    }
    try {
      if (typeof this._heightOffset === 'undefined') {
        this._heightOffset = elem.offsetHeight - elem.clientHeight
      }

      elem.style.height = 'auto'

      // get rows after we set height to auto, this way we get 100% correct rows
      const lineHeight = this.getLineHeight()
      let newHeight = elem.scrollHeight + this._heightOffset
      if (!rows) {
        rows = this.getRows()
      }

      if (rows === 1) {
        if (newHeight > lineHeight) {
          newHeight = lineHeight
        }
      }

      const props = this.getProps()
      const maxRows = parseFloat(props.autoresizeMaxRows)
      if (maxRows > 0) {
        const maxHeight = maxRows * lineHeight

        if (rows > maxRows || newHeight > maxHeight) {
          newHeight = maxHeight
        }
      }

      elem.style.height = newHeight + 'px'
    } catch (e) {
      warn(e)
    }
  }
  getRows() {
    return (
      Math.floor(this._ref.current.scrollHeight / this.getLineHeight()) ||
      1
    )
  }
  getLineHeight() {
    return parseFloat(getComputedStyle(this._ref.current).lineHeight) || 0
  }
  getProps() {
    return extendPropsWithContextInClassComponent(
      this.props,
      Textarea.defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.getTranslation(this.props).Textarea,
      pickFormElementProps(this.context?.formElement),
      this.context.Textarea
    )
  }
  render() {
    // use only the props from context, who are available here anyway
    const props = this.getProps()

    const {
      label,
      labelDirection,
      labelSrOnly,
      status,
      statusState,
      statusProps,
      statusNoAnimation,
      globalStatus,
      suffix,
      disabled,
      skeleton,
      stretch,
      placeholder,
      keepPlaceholder,
      align,
      size,
      textareaClass,
      readOnly,
      textareaAttributes,
      className,
      autoresize,
      characterCounter,
      autoresizeMaxRows, //eslint-disable-line
      id: _id, //eslint-disable-line
      children, //eslint-disable-line
      value: _value, //eslint-disable-line
      textareaElement: _textareaElement, //eslint-disable-line
      innerRef: _innerRef, //eslint-disable-line

      ...attributes
    } = props

    const { value, textareaState } = this.state

    const id = this._id
    const showStatus = getStatusState(status)
    const hasValue = Textarea.hasValue(value)

    // pass along all props we wish to have as params
    let { textareaElement: TextareaElement } = props

    const usedTextareaAttributes = textareaAttributes
      ? typeof textareaAttributes === 'string'
        ? JSON.parse(textareaAttributes)
        : textareaAttributes
      : {}

    const textareaParams = {
      className: classnames(
        'dnb-textarea__textarea',
        'dnb-input__border',
        textareaClass
      ),
      role: 'textbox',
      value: hasValue ? value : '',
      id,
      name: id,
      disabled: isTrue(disabled) || isTrue(skeleton),
      'aria-placeholder': placeholder
        ? convertJsxToString(placeholder)
        : undefined,
      ...attributes,
      ...usedTextareaAttributes,
      onChange: this.onChangeHandler,
      onFocus: this.onFocusHandler,
      onBlur: this.onBlurHandler,
      // onPaste: this.onChangeHandler,
      onKeyDown: this.onKeyDownHandler,
    }

    // we may consider using: aria-details
    if (showStatus || suffix) {
      textareaParams['aria-describedby'] = combineDescribedBy(
        textareaParams,
        showStatus ? id + '-status' : null,
        suffix ? id + '-suffix' : null
      )
    }
    if (readOnly) {
      textareaParams['aria-readonly'] = textareaParams.readOnly = true
    }

    const mainParams = {
      className: classnames(
        'dnb-textarea',
        `dnb-textarea--${textareaState}`,
        disabled && 'dnb-textarea--disabled',
        hasValue && 'dnb-textarea--has-content',
        align && `dnb-textarea__align--${align}`,
        size && `dnb-textarea__size--${size}`,
        status && `dnb-textarea__status--${statusState}`,
        autoresize && 'dnb-textarea__autoresize',
        !autoresize &&
          this.resizeModifier &&
          `dnb-textarea__resize--${this.resizeModifier}`,
        labelDirection && `dnb-textarea--${labelDirection}`,
        isTrue(stretch) && `dnb-textarea--stretch`,
        isTrue(keepPlaceholder) && `dnb-textarea--keep-placeholder`,
        'dnb-form-component',
        createSkeletonClass(null, skeleton),
        createSpacingClasses(props),
        className
      ),
    }

    const innerParams = {
      className: classnames(
        'dnb-textarea__inner',
        createSkeletonClass('shape', skeleton, this.context)
      ),
    }

    const shellParams = {
      className: classnames('dnb-textarea__shell'),
    }

    if (isTrue(disabled) || isTrue(skeleton)) {
      shellParams['aria-disabled'] = true
    }

    // to show the ending dots on a placeholder, if the text is longer
    const placeholderStyle =
      parseFloat(props.rows) > 0
        ? {
            '--textarea-rows': parseFloat(props.rows),
          }
        : null

    skeletonDOMAttributes(innerParams, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, textareaParams)
    validateDOMAttributes(null, innerParams)
    validateDOMAttributes(null, shellParams)

    if (TextareaElement && typeof TextareaElement === 'function') {
      TextareaElement = TextareaElement(textareaParams, this._ref)
    } else if (!TextareaElement && _textareaElement) {
      TextareaElement = _textareaElement
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
            textId={id + '-status'} // used for "aria-describedby"
            text={status}
            state={statusState}
            noAnimation={statusNoAnimation}
            skeleton={skeleton}
            {...statusProps}
          />

          <span className="dnb-textarea__row">
            <span {...shellParams}>
              {TextareaElement || (
                <textarea ref={this._ref} {...textareaParams} />
              )}

              {!hasValue &&
                placeholder &&
                (textareaState !== 'focus' || keepPlaceholder) && (
                  <span
                    className={classnames(
                      'dnb-textarea__placeholder',
                      align ? `dnb-textarea__align--${align}` : null
                    )}
                    style={placeholderStyle}
                    aria-hidden
                  >
                    {placeholder}
                  </span>
                )}

              <span className="dnb-textarea__state" />
            </span>

            {suffix && (
              <Suffix
                className="dnb-textarea__suffix"
                id={id + '-suffix'} // used for "aria-describedby"
                context={props}
              >
                {suffix}
              </Suffix>
            )}
          </span>

          {characterCounter && (
            <TextCounter
              top="x-small"
              text={value}
              max={characterCounter}
              lang={props.lang}
              locale={props.locale}
              {...characterCounter}
            />
          )}
        </span>
      </span>
    )
  }
}

Textarea._formElement = true
Textarea._supportsSpacingProps = true
