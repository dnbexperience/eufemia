import React from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import useTranslation from '../../hooks/useTranslation'
import { useValueProps } from '../../hooks'

export type Props = StringValueProps &
  Partial<Record<'postalCode' | 'city', StringValueProps>>

function PostalCodeAndCity(props: Props) {
  const translations = useTranslation().PostalCodeAndCity

  const cityValue = useValueProps(props?.city || {}).value ?? props.value
  const postalCodeValue =
    useValueProps(props?.postalCode || {}).value ?? props.value

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

PostalCodeAndCity._supportsSpacingProps = true
export default PostalCodeAndCity
