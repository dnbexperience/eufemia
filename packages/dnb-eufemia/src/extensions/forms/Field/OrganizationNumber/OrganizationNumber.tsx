import React, { useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import useErrorMessage from '../../hooks/useErrorMessage'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringFieldProps & {
  validate?: boolean
  omitMask?: boolean
}

function OrganizationNumber(props: Props) {
  const translations = useTranslation().OrganizationNumber

  const { validate = true, omitMask } = props

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: translations.errorRequired,
    pattern: translations.errorPattern,
  })

  const mask = useMemo(
    () =>
      omitMask
        ? [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
        : [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
    [omitMask]
  )

  const StringFieldProps: Props = {
    ...props,
    className: 'dnb-forms-field-organization-number',
    pattern: props.pattern ?? (validate ? '^[0-9]{9}$' : undefined),
    label: props.label ?? translations.label,
    errorMessages,
    mask,
    width: props.width ?? 'medium',
    inputMode: 'numeric',
  }

  return <StringField {...StringFieldProps} />
}

OrganizationNumber._supportsSpacingProps = true
export default OrganizationNumber
