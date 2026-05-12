import { useCallback, useMemo } from 'react'
import type { FieldStringProps as StringFieldProps } from '../String'
import StringField from '../String'
import useTranslation from '../../hooks/useTranslation'
import type { Validator, ValidatorWithCustomValidators } from '../../types'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'
import { norwegianOrgNumberValidator } from './validators'

export type OrganizationNumberValidator = ValidatorWithCustomValidators<
  string,
  {
    organizationNumberValidator: Validator<string>
  }
>
export type FieldOrganizationNumberProps = Omit<
  StringFieldProps,
  'onBlurValidator'
> & {
  validate?: boolean
  omitMask?: boolean
  onBlurValidator?: OrganizationNumberValidator | false
}

function OrganizationNumber(props: FieldOrganizationNumberProps) {
  const translations = useTranslation().OrganizationNumber
  const { errorOrgNo, errorOrgNoLength, errorRequired, label } =
    translations

  const errorMessages = useMemo(
    () => ({
      'Field.errorRequired': errorRequired,
      'Field.errorPattern': errorOrgNo,
      ...props.errorMessages,
    }),
    [errorRequired, errorOrgNo, props.errorMessages]
  )

  const organizationNumberValidator = useCallback(
    (value: string) => {
      return norwegianOrgNumberValidator(value, {
        errorOrgNo,
        errorOrgNoLength,
      })
    },
    [errorOrgNo, errorOrgNoLength]
  )

  const {
    validate = true,
    omitMask,
    onChangeValidator,
    onBlurValidator = organizationNumberValidator,
    label: labelProp,
    width,
  } = props

  const mask = useMemo(
    () =>
      omitMask
        ? [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
        : [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
    [omitMask]
  )

  const onBlurValidatorToUse =
    onBlurValidator === false ? undefined : onBlurValidator

  const StringFieldProps: StringFieldProps = {
    ...props,
    className: 'dnb-forms-field-organization-number',
    label: labelProp ?? label,
    errorMessages,
    mask,
    width: width ?? 'medium',
    inputMode: 'numeric',
    onChangeValidator: validate ? onChangeValidator : undefined,
    // @ts-expect-error - strictFunctionTypes
    onBlurValidator: validate ? onBlurValidatorToUse : undefined,
    exportValidators: { organizationNumberValidator },
  }

  return <StringField {...StringFieldProps} />
}

withComponentMarkers(OrganizationNumber, {
  _supportsSpacingProps: true,
})

export default OrganizationNumber
