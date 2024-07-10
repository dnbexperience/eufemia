import React, { useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import { fnr } from '@navikt/fnrvalidator'

import useErrorMessage from '../../hooks/useErrorMessage'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringFieldProps & {
  omitMask?: boolean
  validate?: boolean
}

function NationalIdentityNumber(props: Props) {
  const translations = useTranslation().NationalIdentityNumber
  const errorMessage = translations.errorRequired

  const { validate = true, omitMask, value } = props

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: errorMessage,
    pattern: errorMessage,
  })

  const mask = useMemo(
    () =>
      omitMask
        ? Array(11).fill(/\d/)
        : [
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ],
    [omitMask]
  )
  const validationPattern = '^[0-9]{11}$'

  function fnrValidator(value: string) {
    if (
      new RegExp(validationPattern).test(value) &&
      fnr(value).status === 'invalid'
    ) {
      return Error(translations.errorFnr)
    }
    return undefined
  }

  const StringFieldProps: Props = {
    ...props,
    pattern:
      props.pattern ??
      (validate && !props.validator ? validationPattern : undefined),
    label: props.label ?? translations.label,
    errorMessages,
    mask,
    value,
    width: props.width ?? 'medium',
    inputMode: 'numeric',
    validator: fnrValidator,
  }

  return <StringField {...StringFieldProps} />
}

NationalIdentityNumber._supportsSpacingProps = true
export default NationalIdentityNumber
