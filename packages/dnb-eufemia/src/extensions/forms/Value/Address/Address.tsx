import { clsx } from 'clsx'
import type { ValueStringProps as StringValueProps } from '../String'
import ValueBlock from '../../ValueBlock'
import { useValueProps } from '../../hooks'
import useTranslation from '../../hooks/useTranslation'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValueAddressProps = StringValueProps

function Address(props: ValueAddressProps) {
  const translations = useTranslation().Address

  // Apply the default after useValueProps, so an inherited label wins
  const { value, className, label, ...rest } = useValueProps(props)

  return (
    <ValueBlock
      className={clsx('dnb-forms-value-string', className)}
      label={label ?? translations.label}
      {...rest}
    >
      {value}
    </ValueBlock>
  )
}
withComponentMarkers(Address, { _supportsSpacingProps: true })

Address.Postal = function PostalAddress(props: ValueAddressProps) {
  const translations = useTranslation()

  const postalAddressProps: ValueAddressProps = {
    ...props,
    defaultLabel: props.defaultLabel ?? translations.PostalAddress.label,
  }

  return <Address {...postalAddressProps} />
}
Address.Postal['_supportsSpacingProps'] = true

Address.Street = function StreetAddress(props: ValueAddressProps) {
  const translations = useTranslation()

  const streetAddressProps: ValueAddressProps = {
    ...props,
    defaultLabel: props.defaultLabel ?? translations.StreetAddress.label,
  }

  return <Address {...streetAddressProps} />
}
Address.Street['_supportsSpacingProps'] = true

export default Address
