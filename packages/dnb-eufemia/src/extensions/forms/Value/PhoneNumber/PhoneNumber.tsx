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
    const splitBySpace = value?.split(' ')
    if (splitBySpace?.length > 1) {
      // This is good enough for norwegian country code.
      // As we don't have to format the country code, only return +47 {phonenumber}.
      // I believe other country codes, like Trinidad and Tobago
      // Should format the country code, like so +1 868 {phonenumber}. This is not supported today.
      return `${splitBySpace[0]} ${formatPhoneNumber(splitBySpace[1])}`
    } else {
      return formatPhoneNumber(value)
    }
  }, [])

  const stringValueProps: Props = {
    ...props,
    label,
    toInput,
  }

  return <StringValue {...stringValueProps} />
}

export const formatPhoneNumber = (phoneNumber) => {
  // This only adds space between two and two digits, like 22 22 22 22.
  // That's the correct way of formatting norwegian numbers.
  // But it's not correct for all countries we support.
  return format(cleanNumber(phoneNumber), {
    phone: true,
  }).toString()
}

PhoneNumber._supportsSpacingProps = true
export default PhoneNumber
