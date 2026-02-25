import React from 'react'
import clsx from 'clsx'
import Context from '../../shared/Context'
import { NumberFormatProps } from '../number-format/NumberFormat'
import useNumberFormat from '../number-format/useNumberFormat'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { TypographySize } from '../../elements/typography/Typography'
import type { SpacingProps } from '../../shared/types'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../skeleton/SkeletonHelper'
import {
  formatOptionParams,
  formatReturnValue,
  getCurrencySymbol,
} from '../number-format/NumberUtils'
import {
  convertJsxToString,
  validateDOMAttributes,
} from '../../shared/component-helper'

export type AmountProps = Omit<NumberFormatProps, 'children'> & {
  children?: string | number
  element?: keyof JSX.IntrinsicElements
  currencyDisplay?: NumberFormatProps['currency_display']
  currencyPosition?: NumberFormatProps['currency_position']
  /** Typography size for the main content. Defaults to `x-large`. */
  mainSize?: TypographySize
  /** Typography size for secondary content like affixes. Defaults to `x-small`. */
  auxiliarySize?: TypographySize
} & SpacingProps

const splitLeadingSign = (value: string) => {
  const normalizedValue = String(value || '').replace(
    /^[\u200e\u200f\u061c\s]+/,
    ''
  )
  const match = normalizedValue.match(/^([+\-−])\s?(.*)$/)

  if (!match) {
    return {
      sign: null,
      value: normalizedValue,
    }
  }

  return {
    sign: match[1],
    value: match[2],
  }
}

const renderAffix = (
  resolved: NumberFormatProps['prefix'] | NumberFormatProps['suffix'],
  className: string
) => {
  if (typeof resolved === 'function') {
    resolved = resolved()
  }

  if (React.isValidElement(resolved)) {
    return React.cloneElement(resolved, {
      className: clsx(resolved.props.className, className),
    })
  }

  return <span className={className}>{resolved as React.ReactNode}</span>
}

function Amount(props: AmountProps) {
  const {
    element: Element = 'span',
    value,
    children,
    currency = true,
    currencyDisplay = null,
    currency_display = null,
    currencyPosition = 'auto',
    currency_position = null,
    locale = null,
    className = null,
    prefix = null,
    suffix = null,
    srLabel = null,
    mainSize = 'x-large',
    auxiliarySize = 'x-small',
    id = null,
    style = null,
    lang = null,
    decimals = 0,
    rounding = null,
    signDisplay = null,
    skeleton = null,
    options = null,
    compact = null,
    clean = null,
    ...rest
  } = props
  const context = React.useContext(Context)
  const resolvedLocale =
    locale ?? (context?.NumberFormat?.locale as string) ?? context?.locale
  const resolvedSkeleton = Boolean(skeleton ?? context?.skeleton)

  const rawValue =
    typeof value !== 'undefined'
      ? value
      : typeof children === 'string' || typeof children === 'number'
      ? children
      : null

  const usedCurrencyDisplay = currencyDisplay ?? currency_display ?? null
  const usedCurrencyPosition =
    currencyPosition ?? currency_position ?? 'auto'
  const usedMainSize = mainSize
  const usedAuxiliarySize = auxiliarySize

  const formatted = useNumberFormat(rawValue, {
    locale: resolvedLocale,
    currency,
    currency_display: usedCurrencyDisplay,
    currency_position: usedCurrencyPosition,
    compact,
    clean,
    decimals,
    rounding,
    signDisplay,
    options,
    returnAria: true,
  } as formatOptionParams) as formatReturnValue

  const amountOnly = useNumberFormat(rawValue, {
    locale: resolvedLocale,
    currency,
    currency_display: usedCurrencyDisplay,
    currency_position: usedCurrencyPosition,
    compact,
    clean,
    decimals,
    rounding,
    signDisplay,
    options,
    omit_currency_sign: true,
    returnAria: true,
  } as formatOptionParams) as formatReturnValue

  const numericValue = parseFloat(String(formatted.value))
  const currencySign =
    usedCurrencyDisplay === false || usedCurrencyDisplay === ''
      ? null
      : getCurrencySymbol(
          formatted.locale,
          typeof currency === 'string' ? currency : null,
          usedCurrencyDisplay,
          isNaN(numericValue) ? 2 : Math.abs(numericValue)
        )

  const splitAmount = splitLeadingSign(amountOnly.number)
  const splitFull = splitLeadingSign(formatted.number)
  const amountWithoutSign = splitAmount.value
  const fullWithoutSign = splitFull.value
  const suffixStartsWithSlash =
    typeof suffix === 'string' && suffix.startsWith('/')
  const forceCurrencyAfterAmount =
    suffixStartsWithSlash && usedCurrencyPosition === 'auto'
  const renderSign =
    signDisplay === 'always' && splitAmount.sign ? splitAmount.sign : null
  const spaceAfterSign = renderSign === '-' || renderSign === '−'
  const renderedAmount = renderSign ? splitAmount.value : amountOnly.number

  let renderCurrencyBefore = false
  let amountPosition = 0

  if (usedCurrencyPosition === 'before') {
    renderCurrencyBefore = true
  } else if (usedCurrencyPosition === 'after') {
    renderCurrencyBefore = false
  } else {
    amountPosition = fullWithoutSign.indexOf(amountWithoutSign)
    renderCurrencyBefore = amountPosition > 0
  }

  if (signDisplay === 'always' && usedCurrencyPosition === 'auto') {
    renderCurrencyBefore = false
  }

  if (forceCurrencyAfterAmount) {
    renderCurrencyBefore = false
  }

  if (amountPosition === 0) {
    amountPosition = fullWithoutSign.indexOf(amountWithoutSign)
  }

  const spaceAfterCurrency = renderCurrencyBefore
    ? /\s$/.test(fullWithoutSign.slice(0, amountPosition))
    : false
  const spaceBeforeCurrency = !renderCurrencyBefore
    ? forceCurrencyAfterAmount
      ? true
      : /^\s/.test(
          fullWithoutSign.slice(amountPosition + amountWithoutSign.length)
        )
    : false

  const currencyClass = clsx(
    'dnb-spotlight__currency',
    `dnb-t__size--${usedAuxiliarySize}`,
    `dnb-t__line-height--${usedAuxiliarySize}`
  )
  const amountClass = clsx(
    'dnb-spotlight__amount',
    `dnb-t__size--${usedMainSize}`,
    `dnb-t__line-height--${usedMainSize}`
  )

  let content = (
    <>
      {renderSign && (
        <>
          <span
            className={clsx(
              'dnb-spotlight__sign',
              `dnb-t__size--${usedMainSize}`,
              `dnb-t__line-height--${usedMainSize}`
            )}
          >
            {renderSign}
          </span>
          {spaceAfterSign ? ' ' : null}
        </>
      )}
      {renderCurrencyBefore && (
        <>
          <span className={currencyClass}>{currencySign}</span>
          {spaceAfterCurrency ? ' ' : null}
        </>
      )}
      <span className={amountClass}>{renderedAmount}</span>
      {!renderCurrencyBefore && (
        <>
          {spaceBeforeCurrency ? ' ' : null}
          <span className={currencyClass}>{currencySign}</span>
        </>
      )}
    </>
  )

  let aria = formatted.aria

  if (prefix) {
    const prefixElement = renderAffix(
      prefix,
      clsx(
        'dnb-spotlight__prefix',
        `dnb-t__size--${usedAuxiliarySize}`,
        `dnb-t__line-height--${usedAuxiliarySize}`
      )
    )
    content = (
      <>
        {prefixElement} {content}
      </>
    )
    aria = `${convertJsxToString(prefixElement)} ${aria}`
  }

  if (suffix) {
    const suffixElement = renderAffix(
      suffix,
      clsx(
        'dnb-spotlight__suffix',
        `dnb-t__size--${usedAuxiliarySize}`,
        `dnb-t__line-height--${usedAuxiliarySize}`
      )
    )
    const suffixSpace =
      typeof suffix === 'string' && suffix.startsWith('/') ? '' : ' '
    content = (
      <>
        {content}
        {suffixSpace}
        {suffixElement}
      </>
    )
    aria = `${aria}${suffixSpace}${convertJsxToString(suffixElement)}`
  }

  const srText = srLabel
    ? `${convertJsxToString(srLabel)}${' '}${aria}`
    : aria

  const attributes = validateDOMAttributes(props, {
    ...rest,
    id,
    style,
    className: clsx(
      'dnb-spotlight',
      createSpacingClasses(props),
      createSkeletonClass('font', resolvedSkeleton, context),
      className
    ),
    lang: lang || resolvedLocale || formatted.locale,
  })

  skeletonDOMAttributes(attributes, resolvedSkeleton, context)

  return (
    <Element {...attributes}>
      <span className="dnb-spotlight__content" aria-hidden>
        {content}
      </span>
      {/* Used for VoiceOver and NVDA when navigating with arrow keys */}
      <span className="dnb-sr-only" data-text={srText} />
    </Element>
  )
}

Amount._supportsSpacingProps = true

export default Amount
