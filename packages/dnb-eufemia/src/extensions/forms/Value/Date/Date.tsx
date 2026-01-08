import React, { useCallback, useContext } from 'react'
import type { Props as StringValueProps } from '../String';
import StringValue from '../String'
import useTranslation from '../../hooks/useTranslation'
import type { AnyLocale } from '../../../../shared/Context';
import SharedContext from '../../../../shared/Context'

import { parseRangeValue } from '../../Field/Date'
import {
  formatDate,
  formatDateRange,
} from '../../../../components/date-format/DateFormatUtils'
import { DEFAULT_DATE_FORMAT } from '../../Field/DateOfBirth/DateOfBirth'

export type Props = StringValueProps & {
  variant?: 'long' | 'short' | 'numeric'
  locale?: AnyLocale
  dateFormat?: string
}

function DateComponent(props: Props) {
  const translations = useTranslation().Date
  const { locale: contextLocale } = useContext(SharedContext)
  const locale = props.locale ?? contextLocale
  const { dateFormat, variant = 'long' } = props
  const options = convertVariantToDateStyle(variant)

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

      // If custom dateFormat is provided, use it instead of the variant
      if (dateFormat && dateFormat !== DEFAULT_DATE_FORMAT) {
        return formatCustomDate(value, dateFormat)
      }

      return formatDate(value, { locale, options })
    },
    [locale, options, dateFormat]
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

function formatCustomDate(value: string, dateFormat: string): string {
  try {
    // Parse the date value (assuming it's in ISO format or similar)
    const date = new Date(value)

    if (isNaN(date.getTime())) {
      return value // Return original value if parsing fails
    }

    // Convert the custom format to a format that can be used with date formatting
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return dateFormat
      .replace('yyyy', year.toString())
      .replace('MM', month)
      .replace('dd', day)
  } catch (error) {
    return value // Return original value if formatting fails
  }
}

DateComponent._supportsSpacingProps = true
export default DateComponent
