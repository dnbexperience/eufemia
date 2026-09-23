import { useCallback } from 'react'
import type { ValueStringProps as StringValueProps } from '../String'
import StringValue from '../String'
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

    return <NumberFormatPhoneNumber value={value} />
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
