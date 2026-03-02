import React from 'react'
import classnames from 'classnames'
import Context from '../../shared/Context'
import { NumberFormatProps } from '../number-format/NumberFormat'
import useNumberFormatWithParts from '../number-format/useNumberFormatWithParts'
import type { NumberFormatParts } from '../number-format/useNumberFormatWithParts'
import { createSpacingClasses } from '../space/SpacingHelper'
import type {
  TypographySize,
  TypographyWeight,
} from '../../elements/typography/Typography'
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
  /**
   * Typography size fallback.
   *
   * Is used for both main and auxiliary content unless `mainSize` and/or
   * `auxiliarySize` are set.
   */
  fontSize?: TypographySize
  /**
   * Typography size for the main content. Defaults to `large`.
   */
  mainSize?: TypographySize
  /**
   * Typography weight for the main content. Defaults to `medium`.
   */
  mainWeight?: TypographyWeight
  /**
   * Typography size for secondary content like affixes. Defaults to `large`.
   */
  auxiliarySize?: TypographySize
  /**
   * Typography weight for secondary content like currency sign and affixes.
   *
   * If not set, and `mainSize` equals `auxiliarySize` while `mainWeight` is not set,
   * `medium` is used.
   */
  auxWeight?: TypographyWeight
  /**
   * Opt-in sign-based text color (`+` => green, `-` => red).
   */
  colorizeBySign?: boolean
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
      className: classnames(resolved.props.className, className),
    })
  }

  return <span className={className}>{resolved as React.ReactNode}</span>
}

function Amount(props: AmountProps) {
  const {
    element: Element = 'span',
    value,
    children,
    currency = false,
    currencyDisplay = null,
    currencyPosition = 'auto',
    locale = null,
    className = null,
    prefix = null,
    suffix = null,
    srLabel = null,
    fontSize = null,
    mainSize = null,
    mainWeight,
    auxiliarySize = null,
    auxWeight = null,
    colorizeBySign = false,
    id = null,
    style = null,
    lang = null,
    decimals = 0,
    rounding = null,
    signDisplay = null,
    skeleton = null,
    options = null,
    compact = null,
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
  const resolvedMainSize = mainSize ?? fontSize ?? 'large'
  const resolvedAuxiliarySize = auxiliarySize ?? fontSize ?? 'large'
  const resolvedMainWeight = mainWeight ?? 'medium'
  const resolvedAuxWeight =
    auxWeight ??
    (typeof mainWeight === 'undefined' &&
    resolvedMainSize === resolvedAuxiliarySize
      ? 'medium'
      : null)
  const signTone =
    parts.sign === '+'
      ? 'positive'
      : parts.sign === '-' || parts.sign === '−'
      ? 'negative'
      : null

  const currencyClass = classnames(
    'dnb-stat__currency',
    `dnb-t__size--${resolvedAuxiliarySize}`,
    `dnb-t__line-height--${resolvedAuxiliarySize}`,
    resolvedAuxWeight && `dnb-t__weight--${resolvedAuxWeight}`
  )
  const amountClass = classnames(
    'dnb-stat__amount',
    `dnb-t__size--${resolvedMainSize}`,
    `dnb-t__line-height--${resolvedMainSize}`,
    `dnb-t__weight--${resolvedMainWeight}`
  )
  const percentClass = classnames(
    'dnb-stat__percent',
    `dnb-t__size--${resolvedAuxiliarySize}`,
    `dnb-t__line-height--${resolvedAuxiliarySize}`,
    resolvedAuxWeight && `dnb-t__weight--${resolvedAuxWeight}`
  )

  let content = (
    <>
      {renderSign && (
        <>
          <span
            className={classnames(
              'dnb-stat__sign',
              `dnb-t__size--${resolvedMainSize}`,
              `dnb-t__line-height--${resolvedMainSize}`,
              `dnb-t__weight--${resolvedMainWeight}`
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
      classnames(
        'dnb-stat__prefix',
        `dnb-t__size--${resolvedAuxiliarySize}`,
        `dnb-t__line-height--${resolvedAuxiliarySize}`,
        resolvedAuxWeight && `dnb-t__weight--${resolvedAuxWeight}`
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
      classnames(
        'dnb-stat__suffix',
        `dnb-t__size--${resolvedAuxiliarySize}`,
        `dnb-t__line-height--${resolvedAuxiliarySize}`,
        resolvedAuxWeight && `dnb-t__weight--${resolvedAuxWeight}`
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
    className: classnames(
      'dnb-stat',
      colorizeBySign && signTone && `dnb-stat--tone-${signTone}`,
      createSpacingClasses(props),
      createSkeletonClass('font', resolvedSkeleton, context),
      className
    ),
    lang: lang || resolvedLocale || formatted.locale,
  })

  skeletonDOMAttributes(attributes, resolvedSkeleton, context)

  return (
    <Element {...attributes}>
      <span className="dnb-stat__content" aria-hidden>
        {content}
      </span>
      {/* Used for VoiceOver and NVDA when navigating with arrow keys */}
      <span className="dnb-sr-only" data-text={srText} />
    </Element>
  )
}

Amount._supportsSpacingProps = true

export default Amount
