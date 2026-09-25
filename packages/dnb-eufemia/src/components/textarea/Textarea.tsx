/**
 * Web Textarea Component
 */

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { memo, useCallback, useContext, useRef, useState } from 'react'
import type {
  CSSProperties,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react'
import useMountEffect from '../../shared/helpers/useMountEffect'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import { clsx } from 'clsx'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import TextCounter from '../../fragments/text-counter/TextCounter'
import useId from '../../shared/helpers/useId'
import {
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
import { useSpacing } from '../space/SpacingUtils'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import type { TextareaElement, TextareaProps } from './types'

export type * from './types'

const textareaDefaultProps = {
  value: 'initval',
  statusState: 'error',
  readOnly: false,
  labelDirection: 'vertical',
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

/**
 * The textarea component is an umbrella component for all textareas which share the same style as the classic `text` textarea field.
 */
export function TextareaComponent({ ref, ...ownProps }: TextareaProps) {
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
    context?.Textarea as Record<string, unknown>
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
    textareaClassName,
    readOnly,
    className,
    autoResize,
    hideResizeHandle,
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
  const combinedRef = useCombinedRef(ref, textareaRef)

  const id = useId(ownProps.id)

  const heightOffsetRef = useRef<number | undefined>(undefined)
  const appliedHeightRef = useRef<number | undefined>(undefined)
  const manualHeightRef = useRef<number | undefined>(undefined)
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

  // Sync value from props
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

  const preserveManualHeight = useCallback(() => {
    const elem = textareaRef.current
    const currentHeight = parseFloat(elem?.style.height)

    if (
      !hideResizeHandle &&
      Number.isFinite(currentHeight) &&
      appliedHeightRef.current !== undefined &&
      currentHeight !== appliedHeightRef.current
    ) {
      manualHeightRef.current = currentHeight
    }
  }, [hideResizeHandle])

  const prepareAutosize = useCallback(() => {
    const elem = textareaRef.current
    if (!elem) {
      return // stop here
    }
    try {
      preserveManualHeight()
      elem.style.height = 'auto'
    } catch (e) {
      warn('Textarea: Failed to prepare autosize:', e)
    }
  }, [preserveManualHeight])

  const setAutosize = useCallback(
    (rows: number | null = null) => {
      const elem = textareaRef.current
      if (!elem) {
        return // stop here
      }
      try {
        preserveManualHeight()

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

        const manualHeight = manualHeightRef.current
        if (!hideResizeHandle && manualHeight > newHeight) {
          newHeight = manualHeight
        } else {
          manualHeightRef.current = undefined
        }

        elem.style.height = newHeight + 'px'
        appliedHeightRef.current = newHeight
      } catch (e) {
        warn('Textarea: Failed to set autosize height:', e)
      }
    },
    [
      autoResizeMaxRows,
      getLineHeight,
      getRows,
      hideResizeHandle,
      preserveManualHeight,
    ]
  )

  const onFocusHandler = useCallback(
    (event: FocusEvent<HTMLTextAreaElement>) => {
      const { value } = textareaRef.current
      setValue(value)
      setTextareaState('focus')
      dispatchCustomElementEvent(props, 'onFocus', { value, event })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onFocus]
  )

  const onBlurHandler = useCallback(
    (event: FocusEvent<HTMLTextAreaElement>) => {
      const { value } = event.target
      setValue(value)
      setTextareaState(hasValue(value) ? 'dirty' : 'initial')
      dispatchCustomElementEvent(props, 'onBlur', { value, event })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onBlur]
  )

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
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
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
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

  // Keep a ref to the latest setAutosize so the mount-time ResizeObserver
  // and window listener always call the current version (avoids stale closure
  // if autoResizeMaxRows changes after mount).
  const setAutosizeRef = useRef(setAutosize)
  setAutosizeRef.current = setAutosize

  // Setup autoResize on mount
  useMountEffect(() => {
    const handleResize = () => setAutosizeRef.current()

    if (autoResize && typeof window !== 'undefined') {
      setAutosizeRef.current()
      try {
        const observer = new ResizeObserver((entries) => {
          window.requestAnimationFrame(() => {
            if (!Array.isArray(entries) || !entries.length) {
              return
            }
            setAutosizeRef.current()
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
  })

  const showStatus = getStatusState(status)
  const currentHasValue = hasValue(value)

  let TextareaElement: TextareaElement = props.textareaElement

  const textareaParams: TextareaHTMLAttributes<HTMLTextAreaElement> & {
    'aria-describedby'?: string
    [key: string]: unknown
  } = {
    className: clsx(
      'dnb-textarea__textarea',
      'dnb-input__border',
      textareaClassName
    ),
    role: 'textbox',
    value: currentHasValue ? value : '',
    id,
    name: id,
    disabled: disabled || skeleton,
    'aria-placeholder': placeholder
      ? convertJsxToString(placeholder)
      : undefined,
    ...(attributes as unknown as TextareaHTMLAttributes<HTMLTextAreaElement>),
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

  const mainParams = useSpacing(props, {
    className: clsx(
      'dnb-textarea',
      `dnb-textarea--${textareaState}`,
      disabled && 'dnb-textarea--disabled',
      currentHasValue && 'dnb-textarea--has-content',
      align && `dnb-textarea__align--${align}`,
      typeof size === 'string' && `dnb-textarea__size--${size}`,
      status && `dnb-textarea__status--${statusState}`,
      autoResize && 'dnb-textarea__autoresize',
      hideResizeHandle && 'dnb-textarea__hide-resize-handle',
      labelDirection && `dnb-textarea--${labelDirection}`,
      stretch && `dnb-textarea--stretch`,
      keepPlaceholder && `dnb-textarea--keep-placeholder`,
      'dnb-form-component',
      createSkeletonClass(null, skeleton),
      className
    ),
  })

  const innerParams = {
    className: clsx(
      'dnb-textarea__inner',
      createSkeletonClass('shape', skeleton, context)
    ),
  }

  const shellParams = {
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
            {(TextareaElement as ReactNode) || (
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
                  style={placeholderStyle as CSSProperties}
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
              {suffix as ReactNode}
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

const Textarea = memo(TextareaComponent)

withComponentMarkers(Textarea, {
  _formElement: true,
  _supportsSpacingProps: true,
})

export default Textarea
