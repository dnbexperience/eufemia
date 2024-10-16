import React from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import useTranslation from '../../hooks/useTranslation'
import { useValueProps } from '../../hooks'

export type Props = StringValueProps &
  Partial<Record<'postalCode' | 'city', StringValueProps>>

function PostalCodeAndCity(props: Props) {
  const translations = useTranslation().PostalCodeAndCity

  const cityValue = usePostalCodeAndCityValue(props?.city || {})
  const postalCodeValue = usePostalCodeAndCityValue(
    props?.postalCode || {}
  )

  const value =
    props.value ??
    ((postalCodeValue || cityValue
      ? [postalCodeValue, cityValue].filter(Boolean).join(' ')
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

function usePostalCodeAndCityValue(props: Props) {
  return useValueProps(props).value ?? props.value
}

PostalCodeAndCity._supportsSpacingProps = true
export default PostalCodeAndCity
