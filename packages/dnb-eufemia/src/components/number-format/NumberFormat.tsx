/**
 * Web NumberFormat Component
 */

import React, {
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react'
import clsx from 'clsx'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import Context, { type ContextProps } from '../../shared/Context'
import {
  warn,
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
import type { NumberFormatCurrencyPosition as NumberFormatCurrencyPositionBase } from './NumberUtils'
import { format, runIOSSelectionFix } from './NumberUtils'
import type { SpacingProps } from '../../shared/types'

// TypeScript types
export type NumberFormatValue = number | string
export type NumberFormatPrefix = React.ReactNode | (() => React.ReactNode)
export type NumberFormatSuffix = React.ReactNode | (() => React.ReactNode)
export type NumberFormatCurrency = string | boolean
export type NumberFormatCurrencyPosition =
  | 'auto'
  | NumberFormatCurrencyPositionBase
export type NumberFormatCompact = 'short' | 'long' | boolean
export type NumberFormatLink = 'tel' | 'sms'
export type NumberFormatSignDisplay =
  | 'auto'
  | 'always'
  | 'exceptZero'
  | 'negative'
  | 'never'
export type NumberFormatOptions = Record<string, unknown> | string
export type NumberFormatDecimals = number | string
export type NumberFormatElement = string
export type NumberFormatTooltip =
  | string
  | (() => React.ReactNode)
  | React.ReactNode
export type NumberFormatChildren =
  | React.ReactNode
  | (() => React.ReactNode)
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
  selectAll?: boolean
  alwaysSelectAll?: boolean
  copySelection?: boolean
  cleanCopyValue?: boolean
  rounding?: 'omit' | 'half-even' | 'half-up'
  signDisplay?: NumberFormatSignDisplay
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

const numberFormatDefaultProps = {
  id: null,
  value: null,
  locale: null,
  prefix: null,
  suffix: null,
  currency: null,
  currencyDisplay: null,
  currencyPosition: null,
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
  selectAll: true,
  alwaysSelectAll: false,
  copySelection: true,
  cleanCopyValue: false,
  rounding: null,
  clean: null,
  srLabel: null,
  element: 'span',
  tooltip: null,
  skeleton: null,

  className: null,
  children: null,
}

let hasiOSFix = false

function runFix(comp: unknown, className: string): React.ReactNode {
  if (typeof comp === 'function') {
    comp = comp()
  }
  if (React.isValidElement(comp)) {
    const elemProps = comp.props as Record<string, unknown>
    return React.createElement(comp.type as React.ElementType, {
      ...elemProps,
      className: clsx(elemProps.className as string, className),
    })
  }
  return <span className={className}>{comp as React.ReactNode}</span>
}

function NumberFormat(ownProps: NumberFormatAllProps) {
  const context = useContext(Context) as ContextProps

  // Apply defaults early so callbacks see proper values
  const propsWithDefaults = { ...numberFormatDefaultProps, ...ownProps }

  const elRef = useRef<HTMLElement>(null)
  const selectionRef = useRef<HTMLElement>(null)
  const idRef = useRef(
    propsWithDefaults.tooltip
      ? propsWithDefaults.id || makeUniqueId()
      : undefined
  )
  const copyTooltipTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null)
  const outsideClickRef = useRef<{ remove: () => void } | null>(null)
  const cleanedValueRef = useRef<string | undefined>(undefined)

  const [selected, setSelected] = useState(false)
  const [omitCurrencySign] = useState(false)
  const [hover, setHover] = useState(false)
  const [copyTooltipActive, setCopyTooltipActive] = useState(false)
  const [copyTooltipText, setCopyTooltipText] = useState<string | null>(
    null
  )

  const needsFocusRef = useRef(false)

  // iOS selection fix on mount
  useEffect(() => {
    if (IS_IOS && !hasiOSFix) {
      hasiOSFix = true
      runIOSSelectionFix()
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      outsideClickRef.current?.remove()
      if (copyTooltipTimeoutRef.current) {
        clearTimeout(copyTooltipTimeoutRef.current)
      }
    }
  }, [])

  const clearCopyTooltipTimeout = useCallback(() => {
    if (copyTooltipTimeoutRef.current) {
      clearTimeout(copyTooltipTimeoutRef.current)
      copyTooltipTimeoutRef.current = null
    }
  }, [])

  const onBlurHandler = useCallback(() => {
    setSelected(false)
  }, [])

  const doSelectAll = useCallback(() => {
    try {
      const elem = selectionRef.current || elRef.current
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

  const setFocus = useCallback(() => {
    if (isTouchDevice()) {
      return // stop here
    }
    needsFocusRef.current = true
    setSelected(true)
  }, [])

  // Handle focus + selectAll after selected becomes true
  useEffect(() => {
    if (selected && needsFocusRef.current) {
      needsFocusRef.current = false
      selectionRef.current?.focus({ preventScroll: true })
      doSelectAll()

      if (!propsWithDefaults.copySelection) {
        outsideClickRef.current = detectOutsideClick(
          elRef.current,
          onBlurHandler
        )
      }
    }
  }, [selected, doSelectAll, onBlurHandler, propsWithDefaults.copySelection])

  const showCopyTooltip = useCallback(
    (message?: string) => {
      const translations = (
        context.getTranslation?.(propsWithDefaults) as
          | Record<string, Record<string, string>>
          | undefined
      )?.NumberFormat
      const label = message || translations?.clipboardCopy

      if (!label) {
        return // stop here
      }

      clearCopyTooltipTimeout()
      setCopyTooltipActive(true)
      setCopyTooltipText(label)

      copyTooltipTimeoutRef.current = setTimeout(() => {
        setCopyTooltipActive(false)
      }, COPY_TOOLTIP_TIMEOUT)
    },
    [context, propsWithDefaults, clearCopyTooltipTimeout]
  )

  const shortcutHandler = useCallback(() => {
    const label = (
      context.getTranslation?.(propsWithDefaults) as
        | Record<string, Record<string, string>>
        | undefined
    )?.NumberFormat?.clipboardCopy
    showCopyTooltip(label)
  }, [context, propsWithDefaults, showCopyTooltip])

  const onContextMenuHandler = useCallback(() => {
    if (!hasSelectedText()) {
      setFocus()
    }
  }, [setFocus])

  const onClickHandler = useCallback(() => {
    if (
      (propsWithDefaults.selectAll || propsWithDefaults.alwaysSelectAll) &&
      !hasSelectedText()
    ) {
      setFocus()
    }
  }, [propsWithDefaults.selectAll, propsWithDefaults.alwaysSelectAll, setFocus])

  const onMouseEnter = useCallback(() => {
    setHover(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setHover(false)
  }, [])

  // Render logic
  const translations = context.getTranslation?.(propsWithDefaults)
    ?.NumberFormat as Record<string, string> | undefined

  const props = extendPropsWithContextInClassComponent(
    propsWithDefaults,
    numberFormatDefaultProps,
    translations as Record<string, unknown>,
    (context as Record<string, unknown>).NumberFormat as Record<
      string,
      unknown
    >
  )

  const {
    id,
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
    signDisplay,
    clean,
    selectAll: selectAllProp,
    copySelection,
    cleanCopyValue,
    srLabel,
    element,
    className,

    alwaysSelectAll,
    ..._rest
  } = props
  let rest: Record<string, unknown> = _rest

  let link = _link
  let value: NumberFormatValue | NumberFormatChildren | null = _value

  if (value === null && children !== null) {
    value = children as NumberFormatValue
  }

  let usedCurrencyPosition = currencyPosition
  if (currencyDisplay === 'code' && !usedCurrencyPosition) {
    usedCurrencyPosition = 'before'
  }
  const formatOptions: Record<string, unknown> = {
    locale,
    currency,
    currencyDisplay,
    currencyPosition: usedCurrencyPosition,
    omitCurrencySign,
    compact,
    ban,
    nin,
    phone,
    org,
    percent,
    decimals,
    rounding,
    signDisplay,
    options,
    clean: clean,
    cleanCopyValue: cleanCopyValue,
    returnAria: true,
    invalidAriaText:
      locale && locale !== context.locale
        ? null
        : translations?.notAvailable,
  }

  // use only the props from context, who are available here anyway
  const useCtx = extendDeep(
    { locale: null, currency: null },
    context
  ) as { locale?: string; currency?: string; [key: string]: unknown }

  if (useCtx) {
    if (useCtx.locale && !locale) {
      formatOptions.locale = useCtx.locale
    }

    // only replace if the prop is "true" and not actually a currency
    if (useCtx.currency && currency === true) {
      formatOptions.options = formatOptions.options
        ? { ...(formatOptions.options as object) }
        : {}
      ;(formatOptions.options as Record<string, unknown>).currency =
        useCtx.currency
    }
  }

  const result = format(value as string | number, formatOptions)
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
    const suffixElement = runFix(suffix, 'dnb-number-format__suffix')
    const suffixStartsWithSlash =
      typeof suffix === 'string' && suffix.startsWith('/')
    const suffixSpace = suffixStartsWithSlash ? '' : ' '
    display = (
      <>
        {display}
        {suffixSpace}
        {suffixElement}
      </>
    )
    aria = `${aria}${suffixSpace}${convertJsxToString(suffixElement)}`
  }

  if (tooltip) {
    rest = injectTooltipSemantic(rest)
  }

  const attributes = {
    lang,
    ref: elRef,
    className: clsx(
      'dnb-number-format',
      className,
      (currency === true || typeof currency === 'string') &&
        'dnb-number-format--currency',
      selectAllProp && 'dnb-number-format--select-all',
      selected && 'dnb-number-format--selected',
      link && 'dnb-anchor',
      monospace && 'dnb-number-format--monospace',
      createSpacingClasses(ownProps)
    ),

    // Makes it possible for NVDA to read on mouse over
    onMouseEnter,
    onMouseLeave,

    ...rest,
  }

  const displayParams: Record<string, unknown> = {}
  if (selectAllProp || copySelection) {
    displayParams.onClick = onClickHandler
    displayParams.onContextMenu = onContextMenuHandler
  }

  validateDOMAttributes(ownProps, attributes)
  skeletonDOMAttributes(attributes, skeleton as boolean, context)

  if (link) {
    if (link) {
      link = 'tel'
    }
    const { ref: _ref, ...anchorAttributes } = attributes
    return (
      <a
        href={`${link}:${display}`}
        ref={_ref as React.RefObject<HTMLAnchorElement>}
        {...anchorAttributes}
      >
        {display}
      </a>
    )
  }

  const Element = element as React.ElementType

  return (
    <Element {...attributes}>
      <span
        className={clsx(
          'dnb-number-format__visible',
          createSkeletonClass('font', skeleton as boolean, context)
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
          srLabel
            ? `${convertJsxToString(srLabel)}${'\u00a0'}${aria}`
            : aria
        }
      />

      {copySelection && (
        <span
          className="dnb-number-format__selection dnb-no-focus"
          ref={selectionRef}
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
          id={idRef.current + '-tooltip'}
          targetElement={elRef}
          tooltip={tooltip as React.ReactNode}
        />
      )}

      {copyTooltipActive && (
        <Tooltip
          open={copyTooltipActive}
          targetElement={elRef}
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

withComponentMarkers(NumberFormat, { _supportsSpacingProps: true })

export default NumberFormat
