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

export type ValueNationalIdentityNumberProps = StringValueProps

function NationalIdentityNumber(props: ValueNationalIdentityNumberProps) {
  const translations = useTranslation().NationalIdentityNumber

  const toInput = useCallback((value) => {
    if (isValueEmpty(value)) {
      return undefined
    }
    return format(cleanNumber(value), {
      nin: true,
    }).toString()
  }, [])

  const stringValueProps: ValueNationalIdentityNumberProps = {
    ...props,
    label: props.label ?? (props.inline ? undefined : translations.label),
    toInput,
  }
  return <StringValue {...stringValueProps} />
}

withComponentMarkers(NationalIdentityNumber, {
  _supportsSpacingProps: true,
})

export default NationalIdentityNumber
