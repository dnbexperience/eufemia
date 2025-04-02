import React, { useCallback, useContext } from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import useTranslation from '../../hooks/useTranslation'
import SharedContext, { AnyLocale } from '../../../../shared/Context'
import {
  formatDate,
  formatDateRange,
} from '../../../../components/date-picker/DatePickerCalc'
import { parseRangeValue } from '../../Field/Date'

export type Props = StringValueProps & {
  variant?: 'long' | 'short' | 'numeric'
  locale?: AnyLocale
}

function DateComponent(props: Props) {
  const translations = useTranslation().Date
  const { locale: contextLocale } = useContext(SharedContext)
  const locale = props.locale ?? contextLocale
  const variant = props.variant ?? 'long'

  const toInput = useCallback(
    (value: string) => {
      if (!value) {
        return undefined
      }

      // Range values contains the pipe separator in the middle
      const isRange = /\|/.test(value)

      if (isRange) {
        const [startDate, endDate] = parseRangeValue(value)

        return formatDateRange({ startDate, endDate }, { locale, variant })
      }

      return formatDate(value, { locale, variant })
    },
    [locale, variant]
  )

  const stringProps: Props = {
    ...props,
    label: props.label ?? translations.label,
    toInput,
  }
  return <StringValue {...stringProps} />
}

DateComponent._supportsSpacingProps = true
export default DateComponent
