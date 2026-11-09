import type {
  NumberFormatAllProps,
  NumberFormatLink,
} from './NumberFormatBase'
import NumberFormatBase from './NumberFormatBase'
import { formatPhoneNumber } from './utils'
import type { NumberFormatValue } from './utils/types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { convertJsxToString } from '../../shared/component-helper'

export type NumberFormatPhoneNumberProps = Omit<
  NumberFormatAllProps,
  | 'currency'
  | 'currencyDisplay'
  | 'currencyPosition'
  | 'compact'
  | 'decimals'
  | 'rounding'
  | 'signDisplay'
> & {
  /**
   * Use `tel` (default) or `sms` to enable a clickable / touchable anchor link. Only available on `NumberFormat.PhoneNumber`.
   */
  link?: NumberFormatLink | true
}

function NumberFormatPhoneNumber({
  link,
  className,
  ...rest
}: NumberFormatPhoneNumberProps) {
  if (!link) {
    return (
      <NumberFormatBase
        {...rest}
        className={className}
        __format={formatPhoneNumber}
      />
    )
  }

  const scheme = link === true ? 'tel' : link
  const value = (rest.value ?? rest.children) as NumberFormatValue
  const sanitizedValue = String(value ?? '').replace(/[^\d+]/g, '')
  const href = `${scheme}:${sanitizedValue}`
  const anchorClassName = ['dnb-anchor', className]
    .filter(Boolean)
    .join(' ')

  // The number is aria-hidden until hover, so name the link explicitly
  const ariaLabel = [
    rest.srLabel,
    rest.prefix,
    formatPhoneNumber(value),
    rest.suffix,
  ]
    .map((part) =>
      convertJsxToString(typeof part === 'function' ? part() : part)
    )
    .filter(Boolean)
    .join(' ')

  return (
    <a href={href} className={anchorClassName} aria-label={ariaLabel}>
      <NumberFormatBase {...rest} __format={formatPhoneNumber} />
    </a>
  )
}

NumberFormatPhoneNumber.displayName = 'NumberFormat.PhoneNumber'
withComponentMarkers(NumberFormatPhoneNumber, {
  _supportsSpacingProps: true,
})

export default NumberFormatPhoneNumber
