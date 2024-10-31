import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { convertStringToDate, isDisabled } from '../DatePickerCalc'
import isValid from 'date-fns/isValid'
import format from 'date-fns/format'
import { addMonths } from 'date-fns'
import useViews, { CalendarView } from './useViews'

export type DatePickerDateProps = {
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
  dateProps: DatePickerDateProps,
  {
    dateFormat,
    isRange = false,
    shouldCorrectDate = false,
  }: UseDatesOptions
) {
  const [previousDates, setPreviousDates] = useState(dateProps)
  const [dates, setDates] = useState<DatePickerDates>({
    ...mapDates(dateProps, previousDates, {
      dateFormat,
      isRange,
      shouldCorrectDate,
    }),
  })

  const hasDatePropChanges = useMemo(
    () =>
      Object.keys(dateProps).some((date) => {
        return dateProps[date] !== previousDates[date]
      }),
    [dateProps, previousDates]
  )

  // Update dates on prop change
  if (hasDatePropChanges) {
    setDates({
      ...mapDates(dateProps, previousDates, {
        dateFormat,
        isRange,
        shouldCorrectDate,
      }),
    })
    setPreviousDates(dateProps)
  }

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

  // TODO: Update parameter to be an object, to improve readability
  const updateDates = useCallback(
    (
      newDates: DatePickerDates,
      callback?: (dates: DatePickerDates) => void,
      forceMonthChange?: boolean
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
        forceMonthChange,
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
  dateProps: DatePickerDateProps,
  previousDates: DatePickerDateProps,
  {
    dateFormat,
    isRange,
    shouldCorrectDate,
  }: Omit<UseDatesOptions, 'isLinked'>
) {
  const date =
    previousDates.date !== dateProps.date
      ? dateProps.date
      : previousDates.date

  const startDate =
    typeof dateProps?.startDate !== 'undefined'
      ? getDate(dateProps.startDate, dateFormat)
      : typeof date !== 'undefined'
      ? getDate(date, dateFormat)
      : undefined

  const endDate = !isRange
    ? startDate
    : convertStringToDate(dateProps?.endDate, {
        date_format: dateFormat,
      }) || undefined

  // Ensure that the calendar view displays the correct start and end months, and to prevent date flickering bug
  const startMonth =
    convertStringToDate(dateProps.startMonth, {
      date_format: dateFormat,
    }) ??
    startDate ??
    new Date()

  const endMonth =
    convertStringToDate(dateProps.endMonth, {
      date_format: dateFormat,
    }) ?? !isRange
      ? startMonth
      : endDate ?? addMonths(startMonth, 1)

  const minDate = convertStringToDate(dateProps.minDate, {
    date_format: dateFormat,
  })

  const maxDate = convertStringToDate(dateProps.maxDate, {
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
  forceMonthChange,
}: {
  newDates: DatePickerDates
  currentDates: DatePickerDates
  views: Array<CalendarView>
  isRange: boolean
  forceMonthChange: boolean
}) {
  let startMonth = newDates.startMonth ?? newDates.startDate
  let endMonth = newDates.endMonth ?? newDates.endDate
  const [startView, endView] = views

  // Make sure start and end months are synced up with calendar in range mode, and prevent both pickers showing the same month if start and end date are selected to be the same
  if (isRange && !forceMonthChange) {
    // If start and end date is the same day, but changed from the previous selected months
    startMonth = startView?.month
    endMonth = endView?.month
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
