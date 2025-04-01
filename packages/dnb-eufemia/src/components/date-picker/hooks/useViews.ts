import addMonths from 'date-fns/addMonths'
import { useMemo, useRef, useState } from 'react'
import { DatePickerDates } from './useDates'
import { isSameMonth } from 'date-fns'

export type CalendarView = { nr: number; month?: Date }

export type ViewDates = {
  startMonth?: DatePickerDates['startMonth']
  endMonth?: DatePickerDates['endMonth']
}

export type ClickedCalendarDays = { start?: Date; end?: Date }

export type UseViewsParams = ViewDates & {
  isRange?: boolean
}

export default function useViews({ isRange, ...dates }: UseViewsParams) {
  const [previousDates, setPreviousDates] = useState(dates)
  const [views, setViews] = useState<Array<CalendarView>>(
    getViews({ ...dates, isRange, views: undefined })
  )

  const clickedCalendarDays = useRef<ClickedCalendarDays>({
    start: undefined,
    end: undefined,
  })

  const hasDateChanges = useMemo(
    () =>
      Object.keys(dates).some(
        (date) => previousDates[date] !== dates[date]
      ),
    [dates, previousDates]
  )

  if (hasDateChanges) {
    // Maintain range views unless forced to change by shortcut or keyboard navigation

    const updatedViews = getViews({
      ...dates,
      isRange,
      views,
      clickedCalendarDays: clickedCalendarDays.current,
    })

    setViews(updatedViews)
    setClickedCalendarDays({ start: undefined, end: undefined })
    setPreviousDates(dates)
  }

  function updateViews(
    views: Array<CalendarView>,
    cb: (...args: unknown[]) => void = null
  ) {
    setViews(views)
    cb?.()
  }

  function setClickedCalendarDays(days: ClickedCalendarDays) {
    clickedCalendarDays.current = {
      ...clickedCalendarDays.current,
      ...days,
    }
  }

  return {
    views,
    setViews: updateViews,
    setClickedCalendarDays,
  } as const
}

export function getViews({
  isRange,
  views,
  clickedCalendarDays,
  ...dates
}: ViewDates &
  UseViewsParams & {
    views: Array<CalendarView>
    clickedCalendarDays?: ClickedCalendarDays
  }): Array<CalendarView> {
  // Handle non-range views
  if (!isRange) {
    return [{ nr: 0, month: getMonthView({ months: dates, nr: 0 }) }]
  }

  // Do not change views if the clicked start or end day is in one of the currently displayed month views
  if (
    (clickedCalendarDays?.start &&
      isSameMonth(clickedCalendarDays.start, views[1].month)) ||
    (clickedCalendarDays?.end &&
      isSameMonth(clickedCalendarDays.end, views[0].month))
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
