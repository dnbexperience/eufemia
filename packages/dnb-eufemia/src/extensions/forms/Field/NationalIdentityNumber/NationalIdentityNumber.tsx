import React, { useContext, useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'

import { Context } from '../../DataContext/'
import useErrorMessage from '../../hooks/useErrorMessage'

export type Props = StringFieldProps & {
  omitMask?: boolean
  validate?: boolean
}

function NationalIdentityNumber(props: Props) {
  const context = useContext(Context)
  const translations = context.translations.nationalIdentityNumber
  const errorMessage = translations.error.required

  const { validate = true, omitMask } = props

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

  const StringFieldProps: Props = {
    ...props,
    pattern:
      props.pattern ??
      (validate && !props.validator ? '^[0-9]{11}$' : undefined),
    label: props.label ?? translations.label,
    errorMessages,
    mask,
    width: props.width ?? 'medium',
    inputMode: 'numeric',
  }

  return <StringField {...StringFieldProps} />
}

NationalIdentityNumber._supportsSpacingProps = true
export default NationalIdentityNumber
