import { format, isValid } from 'date-fns'
import { DatePickerDates } from './useDates'
import { useCallback, useState } from 'react'

export type DatePickerInputDates = {
  __startDay?: string
  __startMonth?: string
  __startYear?: string
  __endDay?: string
  __endMonth?: string
  __endYear?: string
}

export default function useInputDates({
  startDate,
  endDate,
}: Pick<DatePickerDates, 'startDate' | 'endDate'>) {
  const [previousDates, setPreviousDates] = useState<
    Pick<DatePickerDates, 'startDate' | 'endDate'>
  >({ startDate, endDate })
  const [inputDates, setInputDates] = useState<DatePickerInputDates>(
    initializeInputDates({ startDate, endDate })
  )

  // Update input dates if startDate or endDate changes
  if (
    startDate !== previousDates.startDate ||
    endDate !== previousDates.endDate
  ) {
    setInputDates((currentInputDates) => ({
      ...currentInputDates,
      ...getInputDates('start', startDate),
      ...getInputDates('end', endDate),
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

function initializeInputDates({
  startDate,
  endDate,
}: Pick<DatePickerDates, 'startDate' | 'endDate'>): DatePickerInputDates {
  const hasValidStartDate = isValid(startDate)
  const hasValidEndDate = isValid(endDate)

  return {
    __startDay: hasValidStartDate ? pad(format(startDate, 'dd'), 2) : null,
    __startMonth: hasValidStartDate
      ? pad(format(startDate, 'MM'), 2)
      : null,
    __startYear: hasValidStartDate ? format(startDate, 'yyyy') : null,
    __endDay: hasValidEndDate ? pad(format(endDate, 'dd'), 2) : null,
    __endMonth: hasValidEndDate ? pad(format(endDate, 'MM'), 2) : null,
    __endYear: hasValidEndDate ? format(endDate, 'yyyy') : null,
  }
}

function getInputDates(type: 'start' | 'end', date: Date | undefined) {
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

export function pad(date: string, size: number) {
  const dateWithPadding = '000000000' + date

  return dateWithPadding.substring(dateWithPadding.length - size)
}
