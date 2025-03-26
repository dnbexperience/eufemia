import addMonths from 'date-fns/addMonths'
import { useMemo, useRef, useState } from 'react'
import { DatePickerDates } from './useDates'

export type CalendarView = { nr: number; month?: Date }

export type ViewDates = {
  startMonth?: DatePickerDates['startMonth']
  endMonth?: DatePickerDates['endMonth']
}

export type UseViewsParams = ViewDates & {
  isRange?: boolean
}

export default function useViews({ isRange, ...dates }: UseViewsParams) {
  const [previousDates, setPreviousDates] = useState(dates)
  const [views, setViews] = useState<Array<CalendarView>>(
    isRange
      ? [
          { nr: 0, month: dates.startMonth },
          { nr: 1, month: dates.endMonth },
        ]
      : [{ nr: 0, month: dates.startMonth }]
  )

  const forceViewChange = useRef(false)

  const hasDateChanges = useMemo(
    () =>
      Object.keys(dates).some(
        (date) => previousDates[date] !== dates[date]
      ),
    [dates, previousDates]
  )

  if (hasDateChanges) {
    // Maintain range views unless forced to change by shortcut or keyboard navigation
    if (forceViewChange.current || !isRange) {
      setViews(getViews({ ...dates, isRange }))
      forceViewChange.current = false
    }

    setPreviousDates(dates)
  }

  function updateViews(
    views: Array<CalendarView>,
    cb: (...args: unknown[]) => void = null
  ) {
    setViews(views)
    cb?.()
  }

  function forceViewMonthChange() {
    forceViewChange.current = true
  }

  return {
    views,
    setViews: updateViews,
    forceViewMonthChange,
  } as const
}

export function getViews({
  isRange,
  ...dates
}: ViewDates & UseViewsParams): Array<CalendarView> {
  if (!isRange) {
    return [{ nr: 0, month: getMonthView({ ...dates }, 0) }]
  }

  return [
    { nr: 0, month: getMonthView({ ...dates }, 0) },
    { nr: 1, month: getMonthView({ ...dates }, 1) },
  ]
}

function getMonthView(
  { startMonth, endMonth }: ViewDates,
  nr: CalendarView['nr']
) {
  if (startMonth && nr === 0) {
    return startMonth
  }

  if (endMonth && nr === 1) {
    return endMonth
  }

  // Here we add that default offset to every new calendar added,
  // the first will get 0, the next one 1, and so forth
  const fallbackMonth = startMonth || new Date()
  return addMonths(fallbackMonth, nr)
}
