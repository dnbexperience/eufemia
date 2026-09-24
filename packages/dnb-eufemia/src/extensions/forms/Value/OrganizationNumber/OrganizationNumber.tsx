import { useCallback } from 'react'
import type { ReactNode } from 'react'
import type { ValueStringProps as StringValueProps } from '../String'
import StringValue from '../String'
import { formatOrganizationNumber } from '../../../../components/number-format/NumberUtils'
import NumberFormatOrganizationNumber from '../../../../components/number-format/OrganizationNumber'
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
    return formatOrganizationNumber(value).toString()
  }, [])

  const renderValue = useCallback(
    (value: ReactNode) =>
      typeof value === 'string' ? (
        <NumberFormatOrganizationNumber value={value} />
      ) : (
        value
      ),
    []
  )

  const stringValueProps: ValueOrganizationNumberProps = {
    ...props,
    label: props.label ?? (props.inline ? undefined : translations.label),
    toInput,
  }
  return <StringValue {...stringValueProps} renderValue={renderValue} />
}

withComponentMarkers(OrganizationNumber, {
  _supportsSpacingProps: true,
})

export default OrganizationNumber
