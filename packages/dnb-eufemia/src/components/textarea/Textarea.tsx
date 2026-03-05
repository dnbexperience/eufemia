/**
 * Web Textarea Component
 */

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import TextCounter from '../../fragments/text-counter/TextCounter'
import {
  makeUniqueId,
  extendPropsWithContext,
  removeUndefinedProps,
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
export type TextareaElement =
  | ((
      params: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      ref: React.RefObject<HTMLTextAreaElement | null>
    ) => React.ReactNode)
  | React.ReactNode
export type TextareaChildren = React.ReactNode | (() => React.ReactNode)
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

export type TextareaProps = Omit<
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
> &
  SpacingProps &
  FormStatusBaseProps & {
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
    textareaElement?: TextareaElement
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

const textareaDefaultProps = {
  value: 'initval',
  statusState: 'error',
  readOnly: false,
}

function hasValue(value: string | number | null | undefined) {
  return (
    ((typeof value === 'string' || typeof value === 'number') &&
      String(value).length > 0) ||
    false
  )
}

function getValue(props: TextareaProps) {
  const value = processChildren(props)
  if (value === '' || hasValue(value)) {
    return value
  }
  return props.value
}

function getResizeModifier() {
  try {
    if (typeof navigator !== 'undefined') {
      if (
        /Firefox|Edg/.test(navigator.userAgent) ||
        (/Chrome/.test(navigator.userAgent) &&
          /Win/.test(navigator.platform))
      ) {
        return 'large'
      }

      if (
        /Safari|Chrome/.test(navigator.userAgent) &&
        /Mac/.test(navigator.platform)
      ) {
        return 'medium'
      }
    }
  } catch (error) {
    console.error(error)
  }

  return false
}

/**
 * The textarea component is an umbrella component for all textareas which share the same style as the classic `text` textarea field.
 */
function TextareaComponent(
  ownProps: TextareaProps,
  ref: React.Ref<HTMLTextAreaElement>
) {
  const context = useContext(Context)

  const props = extendPropsWithContext(
    {
      ...textareaDefaultProps,
      ...removeUndefinedProps({ ...ownProps }),
    },
    textareaDefaultProps,
    { skeleton: context?.skeleton },
    (context.getTranslation(ownProps) as Record<string, unknown>)
      ?.Textarea as Record<string, unknown>,
    pickFormElementProps(context?.formElement),
    (context as Record<string, unknown>)?.Textarea as Record<
      string,
      unknown
    >
  )

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
    children: _children,
    value: _value,
    textareaElement: _textareaElement,
    ref: _ref,
    ...attributes
  } = props

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const combinedRef = useCallback(
    (node: HTMLTextAreaElement | null) => {
      textareaRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ;(
          ref as React.MutableRefObject<HTMLTextAreaElement | null>
        ).current = node
      }
    },
    [ref]
  )

  const id = useMemo(
    () => ownProps.id || makeUniqueId(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const resizeModifier = useMemo(() => getResizeModifier(), [])
  const heightOffsetRef = useRef<number | undefined>(undefined)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  const propValue = getValue(ownProps)
  const prevValuePropRef = useRef(propValue)
  const [value, setValue] = useState<string | null>(() => {
    if (propValue !== 'initval' && propValue !== null) {
      return propValue as string
    }
    return null
  })
  const [textareaState, setTextareaState] = useState(() => {
    return ownProps.textareaState || 'virgin'
  })

  // Sync value from props (getDerivedStateFromProps equivalent)
  if (
    propValue !== 'initval' &&
    propValue !== value &&
    propValue !== prevValuePropRef.current
  ) {
    setValue(propValue as string)
  }
  prevValuePropRef.current = propValue

  // Sync textareaState from props
  if (ownProps.textareaState && ownProps.textareaState !== textareaState) {
    setTextareaState(ownProps.textareaState)
  }

  const getLineHeight = useCallback(() => {
    return (
      parseFloat(getComputedStyle(textareaRef.current).lineHeight) || 0
    )
  }, [])

  const getRows = useCallback(() => {
    return (
      Math.floor(textareaRef.current.scrollHeight / getLineHeight()) || 1
    )
  }, [getLineHeight])

  const prepareAutosize = useCallback(() => {
    const elem = textareaRef.current
    if (!elem) {
      return // stop here
    }
    try {
      elem.style.height = 'auto'
    } catch (e) {
      warn(e)
    }
  }, [])

  const setAutosize = useCallback(
    (rows: number | null = null) => {
      const elem = textareaRef.current
      if (!elem) {
        return // stop here
      }
      try {
        if (typeof heightOffsetRef.current === 'undefined') {
          heightOffsetRef.current = elem.offsetHeight - elem.clientHeight
        }

        elem.style.height = 'auto'

        const lineHeight = getLineHeight()
        let newHeight = elem.scrollHeight + heightOffsetRef.current
        if (!rows) {
          rows = getRows()
        }

        if (rows === 1) {
          if (newHeight > lineHeight) {
            newHeight = lineHeight
          }
        }

        const maxRows = parseFloat(String(autoResizeMaxRows))
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
    },
    [autoResizeMaxRows, getLineHeight, getRows]
  )

  const onFocusHandler = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      const { value } = textareaRef.current
      setValue(value)
      setTextareaState('focus')
      dispatchCustomElementEvent(props, 'onFocus', { value, event })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onFocus]
  )

  const onBlurHandler = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      const { value } = event.target
      setValue(value)
      setTextareaState(hasValue(value) ? 'dirty' : 'initial')
      dispatchCustomElementEvent(props, 'onBlur', { value, event })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onBlur]
  )

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target

      if (autoResize) {
        prepareAutosize()
      }

      const rows = getRows()

      const ret = dispatchCustomElementEvent(props, 'onChange', {
        value,
        rows,
        event,
      })
      if (ret !== false) {
        setValue(value)
        if (autoResize) {
          setAutosize(rows)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [autoResize, prepareAutosize, getRows, setAutosize, props.onChange]
  )

  const onKeyDownHandler = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const rows = getRows()
      const { value } = event.target as HTMLTextAreaElement
      dispatchCustomElementEvent(props, 'onKeyDown', {
        value,
        rows,
        event,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getRows, props.onKeyDown]
  )

  // Setup autoResize on mount
  useEffect(() => {
    const handleResize = () => setAutosize()

    if (autoResize && typeof window !== 'undefined') {
      setAutosize()
      try {
        // eslint-disable-next-line compat/compat
        const observer = new ResizeObserver((entries) => {
          window.requestAnimationFrame(() => {
            if (!Array.isArray(entries) || !entries.length) {
              return
            }
            setAutosize()
          })
        })
        observer.observe(document.body)
        resizeObserverRef.current = observer
      } catch (e) {
        window.addEventListener('resize', handleResize)
      }
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
        resizeObserverRef.current = null
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showStatus = getStatusState(status)
  const currentHasValue = hasValue(value)

  let TextareaElement: TextareaTextareaElement = props.textareaElement

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
    value: currentHasValue ? value : '',
    id,
    name: id,
    disabled: disabled || skeleton,
    'aria-placeholder': placeholder
      ? convertJsxToString(placeholder)
      : undefined,
    ...(attributes as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>),
    ...(typeof size === 'number' ? { size } : {}),
    onChange: onChangeHandler,
    onFocus: onFocusHandler,
    onBlur: onBlurHandler,
    onKeyDown: onKeyDownHandler,
  }

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
      currentHasValue && 'dnb-textarea--has-content',
      align && `dnb-textarea__align--${align}`,
      typeof size === 'string' && `dnb-textarea__size--${size}`,
      status && `dnb-textarea__status--${statusState}`,
      autoResize && 'dnb-textarea__autoresize',
      !autoResize &&
        resizeModifier &&
        `dnb-textarea__resize--${resizeModifier}`,
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
      createSkeletonClass('shape', skeleton, context)
    ),
  }

  const shellParams: Record<string, unknown> = {
    className: clsx('dnb-textarea__shell'),
  }

  if (disabled || skeleton) {
    shellParams['aria-disabled'] = true
  }

  const placeholderStyle =
    parseFloat(String(props.rows)) > 0
      ? {
          '--textarea-rows': parseFloat(String(props.rows)),
        }
      : null

  skeletonDOMAttributes(innerParams, skeleton, context)

  validateDOMAttributes(ownProps, textareaParams)
  validateDOMAttributes(null, innerParams)
  validateDOMAttributes(null, shellParams)

  if (TextareaElement && typeof TextareaElement === 'function') {
    TextareaElement = TextareaElement(textareaParams, textareaRef)
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
          textId={id + '-status'}
          text={status}
          state={statusState}
          noAnimation={statusNoAnimation}
          skeleton={skeleton}
          {...statusProps}
        />

        <span className="dnb-textarea__row">
          <span {...shellParams}>
            {(TextareaElement as React.ReactNode) || (
              <textarea ref={combinedRef} {...textareaParams} />
            )}

            {!currentHasValue &&
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
              id={id + '-suffix'}
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

TextareaComponent.displayName = 'Textarea'

const MemoizedTextarea = React.memo(
  React.forwardRef(TextareaComponent)
) as React.MemoExoticComponent<
  React.ForwardRefExoticComponent<
    TextareaProps & React.RefAttributes<HTMLTextAreaElement>
  >
> & {
  hasValue: typeof hasValue
  getValue: typeof getValue
  _formElement: boolean
  _supportsSpacingProps: boolean
}

MemoizedTextarea.hasValue = hasValue
MemoizedTextarea.getValue = getValue

withComponentMarkers(MemoizedTextarea, {
  _formElement: true,
  _supportsSpacingProps: true,
})

export default MemoizedTextarea
