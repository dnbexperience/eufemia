import { useCallback, useEffect, useRef, useState } from 'react'
import { convertStringToDate, isDisabled } from '../DatePickerCalc'
import isValid from 'date-fns/isValid'
import usePreviousProps from './usePreviousValue'
import format from 'date-fns/format'

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

export type InputDates = {
  __startDay?: string
  __startMonth?: string
  __startYear?: string
  __endDay?: string
  __endMonth?: string
  __endYear?: string
}

export type Dates = {
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
} & InputDates

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
      __endDay: hasValidEndDate
        ? pad(format(dates.endDate, 'dd'), 2)
        : null,
      __endMonth: hasValidEndDate
        ? pad(format(dates.endDate, 'MM'), 2)
        : null,
      __endYear: hasValidEndDate ? format(dates.endDate, 'yyyy') : null,
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

  const hasHadValidDate = useRef<boolean>(false)

  const updateDates = useCallback(
    (newDates, callback?: (dates: Dates) => void) => {
      const correctedDates = shouldCorrectDate
        ? correctDates({
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

  // Updated input dates based on start and end dates
  useEffect(() => {
    const updatedInputDates = {}

    hasHadValidDate.current = false

    if (isValid(dates.startDate)) {
      updatedInputDates['__startDay'] = pad(
        format(dates.startDate, 'dd'),
        2
      )
      updatedInputDates['__startMonth'] = pad(
        format(dates.startDate, 'MM'),
        2
      )
      updatedInputDates['__startYear'] = format(dates.startDate, 'yyyy')
      hasHadValidDate.current = true
    } else if (dates.startDate === undefined) {
      updatedInputDates['__startDay'] = null
      updatedInputDates['__startMonth'] = null
      updatedInputDates['__startYear'] = null
    }

    if (isValid(dates.endDate)) {
      updatedInputDates['__endDay'] = pad(format(dates.endDate, 'dd'), 2)
      updatedInputDates['__endMonth'] = pad(format(dates.endDate, 'MM'), 2)
      updatedInputDates['__endYear'] = format(dates.endDate, 'yyyy')
      hasHadValidDate.current = true
    } else if (dates.endDate === undefined) {
      updatedInputDates['__endDay'] = null
      updatedInputDates['__endMonth'] = null
      updatedInputDates['__endYear'] = null
    }

    setDates((currentDates) => ({
      ...currentDates,
      ...updatedInputDates,
    }))
  }, [dates.startDate, dates.endDate])

  return [
    dates,
    updateDates,
    hasHadValidDate.current,
    previousDates,
  ] as const
}

function correctDates({ startDate, endDate, minDate, maxDate, isRange }) {
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
