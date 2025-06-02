import React, { useCallback, useContext } from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import useTranslation from '../../hooks/useTranslation'
import SharedContext, { AnyLocale } from '../../../../shared/Context'

import { parseRangeValue } from '../../Field/Date'
import {
  formatDate,
  formatDateRange,
} from '../../../../components/date-format/DateFormatUtils'

export type Props = StringValueProps & {
  variant?: 'long' | 'short' | 'numeric'
  locale?: AnyLocale
}

function DateComponent(props: Props) {
  const translations = useTranslation().Date
  const { locale: contextLocale } = useContext(SharedContext)
  const locale = props.locale ?? contextLocale
  const options = convertVariantToDateStyle(props.variant ?? 'long')

  const toInput = useCallback(
    (value: string) => {
      if (!value) {
        return undefined
      }

      // Range values contains the pipe separator in the middle
      const isRange = /\|/.test(value)

      if (isRange) {
        const [startDate, endDate] = parseRangeValue(value)

        return formatDateRange({ startDate, endDate }, { locale, options })
      }

      return formatDate(value, { locale, options })
    },
    [locale, options]
  )

  const stringProps: Props = {
    ...props,
    label: props.label ?? translations.label,
    toInput,
  }
  return <StringValue {...stringProps} />
}

function convertVariantToDateStyle(
  variant: Props['variant']
): Intl.DateTimeFormatOptions {
  if (variant === 'long') {
    return { dateStyle: 'long' }
  }
  if (variant === 'short') {
    return { dateStyle: 'medium' }
  }

  return { dateStyle: 'short' }
}

DateComponent._supportsSpacingProps = true
export default DateComponent
