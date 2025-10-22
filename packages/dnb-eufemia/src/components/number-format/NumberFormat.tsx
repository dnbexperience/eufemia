// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Web NumberFormat Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import classnames from 'classnames'
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

export default class NumberFormat extends React.PureComponent<NumberFormatAllProps> {
  static contextType = Context

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

  constructor(props) {
    super(props)
    this._ref = React.createRef()
    this._selectionRef = React.createRef()

    this._id = props.tooltip ? props.id || makeUniqueId() : undefined
    this._copyTooltipTimeout = null
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

  showCopyTooltip = (message) => {
    const translations = this.context.getTranslation?.(this.props)
      ?.NumberFormat
    const label = message || translations?.clipboard_copy

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
    const label = this.context.getTranslation(this.props)?.NumberFormat
      .clipboard_copy
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
      (isTrue(this.props.selectall) ||
        isTrue(this.props.alwaysSelectall)) &&
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

      if (!isTrue(this.props.copySelection)) {
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

  runFix(comp, className) {
    if (typeof comp === 'function') {
      comp = comp()
    }
    if (React.isValidElement(comp)) {
      return React.cloneElement(comp, {
        className: classnames(comp.props.className, className),
      })
    }
    return <span className={className}>{comp}</span>
  }

  onMouseEnter = () => {
    this.setState({ hover: true })
  }

  onMouseLeave = () => {
    this.setState({ hover: false })
  }

  render() {
    const translations = this.context.getTranslation(
      this.props
    ).NumberFormat

    // consume the global context
    const props = extendPropsWithContextInClassComponent(
      this.props,
      NumberFormat.defaultProps,
      translations,
      this.context.NumberFormat
    )

    const {
      id, // eslint-disable-line
      value: _value,
      prefix,
      suffix,
      children,
      currency,
      currencyDisplay,
      currencyPosition: currency_position,
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

    let currencyPosition = currency_position
    if (currency_display === 'code' && !currencyPosition) {
      currencyPosition = 'before'
    }
    const formatOptions = {
      locale,
      currency,
      currencyDisplay,
      currencyPosition: currencyPosition,
      omitCurrencySign: this.state.omitCurrencySign,
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
        locale && locale !== this.context.locale
          ? null
          : translations?.not_available,
    }

    // use only the props from context, who are available here anyway
    const useContext = extendDeep(
      { locale: null, currency: null },
      this.context
    )

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
      display = (
        <>
          {display} {this.runFix(suffix, 'dnb-number-format__suffix')}
        </>
      )
      aria = `${aria} ${convertJsxToString(
        this.runFix(suffix, 'dnb-number-format__suffix')
      )}`
    }

    if (tooltip) {
      rest = injectTooltipSemantic(rest)
    }

    const attributes = {
      lang,
      ref: this._ref,
      className: classnames(
        'dnb-number-format',
        className,
        (isTrue(currency) || typeof currency === 'string') &&
          'dnb-number-format--currency',
        isTrue(selectall) && 'dnb-number-format--selectall',
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

    const displayParams = {}
    if (isTrue(selectall) || isTrue(copySelection)) {
      displayParams.onClick = this.onClickHandler
      displayParams.onContextMenu = this.onContextMenuHandler
    }

    validateDOMAttributes(this.props, attributes)
    skeletonDOMAttributes(attributes, skeleton, this.context)

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
          className={classnames(
            'dnb-number-format__visible',
            createSkeletonClass('font', skeleton, this.context)
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

        {isTrue(copySelection) && (
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
            tooltip={tooltip}
          />
        )}

        {this.state.copyTooltipActive && (
          <Tooltip
            active={this.state.copyTooltipActive}
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

NumberFormat._supportsSpacingProps = true
