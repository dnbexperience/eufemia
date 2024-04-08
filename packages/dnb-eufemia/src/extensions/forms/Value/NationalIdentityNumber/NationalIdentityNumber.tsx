import React from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import {
  format,
  cleanNumber,
} from '../../../../components/number-format/NumberUtils'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringValueProps

function NationalIdentityNumber(props: Props) {
  const translations = useTranslation().NationalIdentityNumber

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
