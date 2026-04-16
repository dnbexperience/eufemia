import React from 'react'
import type {
  NumberFormatAllProps,
  NumberFormatLink,
} from './NumberFormatBase'
import NumberFormatBase from './NumberFormatBase'
import { formatPhoneNumber } from './utils'

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
  const href = `${scheme}:${rest.value ?? ''}`
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
;(
  NumberFormatPhoneNumber as unknown as { _supportsSpacingProps?: boolean }
)._supportsSpacingProps = true

export default NumberFormatPhoneNumber
