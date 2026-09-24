import { useCallback } from 'react'
import type { ReactNode } from 'react'
import type { ValueStringProps as StringValueProps } from '../String'
import StringValue from '../String'
import { formatNationalIdentityNumber } from '../../../../components/number-format/NumberUtils'
import NumberFormatNationalIdentityNumber from '../../../../components/number-format/NationalIdentityNumber'
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
    return formatNationalIdentityNumber(value).toString()
  }, [])

  const renderValue = useCallback(
    (value: ReactNode) =>
      typeof value === 'string' ? (
        <NumberFormatNationalIdentityNumber value={value} />
      ) : (
        value
      ),
    []
  )

  const stringValueProps: ValueNationalIdentityNumberProps = {
    ...props,
    label: props.label ?? (props.inline ? undefined : translations.label),
    toInput,
  }
  return <StringValue {...stringValueProps} renderValue={renderValue} />
}

withComponentMarkers(NationalIdentityNumber, {
  _supportsSpacingProps: true,
})

export default NationalIdentityNumber
