/**
 * Web Textarea Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { ComponentMarkers } from '../../shared/helpers/withComponentMarkers'
import React from 'react'
import clsx from 'clsx'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import TextCounter from '../../fragments/text-counter/TextCounter'
import {
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
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

import type { InternalLocale } from '../../shared/Context'
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import type { FormStatusBaseProps } from '../FormStatus'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../space/types'
import type { TextCounterProps } from '../../fragments/TextCounter'

export type TextareaSuffix = string | React.ReactNode
export type TextareaAlign = 'left' | 'center' | 'right' | 'justify'
export type TextareaAutoresizeMaxRows = string | number
export type TextareaRows = number | string
export type TextareaCols = number | string
export type TextareaTextareaElement =
  | ((
      params: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      ref: React.RefObject<HTMLTextAreaElement | null>
    ) => React.ReactNode)
  | React.ReactNode
export type TextareaChildren = React.ReactNode | ((...args: any[]) => any)
export type TextareaSize = 'small' | 'medium' | 'large'

export type TextareaEvent<E = React.SyntheticEvent<HTMLTextAreaElement>> =
  {
    value: string
    event: E
  }

export type TextareaChangeEvent = TextareaEvent<
  React.ChangeEvent<HTMLTextAreaElement>
> & {
  rows: number
}

export type TextareaKeyDownEvent = TextareaEvent<
  React.KeyboardEvent<HTMLTextAreaElement>
> & {
  rows: number
}

export interface TextareaProps
  extends Omit<
      React.HTMLProps<HTMLElement>,
      | 'ref'
      | 'children'
      | 'label'
      | 'size'
      | 'cols'
      | 'rows'
      | 'placeholder'
      | 'onChange'
      | 'onFocus'
      | 'onBlur'
      | 'onKeyDown'
    >,
    SpacingProps,
    FormStatusBaseProps {
  /**
   * The content value of the Textarea.
   */
  value?: string
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
   * The sizes you can choose for 1 row is `small` (2rem), `medium` (2.5rem) and `large` (3rem). Defaults to `small`.
   */
  size?: TextareaSize
  /**
   * To control the visual focus state as a prop, like `focus` or `blur`.
   */
  textareaState?: string
  /**
   * Text describing the content of the Textarea more than the label. You can also send in a React component, so it gets wrapped inside the Textarea component.
   */
  suffix?: TextareaSuffix
  /**
   * The placeholder which shows up once the Textarea value is empty.
   */
  placeholder?: React.ReactNode
  /**
   * Use `true` to keep the placeholder visible even when the Textarea has focus. Defaults to `false`.
   */
  keepPlaceholder?: boolean
  /**
   * Defines the `text-align` of the Textarea. Defaults to `left`.
   */
  align?: TextareaAlign
  /**
   * If set to `true`, then the Textarea field will be 100% in `width`.
   */
  stretch?: boolean
  disabled?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  /**
   * Use `true` to make the Textarea grow and shrink depending on how many lines the user has filled.
   */
  autoResize?: boolean
  /**
   * Use a number to define the displayed max length. You can also use an object defining the [TextCounter](uilib/components/fragments/text-counter/) `variant` or properties. Please avoid using `maxLength` for accessibility reasons.
   */
  characterCounter?: Omit<TextCounterProps, 'text'> | number
  /**
   * Set a number to define how many rows the Textarea can auto grow.
   */
  autoResizeMaxRows?: TextareaAutoresizeMaxRows
  textareaClass?: string
  readOnly?: boolean
  rows?: TextareaRows
  cols?: TextareaCols
  className?: string
  textareaElement?: TextareaTextareaElement
  children?: TextareaChildren
  onChange?: (event: TextareaChangeEvent) => void
  onFocus?: (
    event: TextareaEvent<React.FocusEvent<HTMLTextAreaElement>>
  ) => void
  onBlur?: (
    event: TextareaEvent<React.FocusEvent<HTMLTextAreaElement>>
  ) => void
  onKeyDown?: (event: TextareaKeyDownEvent) => void
  /**
   * Locale to use for text counter. Inherited from context if not set.
   */
  locale?: InternalLocale
  /**
   * By providing a React.Ref we can get the internally used Textarea element (DOM). E.g. `ref={myRef}` by using `React.useRef()`.
   */
  ref?: React.Ref<HTMLTextAreaElement> | null
}

interface TextareaComponentState {
  textareaState: string
  value: string | null
  _value: string | undefined
}

/**
 * The textarea component is an umbrella component for all textareas which share the same style as the classic `text` textarea field.
 */
class TextareaClass extends React.PureComponent<
  TextareaProps,
  TextareaComponentState
> {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  _ref: React.RefObject<HTMLTextAreaElement | null>
  _id: string
  _heightOffset: number | undefined
  resizeModifier: string | false
  resizeObserver: ResizeObserver | null

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
    autoResize: null,
    autoResizeMaxRows: null,
    characterCounter: null,
    textareaClass: null,
    readOnly: false,
    rows: null,
    cols: null,
    ref: null,

    className: null,
    textareaElement: null,
    children: null,

    onChange: null,
    onFocus: null,
    onBlur: null,
    onKeyDown: null,
  }

  static getDerivedStateFromProps(
    props: TextareaProps,
    state: TextareaComponentState
  ) {
    const value = TextareaClass.getValue(props)
    if (
      value !== 'initval' &&
      value !== state.value &&
      value !== state._value
    ) {
      state.value = value
    }
    if (props.textareaState) {
      state.textareaState = props.textareaState
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

  static getValue(props: TextareaProps) {
    const value = processChildren(props)
    if (value === '' || TextareaClass.hasValue(value)) {
      return value
    }
    return props.value
  }

  state = {
    textareaState: 'virgin',
    value: null,
    _value: null,
  }

  constructor(props: TextareaProps) {
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

    if (props.autoResize && typeof window !== 'undefined') {
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
  onFocusHandler = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const { value } = this._ref.current
    this.setState({
      value,
      textareaState: 'focus',
    })
    dispatchCustomElementEvent(this, 'onFocus', { value, event })
  }
  onBlurHandler = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    this.setState({
      value,
      textareaState: TextareaClass.hasValue(value) ? 'dirty' : 'initial',
    })
    dispatchCustomElementEvent(this, 'onBlur', { value, event })
  }
  onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target

    const props = this.getProps()
    const autoResize = props.autoResize

    if (autoResize) {
      this.prepareAutosize()
    }

    const rows = this.getRows()

    const ret = dispatchCustomElementEvent(this, 'onChange', {
      value,
      rows,
      event,
    })
    if (ret !== false) {
      this.setState({ value })
      if (autoResize) {
        this.setAutosize(rows)
      }
    }
  }
  onKeyDownHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const rows = this.getRows()
    const { value } = event.target as HTMLTextAreaElement
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
      const maxRows = parseFloat(String(props.autoResizeMaxRows))
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
      TextareaClass.defaultProps,
      { skeleton: this.context?.skeleton },
      (this.context.getTranslation(this.props) as Record<string, unknown>)
        ?.Textarea as Record<string, unknown>,
      pickFormElementProps(this.context?.formElement),
      (this.context as Record<string, unknown>)?.Textarea as Record<
        string,
        unknown
      >
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
      className,
      autoResize,
      characterCounter,
      autoResizeMaxRows,
      id: _id,
      children,
      value: _value,
      textareaElement: _textareaElement,
      ref: _ref,

      ...attributes
    } = props

    const { value, textareaState } = this.state

    const id = this._id
    const showStatus = getStatusState(status)
    const hasValue = TextareaClass.hasValue(value)

    // pass along all props we wish to have as params
    let { textareaElement: TextareaElement } = props

    const textareaParams: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
      'aria-describedby'?: string
      [key: string]: unknown
    } = {
      className: clsx(
        'dnb-textarea__textarea',
        'dnb-input__border',
        textareaClass
      ),
      role: 'textbox',
      value: hasValue ? value : '',
      id,
      name: id,
      disabled: disabled || skeleton,
      'aria-placeholder': placeholder
        ? convertJsxToString(placeholder)
        : undefined,
      ...(attributes as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>),
      ...(typeof size === 'number' ? { size } : {}),
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
      className: clsx(
        'dnb-textarea',
        `dnb-textarea--${textareaState}`,
        disabled && 'dnb-textarea--disabled',
        hasValue && 'dnb-textarea--has-content',
        align && `dnb-textarea__align--${align}`,
        typeof size === 'string' && `dnb-textarea__size--${size}`,
        status && `dnb-textarea__status--${statusState}`,
        autoResize && 'dnb-textarea__autoresize',
        !autoResize &&
          this.resizeModifier &&
          `dnb-textarea__resize--${this.resizeModifier}`,
        labelDirection && `dnb-textarea--${labelDirection}`,
        stretch && `dnb-textarea--stretch`,
        keepPlaceholder && `dnb-textarea--keep-placeholder`,
        'dnb-form-component',
        createSkeletonClass(null, skeleton),
        createSpacingClasses(props),
        className
      ),
    }

    const innerParams = {
      className: clsx(
        'dnb-textarea__inner',
        createSkeletonClass('shape', skeleton, this.context)
      ),
    }

    const shellParams = {
      className: clsx('dnb-textarea__shell'),
    }

    if (disabled || skeleton) {
      shellParams['aria-disabled'] = true
    }

    // to show the ending dots on a placeholder, if the text is longer
    const placeholderStyle =
      parseFloat(String(props.rows)) > 0
        ? {
            '--textarea-rows': parseFloat(String(props.rows)),
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
              {(TextareaElement as React.ReactNode) || (
                <textarea ref={this._ref} {...textareaParams} />
              )}

              {!hasValue &&
                placeholder &&
                (textareaState !== 'focus' || keepPlaceholder) && (
                  <span
                    className={clsx(
                      'dnb-textarea__placeholder',
                      align ? `dnb-textarea__align--${align}` : null
                    )}
                    style={placeholderStyle as React.CSSProperties}
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
                {suffix as React.ReactNode}
              </Suffix>
            )}
          </span>

          {characterCounter && (
            <TextCounter
              top="x-small"
              text={value}
              max={characterCounter as number}
              lang={props.lang}
              locale={props.locale}
              {...(typeof characterCounter === 'object'
                ? characterCounter
                : {})}
            />
          )}
        </span>
      </span>
    )
  }
}

export interface TextareaStaticProperties extends ComponentMarkers {
  hasValue: typeof TextareaClass.hasValue
  getValue: typeof TextareaClass.getValue
}

/**
 * Function wrapper that forwards `ref` to the inner DOM element of the class component.
 */
function Textarea({ ref, ...props }: TextareaProps) {
  const instanceRef = React.useCallback(
    (instance: TextareaClass | null) => {
      const el = instance?._ref?.current ?? null
      if (typeof ref === 'function') {
        ref(el)
      } else if (ref) {
        ref.current = el
      }
    },
    [ref]
  )

  return (
    <TextareaClass
      ref={ref ? (instanceRef as any) : undefined}
      {...props}
    />
  )
}

const TextareaExport = Textarea as typeof Textarea &
  TextareaStaticProperties
TextareaExport.hasValue = TextareaClass.hasValue
TextareaExport.getValue = TextareaClass.getValue

withComponentMarkers(TextareaExport, {
  _formElement: true,
  _supportsSpacingProps: true,
})

export default TextareaExport
