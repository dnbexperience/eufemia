import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { convertStringToDate, isDisabled } from '../DatePickerCalc'
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
  date?: DateType
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
        const dateProp = dateProps[date]
        const previousDate = previousDates[date]

        const convertedDateProp = convertStringToDate(dateProp, {
          dateFormat,
        })
        const convertedPreviousDate = convertStringToDate(previousDate, {
          dateFormat,
        })

        if (
          convertedDateProp instanceof Date &&
          convertedPreviousDate instanceof Date
        ) {
          return !isSameDay(convertedDateProp, convertedPreviousDate)
        }

        return dateProp !== previousDate
      }),
    [dateProps, previousDates, dateFormat]
  )

  // Update dates on prop change
  if (hasDatePropChanges) {
    const updatedDates = updateDatesBasedOnProps({
      dateProps,
      previousDates,
      dateFormat,
      isRange,
    })

    setDates((currentDates) => ({ ...currentDates, ...updatedDates }))
    setPreviousDates(dateProps)
  }

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
    [dates, shouldCorrectDate, isRange]
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

function updateDatesBasedOnProps({
  dateProps,
  previousDates,
  dateFormat,
  isRange,
}) {
  const dates = {}

  if (dateProps.date !== previousDates.date) {
    dates['date'] = dateProps.date

    if (!dateProps.startDate) {
      dates['startDate'] = getDate(dateProps.date, dateFormat) ?? undefined
    }

    if (!dateProps.startMonth) {
      dates['startMonth'] =
        convertStringToDate(dateProps.date, {
          dateFormat,
        }) ?? undefined
    }

    // Set endDate and endMonth to undefined if not in range mode, to prevent weird calendar and input behaviour
    if (!isRange) {
      dates['endDate'] = undefined
      dates['endMonth'] = undefined
    }
  }

  if (dateProps.startDate !== previousDates.startDate) {
    dates['startDate'] =
      getDate(dateProps.startDate, dateFormat) ?? undefined
  }

  if (dateProps.endDate !== previousDates.endDate) {
    dates['endDate'] =
      convertStringToDate(dateProps.endDate, {
        dateFormat,
      }) ?? undefined
  }

  if (dateProps.startMonth !== previousDates.startMonth) {
    dates['startMonth'] =
      convertStringToDate(dateProps.startMonth, {
        dateFormat,
      }) ??
      dates['startDate'] ??
      undefined
  }

  if (dateProps.endMonth !== previousDates.endMonth) {
    dates['endMonth'] =
      convertStringToDate(dateProps.endMonth, {
        dateFormat: dateFormat,
      }) ?? undefined
  }

  if (dateProps.minDate !== previousDates.minDate) {
    dates['minDate'] =
      convertStringToDate(dateProps.minDate, {
        dateFormat,
      }) ?? undefined
  }

  if (dateProps.maxDate !== previousDates.maxDate) {
    dates['maxDate'] =
      convertStringToDate(dateProps.maxDate, {
        dateFormat,
      }) ?? undefined
  }

  return dates
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
    // this is done to make maxDate correction work if the input is not a range and only maxDate is defined.
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

export function pad(date: string, size: number) {
  const dateWithPadding = '000000000' + date

  return dateWithPadding.substring(dateWithPadding.length - size)
}
