import { useCallback, useEffect, useRef, useState } from 'react'
import { convertStringToDate, isDisabled } from '../DatePickerCalc'
import isValid from 'date-fns/isValid'
import usePreviousValue from './usePreviousValue'
import format from 'date-fns/format'
import { addMonths } from 'date-fns'

export type DatePickerInitialDates = {
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
  isLinked: boolean
  shouldCorrectDate: boolean
}

export type DatePickerInputDates = {
  __startDay?: string
  __startMonth?: string
  __startYear?: string
  __endDay?: string
  __endMonth?: string
  __endYear?: string
}

export type DatePickerDates = {
  date?: Date | string
  startDate?: Date
  endDate?: Date
  minDate?: Date
  maxDate?: Date
  startMonth?: Date
  endMonth?: Date
  partialStartDate?: string
  partialEndDate?: string
  hasHadValidDate?: boolean
  hoverDate?: Date
} & DatePickerInputDates

export default function useDates(
  initialDates: DatePickerInitialDates,
  {
    dateFormat,
    isRange = false,
    isLinked = false,
    shouldCorrectDate = false,
  }: UseDatesOptions
) {
  const previousDates = usePreviousValue(initialDates)
  const [dates, setDates] = useState<DatePickerDates>({
    date:
      previousDates.date !== initialDates.date
        ? initialDates.date
        : previousDates.date,
    ...mapDates(initialDates, {
      dateFormat,
      isRange,
      shouldCorrectDate,
    }),
  })

  const hasHadValidDate = useRef<boolean>(false)

  const updateDates = useCallback(
    (
      newDates: DatePickerDates,
      callback?: (dates: DatePickerDates) => void
    ) => {
      const correctedDates = shouldCorrectDate
        ? correctDates({
            startDate: newDates.startDate ?? dates.startDate,
            endDate: newDates.endDate ?? dates.endDate,
            minDate: dates.minDate,
            maxDate: dates.maxDate,
            isRange,
          })
        : {}

      // Update months based on month or start/end date changes
      // Should be moved to useViews
      const months = {
        startMonth:
          newDates.startMonth ??
          (!isLinked ? newDates.startDate : dates.startMonth),
        endMonth:
          newDates.endMonth ??
          (!isLinked ? newDates.endDate : dates.endMonth),
      }

      setDates((currentDates) => {
        return {
          ...currentDates,
          ...newDates,
          ...months,
          ...correctedDates,
        }
      })

      callback?.({
        ...dates,
        ...newDates,
        ...months,
        ...correctedDates,
      })
    },
    [dates, shouldCorrectDate, isRange, isLinked]
  )

  // Update dates on prop change
  useEffect(() => {
    const hasDatePropsChanged = Object.keys(initialDates).some((date) => {
      return initialDates[date] !== previousDates[date]
    })

    if (hasDatePropsChanged) {
      updateDates({
        date: initialDates.date,
        ...mapDates(initialDates, {
          dateFormat,
          isRange,
          shouldCorrectDate,
        }),
      })
    }
  }, [
    initialDates,
    previousDates,
    updateDates,
    dateFormat,
    isRange,
    isLinked,
    shouldCorrectDate,
  ])

  // Updated input dates based on start and end dates, move to DatePickerInput
  useEffect(() => {
    const startDates = updateInputDates('start', dates)
    const endDates = updateInputDates('end', dates)

    hasHadValidDate.current =
      isValid(dates.startDate) || isValid(dates.endDate)

    setDates((currentDates) => ({
      ...currentDates,
      ...startDates,
      ...endDates,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dates.startDate, dates.endDate])

  return [
    dates,
    updateDates,
    hasHadValidDate.current,
    previousDates,
  ] as const
}

function updateInputDates(type: 'start' | 'end', dates: DatePickerDates) {
  const updatedDates = {}
  const date = dates[`${type}Date`]

  if (isValid(date)) {
    updatedDates[`__${type}Day`] = pad(format(date, 'dd'), 2)
    updatedDates[`__${type}Month`] = pad(format(date, 'MM'), 2)
    updatedDates[`__${type}Year`] = format(date, 'yyyy')
  } else if (date === undefined) {
    updatedDates[`__${type}Day`] = null
    updatedDates[`__${type}Month`] = null
    updatedDates[`__${type}Year`] = null
  }

  return updatedDates
}

function mapDates(
  initialDates: DatePickerInitialDates,
  {
    dateFormat,
    isRange,
    shouldCorrectDate,
  }: Omit<UseDatesOptions, 'isLinked'>
) {
  const startDate =
    typeof initialDates?.startDate !== 'undefined'
      ? getDate(initialDates.startDate, dateFormat)
      : typeof initialDates?.date !== 'undefined'
      ? getDate(initialDates.date, dateFormat)
      : null

  const endDate = !isRange
    ? startDate
    : convertStringToDate(initialDates?.endDate || initialDates?.date, {
        date_format: dateFormat,
      }) || undefined

  // Ensure that the calendar view displays the correct months on initial render
  const startMonth =
    convertStringToDate(initialDates.startMonth, {
      date_format: dateFormat,
    }) ??
    startDate ??
    new Date()

  const endMonth =
    convertStringToDate(initialDates.endMonth, {
      date_format: dateFormat,
    }) ?? isRange
      ? endDate ?? addMonths(startMonth, 1)
      : startMonth

  const minDate = convertStringToDate(initialDates.minDate, {
    date_format: dateFormat,
  })

  const maxDate = convertStringToDate(initialDates.maxDate, {
    date_format: dateFormat,
  })

  const hasValidStartDate = isValid(startDate)
  const hasValidEndDate = isValid(endDate)

  const correctedDates = shouldCorrectDate
    ? correctDates({ startDate, endDate, minDate, maxDate, isRange })
    : {}

  const dates = {
    startDate,
    endDate,
    startMonth,
    endMonth,
    minDate,
    maxDate,
    ...correctedDates,
  }

  return {
    ...dates,
    __startDay: hasValidStartDate
      ? pad(format(dates.startDate, 'dd'), 2)
      : null,
    __startMonth: hasValidStartDate
      ? pad(format(dates.startDate, 'MM'), 2)
      : null,
    __startYear: hasValidStartDate
      ? format(dates.startDate, 'yyyy')
      : null,
    __endDay: hasValidEndDate ? pad(format(dates.endDate, 'dd'), 2) : null,
    __endMonth: hasValidEndDate
      ? pad(format(dates.endDate, 'MM'), 2)
      : null,
    __endYear: hasValidEndDate ? format(dates.endDate, 'yyyy') : null,
  }
}

function correctDates({
  startDate,
  endDate,
  minDate,
  maxDate,
  isRange,
}: {
  startDate: Date
  endDate: Date
  minDate: Date
  maxDate: Date
  isRange: boolean
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

function getDate(date: Date | string, dateFormat: string) {
  return date instanceof Date
    ? date
    : convertStringToDate(date ?? '', {
        date_format: dateFormat,
      })
}

export function pad(date: string, size: number) {
  const dateWithPadding = '000000000' + date

  return dateWithPadding.substring(dateWithPadding.length - size)
}
