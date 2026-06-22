import type {
  NumberFormatAllProps,
  NumberFormatLink,
} from './NumberFormatBase'
import NumberFormatBase from './NumberFormatBase'
import { formatPhoneNumber } from './utils'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

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
  const sanitizedValue = String(rest.value ?? '').replace(/[^\d+]/g, '')
  const href = `${scheme}:${sanitizedValue}`
  const anchorClassName = ['dnb-anchor', className]
    .filter(Boolean)
    .join(' ')

  return (
    <a href={href} className={anchorClassName}>
      <NumberFormatBase {...rest} __format={formatPhoneNumber} />
    </a>
  )
}

NumberFormatPhoneNumber.displayName = 'NumberFormat.PhoneNumber'
withComponentMarkers(NumberFormatPhoneNumber, {
  _supportsSpacingProps: true,
})

export default NumberFormatPhoneNumber
