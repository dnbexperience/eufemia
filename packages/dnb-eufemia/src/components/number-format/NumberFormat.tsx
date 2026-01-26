// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Web NumberFormat Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import clsx from 'clsx'
import Context from '../../shared/Context'
import {
  warn,
  isTrue,
  makeUniqueId,
  validateDOMAttributes,
  convertJsxToString,
  extendPropsWithContextInClassComponent,
  extendDeep,
  detectOutsideClick,
  isTouchDevice,
} from '../../shared/component-helper'
import { hasSelectedText, IS_IOS } from '../../shared/helpers'
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import Tooltip, { injectTooltipSemantic } from '../tooltip/Tooltip'
import { format, runIOSSelectionFix } from './NumberUtils'
import { SpacingProps } from '../space/types'

// TypeScript types
export type NumberFormatValue = number | string
export type NumberFormatPrefix =
  | React.ReactNode
  | ((...args: any[]) => any)
export type NumberFormatSuffix =
  | React.ReactNode
  | ((...args: any[]) => any)
export type NumberFormatCurrency = string | boolean
export type NumberFormatCurrencyPosition = 'auto' | 'before' | 'after'
export type NumberFormatCompact = 'short' | 'long' | boolean
export type NumberFormatLink = 'tel' | 'sms'
export type NumberFormatOptions = Record<string, unknown> | string
export type NumberFormatDecimals = number | string
export type NumberFormatElement = string
export type NumberFormatTooltip =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
export type NumberFormatChildren =
  | React.ReactNode
  | ((...args: any[]) => any)
export type NumberFormatProps = {
  id?: string
  value?: NumberFormatValue
  locale?: string
  prefix?: NumberFormatPrefix
  suffix?: NumberFormatSuffix
  currency?: NumberFormatCurrency
  currencyDisplay?:
    | 'code'
    | 'name'
    | 'symbol'
    | 'narrowSymbol'
    | ''
    | false
  currencyPosition?: NumberFormatCurrencyPosition
  compact?: NumberFormatCompact
  ban?: boolean
  nin?: boolean
  phone?: boolean
  org?: boolean
  percent?: boolean
  link?: NumberFormatLink
  monospace?: boolean
  options?: NumberFormatOptions
  decimals?: NumberFormatDecimals
  selectall?: boolean
  alwaysSelectall?: boolean
  copySelection?: boolean
  cleanCopyValue?: boolean
  rounding?: 'omit' | 'half-even' | 'half-up'
  clean?: boolean
  srLabel?: React.ReactNode
  element?: NumberFormatElement
  tooltip?: NumberFormatTooltip
  skeleton?: string | boolean
  className?: string
  children?: NumberFormatChildren
  // Additional props used in stories
  style?: React.CSSProperties
  lang?: string
}
export type NumberFormatAllProps = NumberFormatProps &
  Omit<
    React.HTMLProps<HTMLElement>,
    'prefix' | 'label' | 'placeholder' | 'children'
  > &
  SpacingProps

export const COPY_TOOLTIP_TIMEOUT = 3000

const defaultProps = {
  id: null,
  value: null,
  locale: null,
  prefix: null,
  suffix: null,
  currency: null,
  currencyDisplay: null, // code, name, symbol
  currencyPosition: null, // null, before, after
  compact: null,
  ban: null,
  nin: null,
  phone: null,
  org: null,
  percent: null,
  link: null,
  monospace: false,
  options: null,
  decimals: null,
  selectall: true,
  alwaysSelectall: false,
  copySelection: true,
  cleanCopyValue: false,
  rounding: null,
  clean: null,
  srLabel: null,
  element: 'span', // span or abbr
  tooltip: null,
  skeleton: null,

  className: null,
  children: null,
}

function NumberFormat(localProps: NumberFormatAllProps) {
  const context = React.useContext(Context)

  // Refs
  const _ref = React.useRef<HTMLElement>(null)
  const _selectionRef = React.useRef<HTMLSpanElement>(null)
  const _copyTooltipTimeoutRef = React.useRef<NodeJS.Timeout>(null)
  const outsideClickRef = React.useRef<{ remove: () => void }>(null)
  const cleanedValueRef = React.useRef<string>(null)

  // Generate stable ID
  const _id = React.useMemo(
    () =>
      localProps.tooltip ? localProps.id || makeUniqueId() : undefined,
    [localProps.tooltip, localProps.id]
  )

  // State
  const [selected, setSelected] = React.useState(false)
  const [omitCurrencySign, _setOmitCurrencySign] = React.useState(false)
  const [hover, setHover] = React.useState(false)
  const [copyTooltipActive, setCopyTooltipActive] = React.useState(false)
  const [copyTooltipText, setCopyTooltipText] =
    React.useState<string>(null)

  // componentDidMount equivalent
  React.useEffect(() => {
    // NB: This hack may be removed in future iOS versions
    // in order that iOS v13 can select something on the first try, we run this add range trick
    if (IS_IOS && !hasiOSFix) {
      hasiOSFix = true
      runIOSSelectionFix()
    }
  }, [])

  // componentWillUnmount equivalent
  React.useEffect(() => {
    return () => {
      outsideClickRef.current?.remove()
      if (_copyTooltipTimeoutRef.current) {
        clearTimeout(_copyTooltipTimeoutRef.current)
        _copyTooltipTimeoutRef.current = null
      }
    }
  }, [])

  const clearCopyTooltipTimeout = React.useCallback(() => {
    if (_copyTooltipTimeoutRef.current) {
      clearTimeout(_copyTooltipTimeoutRef.current)
      _copyTooltipTimeoutRef.current = null
    }
  }, [])

  const showCopyTooltip = React.useCallback(
    (message?: string) => {
      const translations =
        context.getTranslation?.(localProps)?.NumberFormat
      const label = message || translations?.clipboardCopy

      if (!label) {
        return
      }

      clearCopyTooltipTimeout()
      setCopyTooltipActive(true)
      setCopyTooltipText(label)

      _copyTooltipTimeoutRef.current = setTimeout(() => {
        setCopyTooltipActive(false)
      }, COPY_TOOLTIP_TIMEOUT)
    },
    [context, localProps, clearCopyTooltipTimeout]
  )

  const selectAll = React.useCallback(() => {
    try {
      const elem = _selectionRef.current || _ref.current
      if (elem) {
        const selection = window.getSelection()
        const range = document.createRange()
        range.selectNodeContents(elem)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    } catch (e) {
      warn(e)
    }
  }, [])

  const onBlurHandler = React.useCallback(() => {
    setSelected(false)
  }, [])

  const setFocus = React.useCallback(() => {
    if (isTouchDevice()) {
      return // stop here
    }
    setSelected(true)
  }, [])

  // Handle focus and selection after selected state changes
  React.useLayoutEffect(() => {
    if (selected) {
      _selectionRef.current?.focus({ preventScroll: true })
      selectAll()

      if (!isTrue(localProps.copySelection)) {
        outsideClickRef.current = detectOutsideClick(
          _ref.current,
          onBlurHandler
        )
      }
    }
  }, [selected, localProps.copySelection, selectAll, onBlurHandler])

  const shortcutHandler = React.useCallback(() => {
    const label =
      context.getTranslation(localProps)?.NumberFormat.clipboardCopy
    showCopyTooltip(label)
  }, [context, localProps, showCopyTooltip])

  const onContextMenuHandler = React.useCallback(() => {
    if (!hasSelectedText()) {
      setFocus()
    }
  }, [setFocus])

  const onClickHandler = React.useCallback(() => {
    if (
      (isTrue(localProps.selectall) ||
        isTrue(localProps.alwaysSelectall)) &&
      !hasSelectedText()
    ) {
      setFocus()
    }
  }, [localProps.selectall, localProps.alwaysSelectall, setFocus])

  const runFix = React.useCallback((comp, className) => {
    if (typeof comp === 'function') {
      comp = comp()
    }
    if (React.isValidElement(comp)) {
      return React.cloneElement(comp, {
        className: clsx(comp.props.className, className),
      })
    }
    return <span className={className}>{comp}</span>
  }, [])

  const onMouseEnter = React.useCallback(() => {
    setHover(true)
  }, [])

  const onMouseLeave = React.useCallback(() => {
    setHover(false)
  }, [])

  const translations = context.getTranslation(localProps).NumberFormat

  // consume the global context
  const props = extendPropsWithContextInClassComponent(
    localProps,
    defaultProps,
    translations,
    context.NumberFormat
  )

  const {
    id, // eslint-disable-line
    value: _value,
    prefix,
    suffix,
    children,
    currency,
    currencyDisplay,
    currencyPosition,
    compact,
    ban,
    nin,
    phone,
    org,
    percent,
    link: _link,
    monospace,
    tooltip,
    skeleton,
    options,
    locale,
    decimals,
    rounding,
    clean,
    selectall,
    copySelection,
    cleanCopyValue,
    srLabel,
    element,
    className,

    alwaysSelectall, // eslint-disable-line
    ..._rest
  } = props
  let rest = _rest

  let link = _link
  let value = _value

  if (value === null && children !== null) {
    value = children
  }

  let usedCurrencyPosition = currencyPosition
  if (currencyDisplay === 'code' && !usedCurrencyPosition) {
    usedCurrencyPosition = 'before'
  }
  const formatOptions = {
    locale,
    currency,
    currencyDisplay,
    currencyPosition: usedCurrencyPosition,
    omitCurrencySign: omitCurrencySign,
    compact,
    ban,
    nin,
    phone,
    org,
    percent,
    decimals,
    rounding,
    options,
    clean: isTrue(clean),
    cleanCopyValue: isTrue(cleanCopyValue),
    returnAria: true,
    invalidAriaText:
      locale && locale !== context.locale
        ? null
        : translations?.notAvailable,
  }

  // use only the props from context, who are available here anyway
  const useContext = extendDeep({ locale: null, currency: null }, context)

  if (useContext) {
    if (useContext.locale && !locale) {
      formatOptions.locale = useContext.locale
    }

    // only replace if the prop is "true" and not actually a currency
    if (useContext.currency && isTrue(currency)) {
      formatOptions.options = formatOptions.options
        ? { ...formatOptions.options }
        : {}
      formatOptions.options.currency = useContext.currency
    }
  }

  const result = format(value, formatOptions)
  const { cleanedValue, locale: lang } = result
  let { aria, number: display } = result
  cleanedValueRef.current = cleanedValue

  if (prefix) {
    display = (
      <>
        {runFix(prefix, 'dnb-number-format__prefix')} {display}
      </>
    )
    aria = String(
      `${convertJsxToString(
        runFix(prefix, 'dnb-number-format__prefix')
      )} ${aria}`
    )
  }
  if (suffix) {
    display = (
      <>
        {display} {runFix(suffix, 'dnb-number-format__suffix')}
      </>
    )
    aria = `${aria} ${convertJsxToString(
      runFix(suffix, 'dnb-number-format__suffix')
    )}`
  }

  if (tooltip) {
    rest = injectTooltipSemantic(rest)
  }

  const attributes = {
    lang,
    ref: _ref,
    className: clsx(
      'dnb-number-format',
      className,
      (isTrue(currency) || typeof currency === 'string') &&
        'dnb-number-format--currency',
      isTrue(selectall) && 'dnb-number-format--selectall',
      selected && 'dnb-number-format--selected',
      link && 'dnb-anchor',
      monospace && 'dnb-number-format--monospace',
      createSpacingClasses(localProps)
    ),

    // Makes it possible for NVDA to read on mouse over
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,

    ...rest,
  }

  const displayParams = {}
  if (isTrue(selectall) || isTrue(copySelection)) {
    displayParams.onClick = onClickHandler
    displayParams.onContextMenu = onContextMenuHandler
  }

  validateDOMAttributes(localProps, attributes)
  skeletonDOMAttributes(attributes, skeleton, context)

  if (link) {
    if (isTrue(link)) {
      link = 'tel'
    }
    return (
      <a href={`${link}:${display}`} {...attributes}>
        {display}
      </a>
    )
  }

  const Element = element

  return (
    <Element {...attributes}>
      <span
        className={clsx(
          'dnb-number-format__visible',
          createSkeletonClass('font', skeleton, context)
        )}
        // Makes it possible for NVDA to read on mouse over
        aria-hidden={!hover}
        {...displayParams}
      >
        {display}
      </span>

      {/* Used for VoiceOver and NVDA when navigating with arrow keys */}
      <span
        className="dnb-sr-only"
        // Use "data-text" so Chrome does not copy the HTML as content, when pasting it in Outlook etc.
        data-text={
          srLabel ? `${convertJsxToString(srLabel)}${' '}${aria}` : aria
        }
      />

      {isTrue(copySelection) && (
        <span
          className="dnb-number-format__selection dnb-no-focus"
          ref={_selectionRef}
          tabIndex={-1}
          onBlur={onBlurHandler}
          onCopy={shortcutHandler}
          aria-hidden
        >
          {selected && cleanedValue}
        </span>
      )}

      {tooltip && (
        <Tooltip
          id={_id + '-tooltip'}
          targetElement={_ref}
          tooltip={tooltip}
        />
      )}

      {copyTooltipActive && (
        <Tooltip
          active={copyTooltipActive}
          targetElement={_ref}
          showDelay={0}
          hideDelay={0}
          triggerOffset={8}
        >
          {copyTooltipText}
        </Tooltip>
      )}
    </Element>
  )
}

let hasiOSFix = false

NumberFormat._supportsSpacingProps = true
NumberFormat.defaultProps = defaultProps

export default NumberFormat
