import addMonths from 'date-fns/addMonths'
import { useCallback, useMemo, useRef, useState } from 'react'
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
    getViews({ ...dates, isRange })
  )

  const hasClickedCalendarDay = useRef<boolean>(false)

  const hasDateChanges = useMemo(
    () =>
      Object.keys(dates).some(
        (date) => previousDates[date] !== dates[date]
      ),
    [dates, previousDates]
  )

  const setHasClickedCalendarDay = useCallback(
    (hasClicked: boolean) => (hasClickedCalendarDay.current = hasClicked),
    []
  )

  if (hasDateChanges) {
    setPreviousDates(dates)

    // Stop here if the user has clicked a day in the calendar, as we don't want update the views then
    if (hasClickedCalendarDay.current) {
      setHasClickedCalendarDay(false)
    } else {
      const updatedViews = getViews({
        ...dates,
        isRange,
      })

      setViews(updatedViews)
    }
  }

  function updateViews(
    views: Array<CalendarView>,
    cb: (...args: unknown[]) => void = null
  ) {
    setViews(views)
    cb?.()
  }

  return {
    views,
    setViews: updateViews,
    setHasClickedCalendarDay,
  } as const
}

export function getViews({
  isRange,
  ...dates
}: ViewDates & UseViewsParams): Array<CalendarView> {
  return isRange
    ? [
        { nr: 0, month: getMonthView({ months: dates, nr: 0 }) },
        { nr: 1, month: getMonthView({ months: dates, nr: 1 }) },
      ]
    : [{ nr: 0, month: getMonthView({ months: dates, nr: 0 }) }]
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
