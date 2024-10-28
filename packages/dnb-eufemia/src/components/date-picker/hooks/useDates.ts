import { useCallback, useEffect, useRef, useState } from 'react'
import { convertStringToDate, isDisabled } from '../DatePickerCalc'
import isValid from 'date-fns/isValid'
import usePreviousValue from './usePreviousValue'
import format from 'date-fns/format'
import { addMonths, isSameDay, isSameMonth } from 'date-fns'
import useViews, { CalendarView } from './useViews'

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
// TODO: Move to DatePickerInput
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

  // calling views here instead of DatePickerProvider, to able to sync start and end months up with calendar views
  // TODO: Reduce to just use start/endDate or start/endMonth to reduce complexity,
  // or only have startMonth and endMonth as props and not a state that changes
  const [views, setViews] = useViews({
    startMonth: dates.startMonth,
    startDate: dates.startDate,
    endDate: dates.endDate,
    endMonth: dates.endMonth,
    isRange,
  })

  const hasHadValidDate = useRef<boolean>(false)

  const updateDates = useCallback(
    (
      newDates: DatePickerDates,
      callback?: (dates: DatePickerDates) => void
    ) => {
      // Correct dates based on min and max date
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
      const months = updateMonths({
        newDates,
        currentDates: dates,
        views,
        isRange,
      })

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
    [dates, shouldCorrectDate, isRange, views]
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
  // TODO: Move to DatePickerInput
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

  return {
    dates,
    updateDates,
    hasHadValidDate: hasHadValidDate.current,
    previousDates,
    views,
    setViews,
  } as const
}

// TODO: Move to DatePickerInput
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
      : undefined

  const endDate = !isRange
    ? startDate
    : convertStringToDate(initialDates?.endDate, {
        date_format: dateFormat,
      }) || undefined

  // Ensure that the calendar view displays the correct start and end months, and to prevent date flickering bug
  const startMonth =
    convertStringToDate(initialDates.startMonth, {
      date_format: dateFormat,
    }) ??
    startDate ??
    new Date()

  const endMonth =
    convertStringToDate(initialDates.endMonth, {
      date_format: dateFormat,
    }) ?? !isRange
      ? startMonth
      : endDate ?? addMonths(startMonth, 1)

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

function updateMonths({
  newDates,
  currentDates,
  views,
  isRange,
}: {
  newDates: DatePickerDates
  currentDates: DatePickerDates
  views: Array<CalendarView>
  isRange: boolean
}) {
  let startMonth = newDates.startMonth ?? newDates.startDate
  let endMonth = newDates.endMonth ?? newDates.endDate
  const [startView, endView] = views

  // Make sure start and end months are synced up with calendar in range mode, and preventing that same start and end date sets both pickers to the same month
  if (isRange) {
    if (isSameDay(startMonth, endMonth)) {
      if (
        (!isSameMonth(startMonth, endMonth) &&
          isSameMonth(startMonth, currentDates.startMonth)) ||
        isSameMonth(endMonth, currentDates.endMonth)
      ) {
        startMonth = startView?.month
        endMonth = endView?.month
      }
    }
  }

  return {
    startMonth: startMonth ?? currentDates.startMonth,
    endMonth: endMonth ?? currentDates.endMonth,
  }
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
