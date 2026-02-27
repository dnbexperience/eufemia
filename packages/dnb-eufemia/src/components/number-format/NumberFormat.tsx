/**
 * Web NumberFormat Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import clsx from 'clsx'
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
import { format, runIOSSelectionFix } from './NumberUtils'
import { SpacingProps } from '../space/types'
import type { NumberFormatOptions } from './NumberUtils'
import { SkeletonShow } from '../Skeleton'

// Export the Hooks
export { default as useNumberFormat } from './useNumberFormat'
export { default as useNumberFormatWithParts } from './useNumberFormatWithParts'

// TypeScript types
export type { NumberFormatOptions } from './NumberUtils'
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
export type NumberFormatSignDisplay =
  | 'auto'
  | 'always'
  | 'exceptZero'
  | 'negative'
  | 'never'
export type NumberFormatDecimals = number
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
  skeleton?: SkeletonShow
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

interface NumberFormatState {
  selected: boolean
  omitCurrencySign: boolean
  hover: boolean
  copyTooltipActive: boolean
  copyTooltipText: string | null
}

export default class NumberFormat extends React.PureComponent<
  NumberFormatAllProps,
  NumberFormatState
> {
  static contextType = Context
  context!: ContextProps

  static defaultProps = {
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
    selectAll: true,
    alwaysSelectAll: false,
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

  _ref = React.createRef<HTMLElement>()
  _selectionRef = React.createRef<HTMLElement>()
  _id: string | undefined
  _copyTooltipTimeout: ReturnType<typeof setTimeout> | null = null
  outsideClick: { remove: () => void } | null = null
  cleanedValue: string | undefined

  constructor(props: NumberFormatAllProps) {
    super(props)

    this._id = props.tooltip ? props.id || makeUniqueId() : undefined
    this.state = {
      selected: false,
      omitCurrencySign: false,
      hover: false,
      copyTooltipActive: false,
      copyTooltipText: null,
    }
  }

  componentDidMount() {
    // NB: This hack may be removed in future iOS versions
    // in order that iOS v13 can select something on the first try, we run this add range trick
    if (IS_IOS && !hasiOSFix) {
      hasiOSFix = true
      runIOSSelectionFix()
    }
  }

  clearCopyTooltipTimeout = () => {
    if (this._copyTooltipTimeout) {
      clearTimeout(this._copyTooltipTimeout)
      this._copyTooltipTimeout = null
    }
  }

  showCopyTooltip = (message?: string) => {
    const translations = (
      this.context.getTranslation?.(this.props) as
        | Record<string, Record<string, string>>
        | undefined
    )?.NumberFormat
    const label = message || translations?.clipboardCopy

    if (!label) {
      return
    }

    this.clearCopyTooltipTimeout()
    this.setState(
      { copyTooltipActive: true, copyTooltipText: label },
      () => {
        this._copyTooltipTimeout = setTimeout(() => {
          this.setState({
            copyTooltipActive: false,
          })
        }, COPY_TOOLTIP_TIMEOUT)
      }
    )
  }

  shortcutHandler = () => {
    const label = (
      this.context.getTranslation?.(this.props) as
        | Record<string, Record<string, string>>
        | undefined
    )?.NumberFormat?.clipboardCopy
    this.showCopyTooltip(label)
  }

  onBlurHandler = () => {
    this.setState({ selected: false })
  }

  onContextMenuHandler = () => {
    if (!hasSelectedText()) {
      this.setFocus()
    }
  }

  onClickHandler = () => {
    if (
      (this.props.selectAll || this.props.alwaysSelectAll) &&
      !hasSelectedText()
    ) {
      this.setFocus()
    }
  }

  componentWillUnmount() {
    this.outsideClick?.remove()
    this.clearCopyTooltipTimeout()
  }

  setFocus() {
    if (isTouchDevice()) {
      return // stop here
    }
    this.setState({ selected: true }, () => {
      this._selectionRef.current?.focus({ preventScroll: true })
      this.selectAll()

      if (!this.props.copySelection) {
        this.outsideClick = detectOutsideClick(
          this._ref.current,
          this.onBlurHandler
        )
      }
    })
  }

  selectAll() {
    try {
      const elem = this._selectionRef.current || this._ref.current
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
  }

  runFix(comp: unknown, className: string): React.ReactNode {
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

  onMouseEnter = () => {
    this.setState({ hover: true })
  }

  onMouseLeave = () => {
    this.setState({ hover: false })
  }

  render() {
    const translations = this.context.getTranslation?.(this.props)
      ?.NumberFormat as Record<string, string> | undefined

    // consume the global context
    const props = extendPropsWithContextInClassComponent(
      this.props,
      NumberFormat.defaultProps,
      translations as Record<string, unknown>,
      (this.context as Record<string, unknown>).NumberFormat as Record<
        string,
        unknown
      >
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
      signDisplay,
      clean,
      selectAll,
      copySelection,
      cleanCopyValue,
      srLabel,
      element,
      className,

      alwaysSelectAll, // eslint-disable-line
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
      omitCurrencySign: this.state.omitCurrencySign,
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
        locale && locale !== this.context.locale
          ? null
          : translations?.notAvailable,
    }

    // use only the props from context, who are available here anyway
    const useContext = extendDeep(
      { locale: null, currency: null },
      this.context
    ) as { locale?: string; currency?: string; [key: string]: unknown }

    if (useContext) {
      if (useContext.locale && !locale) {
        formatOptions.locale = useContext.locale
      }

      // only replace if the prop is "true" and not actually a currency
      if (useContext.currency && currency === true) {
        formatOptions.options = formatOptions.options
          ? { ...(formatOptions.options as object) }
          : {}
        ;(formatOptions.options as Record<string, unknown>).currency =
          useContext.currency
      }
    }

    const result = format(value as string | number, formatOptions)
    const { cleanedValue, locale: lang } = result
    let { aria, number: display } = result
    this.cleanedValue = cleanedValue

    if (prefix) {
      display = (
        <>
          {this.runFix(prefix, 'dnb-number-format__prefix')} {display}
        </>
      )
      aria = String(
        `${convertJsxToString(
          this.runFix(prefix, 'dnb-number-format__prefix')
        )} ${aria}`
      )
    }
    if (suffix) {
      const suffixElement = this.runFix(
        suffix,
        'dnb-number-format__suffix'
      )
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
      ref: this._ref,
      className: clsx(
        'dnb-number-format',
        className,
        (currency === true || typeof currency === 'string') &&
          'dnb-number-format--currency',
        selectAll && 'dnb-number-format--select-all',
        this.state.selected && 'dnb-number-format--selected',
        link && 'dnb-anchor',
        monospace && 'dnb-number-format--monospace',
        createSpacingClasses(this.props)
      ),

      // Makes it possible for NVDA to read on mouse over
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,

      ...rest,
    }

    const displayParams: Record<string, unknown> = {}
    if (selectAll || copySelection) {
      displayParams.onClick = this.onClickHandler
      displayParams.onContextMenu = this.onContextMenuHandler
    }

    validateDOMAttributes(this.props, attributes)
    skeletonDOMAttributes(attributes, skeleton as boolean, this.context)

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
            createSkeletonClass('font', skeleton as boolean, this.context)
          )}
          // Makes it possible for NVDA to read on mouse over
          aria-hidden={!this.state.hover}
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

        {copySelection && (
          <span
            className="dnb-number-format__selection dnb-no-focus"
            ref={this._selectionRef}
            tabIndex={-1}
            onBlur={this.onBlurHandler}
            onCopy={this.shortcutHandler}
            aria-hidden
          >
            {this.state.selected && cleanedValue}
          </span>
        )}

        {tooltip && (
          <Tooltip
            id={this._id + '-tooltip'}
            targetElement={this._ref}
            tooltip={tooltip as React.ReactNode}
          />
        )}

        {this.state.copyTooltipActive && (
          <Tooltip
            open={this.state.copyTooltipActive}
            targetElement={this._ref}
            showDelay={0}
            hideDelay={0}
            triggerOffset={8}
          >
            {this.state.copyTooltipText}
          </Tooltip>
        )}
      </Element>
    )
  }
}

let hasiOSFix = false

;(
  NumberFormat as typeof NumberFormat & { _supportsSpacingProps: boolean }
)._supportsSpacingProps = true
