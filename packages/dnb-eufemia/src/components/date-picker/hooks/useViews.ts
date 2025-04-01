import addMonths from 'date-fns/addMonths'
import { useMemo, useRef, useState } from 'react'
import { DatePickerDates } from './useDates'
import { isSameMonth } from 'date-fns'

export type CalendarView = { nr: number; month?: Date }

export type ViewDates = {
  startMonth?: DatePickerDates['startMonth']
  endMonth?: DatePickerDates['endMonth']
}

export type ClickedViewDays = { startDay?: Date; endDay?: Date }

export type UseViewsParams = ViewDates & {
  isRange?: boolean
}

export default function useViews({ isRange, ...dates }: UseViewsParams) {
  const [previousDates, setPreviousDates] = useState(dates)
  const [views, setViews] = useState<Array<CalendarView>>(
    getViews({ ...dates, isRange, views: undefined })
  )

  const clickedDays = useRef<ClickedViewDays>({
    startDay: undefined,
    endDay: undefined,
  })
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
      setViews(
        getViews({
          ...dates,
          isRange,
          views,
          clickedDays: clickedDays.current,
        })
      )
      forceViewChange.current = false
    }

    setClickedDays({ startDay: undefined, endDay: undefined })
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

  function setClickedDays(days: ClickedViewDays) {
    clickedDays.current = { ...clickedDays.current, ...days }
  }

  return {
    views,
    setViews: updateViews,
    setClickedDays,
    forceViewMonthChange,
  } as const
}

export function getViews({
  isRange,
  views,
  clickedDays,
  ...dates
}: ViewDates &
  UseViewsParams & {
    views: Array<CalendarView>
    clickedDays?: ClickedViewDays
  }): Array<CalendarView> {
  // Handle non-range views
  if (!isRange) {
    return [{ nr: 0, month: getMonthView({ months: dates, nr: 0 }) }]
  }

  // Do not change views if the clicked start or end day is in one of the currently displayed month views
  if (
    (clickedDays?.startDay &&
      isSameMonth(clickedDays.startDay, views[1].month)) ||
    (clickedDays?.endDay &&
      isSameMonth(clickedDays.endDay, views[0].month))
  ) {
    return views
  }

  return [
    { nr: 0, month: getMonthView({ months: dates, nr: 0 }) },
    { nr: 1, month: getMonthView({ months: dates, nr: 1 }) },
  ]
}

function getMonthView({ months, nr }: { months: ViewDates; nr: number }) {
  const { startMonth, endMonth } = months

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
