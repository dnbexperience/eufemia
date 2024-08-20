import React from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import useErrorMessage from '../../hooks/useErrorMessage'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringFieldProps

function Name(props: Props) {
  const StringFieldProps: Props = {
    trim: true,
    autoComplete: 'name',
    pattern: '^(?!.*[\\-\\s]{2})[\\p{L}]+([ \\-][\\p{L}]+)*$',
    ...props,
  }

  return <StringField {...StringFieldProps} />
}
Name._supportsSpacingProps = true

Name.First = function FirstName(props: Props) {
  const translations = useTranslation().FirstName
  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: translations.errorRequired,
    pattern: translations.errorPattern,
  })

  const nameProps: Props = {
    label: translations.label,
    autoComplete: 'given-name',
    ...props,
    errorMessages,
  }

  return <Name {...nameProps} />
}
Name.First['_supportsSpacingProps'] = true

Name.Last = function LastName(props: Props) {
  const translations = useTranslation().LastName
  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: translations.errorRequired,
    pattern: translations.errorPattern,
  })

  const nameProps: Props = {
    label: translations.label,
    autoComplete: 'family-name',
    ...props,
    errorMessages,
  }

  return <Name {...nameProps} />
}
Name.First['_supportsSpacingProps'] = true

Name.Company = function CompanyName(props: Props) {
  const translations = useTranslation().CompanyName
  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: translations.errorRequired,
  })

  const StringFieldProps: Props = {
    label: translations.label,
    pattern:
      '^(?!.*[-\\s]{2})(?!.*[\\.]{2})[\\p{L}\\p{N}][\\p{L}\\p{N}\\p{P}\\p{Zs}.]*[\\p{L}\\p{N}\\p{P}]$',
    autoComplete: 'organization',
    ...props,
    errorMessages,
  }

  return <Name {...StringFieldProps} />
}
Name.First['_supportsSpacingProps'] = true

export default Name
