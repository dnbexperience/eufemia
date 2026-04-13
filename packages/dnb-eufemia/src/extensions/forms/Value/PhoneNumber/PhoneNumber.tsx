import React, { useCallback } from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import { format } from '../../../../components/number-format/NumberUtils'
import useTranslation from '../../hooks/useTranslation'
import { isValueEmpty } from '../../ValueBlock'
import detectCountryCode from '../../utils/detectCountryCode'

export type Props = StringValueProps

function PhoneNumber(props: Props) {
  const translations = useTranslation().PhoneNumber

  const label =
    props.label ?? (props.inline ? undefined : translations.label)

  const toInput = useCallback((value) => {
    if (isValueEmpty(value)) {
      return undefined
    }

    // When the value has no space between the country code and the number,
    // detect and insert one so the phone formatter can split them correctly.
    if (typeof value === 'string' && !value.includes(' ')) {
      const detected = detectCountryCode(value)
      if (detected) {
        value = `${detected.countryCode} ${detected.phoneNumber}`
      }
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
