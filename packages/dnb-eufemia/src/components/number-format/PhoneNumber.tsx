import React from 'react'
import type {
  NumberFormatAllProps,
  NumberFormatLink,
} from './NumberFormatBase'
import NumberFormatBase from './NumberFormatBase'
import { formatPhoneNumber } from './utils'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type NumberFormatPhoneNumberProps = Omit<
  NumberFormatAllProps,
  'currency' | 'currencyDisplay' | 'currencyPosition' | 'compact'
> & {
  /** Wraps the formatted phone value in a clickable link: `tel` (default) or `sms`. */
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
