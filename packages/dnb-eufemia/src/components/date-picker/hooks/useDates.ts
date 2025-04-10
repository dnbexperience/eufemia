import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { convertStringToDate } from '../DatePickerCalc'
import isValid from 'date-fns/isValid'
import format from 'date-fns/format'
import { addMonths, isSameDay } from 'date-fns'
import { DateType } from '../DatePickerContext'

export type DatePickerDateProps = {
  date?: DateType
  startDate?: DateType
  endDate?: DateType
  startMonth?: DateType
  endMonth?: DateType
  minDate?: DateType
  maxDate?: DateType
  hoverDate?: DateType | null
}

type UseDatesOptions = {
  dateFormat: string
  isRange: boolean
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
  date?: DateType
  startDate?: Date
  endDate?: Date
  minDate?: Date
  maxDate?: Date
  startMonth?: Date
  endMonth?: Date
  hasHadValidDate?: boolean
  hoverDate?: Date
} & DatePickerInputDates

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

  const hasHadValidDate = useRef<boolean>(false)

  const updateDates = useCallback(
    (
      newDates: DatePickerDates,
      callback?: (dates: DatePickerDates) => void
    ) => {
      // Update months based on month or start/end date changes
      const months = updateMonths({
        newDates,
        currentDates: dates,
      })

      setDates((currentDates) => {
        return {
          ...currentDates,
          ...newDates,
          ...months,
        }
      })

      callback?.({
        ...dates,
        ...newDates,
        ...months,
      })
    },
    [dates]
  )

  // Updated input dates based on start and end dates, move to DatePickerInput
  // TODO: Move to DatePickerInput
  useEffect(() => {
    const startDates = updateInputDates('start', dates.startDate)
    const endDates = updateInputDates('end', dates.endDate)

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
    previousDateProps,
  } as const
}

// TODO: Move to DatePickerInput
function updateInputDates(type: 'start' | 'end', date: Date | undefined) {
  const updatedDates = {}

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

  const endMonth =
    convertStringToDate(dateProps.endMonth, {
      dateFormat: dateFormat,
    }) ?? (isRange ? endDate ?? addMonths(startMonth, 1) : startMonth)

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

  const hasValidStartDate = isValid(dates.startDate)
  const hasValidEndDate = isValid(dates.endDate)

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

function getDate(date: DateType, dateFormat: string) {
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

export function pad(date: string, size: number) {
  const dateWithPadding = '000000000' + date

  return dateWithPadding.substring(dateWithPadding.length - size)
}
