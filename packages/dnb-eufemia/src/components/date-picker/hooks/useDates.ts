import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { convertStringToDate } from '../DatePickerCalc'
import {
  addMonths,
  differenceInCalendarMonths,
  isSameDay,
  isSameMonth,
  subMonths,
} from 'date-fns'
import type { DatePickerDateType } from '../DatePickerContext'

export type DatePickerDateProps = {
  date?: DatePickerDateType
  startDate?: DatePickerDateType
  endDate?: DatePickerDateType
  startMonth?: DatePickerDateType
  endMonth?: DatePickerDateType
  minDate?: DatePickerDateType
  maxDate?: DatePickerDateType
}

type UseDatesOptions = {
  dateFormat: string
  isRange: boolean
  rangeSingleCalendar?: boolean
}

export type DatePickerDates = {
  date?: DatePickerDateType
  startDate?: Date
  endDate?: Date
  minDate?: Date
  maxDate?: Date
  startMonth?: Date
  endMonth?: Date
}

export default function useDates(
  dateProps: DatePickerDateProps,
  {
    dateFormat,
    isRange = false,
    rangeSingleCalendar = false,
  }: UseDatesOptions
) {
  const [previousDateProps, setPreviousDateProps] = useState(dateProps)
  const [dates, setDates] = useState<DatePickerDates>({
    ...mapDates(dateProps, {
      dateFormat,
      isRange,
      rangeSingleCalendar,
    }),
  })
  const datesRef = useRef(dates)

  useEffect(() => {
    datesRef.current = dates
  }, [dates])

  const hasDatePropChanges = useMemo(
    () =>
      Object.keys(dateProps).some((date) => {
        const dateProp = dateProps[date]
        const previousDate = previousDateProps[date]

        const convertedDateProp = convertStringToDate(dateProp, {
          dateFormat,
        })
        const convertedPreviousDate = convertStringToDate(previousDate, {
          dateFormat,
        })
        // Make sure that same dates does not trigger a change
        // i.e. 2021-01-01 and new Date('2021-01-01')
        if (
          convertedDateProp instanceof Date &&
          convertedPreviousDate instanceof Date
        ) {
          return !isSameDay(convertedDateProp, convertedPreviousDate)
        }

        return dateProp !== previousDate
      }),
    [dateProps, previousDateProps, dateFormat]
  )

  // Update dates on prop change
  if (hasDatePropChanges) {
    const derivedDates = deriveDatesFromProps({
      dates,
      dateProps,
      previousDateProps,
      dateFormat,
      isRange,
    })

    setDates((currentDates) => ({ ...currentDates, ...derivedDates }))
    setPreviousDateProps(dateProps)
  }

  const updateDates = useCallback(
    (
      newDates: DatePickerDates,
      callback?: (dates: DatePickerDates) => void
    ) => {
      const currentDates = datesRef.current

      // Update months based on month or start/end date changes
      const months = updateMonths({
        newDates,
        currentDates,
        isRange,
        rangeSingleCalendar,
      })

      const nextDates = {
        ...currentDates,
        ...newDates,
        ...months,
      }

      datesRef.current = nextDates

      setDates(nextDates)

      callback?.(nextDates)
    },
    [isRange, rangeSingleCalendar]
  )

  return {
    dates,
    updateDates,
    previousDateProps,
  } as const
}

function mapDates(
  dateProps: DatePickerDateProps,
  { dateFormat, isRange, rangeSingleCalendar }: UseDatesOptions
) {
  const date = dateProps.date

  const startDate =
    typeof dateProps?.startDate !== 'undefined'
      ? getDate(dateProps.startDate, dateFormat)
      : typeof date !== 'undefined'
        ? getDate(date, dateFormat)
        : undefined

  const endDate = !isRange
    ? startDate
    : convertStringToDate(dateProps?.endDate, {
        dateFormat,
      }) || undefined

  const minDate = convertStringToDate(dateProps.minDate, {
    dateFormat,
  })

  const maxDate = convertStringToDate(dateProps.maxDate, {
    dateFormat,
  })

  // Ensure that the calendar view displays the correct start and end months, and to prevent date flickering bug
  const startMonth =
    convertStringToDate(dateProps.startMonth, {
      dateFormat,
    }) ??
    startDate ??
    getDefaultMonth({ minDate, maxDate })

  // Check if startMonth was explicitly provided (not just derived from startDate)
  const hasExplicitStartMonth = typeof dateProps.startMonth !== 'undefined'

  const hasExplicitEndMonth = typeof dateProps.endMonth !== 'undefined'
  const hasEndMonthFromEndDate = Boolean(
    endDate && !isSameMonth(endDate, startMonth)
  )

  const endMonth =
    convertStringToDate(dateProps.endMonth, {
      dateFormat: dateFormat,
    }) ??
    (isRange
      ? hasExplicitStartMonth
        ? addMonths(startMonth, 1)
        : hasEndMonthFromEndDate
          ? endDate
          : addMonths(startMonth, 1)
      : startMonth)

  const months =
    isRange &&
    !rangeSingleCalendar &&
    !hasExplicitStartMonth &&
    !hasExplicitEndMonth &&
    !hasEndMonthFromEndDate
      ? fitMonthsToMaxDate({ startMonth, endMonth, minDate, maxDate })
      : { startMonth, endMonth }

  const dates = {
    date,
    startDate,
    endDate,
    ...months,
    minDate,
    maxDate,
  }

  return {
    ...dates,
  }
}

function deriveDatesFromProps({
  dates,
  dateProps,
  previousDateProps,
  dateFormat,
  isRange,
}: {
  dates: DatePickerDates
  dateProps: DatePickerDateProps
  previousDateProps: DatePickerDateProps
  dateFormat: UseDatesOptions['dateFormat']
  isRange: UseDatesOptions['isRange']
}) {
  const derivedDates: DatePickerDates = {}

  const startDate = getStartDate(dateProps, previousDateProps)

  // Handle updates related to date and startDate changes when not in range mode
  if (typeof startDate !== 'undefined' && startDate !== dates.startDate) {
    derivedDates.startDate =
      convertStringToDate(startDate, {
        dateFormat,
      }) || undefined

    // Set endDate and startMonth to startDate if not in range mode
    if (!isRange) {
      derivedDates.startMonth =
        convertStringToDate(startDate, {
          dateFormat,
        }) || undefined

      derivedDates.endDate = derivedDates.startDate
    }
  }

  // update endDate based on endDate prop if in range mode
  if (
    isRange &&
    typeof dateProps.endDate !== 'undefined' &&
    dateProps.endDate !== dates.endDate
  ) {
    derivedDates.endDate =
      convertStringToDate(dateProps.endDate, {
        dateFormat,
      }) || undefined
  }

  // Handle startMonth/endMonth
  if (
    typeof dateProps.startMonth !== 'undefined' &&
    dateProps.startMonth !== previousDateProps.startMonth
  ) {
    derivedDates.startMonth = convertStringToDate(dateProps.startMonth, {
      dateFormat,
    })
  }
  if (
    typeof dateProps.endMonth !== 'undefined' &&
    dateProps.endMonth !== previousDateProps.endMonth
  ) {
    derivedDates.endMonth = convertStringToDate(dateProps.endMonth, {
      dateFormat,
    })
  }

  // Handle minDate/maxDate
  if (
    typeof dateProps.minDate !== 'undefined' &&
    dateProps.minDate !== previousDateProps.minDate
  ) {
    derivedDates.minDate = convertStringToDate(dateProps.minDate, {
      dateFormat,
    })
  }
  if (
    typeof dateProps.maxDate !== 'undefined' &&
    dateProps.maxDate !== previousDateProps.maxDate
  ) {
    derivedDates.maxDate = convertStringToDate(dateProps.maxDate, {
      dateFormat,
    })
  }

  return derivedDates
}

function updateMonths({
  newDates,
  currentDates,
  isRange,
  rangeSingleCalendar,
}: {
  newDates: DatePickerDates
  currentDates: DatePickerDates
  isRange: boolean
  rangeSingleCalendar: boolean
}) {
  const startDate =
    'startDate' in newDates ? newDates.startDate : currentDates.startDate
  const endDate =
    'endDate' in newDates ? newDates.endDate : currentDates.endDate

  // When the end date is after maxDate, show both months, as on mount
  if (
    isRange &&
    !rangeSingleCalendar &&
    !newDates.startMonth &&
    !newDates.endMonth &&
    startDate &&
    endDate &&
    currentDates.maxDate &&
    isSameMonth(startDate, currentDates.maxDate) &&
    differenceInCalendarMonths(endDate, startDate) > 0
  ) {
    return { startMonth: startDate, endMonth: endDate }
  }

  const startMonth =
    newDates.startMonth ?? newDates.startDate ?? currentDates.startMonth
  let endMonth =
    newDates.endMonth ?? newDates.endDate ?? currentDates.endMonth

  const hasEndMonthFromEndDate = Boolean(
    !newDates.endMonth &&
    newDates.endDate &&
    startMonth &&
    differenceInCalendarMonths(newDates.endDate, startMonth) > 0
  )

  // The second calendar must show a later month than the first one.
  // When it does not, show the month after the first one, the same as on
  // mount (see mapDates)
  if (
    isRange &&
    startMonth &&
    endMonth &&
    differenceInCalendarMonths(endMonth, startMonth) < 1
  ) {
    endMonth = addMonths(startMonth, 1)
  }

  if (
    isRange &&
    !rangeSingleCalendar &&
    !newDates.startMonth &&
    !newDates.endMonth &&
    !hasEndMonthFromEndDate &&
    startMonth &&
    endMonth
  ) {
    return fitMonthsToMaxDate({
      startMonth,
      endMonth,
      minDate: currentDates.minDate,
      maxDate: currentDates.maxDate,
    })
  }

  return {
    startMonth,
    endMonth,
  }
}

/**
 * Use the current month, or the nearest month within minDate and maxDate,
 * so the calendar does not open on a month where no day can be selected.
 */
function getDefaultMonth({
  minDate,
  maxDate,
}: {
  minDate?: Date
  maxDate?: Date
}) {
  const today = new Date()

  if (maxDate && differenceInCalendarMonths(today, maxDate) > 0) {
    return maxDate
  }

  if (minDate && differenceInCalendarMonths(today, minDate) < 0) {
    return minDate
  }

  return today
}

/**
 * When the first calendar shows the month of maxDate, the second calendar
 * shows a month where no day can be selected. Show the month before in the
 * first calendar instead, unless that month is before minDate.
 */
function fitMonthsToMaxDate({
  startMonth,
  endMonth,
  minDate,
  maxDate,
}: {
  startMonth: Date
  endMonth: Date
  minDate?: Date
  maxDate?: Date
}) {
  if (
    maxDate &&
    isSameMonth(startMonth, maxDate) &&
    differenceInCalendarMonths(endMonth, maxDate) > 0
  ) {
    const previousMonth = subMonths(startMonth, 1)

    if (
      !minDate ||
      differenceInCalendarMonths(previousMonth, minDate) >= 0
    ) {
      return { startMonth: previousMonth, endMonth: startMonth }
    }
  }

  return { startMonth, endMonth }
}

function getDate(date: DatePickerDateType, dateFormat: string) {
  return date instanceof Date
    ? date
    : convertStringToDate(date ?? '', {
        dateFormat,
      })
}

function getStartDate(
  dateProps: DatePickerDateProps,
  previousDateProps: DatePickerDateProps
) {
  // prioritize startDate over date if provided
  if (
    typeof dateProps.startDate !== 'undefined' &&
    dateProps.startDate !== previousDateProps.startDate
  ) {
    return dateProps.startDate
  }

  if (
    typeof dateProps.date !== 'undefined' &&
    dateProps.date !== previousDateProps.date
  ) {
    return dateProps.date
  }

  return undefined
}
