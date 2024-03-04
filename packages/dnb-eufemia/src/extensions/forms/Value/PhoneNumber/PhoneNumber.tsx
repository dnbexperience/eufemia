import React from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import {
  format,
  cleanNumber,
} from '../../../../components/number-format/NumberUtils'
import { useLocale } from '../../../../shared/useLocale'

export type Props = StringValueProps

function PhoneNumber(props: Props) {
  const transaltions = useLocale().Forms.phoneNumber

  const label =
    props.label ?? (props.inline ? undefined : transaltions.label)
  const prepare = (value) =>
    format(cleanNumber(value), {
      phone: true,
    }).toString()
  const stringValueProps: Props = {
    ...props,
    label,
    prepare,
  }

  return <StringValue {...stringValueProps} />
}

PhoneNumber._supportsSpacingProps = true
export default PhoneNumber
