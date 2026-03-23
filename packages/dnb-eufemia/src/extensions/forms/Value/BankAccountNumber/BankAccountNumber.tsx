import React, { useCallback } from 'react'
import type { ValueStringProps as StringValueProps } from '../String'
import StringValue from '../String'
import {
  format,
  cleanNumber,
} from '../../../../components/number-format/NumberUtils'
import useTranslation from '../../hooks/useTranslation'
import { isValueEmpty } from '../../ValueBlock'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValueBankAccountNumberProps = StringValueProps

function BankAccountNumber(props: ValueBankAccountNumberProps) {
  const translations = useTranslation().BankAccountNumber

  const toInput = useCallback((value) => {
    if (isValueEmpty(value)) {
      return undefined
    }
    return format(cleanNumber(value), {
      ban: true,
    }).toString()
  }, [])

  const stringValueProps: ValueBankAccountNumberProps = {
    ...props,
    label: props.label ?? (props.inline ? undefined : translations.label),
    toInput,
  }
  return <StringValue {...stringValueProps} />
}

withComponentMarkers(BankAccountNumber, {
  _supportsSpacingProps: true,
})

export default BankAccountNumber
