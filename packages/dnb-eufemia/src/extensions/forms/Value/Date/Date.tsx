import React, { useCallback, useContext } from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import useTranslation from '../../hooks/useTranslation'
import SharedContext, { AnyLocale } from '../../../../shared/Context'

export type Props = StringValueProps & {
  variant?: 'long' | 'short' | 'numeric'
  locale?: AnyLocale
}

function getOptions(
  variant: Props['variant']
): Intl.DateTimeFormatOptions {
  if (variant === 'numeric') {
    return {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    } as const
  }

  return {
    day: 'numeric',
    month: variant,
    year: 'numeric',
  } as const
}

function formatDate({
  date,
  locale,
  options,
}: {
  date: Date
  locale: string
  options: Intl.DateTimeFormatOptions
}) {
  return typeof Intl !== 'undefined'
    ? new Intl.DateTimeFormat(locale, options).format(date)
    : date.toLocaleString(locale, options)
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

      // Either of the range dates can be null
      const isRange =
        /^(\d{4}-\d{2}-\d{2}|null) (\d{4}-\d{2}-\d{2}|null)$/.test(value)

      const options = getOptions(variant)

      if (isRange) {
        const [startValue, endValue] = value.split(/\s/)

        const startDate = new Date(startValue)
        const endDate = new Date(endValue)

        // Stop if either date is invalid
        if (isNaN(startDate.valueOf()) || isNaN(endDate.valueOf())) {
          return undefined
        }

        const formattedStartDate = formatDate({
          date: startDate,
          locale,
          options,
        })
        const formattedEndDate = formatDate({
          date: endDate,
          locale,
          options,
        })

        return `${formattedStartDate} - ${formattedEndDate}`
      }

      const date = new Date(value)
      const formattedDate = formatDate({ date, locale, options })

      return formattedDate
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
