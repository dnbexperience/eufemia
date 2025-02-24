import React, { useCallback, useContext } from 'react'
import { parseISO } from 'date-fns'
import { LOCALE } from '../../../../shared/defaults'
import StringValue, { Props as StringValueProps } from '../String'
import useTranslation from '../../hooks/useTranslation'
import SharedContext, { AnyLocale } from '../../../../shared/Context'

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

export type FormatDateOptions = {
  locale?: string
  variant?: Props['variant']
}

export function formatDate(
  value: string,
  { locale = LOCALE, variant = 'numeric' }: FormatDateOptions = {}
) {
  // Either of the range dates can be null
  const isRange =
    /^(\d{4}-\d{2}-\d{2}|null|undefined)\|(\d{4}-\d{2}-\d{2}|null|undefined)$/.test(
      value
    )
  const options = getOptions(variant)

  if (isRange) {
    const [startValue, endValue] = value.split('|')

    const startDate = parseISO(startValue)
    const endDate = parseISO(endValue)

    // Stop if either date is invalid
    if (isNaN(startDate.valueOf()) || isNaN(endDate.valueOf())) {
      return undefined
    }

    return typeof Intl !== 'undefined'
      ? new Intl.DateTimeFormat(locale, options).formatRange(
          startDate,
          endDate
        )
      : `${startDate.toLocaleString(
          locale,
          options
        )}|${endDate.toLocaleString(locale, options)}`
  }

  const date = parseISO(value)

  return typeof Intl !== 'undefined'
    ? new Intl.DateTimeFormat(locale, options).format(date)
    : date.toLocaleString(locale, options)
}

export function getOptions(
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

DateComponent._supportsSpacingProps = true
export default DateComponent
