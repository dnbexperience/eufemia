import addMonths from 'date-fns/addMonths'
import { useEffect, useState } from 'react'
import { Dates } from './useDates'

export type CalendarView = { nr: number; month?: Date }

export type ViewDates = {
  startDate?: Dates['startDate']
  endDate?: Dates['endDate']
  startMonth?: Dates['startMonth']
  endMonth?: Dates['endMonth']
}

export type UseViewsParams = ViewDates & {
  isRange?: boolean
}

export default function useViews({ isRange, ...dates }: UseViewsParams) {
  const [prevDates, setPrevDates] = useState(dates)
  const [views, setViews] = useState<Array<CalendarView>>(
    getViews({ ...dates, views: undefined, isRange })
  )

  useEffect(() => console.log('newview', views), [views])

  // TOTYPE
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
      setPrevDates(dates)
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
