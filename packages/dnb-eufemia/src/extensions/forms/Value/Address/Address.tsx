import React from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringValueProps

function Address(props: Props) {
  const stringProps: Props = {
    ...props,
  }

  return <StringValue {...stringProps} />
}
Address._supportsSpacingProps = true

Address.Postal = function PostalAddress(props: Props) {
  const translations = useTranslation()

  const postalAddressProps: Props = {
    ...props,
    label: props.label ?? translations.PostalAddress.label,
  }

  return <Address {...postalAddressProps} />
}
Address.Postal['_supportsSpacingProps'] = true

Address.Street = function StreetAddress(props: Props) {
  const translations = useTranslation()

  const streetAddressProps: Props = {
    ...props,
    label: props.label ?? translations.StreetAddress.label,
  }

  return <Address {...streetAddressProps} />
}
Address.Street['_supportsSpacingProps'] = true

export default Address
