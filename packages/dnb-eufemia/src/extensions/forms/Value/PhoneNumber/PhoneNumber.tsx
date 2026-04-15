import React, { useCallback } from 'react'
import type { ValueStringProps as StringValueProps } from '../String'
import StringValue from '../String'
import { format } from '../../../../components/number-format/NumberUtils'
import useTranslation from '../../hooks/useTranslation'
import { isValueEmpty } from '../../ValueBlock'
import detectCountryCode from '../../utils/detectCountryCode'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValuePhoneNumberProps = StringValueProps

function PhoneNumber(props: ValuePhoneNumberProps) {
  const translations = useTranslation().PhoneNumber

  const label =
    props.label ?? (props.inline ? undefined : translations.numberLabel)

  const toInput = useCallback((value) => {
    if (isValueEmpty(value)) {
      return undefined
    }

    // Values with spaces are not valid E.164 — reject them
    if (typeof value === 'string' && value.includes(' ')) {
      return undefined
    }

    // Detect country code and insert a space so the phone formatter
    // can split them correctly for display.
    // detectCountryCode handles both "+" and "00" prefixed values.
    if (typeof value === 'string') {
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

  const stringValueProps: ValuePhoneNumberProps = {
    ...props,
    label,
    toInput,
  }

  return <StringValue {...stringValueProps} />
}

withComponentMarkers(PhoneNumber, {
  _supportsSpacingProps: true,
})

export default PhoneNumber
