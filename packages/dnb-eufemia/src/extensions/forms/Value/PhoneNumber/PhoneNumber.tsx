import React, { useCallback } from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import {
  format,
  cleanNumber,
} from '../../../../components/number-format/NumberUtils'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringValueProps

function PhoneNumber(props: Props) {
  const translations = useTranslation().PhoneNumber

  const label =
    props.label ?? (props.inline ? undefined : translations.label)

  const toInput = useCallback((value) => {
    return format(cleanNumber(value), {
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
