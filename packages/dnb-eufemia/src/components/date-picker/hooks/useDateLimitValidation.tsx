import React, { useMemo } from 'react'
import { useTranslation } from '../../../shared'
import { DatePickerDates } from './useDates'
import { format, isAfter, isBefore } from 'date-fns'
import { DatePickerProps } from '../DatePicker'
import { Li, Ul } from '../../../elements'
import { enGB, nb } from 'date-fns/locale'
import { ProviderProps } from '../../../shared/Provider'

type DateLimitValidation = {
  status: DatePickerProps['status']
  statusState: DatePickerProps['statusState']
}

const locales = {
  'nb-NO': nb,
  'en-GB': enGB,
}

export default function useDateLimitValidation({
  minDate,
  maxDate,
  endDate,
  startDate,
  isRange,
  localeKey = 'nbNO',
}: Pick<
  DatePickerDates,
  'startDate' | 'endDate' | 'minDate' | 'maxDate'
> & {
  isRange: DatePickerProps['range']
  localeKey: ProviderProps['locale']
}) {
  const translation = useTranslation().DatePicker
  const dateFormat = 'PPP'
  const locale = locales[localeKey]

  const validationMessage = useMemo<
    DateLimitValidation | undefined
  >(() => {
    if (!minDate && !maxDate) {
      return undefined
    }

    const statusState = 'error'

    // Handle non range validation
    if (!isRange) {
      if (isBefore(startDate, minDate)) {
        return {
          status: translation.errorMinDate.replace(
            /%s/,
            format(minDate, dateFormat, { locale })
          ),
          statusState,
        }
      }

      if (isAfter(startDate, maxDate)) {
        return {
          status: translation.errorMaxDate.replace(
            /%s/,
            format(maxDate, dateFormat, { locale })
          ),
          statusState,
        }
      }
    }

    const messages = []

    if (isBefore(startDate, minDate)) {
      messages.push(
        translation.errorRangeStartDateMinDate.replace(
          /%s/,
          format(minDate, dateFormat, { locale })
        )
      )
    }

    if (isAfter(startDate, maxDate)) {
      messages.push(
        translation.errorRangeStartDateMaxDate.replace(
          /%s/,
          format(maxDate, dateFormat, { locale })
        )
      )
    }

    if (isBefore(endDate, minDate)) {
      messages.push(
        translation.errorRangeEndDateMinDate.replace(
          /%s/,
          format(minDate, dateFormat, { locale })
        )
      )
    }

    if (isAfter(endDate, maxDate)) {
      messages.push(
        translation.errorRangeEndDateMaxDate.replace(
          /%s/,
          format(maxDate, dateFormat, { locale })
        )
      )
    }

    const status =
      messages.length > 1
        ? combineErrorMessages(translation.errorSummary, messages)
        : messages[0]

    return status ? { status, statusState } : undefined
  }, [startDate, endDate, minDate, maxDate, isRange, translation, locale])

  return validationMessage
}

export function combineErrorMessages(
  title: string,
  messages: React.ReactNode[]
) {
  return (
    <>
      {title}
      <Ul>
        {messages.map((status, i) => {
          return <Li key={i}>{status}</Li>
        })}
      </Ul>
    </>
  )
}
