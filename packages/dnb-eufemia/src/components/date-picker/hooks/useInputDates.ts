import format from 'date-fns/format'
import isValid from 'date-fns/isValid'
import { DatePickerDates } from './useDates'
import { useCallback, useState } from 'react'

export type DatePickerInputDates = {
  startDay?: string
  startMonth?: string
  startYear?: string
  endDay?: string
  endMonth?: string
  endYear?: string
}

export default function useInputDates({
  startDate,
  endDate,
}: Pick<DatePickerDates, 'startDate' | 'endDate'>) {
  const [previousDates, setPreviousDates] = useState<
    Pick<DatePickerDates, 'startDate' | 'endDate'>
  >({ startDate, endDate })

  const [inputDates, setInputDates] = useState<DatePickerInputDates>({
    startDay: formatInputDate('day', startDate),
    startMonth: formatInputDate('month', startDate),
    startYear: formatInputDate('year', startDate),
    endDay: formatInputDate('day', endDate),
    endMonth: formatInputDate('month', endDate),
    endYear: formatInputDate('year', endDate),
  })

  const hasStartDateChange = startDate !== previousDates.startDate
  const hasEndDateChange = endDate !== previousDates.endDate

  // Update input dates if startDate or endDate changes
  if (hasStartDateChange || hasEndDateChange) {
    setInputDates((currentInputDates) => ({
      ...currentInputDates,
      ...(hasStartDateChange && getInputDates('start', startDate)),
      ...(hasEndDateChange && getInputDates('end', endDate)),
    }))

    setPreviousDates({ startDate, endDate })
  }

  const updateInputDates = useCallback((dates: DatePickerInputDates) => {
    setInputDates((current) => ({ ...current, ...dates }))
  }, [])

  return {
    inputDates,
    updateInputDates,
  }
}

const inputDateFormatter = {
  day: (date: Date) => pad(format(date, 'dd'), 2),
  month: (date: Date) => pad(format(date, 'MM'), 2),
  year: (date: Date) => format(date, 'yyyy'),
}

function formatInputDate(type: 'day' | 'month' | 'year', date: Date) {
  return isValid(date) ? inputDateFormatter[type](date) : null
}

function getInputDates(type: 'start' | 'end', date: Date | undefined) {
  if (isValid(date)) {
    return {
      [`${type}Day`]: formatInputDate('day', date),
      [`${type}Month`]: formatInputDate('month', date),
      [`${type}Year`]: formatInputDate('year', date),
    }
  }

  if (date === undefined) {
    return {
      [`${type}Day`]: null,
      [`${type}Month`]: null,
      [`${type}Year`]: null,
    }
  }

  return {}
}

export function pad(date: string, size: number) {
  const dateWithPadding = '000000000' + date

  return dateWithPadding.substring(dateWithPadding.length - size)
}
