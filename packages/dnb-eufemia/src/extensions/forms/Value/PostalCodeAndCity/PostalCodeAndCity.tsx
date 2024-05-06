import React from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import useTranslation from '../../hooks/useTranslation'
import { useValueProps } from '../../hooks'

export type Props = StringValueProps &
  Partial<Record<'postalCode' | 'city', StringValueProps>>

function PostalCodeAndCity(props: Props) {
  const translations = useTranslation().PostalCodeAndCity

  const city = props?.city || {}
  const postalCode = props?.postalCode || {}

  const cityProps = useValueProps(city)
  if (cityProps.value) {
    city.value = cityProps.value
  }

  const postalCodeProps = useValueProps(postalCode)
  if (postalCodeProps.value) {
    postalCode.value = postalCodeProps.value
  }

  const value =
    props.value ??
    ((postalCode || city
      ? [postalCode?.value, city?.value].filter(Boolean).join(' ')
      : undefined) ||
      undefined)
  const label =
    props.label ?? (props.inline ? undefined : translations.label)

  const stringValueProps: Props = {
    ...props,
    value,
    label,
  }

  return <StringValue {...stringValueProps} />
}

PostalCodeAndCity._supportsSpacingProps = true
export default PostalCodeAndCity
