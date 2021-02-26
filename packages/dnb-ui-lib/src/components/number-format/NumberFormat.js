/**
 * Web NumberFormat Component
 *
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
  registerElement,
  convertJsxToString,
  extend
} from '../../shared/component-helper'
import { hasSelectedText, IS_IOS } from '../../shared/helpers'
import {
  spacingPropTypes,
  createSpacingClasses
} from '../space/SpacingHelper'
import { format, showSelectionNotice } from './NumberUtils'

export default class NumberFormat extends React.PureComponent {
  static tagName = 'dnb-number-format'
  static contextType = Context

  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    locale: PropTypes.string,
    prefix: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    suffix: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    // currency
    currency: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    currency_display: PropTypes.string,
    currency_position: PropTypes.oneOf(['auto', 'before', 'after']),

    // bank account number
    ban: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    // national identification number
    nin: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    // phone number
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    // organization number
    org: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    // can be tel or sms
    link: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    options: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    decimals: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    selectall: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    copy_selection: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    omit_rounding: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    clean: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    element: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    ...spacingPropTypes,

    class: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }
  static defaultProps = {
    id: null,
    value: null,
    locale: null,
    prefix: null,
    suffix: null,
    currency: null,
    currency_display: null, // code, name, symbol
    currency_position: null, // null, before, after
    ban: null,
    nin: null,
    phone: null,
    org: null,
    link: null,
    options: null,
    decimals: null,
    selectall: true,
    copy_selection: true,
    omit_rounding: null,
    clean: null,
    element: 'span', // span or abbr
    class: null,

    className: null,
    children: null
  }

  static enableWebComponent() {
    registerElement(
      NumberFormat.tagName,
      NumberFormat,
      NumberFormat.defaultProps
    )
  }

  constructor(props) {
    super(props)
    this._ref = React.createRef()
    this._selectionRef = React.createRef()

    this._id = props.id || makeUniqueId()
    this.state = { selected: false }
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
    const fx = showSelectionNotice({
      value: this.cleanedValue,
      label: this.context.getTranslation(this.props)?.NumberFormat
        ?.clipboard_copy
    })
    fx.run()
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
    if (!hasSelectedText()) {
      this.setFocus()
    }
  }

  setFocus() {
    this.setState({ selected: true }, () => {
      if (this._selectionRef.current) {
        this._selectionRef.current.focus()
      }
      this.selectAll()
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
        className: classnames(comp.props.className, className)
      })
    }
    return <span className={className}>{comp}</span>
  }

  render() {
    // consume the global context
    const {
      id, // eslint-disable-line
      value: _value,
      prefix,
      suffix,
      children,
      currency,
      currency_display,
      currency_position,
      ban,
      nin,
      phone,
      org,
      link: _link,
      options,
      locale,
      decimals,
      omit_rounding,
      clean,
      selectall,
      copy_selection,
      element,
      class: _className,
      className,
      ...rest
    } = this.props

    let link = _link
    let value = _value

    if (children !== null) {
      value = children
    }

    const formatOptions = {
      locale,
      currency,
      currency_display,
      currency_position,
      ban,
      nin,
      phone,
      org,
      decimals,
      omit_rounding: isTrue(omit_rounding),
      options,
      clean: isTrue(clean),
      returnAria: true
    }

    // use only the props from context, who are available here anyway
    if (this.context) {
      const useContext = extend(
        true,
        { locale: null, currency: null },
        this.context,
        this.context.getTranslation(this.props).NumberFormat
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
    }

    let { cleanedValue, number: display, aria, locale: lang } = format(
      value,
      formatOptions
    )
    this.cleanedValue = cleanedValue

    const attributes = {
      ref: this._ref,
      className: classnames(
        'dnb-number-format',
        className,
        _className,
        (isTrue(currency) || typeof currency === 'string') &&
          'dnb-number-format--currency',
        isTrue(selectall) && 'dnb-number-format--selectall',
        this.state.selected && 'dnb-number-format--selected',
        link && 'dnb-anchor',
        createSpacingClasses(this.props)
      ),
      ...rest
    }

    /**
     * Works in VoiceOver and NVDA
     * Makes the span with it's roles etc. appear as text.
     * Special useful if a number is in side e.g. a paragraph alongside with numbers
     */
    attributes['role'] = 'text'

    const displayParams = {}
    if (isTrue(selectall) || isTrue(copy_selection)) {
      displayParams.onClick = this.onClickHandler
      displayParams.onContextMenu = this.onContextMenuHandler
    }

    validateDOMAttributes(this.props, attributes)

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

    /**
     * This approach is most NVDA friendly, and we used it now also for mac,
     * because if the consistency and SSR JAM Stack build
     */
    return (
      <Element lang={lang} {...attributes}>
        <span
          className="dnb-number-format__visible"
          aria-describedby={this._id}
          aria-hidden
          {...displayParams}
        >
          {display}
        </span>

        <span
          id={this._id}
          className="dnb-number-format__sr-only dnb-sr-only--inline"
        >
          {aria}
        </span>

        {isTrue(copy_selection) && (
          <span
            className="dnb-number-format__selection dnb-no-focus"
            ref={this._selectionRef}
            tabIndex={-1}
            onBlur={this.onBlurHandler}
            onCopy={this.shortcutHandler}
            aria-hidden
          >
            {cleanedValue}
          </span>
        )}
      </Element>
    )
  }
}

let hasiOSFix = false
export function runIOSSelectionFix() {
  try {
    const selection = window.getSelection()
    const range = document.createRange()
    selection.removeAllRanges()
    selection.addRange(range)
  } catch (e) {
    //
  }
}
