/**
 * Web NumberFormat Component
 */

import {
  createElement,
  isValidElement,
  memo,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'
import type {
  CSSProperties,
  ElementType,
  HTMLProps,
  ReactNode,
} from 'react'
import useMountEffect from '../../shared/helpers/useMountEffect'
import { useIsomorphicLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import clsx from 'clsx'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import Context, { type ContextProps } from '../../shared/Context'
import useId from '../../shared/helpers/useId'
import {
  warn,
  validateDOMAttributes,
  convertJsxToString,
  extendExistingPropsWithContext,
  extendDeep,
  detectOutsideClick,
  isTouchDevice,
  removeUndefinedProps,
} from '../../shared/component-helper'
import { hasSelectedText, IS_IOS } from '../../shared/helpers'
import { useSpacing } from '../space/SpacingUtils'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import Tooltip, { injectTooltipSemantic } from '../tooltip/Tooltip'
import { runIOSSelectionFix, formatNumber, formatCurrency } from './utils'
import type {
  NumberFormatCurrencyPosition as NumberFormatCurrencyPositionBase,
  NumberFormatOptions,
  NumberFormatOptionParams,
  NumberFormatReturnValue,
  NumberFormatValue,
} from './utils'
import type { SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../Skeleton'

// TypeScript types
export type { NumberFormatOptions } from './utils'
export type { NumberFormatValue } from './utils'
export type NumberFormatPrefix = ReactNode | (() => ReactNode)
export type NumberFormatSuffix = ReactNode | (() => ReactNode)
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
export type NumberFormatDecimals = number
export type NumberFormatElement = string
export type NumberFormatTooltip = string | (() => ReactNode) | ReactNode
export type NumberFormatChildren = ReactNode | (() => ReactNode)
export type NumberFormatProps = {
  id?: string
  /** The numeric or string value to format. */
  value?: NumberFormatValue
  /** BCP 47 locale string for formatting, e.g. `nb-NO`, `en-US`. Defaults to context locale. */
  locale?: string
  /** Content placed before the formatted value. Can be a string or React element. */
  prefix?: NumberFormatPrefix
  /** Content placed after the formatted value. Can be a string or React element. */
  suffix?: NumberFormatSuffix
  /** Formats the value as a currency. Pass `true` for locale default or a currency code string (e.g. `NOK`, `USD`). */
  currency?: NumberFormatCurrency
  /** How to display the currency: `code` (NOK), `name` (Norwegian krone), `symbol` (kr), or `narrowSymbol`. */
  currencyDisplay?:
    | 'code'
    | 'name'
    | 'symbol'
    | 'narrowSymbol'
    | ''
    | false
  /** Position of the currency symbol relative to the value: `auto`, `before`, or `after`. */
  currencyPosition?: NumberFormatCurrencyPosition
  /** Compact number display. `short` (e.g., 1.2K), `long` (e.g., 1.2 thousand), or `true` for short. */
  compact?: NumberFormatCompact
  /** If `true`, renders the value in monospace font for tabular alignment. */
  monospace?: boolean
  /** Additional `Intl.NumberFormat` options for custom formatting. */
  options?: NumberFormatOptions
  /** Fixed number of decimal digits to display. */
  decimals?: NumberFormatDecimals
  /** If `true`, selects the entire value text on click. */
  selectAll?: boolean
  /** If `true`, keeps the value text selected at all times after click. */
  alwaysSelectAll?: boolean
  /** If `true`, copies the selected value to clipboard on selection. */
  copySelection?: boolean
  /** If `true`, strips formatting characters (spaces, currency symbols) from the copied value. */
  cleanCopyValue?: boolean
  /** Rounding strategy: `omit` (truncate), `half-even` (banker's rounding), or `half-up`. */
  rounding?: 'omit' | 'half-even' | 'half-up'
  /** Controls display of positive/negative signs: `auto`, `always`, `exceptZero`, `negative`, `never`. */
  signDisplay?: NumberFormatSignDisplay
  /** If `true`, strips trailing zeroes from decimal values. */
  clean?: boolean
  /** Screen-reader-only label for the formatted value for accessibility. */
  srLabel?: ReactNode
  /** HTML element to render as. Defaults to `span`. */
  element?: NumberFormatElement
  /** Tooltip content shown on hover over the formatted value. */
  tooltip?: NumberFormatTooltip
  /** If `true`, renders a skeleton loading placeholder instead of the value. */
  skeleton?: SkeletonShow
  className?: string
  children?: NumberFormatChildren
  style?: CSSProperties
  lang?: string
}
/**
 * Private formatter injection used by the `NumberFormat.*` variant wrappers
 * to pick the minimal formatter needed and enable tree shaking.
 *
 * Not part of the public API – variants set it via the
 * `NumberFormat.withFormatter(Component, formatter)` helper below.
 */
/**
 * Contract used by `__format` – the formatter is always invoked with
 * `returnAria: true`, so it always returns the full `NumberFormatReturnValue`.
 * This is a strict sub-type of the public `NumberFormatFunction` (which also
 * supports the non-aria, string-returning overload).
 */
export type NumberFormatInternalFormatter = (
  value: NumberFormatValue | null,
  options: NumberFormatOptionParams & { returnAria: true }
) => NumberFormatReturnValue

export type NumberFormatInternalProps = {
  /** @internal */
  __format?: NumberFormatInternalFormatter
}

export type NumberFormatAllProps = NumberFormatProps &
  Omit<
    HTMLProps<HTMLElement>,
    'prefix' | 'label' | 'placeholder' | 'children'
  > &
  SpacingProps &
  NumberFormatInternalProps

export const COPY_TOOLTIP_TIMEOUT = 3000

const numberFormatDefaultProps: Partial<NumberFormatAllProps> = {
  id: null,
  value: null,
  locale: null,
  prefix: null,
  suffix: null,
  currency: null,
  currencyDisplay: null,
  currencyPosition: null,
  compact: null,
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

function runFix(comp: unknown, className: string): ReactNode {
  if (typeof comp === 'function') {
    comp = comp()
  }
  if (isValidElement(comp)) {
    const elemProps = comp.props as Record<string, unknown>
    return createElement(comp.type as ElementType, {
      ...elemProps,
      className: clsx(elemProps.className as string, className),
    })
  }
  return <span className={className}>{comp as ReactNode}</span>
}

function NumberFormat(ownProps: NumberFormatAllProps) {
  const context = useContext(Context) as ContextProps

  // Apply defaults early so callbacks see proper values
  const propsWithDefaults = {
    ...numberFormatDefaultProps,
    ...removeUndefinedProps({ ...ownProps }),
  }

  const propsWithDefaultsRef = useRef(propsWithDefaults)
  propsWithDefaultsRef.current = propsWithDefaults

  const elRef = useRef<HTMLElement>(null)
  const selectionRef = useRef<HTMLElement>(null)
  const generatedId = useId(propsWithDefaults.id)
  const copyTooltipTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null)
  const outsideClickRef = useRef<{ remove: () => void } | null>(null)
  const cleanedValueRef = useRef<string | undefined>(undefined)

  const [selected, setSelected] = useState(false)
  const [hover, setHover] = useState(false)
  const [copyTooltipActive, setCopyTooltipActive] = useState(false)
  const [copyTooltipText, setCopyTooltipText] = useState<string | null>(
    null
  )

  const needsFocusRef = useRef(false)

  // iOS selection fix on mount + cleanup on unmount
  useMountEffect(() => {
    if (IS_IOS && !hasiOSFix) {
      hasiOSFix = true
      runIOSSelectionFix()
    }

    return () => {
      outsideClickRef.current?.remove()
      if (copyTooltipTimeoutRef.current) {
        clearTimeout(copyTooltipTimeoutRef.current)
      }
    }
  })

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
  // Use useIsomorphicLayoutEffect to apply focus and text selection before paint,
  // avoiding a visible frame without focus/selection.
  useIsomorphicLayoutEffect(() => {
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
  }, [
    selected,
    doSelectAll,
    onBlurHandler,
    propsWithDefaults.copySelection,
  ])

  const showCopyTooltip = useCallback(
    (message?: string) => {
      const translations = (
        context.getTranslation?.(propsWithDefaultsRef.current) as
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
    [context, clearCopyTooltipTimeout]
  )

  const shortcutHandler = useCallback(() => {
    const label = (
      context.getTranslation?.(propsWithDefaultsRef.current) as
        | Record<string, Record<string, string>>
        | undefined
    )?.NumberFormat?.clipboardCopy
    showCopyTooltip(label)
  }, [context, showCopyTooltip])

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
  }, [
    propsWithDefaults.selectAll,
    propsWithDefaults.alwaysSelectAll,
    setFocus,
  ])

  const onMouseEnter = useCallback(() => {
    setHover(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setHover(false)
  }, [])

  // Render logic
  const translations = context.getTranslation?.(propsWithDefaults)
    ?.NumberFormat as Record<string, string> | undefined

  const props = extendExistingPropsWithContext(
    propsWithDefaults,
    numberFormatDefaultProps,
    translations as Record<string, unknown>,
    context?.NumberFormat as Record<string, unknown>
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
    // Variant-specific formatter injection (see NumberFormat.withFormatter).
    __format,
    ..._rest
  } = props
  let rest: Record<string, unknown> = _rest

  let value: NumberFormatValue | null = _value ?? null

  if (value === null && children !== null) {
    value = children as NumberFormatValue
  }

  let usedCurrencyPosition = currencyPosition
  if (currencyDisplay === 'code' && !usedCurrencyPosition) {
    usedCurrencyPosition = 'before'
  }
  const formatOptions: NumberFormatOptionParams & { returnAria: true } = {
    locale,
    currency,
    currencyDisplay,
    currencyPosition: usedCurrencyPosition,
    compact,
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
  const useCtx = extendDeep({ locale: null, currency: null }, context) as {
    locale?: string
    currency?: string
    [key: string]: unknown
  }

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

  const formatter =
    __format ??
    (currency === true || typeof currency === 'string'
      ? formatCurrency
      : formatNumber)
  const result = formatter(value, formatOptions)
  const { cleanedValue, locale: lang } = result
  let { aria } = result
  let display: ReactNode = result.number
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

  const attributes = useSpacing(ownProps, {
    lang,
    ref: elRef,
    className: clsx(
      'dnb-number-format',
      className,
      (currency === true || typeof currency === 'string') &&
        'dnb-number-format--currency',
      selectAllProp && 'dnb-number-format--select-all',
      selected && 'dnb-number-format--selected',
      monospace && 'dnb-number-format--monospace'
    ),
    // Makes it possible for NVDA to read on mouse over
    onMouseEnter,
    onMouseLeave,

    ...rest,
  })

  const displayParams: Record<string, unknown> = {}
  if (selectAllProp || copySelection) {
    displayParams.onClick = onClickHandler
    displayParams.onContextMenu = onContextMenuHandler
  }

  validateDOMAttributes(ownProps, attributes)
  skeletonDOMAttributes(attributes, skeleton as boolean, context)

  const Element = element as ElementType

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
          id={generatedId + '-tooltip'}
          targetElement={elRef}
          tooltip={tooltip as ReactNode}
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

const MemoizedNumberFormat = memo(NumberFormat)

withComponentMarkers(MemoizedNumberFormat, { _supportsSpacingProps: true })

export default MemoizedNumberFormat
