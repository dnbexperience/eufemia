import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { convertStringToDate } from '../DatePickerCalc'
import { addMonths, isSameDay } from 'date-fns'
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
  { dateFormat, isRange = false }: UseDatesOptions
) {
  const [previousDateProps, setPreviousDateProps] = useState(dateProps)
  const [dates, setDates] = useState<DatePickerDates>({
    ...mapDates(dateProps, {
      dateFormat,
      isRange,
    }),
  })
  const datesRef = useRef(dates)

  useEffect(() => {
    datesRef.current = dates
  }, [dates])

  const hasDatePropChanges = useMemo(
    () =>
      Object.keys(dateProps).some((date) => {
        const dateProp = (dateProps as Record<string, unknown>)[date]
        const previousDate = (previousDateProps as Record<string, unknown>)[date]

        const convertedDateProp = convertStringToDate(dateProp as string | Date, {
          dateFormat,
        })
        const convertedPreviousDate = convertStringToDate(previousDate as string | Date, {
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
    []
  )

  return {
    dates,
    updateDates,
    previousDateProps,
  } as const
}

function mapDates(
  dateProps: DatePickerDateProps,
  { dateFormat, isRange }: Omit<UseDatesOptions, 'isLinked'>
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

  // Ensure that the calendar view displays the correct start and end months, and to prevent date flickering bug
  const startMonth =
    convertStringToDate(dateProps.startMonth, {
      dateFormat,
    }) ??
    startDate ??
    new Date()

  // Check if startMonth was explicitly provided (not just derived from startDate)
  const hasExplicitStartMonth = typeof dateProps.startMonth !== 'undefined'

  const endMonth =
    convertStringToDate(dateProps.endMonth, {
      dateFormat: dateFormat,
    }) ??
    (isRange
      ? // If startMonth is explicitly provided, use it + 1 month; otherwise fallback to endDate
        hasExplicitStartMonth
        ? addMonths(startMonth, 1)
        : endDate ?? addMonths(startMonth, 1)
      : startMonth)

  const minDate = convertStringToDate(dateProps.minDate, {
    dateFormat,
  })

  const maxDate = convertStringToDate(dateProps.maxDate, {
    dateFormat,
  })

  const dates = {
    date,
    startDate,
    endDate,
    startMonth,
    endMonth,
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
}: {
  newDates: DatePickerDates
  currentDates: DatePickerDates
}) {
  const startMonth =
    newDates.startMonth ?? newDates.startDate ?? currentDates.startMonth
  const endMonth =
    newDates.endMonth ?? newDates.endDate ?? currentDates.endMonth

  return {
    startMonth,
    endMonth,
  }
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
