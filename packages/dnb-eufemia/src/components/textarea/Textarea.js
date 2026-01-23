/**
 * Web Textarea Component
 */

import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import TextCounter from '../../fragments/text-counter/TextCounter'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
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

// Helper functions (previously static methods)
const hasValue = (value) => {
  return (
    ((typeof value === 'string' || typeof value === 'number') &&
      String(value).length > 0) ||
    false
  )
}

const getValue = (props) => {
  const value = processChildren(props)
  if (value === '' || hasValue(value)) {
    return value
  }
  return props.value
}

const propTypes = {
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

const defaultProps = {
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

/**
 * The textarea component is an umbrella component for all textareas which share the same style as the classic `text` textarea field.
 */
const TextareaComponent = (localProps) => {
  const context = useContext(Context)

  // Refs - initialize before using props
  const _ref = useRef(null)
  const _idRef = useRef(localProps.id || makeUniqueId())
  const _heightOffsetRef = useRef(undefined)
  const resizeObserverRef = useRef(null)
  const resizeModifierRef = useRef(null)

  // Get extended props with context (call once per render)
  const props = extendPropsWithContext(
    localProps,
    defaultProps,
    { skeleton: context?.skeleton },
    context.getTranslation(localProps).Textarea,
    pickFormElementProps(context?.formElement),
    context.Textarea
  )

  // State management
  const [textareaState, setTextareaState] = useState(
    props.textareaState || 'virgin'
  )
  const [value, setValue] = useState(null)
  const [_value, set_value] = useState(null)

  // Initialize resize modifier (previously in constructor)
  useEffect(() => {
    try {
      if (typeof navigator !== 'undefined') {
        const modifier =
          /Firefox|Edg/.test(navigator.userAgent) ||
          (/Chrome/.test(navigator.userAgent) &&
            /Win/.test(navigator.platform))
            ? 'large'
            : false

        if (!modifier) {
          resizeModifierRef.current =
            /Safari|Chrome/.test(navigator.userAgent) &&
            /Mac/.test(navigator.platform)
              ? 'medium'
              : false
        } else {
          resizeModifierRef.current = modifier
        }
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  // Helper methods
  const getLineHeight = useCallback(() => {
    return parseFloat(getComputedStyle(_ref.current).lineHeight) || 0
  }, [])

  const getRows = useCallback(() => {
    return Math.floor(_ref.current.scrollHeight / getLineHeight()) || 1
  }, [getLineHeight])

  const prepareAutosize = useCallback(() => {
    const elem = _ref.current
    if (!elem) {
      return
    }
    try {
      elem.style.height = 'auto'
    } catch (e) {
      warn(e)
    }
  }, [])

  const setAutosize = useCallback(
    (rows = null) => {
      const elem = _ref.current
      if (!elem) {
        return
      }
      try {
        if (typeof _heightOffsetRef.current === 'undefined') {
          _heightOffsetRef.current = elem.offsetHeight - elem.clientHeight
        }

        elem.style.height = 'auto'

        const lineHeight = getLineHeight()
        let newHeight = elem.scrollHeight + _heightOffsetRef.current
        if (!rows) {
          rows = getRows()
        }

        if (rows === 1) {
          if (newHeight > lineHeight) {
            newHeight = lineHeight
          }
        }

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
    },
    [getLineHeight, getRows, props.autoresizeMaxRows]
  )

  // Event handlers
  const onFocusHandler = useCallback(
    (event) => {
      const { value: currentValue } = _ref.current
      setValue(currentValue)
      setTextareaState('focus')
      dispatchCustomElementEvent({ props: localProps }, 'onFocus', {
        value: currentValue,
        event,
      })
    },
    [localProps]
  )

  const onBlurHandler = useCallback(
    (event) => {
      const { value: currentValue } = event.target
      setValue(currentValue)
      setTextareaState(hasValue(currentValue) ? 'dirty' : 'initial')
      dispatchCustomElementEvent({ props: localProps }, 'onBlur', {
        value: currentValue,
        event,
      })
    },
    [localProps]
  )

  const onChangeHandler = useCallback(
    (event) => {
      const { value: currentValue } = event.target

      const autoresize = isTrue(props.autoresize)

      if (autoresize) {
        prepareAutosize()
      }

      const rows = getRows(currentValue)

      const ret = dispatchCustomElementEvent(
        { props: localProps },
        'onChange',
        {
          value: currentValue,
          rows,
          event,
        }
      )
      if (ret !== false) {
        setValue(currentValue)
        if (autoresize) {
          setAutosize(rows)
        }
      }
    },
    [localProps, props.autoresize, prepareAutosize, getRows, setAutosize]
  )

  const onKeyDownHandler = useCallback(
    (event) => {
      const rows = getRows()
      const { value: currentValue } = event.target
      dispatchCustomElementEvent({ props: localProps }, 'onKeyDown', {
        value: currentValue,
        rows,
        event,
      })
    },
    [localProps, getRows]
  )

  // Effect for getDerivedStateFromProps logic
  useEffect(() => {
    const currentValue = getValue(localProps)
    if (
      currentValue !== 'initval' &&
      currentValue !== value &&
      currentValue !== _value
    ) {
      if (
        currentValue !== value &&
        typeof localProps.onStateUpdate === 'function'
      ) {
        dispatchCustomElementEvent(
          { props: localProps },
          'onStateUpdate',
          {
            value: currentValue,
          }
        )
      }
      setValue(currentValue)
    }
    if (localProps.textareaState) {
      setTextareaState(localProps.textareaState)
    }
    set_value(localProps.value)
  }, [
    localProps,
    localProps.value,
    localProps.textareaState,
    value,
    _value,
  ])

  // Effect for innerRef
  useEffect(() => {
    if (props.innerRef) {
      if (typeof props.innerRef === 'function') {
        props.innerRef(_ref.current)
      } else {
        props.innerRef.current = _ref.current
      }
    }
  }, [props.innerRef])

  // Effect for componentDidMount and componentWillUnmount
  useEffect(() => {
    if (isTrue(props.autoresize) && typeof window !== 'undefined') {
      setAutosize()
      try {
        resizeObserverRef.current = new ResizeObserver((entries) => {
          window.requestAnimationFrame(() => {
            if (!Array.isArray(entries) || !entries.length) {
              return
            }
            setAutosize()
          })
        })
        resizeObserverRef.current.observe(document.body)
      } catch (e) {
        window.addEventListener('resize', setAutosize)
      }
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
        resizeObserverRef.current = null
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', setAutosize)
      }
    }
  }, [props.autoresize, setAutosize])

  // Render logic
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
    value: _valueProp, //eslint-disable-line
    textareaElement: _textareaElement, //eslint-disable-line
    innerRef: _innerRef, //eslint-disable-line

    ...attributes
  } = props

  const id = _idRef.current
  const showStatus = getStatusState(status)
  const hasCurrentValue = hasValue(value)

  let { textareaElement: TextareaElement } = props

  const usedTextareaAttributes = textareaAttributes
    ? typeof textareaAttributes === 'string'
      ? JSON.parse(textareaAttributes)
      : textareaAttributes
    : {}

  const textareaParams = {
    className: clsx(
      'dnb-textarea__textarea',
      'dnb-input__border',
      textareaClass
    ),
    role: 'textbox',
    value: hasCurrentValue ? value : '',
    id,
    name: id,
    disabled: isTrue(disabled) || isTrue(skeleton),
    'aria-placeholder': placeholder
      ? convertJsxToString(placeholder)
      : undefined,
    ...attributes,
    ...usedTextareaAttributes,
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
      hasCurrentValue && 'dnb-textarea--has-content',
      align && `dnb-textarea__align--${align}`,
      size && `dnb-textarea__size--${size}`,
      status && `dnb-textarea__status--${statusState}`,
      autoresize && 'dnb-textarea__autoresize',
      !autoresize &&
        resizeModifierRef.current &&
        `dnb-textarea__resize--${resizeModifierRef.current}`,
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
    className: clsx(
      'dnb-textarea__inner',
      createSkeletonClass('shape', skeleton, context)
    ),
  }

  const shellParams = {
    className: clsx('dnb-textarea__shell'),
  }

  if (isTrue(disabled) || isTrue(skeleton)) {
    shellParams['aria-disabled'] = true
  }

  const placeholderStyle =
    parseFloat(props.rows) > 0
      ? {
          '--textarea-rows': parseFloat(props.rows),
        }
      : null

  skeletonDOMAttributes(innerParams, skeleton, context)

  validateDOMAttributes(localProps, textareaParams)
  validateDOMAttributes(null, innerParams)
  validateDOMAttributes(null, shellParams)

  if (TextareaElement && typeof TextareaElement === 'function') {
    TextareaElement = TextareaElement(textareaParams, _ref)
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
            {TextareaElement || (
              <textarea ref={_ref} {...textareaParams} />
            )}

            {!hasCurrentValue &&
              placeholder &&
              (textareaState !== 'focus' || keepPlaceholder) && (
                <span
                  className={clsx(
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
              id={id + '-suffix'}
              context={currentProps}
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

const Textarea = React.memo(TextareaComponent)

Textarea.propTypes = propTypes
Textarea.defaultProps = defaultProps
Textarea._formElement = true
Textarea._supportsSpacingProps = true

export default Textarea
