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

export type ValueOrganizationNumberProps = StringValueProps

function OrganizationNumber(props: ValueOrganizationNumberProps) {
  const translations = useTranslation().OrganizationNumber

  const toInput = useCallback((value) => {
    if (isValueEmpty(value)) {
      return undefined
    }
    return format(cleanNumber(value), {
      org: true,
    }).toString()
  }, [])

  const stringValueProps: ValueOrganizationNumberProps = {
    ...props,
    label: props.label ?? (props.inline ? undefined : translations.label),
    toInput,
  }
  return <StringValue {...stringValueProps} />
}

withComponentMarkers(OrganizationNumber, {
  _supportsSpacingProps: true,
})

export default OrganizationNumber
