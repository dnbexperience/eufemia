import React, { useMemo } from 'react'
import type { FieldStringProps as StringFieldProps } from '../String'
import StringField from '../String'
import useTranslation from '../../hooks/useTranslation'
import type { AutocompleteAllProps } from '../../../../components/autocomplete/Autocomplete'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type FieldAddressProps = StringFieldProps & {
  element?: React.ElementType<FieldAddressProps>
  autocompleteProps?: AutocompleteAllProps
}

function Address(props: FieldAddressProps) {
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

Address.Postal = function PostalAddress(props: FieldAddressProps) {
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

  const postalAddressProps: FieldAddressProps = {
    label,
    errorMessages,
    ...props,
  }

  return <Address {...postalAddressProps} />
}
Address.Postal['_supportsSpacingProps'] = true

Address.Street = function StreetAddress(props: FieldAddressProps) {
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

  const streetAddressProps: FieldAddressProps = {
    label,
    errorMessages,
    ...props,
  }

  return <Address {...streetAddressProps} />
}
Address.Street['_supportsSpacingProps'] = true

export default Address
