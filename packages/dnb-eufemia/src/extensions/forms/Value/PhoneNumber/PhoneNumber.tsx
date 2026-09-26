import { useCallback } from 'react'
import type { ReactNode } from 'react'
import type { ValueStringProps as StringValueProps } from '../String'
import StringValue from '../String'
import { formatPhoneNumber } from '../../../../components/number-format/NumberUtils'
import NumberFormatPhoneNumber from '../../../../components/number-format/PhoneNumber'
import useTranslation from '../../hooks/useTranslation'
import { isValueEmpty } from '../../ValueBlock'
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

    return formatPhoneNumber(value).toString()
  }, [])

  const renderValue = useCallback((value: ReactNode) => {
    // Reformatting would drop what a custom transformIn returned.
    const isFormatted =
      typeof value === 'string' &&
      formatPhoneNumber(value).toString() === value

    return isFormatted ? <NumberFormatPhoneNumber value={value} /> : value
  }, [])

  const stringValueProps: ValuePhoneNumberProps = {
    ...props,
    label,
    toInput,
  }

  return <StringValue {...stringValueProps} renderValue={renderValue} />
}

withComponentMarkers(PhoneNumber, {
  _supportsSpacingProps: true,
})

export default PhoneNumber
