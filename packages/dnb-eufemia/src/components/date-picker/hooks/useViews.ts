import addMonths from 'date-fns/addMonths'
import { useEffect, useState } from 'react'
import { DatePickerProviderState } from '../DatePickerProvider'

export type CalendarViews =
  | { nr: number; month: Date }
  | Array<{ nr: number; month: Date }>

export type ViewDates = {
  startDate?: DatePickerProviderState['startDate']
  endDate?: DatePickerProviderState['endDate']
  startMonth?: DatePickerProviderState['startMonth']
  endMonth?: DatePickerProviderState['endMonth']
}

export type UseViewsParams = ViewDates & {
  isRange?: boolean
}

export default function useViews({ isRange, ...dates }: UseViewsParams) {
  const [prevDates, setPrevDates] = useState(dates)
  const [views, setViews] = useState<CalendarViews>(
    getViews({ ...dates, views: undefined, isRange })
  )

  function updateViews(views, cb = null) {
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
}: ViewDates & UseViewsParams & { views: CalendarViews }): CalendarViews {
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
  nr: number
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
