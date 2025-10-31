// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Web NumberFormat Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
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
} from '../../shared/component-helper'
import { hasSelectedText, IS_IOS } from '../../shared/helpers'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import Tooltip, { injectTooltipSemantic } from '../tooltip/Tooltip'
import {
  format,
  showSelectionNotice,
  runIOSSelectionFix,
} from './NumberUtils'

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
  // Spacing props
  space?: any
  top?: any
  right?: any
  bottom?: any
  left?: any
}
export type NumberFormatAllProps = NumberFormatProps &
  Omit<React.HTMLProps<HTMLElement>, 'prefix' | 'label' | 'placeholder'> &
  any

export default class NumberFormat extends React.PureComponent<NumberFormatAllProps> {
  static contextType = Context

  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    locale: PropTypes.string,
    prefix: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    suffix: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    // currency
    currency: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    currencyDisplay: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['code', 'name', 'symbol', 'narrowSymbol', '']),
    ]),
    currencyPosition: PropTypes.oneOf(['auto', 'before', 'after']),

    // shortens any number or currency including an abbreviation
    compact: PropTypes.oneOfType([
      PropTypes.oneOf(['short', 'long']),
      PropTypes.bool,
    ]),

    // bank account number
    ban: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    // national identification number
    nin: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    // phone number
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    // organization number
    org: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    // percentage
    percent: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    // can be tel or sms
    link: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    monospace: PropTypes.bool,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    decimals: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    selectall: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    alwaysSelectall: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    copySelection: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    cleanCopyValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    rounding: PropTypes.oneOf(['omit', 'half-even', 'half-up']),
    clean: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    srLabel: PropTypes.node,
    element: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    tooltip: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    // Additional props used in stories
    style: PropTypes.object,
    lang: PropTypes.string,

    ...spacingPropTypes,

    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  }
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
    this.state = { selected: false, omitCurrencySign: false, hover: false }
  }

  componentDidMount() {
    clearTimeout(this._selectAllTimeout)

    // NB: This hack may be removed in future iOS versions
    // in order that iOS v13 can select something on the first try, we run this add range trick
    if (IS_IOS && !hasiOSFix) {
      hasiOSFix = true
      runIOSSelectionFix()
    }
  }

  shortcutHandler = () => {
    showSelectionNotice({
      value: this.cleanedValue,
      label: this.context.getTranslation(this.props)?.NumberFormat
        ?.clipboardCopy,
    }).run(this._ref.current)
  }

  onBlurHandler = () => {
    this.setState({ selected: false })
  }

  onContextMenuHandler = () => {
    if (!hasSelectedText()) {
      clearTimeout(this._selectAllTimeout)
      this._selectAllTimeout = setTimeout(() => {
        this.setFocus()
      }, 1)
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
  }

  setFocus() {
    this.setState({ selected: true }, () => {
      this._selectionRef.current?.focus()
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

    const formatOptions = {
      locale,
      currency,
      currencyDisplay,
      currencyPosition,
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
          : translations?.notAvailable,
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
      </Element>
    )
  }
}

let hasiOSFix = false

NumberFormat._supportsSpacingProps = true
