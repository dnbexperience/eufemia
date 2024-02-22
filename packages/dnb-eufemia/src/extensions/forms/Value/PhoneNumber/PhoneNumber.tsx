import React, { useContext } from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import { Context } from '../../DataContext'
import {
  format,
  cleanNumber,
} from '../../../../components/number-format/NumberUtils'

export type Props = StringValueProps

function PhoneNumber(props: Props) {
  const context = useContext(Context)
  const transaltions = context.translations.phoneNumber

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
