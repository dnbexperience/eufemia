import { useCallback } from 'react'
import type { ValueStringProps as StringValueProps } from '../String'
import StringValue from '../String'
import { formatPhoneNumber } from '../../../../components/number-format/NumberUtils'
import useTranslation from '../../hooks/useTranslation'
import { isValueEmpty } from '../../ValueBlock'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValuePhoneNumberProps = StringValueProps

function PhoneNumber(props: ValuePhoneNumberProps) {
  const translations = useTranslation().PhoneNumber

  const defaultLabel =
    props.defaultLabel ??
    (props.inline ? undefined : translations.numberLabel)

  const toInput = useCallback((value) => {
    if (isValueEmpty(value)) {
      return undefined
    }

    return formatPhoneNumber(value).toString()
  }, [])

  const stringValueProps: ValuePhoneNumberProps = {
    ...props,
    defaultLabel,
    toInput,
  }

  return <StringValue {...stringValueProps} />
}

withComponentMarkers(PhoneNumber, {
  _supportsSpacingProps: true,
})

export default PhoneNumber
