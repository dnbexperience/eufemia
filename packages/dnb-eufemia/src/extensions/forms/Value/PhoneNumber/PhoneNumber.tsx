import React, { useCallback } from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import { format } from '../../../../components/number-format/NumberUtils'
import useTranslation from '../../hooks/useTranslation'
import { isValueEmpty } from '../../ValueBlock'

export type Props = StringValueProps

function PhoneNumber(props: Props) {
  const translations = useTranslation().PhoneNumber

  const label =
    props.label ?? (props.inline ? undefined : translations.numberLabel)

  const toInput = useCallback((value) => {
    if (isValueEmpty(value)) {
      return undefined
    }
    // We can't use the "cleanNumber" function here, because we need to keep the country code separate from the number
    return format(value, {
      phone: true,
    }).toString()
  }, [])

  const stringValueProps: Props = {
    ...props,
    label,
    toInput,
  }

  return <StringValue {...stringValueProps} />
}

PhoneNumber._supportsSpacingProps = true
export default PhoneNumber
