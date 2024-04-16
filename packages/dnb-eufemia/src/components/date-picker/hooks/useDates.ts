import { useCallback, useEffect, useState } from 'react'
import { convertStringToDate, isDisabled } from '../DatePickerCalc'
import format from 'date-fns/format'
import isValid from 'date-fns/isValid'

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
  const [hasHadValidDate, setHasHadValidDate] = useState<boolean>(false)
  const [updateInputDates, setUpdateInputDates] = useState<boolean>(false)

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

    const __startDay = hasValidStartDate
      ? pad(format(startDate, 'dd'), 2)
      : null

    const __startMonth = hasValidStartDate
      ? pad(format(startDate, 'MM'), 2)
      : null

    const __startYear = hasValidStartDate
      ? format(startDate, 'yyyy')
      : null

    const __endDay = hasValidEndDate ? pad(format(endDate, 'dd'), 2) : null

    const __endMonth = hasValidEndDate
      ? pad(format(endDate, 'MM'), 2)
      : null

    const __endYear = hasValidEndDate ? format(endDate, 'yyyy') : null

    return {
      startDate,
      endDate,
      startMonth,
      endMonth,
      minDate,
      maxDate,
      __startDay,
      __startMonth,
      __startYear,
      __endDay,
      __endMonth,
      __endYear,
      hasHadValidDate: hasValidStartDate || hasValidEndDate,
    }
  }, [initialDates, dateFormat, isRange])

  const [previousDates, setPreviousDates] = useState<DateProps>({
    ...initialDates,
  })
  const [dates, setDates] = useState<Dates>({
    date:
      previousDates.date !== initialDates.date
        ? initialDates.date
        : previousDates.date,
    ...initDates(),
  })

  const updateDates = useCallback(
    (newDates, callback?: (dates: Dates) => void) => {
      const correctedDates = {}
      // CorrectDate
      if (shouldCorrectDate) {
        const startDate = newDates.startDate ?? dates.startDate
        const endDate = newDates.endDate ?? dates.endDate
        if (isDisabled(startDate, dates.minDate, dates.maxDate)) {
          correctedDates['startDate'] = dates.minDate
        }
        if (isDisabled(endDate, dates.minDate, dates.maxDate)) {
          // state.endDate is only used by the input if range is set to true.
          // this is done to make max_date correction work if the input is not a range and only max_date is defined.
          if (!isRange && !dates.minDate) {
            correctedDates['startDate'] = dates.maxDate
          } else {
            correctedDates['endDate'] = dates.maxDate
          }
        }

        if (Object.keys(correctedDates).length > 0) {
          setDates((d) => ({ ...d, ...correctedDates }))
        }
      }

      if (
        Object.keys(newDates).join().includes('__start') ||
        Object.keys(newDates).join().includes('__end') ||
        Object.keys(newDates).join().includes('startDate') ||
        Object.keys(newDates).join().includes('endDate')
      ) {
        setUpdateInputDates(true)
      }

      setDates((currentDates) => {
        if (callback) {
          // callbackRef.current = callback
          callback({
            ...currentDates,
            ...newDates,
            ...correctedDates,
          })
        }

        return {
          ...currentDates,
          ...newDates,
          ...correctedDates,
        }
      })
    },
    [dates, shouldCorrectDate, isRange]
  )

  // Update dates on prop change
  useEffect(() => {
    const hasDatePropsChanged = Object.keys(initialDates).some((date) => {
      return initialDates[date] !== previousDates[date]
    })

    if (hasDatePropsChanged) {
      setPreviousDates(initialDates)
      updateDates({ date: initialDates.date, ...initDates() })
    }
  }, [initialDates, previousDates, initDates, updateDates])

  useEffect(() => {
    if (!updateInputDates) {
      return
    }

    const datesToUpdate = {}
    let hasHadVali = false

    if (isValid(dates.startDate)) {
      datesToUpdate['__startDay'] = pad(format(dates.startDate, 'dd'), 2)
      datesToUpdate['__startMonth'] = pad(format(dates.startDate, 'MM'), 2)
      datesToUpdate['__startYear'] = format(dates.startDate, 'yyyy')
      hasHadVali = true
    } else if (dates.startDate === undefined) {
      datesToUpdate['__startDay'] = null
      datesToUpdate['__startMonth'] = null
      datesToUpdate['__startYear'] = null
    }

    if (isValid(dates.endDate)) {
      datesToUpdate['__endDay'] = pad(format(dates.endDate, 'dd'), 2)
      datesToUpdate['__endMonth'] = pad(format(dates.endDate, 'MM'), 2)
      datesToUpdate['__endYear'] = format(dates.endDate, 'yyyy')
      hasHadVali = true
    } else if (dates.endDate === undefined) {
      datesToUpdate['__endDay'] = null
      datesToUpdate['__endMonth'] = null
      datesToUpdate['__endYear'] = null
    }

    setHasHadValidDate(hasHadVali)
    updateDates({ ...datesToUpdate })
    setUpdateInputDates(false)
  }, [dates, updateInputDates, updateDates])

  return [dates, updateDates, hasHadValidDate, previousDates] as const
}

export const pad = (num, size) => ('000000000' + num).substr(-size)
