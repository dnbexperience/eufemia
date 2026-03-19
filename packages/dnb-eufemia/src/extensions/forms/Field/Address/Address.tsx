import React from 'react'
import type { Props as StringFieldProps } from '../String'
import StringField from '../String'
import useTranslation from '../../hooks/useTranslation'
import useErrorMessages from '../../hooks/useErrorMessages'
import type { AutocompleteAllProps } from '../../../../components/autocomplete/Autocomplete'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type Props = StringFieldProps & {
  element?: React.ElementType<Props>
  autocompleteProps?: AutocompleteAllProps
}

function Address(props: Props) {
  const { element: Element = StringField, ...rest } = props

  if (Element === StringField) {
    Object.assign(rest, {
      autoComplete: 'street-address',
      inputMode: 'text',
      trim: true,
      ...rest,
    })
  }

  return <Element {...rest} />
}
withComponentMarkers(Address, { _supportsSpacingProps: true })

Address.Postal = function PostalAddress(props: Props) {
  const { label, errorRequired, errorPattern } =
    useTranslation().PostalAddress

  const errorMessages = useErrorMessages({
    errorRequired,
    errorPattern,
    propsErrorMessages: props.errorMessages,
  })

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

  const errorMessages = useErrorMessages({
    errorRequired,
    errorPattern,
    propsErrorMessages: props.errorMessages,
  })

  const streetAddressProps: Props = {
    label,
    errorMessages,
    ...props,
  }

  return <Address {...streetAddressProps} />
}
Address.Street['_supportsSpacingProps'] = true

export default Address
