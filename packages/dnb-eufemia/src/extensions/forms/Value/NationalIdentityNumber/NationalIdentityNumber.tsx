import React, { useContext } from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import { Context } from '../../DataContext'
import {
  format,
  cleanNumber,
} from '../../../../components/number-format/NumberUtils'

export type Props = StringValueProps

function NationalIdentityNumber(props: Props) {
  const context = useContext(Context)
  const translations = context.translations.nationalIdentityNumber

  const stringValueProps: Props = {
    ...props,
    label: props.label ?? (props.inline ? undefined : translations.label),
    prepare: (value) =>
      format(cleanNumber(value), {
        nin: true,
      }).toString(),
  }
  return <StringValue {...stringValueProps} />
}

NationalIdentityNumber._supportsSpacingProps = true
export default NationalIdentityNumber
