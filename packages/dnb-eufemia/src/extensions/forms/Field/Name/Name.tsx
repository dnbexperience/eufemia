import React, { useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'
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
  const errorMessages = useMemo(() => {
    return {
      'Field.errorRequired': translations.errorRequired,
      'Field.errorPattern': translations.errorPattern,
      ...props.errorMessages,
    }
  }, [
    props.errorMessages,
    translations.errorPattern,
    translations.errorRequired,
  ])

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
  const errorMessages = useMemo(() => {
    return {
      'Field.errorRequired': translations.errorRequired,
      'Field.errorPattern': translations.errorPattern,
      ...props.errorMessages,
    }
  }, [
    props.errorMessages,
    translations.errorPattern,
    translations.errorRequired,
  ])

  const nameProps: Props = {
    label: translations.label,
    autoComplete: 'family-name',
    ...props,
    errorMessages,
  }

  return <Name {...nameProps} />
}
Name.Last['_supportsSpacingProps'] = true

Name.Company = function CompanyName(props: Props) {
  const translations = useTranslation().CompanyName
  const errorMessages = useMemo(() => {
    return {
      'Field.errorRequired': translations.errorRequired,
      ...props.errorMessages,
    }
  }, [props.errorMessages, translations.errorRequired])

  const StringFieldProps: Props = {
    label: translations.label,
    pattern:
      '^(?!.*[-\\s]{2})(?!.*[\\.]{2})(?=.*[\\p{L}])[\\p{L}\\p{N}][\\p{L}\\p{N}\\p{P}\\p{Zs}.]*[\\p{L}\\p{N}\\p{P}]$',
    autoComplete: 'organization',
    ...props,
    errorMessages,
  }

  return <Name {...StringFieldProps} />
}
Name.Company['_supportsSpacingProps'] = true

export default Name
