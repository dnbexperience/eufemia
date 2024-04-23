import { useCallback, useEffect, useState } from 'react'
import { convertStringToDate, isDisabled } from '../DatePickerCalc'
import isValid from 'date-fns/isValid'
import usePreviousProps from './usePreviousValue'
import { useInputDates } from './useInputDates'

export type DateProps = {
  date?: Date | string
  startDate?: Date | string
  endDate?: Date | string
  startMonth?: Date | string
  endMonth?: Date | string
  minDate?: Date | string
  maxDate?: Date | string
  hoverDate?: Date | string | null
}

type UseDatesOptions = {
  dateFormat: string
  isRange: boolean
  shouldCorrectDate: boolean
}

export type Dates = {
  date?: Date | string
  startDate?: Date
  endDate?: Date
  minDate?: Date
  maxDate?: Date
  startMonth?: Date
  endMonth?: Date
  partialStartDate?: Date
  partialEndDate?: Date
  hasHadValidDate?: boolean
  hoverDate?: Date
  __startDay?: string
  __startMonth?: string
  __startYear?: string
  __endDay?: string
  __endMonth?: string
  __endYear?: string
}

export default function useDates(
  initialDates: DateProps,
  {
    dateFormat,
    isRange = false,
    shouldCorrectDate = false,
  }: UseDatesOptions
) {
  const initDates = useCallback(() => {
    const startDate = convertStringToDate(
      typeof initialDates?.startDate !== 'undefined'
        ? String(initialDates.startDate)
        : typeof initialDates?.date !== 'undefined'
        ? String(initialDates.date)
        : '',
      {
        date_format: dateFormat,
      }
    )

    const endDate = !isRange
      ? startDate
      : convertStringToDate(
          String(initialDates?.endDate) || String(initialDates?.date),
          {
            date_format: dateFormat,
          }
        ) || undefined

    const startMonth = convertStringToDate(
      String(initialDates.startMonth),
      {
        date_format: dateFormat,
      }
    )

    const endMonth = convertStringToDate(String(initialDates.endMonth), {
      date_format: dateFormat,
    })

    const minDate = convertStringToDate(String(initialDates.minDate), {
      date_format: dateFormat,
    })

    const maxDate = convertStringToDate(String(initialDates.maxDate), {
      date_format: dateFormat,
    })

    const hasValidStartDate = isValid(startDate)
    const hasValidEndDate = isValid(endDate)

    const correctedDates = shouldCorrectDate
      ? correctThatDate({ startDate, endDate, minDate, maxDate, isRange })
      : {}

    return {
      startDate,
      endDate,
      startMonth,
      endMonth,
      minDate,
      maxDate,
      hasHadValidDate: hasValidStartDate || hasValidEndDate,
      ...correctedDates,
    }
  }, [initialDates, dateFormat, isRange, shouldCorrectDate])

  const previousDates = usePreviousProps(initialDates)
  const [dates, setDates] = useState<Dates>({
    date:
      previousDates.date !== initialDates.date
        ? initialDates.date
        : previousDates.date,
    ...initDates(),
  })
  const [inputDates, hasHadValidDate] = useInputDates(
    dates.startDate,
    dates.endDate
  )

  const updateDates = useCallback(
    (newDates, callback?: (dates: Dates) => void) => {
      const correctedDates = shouldCorrectDate
        ? correctThatDate({
            startDate: newDates.startDate ?? dates.startDate,
            endDate: newDates.endDate ?? dates.endDate,
            minDate: dates.minDate,
            maxDate: dates.maxDate,
            isRange,
          })
        : {}

      setDates((currentDates) => {
        return {
          ...currentDates,
          ...newDates,
          ...correctedDates,
        }
      })

      if (callback) {
        callback({
          ...dates,
          ...newDates,
          ...correctedDates,
        })
      }
    },
    [dates, shouldCorrectDate, isRange]
  )

  // Update dates on prop change
  useEffect(() => {
    const hasDatePropsChanged = Object.keys(initialDates).some((date) => {
      return initialDates[date] !== previousDates[date]
    })

    if (hasDatePropsChanged) {
      updateDates({ date: initialDates.date, ...initDates() })
    }
  }, [initialDates, previousDates, initDates, updateDates])

  return [
    { ...dates, ...inputDates },
    updateDates,
    hasHadValidDate,
    previousDates,
  ] as const
}

function correctThatDate({
  startDate,
  endDate,
  minDate,
  maxDate,
  isRange,
}) {
  const correctedDates = {}

  if (isDisabled(startDate, minDate, maxDate)) {
    correctedDates['startDate'] = minDate
  }
  if (isDisabled(endDate, minDate, maxDate)) {
    // state.endDate is only used by the input if range is set to true.
    // this is done to make max_date correction work if the input is not a range and only max_date is defined.
    if (!isRange && !minDate) {
      correctedDates['startDate'] = maxDate
    } else {
      correctedDates['endDate'] = maxDate
    }
  }

  return correctedDates
}

export const pad = (num, size) => ('000000000' + num).substr(-size)
