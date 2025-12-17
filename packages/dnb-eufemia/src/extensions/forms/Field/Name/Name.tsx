import React, { useCallback, useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import useTranslation from '../../hooks/useTranslation'
import type { Validator, ValidatorWithCustomValidators } from '../../types'
import { FormError } from '../../utils'

export type NameValidator = ValidatorWithCustomValidators<
  string,
  {
    nameValidator: Validator<string>
  }
>

export type NameCompanyValidator = ValidatorWithCustomValidators<
  string,
  {
    companyValidator: Validator<string>
  }
>

export type Props = Omit<StringFieldProps, 'onBlurValidator'> & {
  onBlurValidator?: NameValidator | false
}

// Pattern for first and last names: must start and end with a letter (or be a single letter),
// disallow consecutive hyphens/spaces, allow letters, spaces, and hyphens inside,
// but do not allow digits, dots, or trailing punctuation (e.g. ending with '-').
export const namePattern =
  '^(?!.*[-\\s]{2})[\\p{L}]([\\p{L}\\p{M}\\p{Zs}-]*[\\p{L}])?$'

// Pattern for company names: must start and end with a letter or number.
// Disallow consecutive hyphens/spaces or dots. Allow letters, numbers, punctuation marks, spaces, and dots in between.
export const companyPattern =
  '^(?!.*[-\\s]{2})(?!.*[\\.]{2})[\\p{L}\\p{N}]([\\p{L}\\p{N}\\p{P}\\p{Zs}.]*[\\p{L}\\p{N}])?$'

function Name(props: Props) {
  const {
    onBlurValidator: onBlurValidatorProp,
    minLength: minLengthProp = 1,
    ...otherProps
  } = props

  const nameValidator = useCallback((value: string) => {
    if (value !== undefined) {
      if (value === '') {
        return // Allow empty values (required validation handles this)
      }
      if (!new RegExp(namePattern, 'u').test(value)) {
        return new FormError('Field.errorPattern')
      }
    }
  }, [])

  const onBlurValidator = useMemo(() => {
    if (onBlurValidatorProp === false) {
      return undefined
    }

    if (typeof onBlurValidatorProp === 'function') {
      // Prioritize the internal validator first; only then run the external one
      return (value: string, args) => {
        const coreResult = nameValidator(value)
        if (coreResult instanceof Error) {
          return coreResult
        }
        return onBlurValidatorProp(value, args)
      }
    }

    return nameValidator
  }, [onBlurValidatorProp, nameValidator])

  const StringFieldProps: StringFieldProps = {
    trim: true,
    autoComplete: 'name',
    minLength: minLengthProp,
    ...otherProps,
    // Only use onBlurValidator (not onChangeValidator) to allow trim to happen first
    onBlurValidator,
    exportValidators: { nameValidator },
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
  const {
    onBlurValidator: onBlurValidatorProp,
    minLength: minLengthProp = 3,
    ...otherProps
  } = props

  const errorMessages = useMemo(() => {
    return {
      'Field.errorRequired': translations.errorRequired,
      ...props.errorMessages,
    }
  }, [props.errorMessages, translations.errorRequired])

  const companyValidator = useCallback((value: string) => {
    if (value !== undefined) {
      if (value === '') {
        return // Allow empty values (required validation handles this)
      }
      if (!new RegExp(companyPattern, 'u').test(value)) {
        return new FormError('Field.errorPattern')
      }
    }
  }, [])

  const onBlurValidator = useMemo(() => {
    if (onBlurValidatorProp === false) {
      return undefined
    }

    if (typeof onBlurValidatorProp === 'function') {
      // Prioritize the internal validator first; only then run the external one
      return (value: string, args) => {
        const coreResult = companyValidator(value)
        if (coreResult instanceof Error) {
          return coreResult
        }
        return onBlurValidatorProp(value, args)
      }
    }

    return companyValidator
  }, [onBlurValidatorProp, companyValidator])

  const StringFieldProps: StringFieldProps = {
    label: translations.label,
    autoComplete: 'organization',
    minLength: minLengthProp,
    ...otherProps,
    errorMessages,
    // Only use onBlurValidator (not onChangeValidator) to allow trim to happen first
    onBlurValidator,
    exportValidators: { companyValidator },
  }

  return <StringField {...StringFieldProps} />
}
Name.Company['_supportsSpacingProps'] = true

export default Name
