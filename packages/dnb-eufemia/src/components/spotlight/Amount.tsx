import React from 'react'
import clsx from 'clsx'
import Context from '../../shared/Context'
import { NumberFormatProps } from '../number-format/NumberFormat'
import useNumberFormatWithParts from '../number-format/useNumberFormatWithParts'
import type { NumberFormatParts } from '../number-format/useNumberFormatWithParts'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { TypographySize } from '../../elements/typography/Typography'
import type { SpacingProps } from '../../shared/types'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../skeleton/SkeletonHelper'
import { formatReturnValue } from '../number-format/NumberUtils'
import {
  convertJsxToString,
  validateDOMAttributes,
} from '../../shared/component-helper'

export type AmountProps = Omit<
  NumberFormatProps,
  'children' | 'currency_display' | 'currency_position'
> & {
  children?: string | number
  element?: keyof JSX.IntrinsicElements
  currencyDisplay?: NumberFormatProps['currency_display']
  currencyPosition?: NumberFormatProps['currency_position']
  /** Typography size for the main content. Defaults to `x-large`. */
  mainSize?: TypographySize
  /** Typography size for secondary content like affixes. Defaults to `x-small`. */
  auxiliarySize?: TypographySize
} & SpacingProps

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
    currency = null,
    currencyDisplay = null,
    currencyPosition = 'auto',
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
    percent = null,
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

  const suffixStartsWithSlash =
    typeof suffix === 'string' && suffix.startsWith('/')
  const forceCurrencyAfterAmount =
    suffixStartsWithSlash && currencyPosition === 'auto'

  const formatted = useNumberFormatWithParts(rawValue, {
    locale: resolvedLocale,
    currency,
    currencyDisplay,
    currencyPosition,
    compact,
    clean,
    percent,
    decimals,
    rounding,
    signDisplay,
    forceCurrencyAfterAmount,
    options,
  }) as formatReturnValue & {
    parts?: NumberFormatParts
  }

  const parts = formatted.parts as NumberFormatParts
  const renderSign =
    signDisplay === 'always' && parts.sign ? parts.sign : null
  const spaceAfterSign = renderSign === '-' || renderSign === '−'
  const renderedAmount = renderSign ? parts.number : parts.signedNumber

  const hasCurrency = Boolean(parts.currency)
  const renderCurrencyBefore = parts.currencyPosition === 'before'

  const currencyClass = clsx(
    'dnb-spotlight__currency',
    `dnb-t__size--${auxiliarySize}`,
    `dnb-t__line-height--${auxiliarySize}`
  )
  const amountClass = clsx(
    'dnb-spotlight__amount',
    `dnb-t__size--${mainSize}`,
    `dnb-t__line-height--${mainSize}`
  )
  const percentClass = clsx(
    'dnb-spotlight__percent',
    `dnb-t__size--${auxiliarySize}`,
    `dnb-t__line-height--${auxiliarySize}`
  )

  let content = (
    <>
      {renderSign && (
        <>
          <span
            className={clsx(
              'dnb-spotlight__sign',
              `dnb-t__size--${mainSize}`,
              `dnb-t__line-height--${mainSize}`
            )}
          >
            {renderSign}
          </span>
          {spaceAfterSign ? ' ' : null}
        </>
      )}
      {hasCurrency && renderCurrencyBefore && (
        <>
          <span className={currencyClass}>{parts.currency}</span>
          {parts.spaceAfterCurrency ? ' ' : null}
        </>
      )}
      <span className={amountClass}>{renderedAmount}</span>
      {parts.percent && (
        <>
          {parts.percentSpacing}
          <span className={percentClass}>{parts.percent}</span>
        </>
      )}
      {hasCurrency && !renderCurrencyBefore && (
        <>
          {parts.spaceBeforeCurrency ? ' ' : null}
          <span className={currencyClass}>{parts.currency}</span>
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
        `dnb-t__size--${auxiliarySize}`,
        `dnb-t__line-height--${auxiliarySize}`
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
        `dnb-t__size--${auxiliarySize}`,
        `dnb-t__line-height--${auxiliarySize}`
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
