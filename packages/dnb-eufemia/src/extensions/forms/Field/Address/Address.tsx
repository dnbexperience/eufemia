import React, { useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringFieldProps

function Address(props: Props) {
  const { label, errorRequired, errorPattern } = useTranslation().Address
  const { autoComplete = 'street-address' } = props

  const errorMessages = useMemo(
    () => ({
      'Field.errorRequired': errorRequired,
      'Field.errorPattern': errorPattern,
      ...props.errorMessages,
    }),
    [errorPattern, errorRequired, props.errorMessages]
  )

  const StringFieldProps: Props = {
    label,
    autoComplete,
    inputMode: 'text',
    trim: true,
    ...props,
    errorMessages,
  }

  return <StringField {...StringFieldProps} />
}

Address._supportsSpacingProps = true
export default Address
