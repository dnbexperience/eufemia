import React from 'react'
import type { ValueStringProps as StringValueProps } from '../String'
import StringValue from '../String'
import useTranslation from '../../hooks/useTranslation'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValueAddressProps = StringValueProps

function Address(props: ValueAddressProps) {
  const stringProps: ValueAddressProps = {
    ...props,
  }

  return <StringValue {...stringProps} />
}
withComponentMarkers(Address, { _supportsSpacingProps: true })

Address.Postal = function PostalAddress(props: ValueAddressProps) {
  const translations = useTranslation()

  const postalAddressProps: ValueAddressProps = {
    ...props,
    label: props.label ?? translations.PostalAddress.label,
  }

  return <Address {...postalAddressProps} />
}
Address.Postal['_supportsSpacingProps'] = true

Address.Street = function StreetAddress(props: ValueAddressProps) {
  const translations = useTranslation()

  const streetAddressProps: ValueAddressProps = {
    ...props,
    label: props.label ?? translations.StreetAddress.label,
  }

  return <Address {...streetAddressProps} />
}
Address.Street['_supportsSpacingProps'] = true

export default Address
