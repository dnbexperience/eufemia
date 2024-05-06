import React, { useCallback } from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import {
  format,
  cleanNumber,
} from '../../../../components/number-format/NumberUtils'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringValueProps

function OrganizationNumber(props: Props) {
  const translations = useTranslation().OrganizationNumber

  const toInput = useCallback((value) => {
    return format(cleanNumber(value), {
      org: true,
    }).toString()
  }, [])

  const stringValueProps: Props = {
    ...props,
    label: props.label ?? (props.inline ? undefined : translations.label),
    toInput,
  }
  return <StringValue {...stringValueProps} />
}

OrganizationNumber._supportsSpacingProps = true
export default OrganizationNumber
