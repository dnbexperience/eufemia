import addMonths from 'date-fns/addMonths'
import { useEffect, useState } from 'react'
import { DatePickerDates } from './useDates'
import usePreviousValue from './usePreviousValue'

export type CalendarView = { nr: number; month?: Date }

export type ViewDates = {
  startDate?: DatePickerDates['startDate']
  endDate?: DatePickerDates['endDate']
  startMonth?: DatePickerDates['startMonth']
  endMonth?: DatePickerDates['endMonth']
}

export type UseViewsParams = ViewDates & {
  isRange?: boolean
}

export default function useViews({ isRange, ...dates }: UseViewsParams) {
  const prevDates = usePreviousValue(dates)
  const [views, setViews] = useState<Array<CalendarView>>(
    getViews({ ...dates, views: undefined, isRange })
  )

  function updateViews(
    views: Array<CalendarView>,
    cb: (...args: unknown[]) => void = null
  ) {
    setViews(views)
    cb?.()
  }

  // Update views based on date changes
  useEffect(() => {
    if (
      Object.keys(dates).some(
        (dateType) => prevDates[dateType] !== dates[dateType]
      )
    ) {
      const currentViews = Array.isArray(views)
        ? views.length > 1
          ? views
          : views[0]
        : views
      setViews(getViews({ ...dates, views: currentViews, isRange }))
    }
  }, [dates, isRange, prevDates, views])

  return [views, updateViews] as const
}

export function getViews({
  views,
  isRange,
  ...dates
}: ViewDates &
  UseViewsParams & {
    views?: CalendarView | Array<CalendarView>
  }): Array<CalendarView> {
  // fill the views with the calendar data getMonth()
  return (
    Array.isArray(views)
      ? views
      : Array(
          isRange
            ? 2 // set default range calendars
            : views
        ).fill(1)
  ).map((view, nr) => ({
    month: getMonthView({ ...dates }, nr),
    nr,
  }))
}

function getMonthView(
  { startDate, endDate, startMonth, endMonth }: ViewDates,
  nr: CalendarView['nr']
) {
  if ((startMonth || startDate) && nr === 0) {
    return startMonth || startDate
  }
  if ((endMonth || endDate) && nr === 1) {
    return endMonth || endDate
  }

  // Here we add that default offset to every new calendar added,
  // the first will get 0, the next one 1, and so forth
  const fallbackMonth = startMonth || startDate || new Date()

  return addMonths(fallbackMonth, nr)
}
