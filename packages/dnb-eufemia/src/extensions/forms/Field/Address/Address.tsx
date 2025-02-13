import React, { useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringFieldProps

function Address(props: Props) {
  const stringFieldProps: Props = {
    autoComplete: 'street-address',
    inputMode: 'text',
    trim: true,
    ...props,
  }

  return <StringField {...stringFieldProps} />
}
Address._supportsSpacingProps = true

Address.Postal = function PostalAddress(props: Props) {
  const { label, errorRequired, errorPattern } =
    useTranslation().PostalAddress

  const errorMessages = useMemo(
    () => ({
      'Field.errorRequired': errorRequired,
      'Field.errorPattern': errorPattern,
      ...props.errorMessages,
    }),
    [errorPattern, errorRequired, props.errorMessages]
  )

  const postalAddressProps: Props = {
    label,
    errorMessages,
    ...props,
  }

  return <Address {...postalAddressProps} />
}
Address.Postal['_supportsSpacingProps'] = true

Address.Street = function StreetAddress(props: Props) {
  const { label, errorRequired, errorPattern } =
    useTranslation().StreetAddress

  const errorMessages = useMemo(
    () => ({
      'Field.errorRequired': errorRequired,
      'Field.errorPattern': errorPattern,
      ...props.errorMessages,
    }),
    [errorPattern, errorRequired, props.errorMessages]
  )

  const streetAddressProps: Props = {
    label,
    errorMessages,
    ...props,
  }

  return <Address {...streetAddressProps} />
}
Address.Street['_supportsSpacingProps'] = true

export default Address
