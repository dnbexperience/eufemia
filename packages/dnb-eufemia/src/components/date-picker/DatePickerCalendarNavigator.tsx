import React, { useCallback, useContext } from 'react'
import {
  addMonths,
  addYears,
  format,
  isSameMonth,
  subMonths,
  subYears,
} from 'date-fns'
import {
  CalendarLocales,
  CalendarNavigationEvent,
} from './DatePickerCalendar'
import classnames from 'classnames'
import Button from '../Button'
import { useTranslation } from '../../shared'
import DatePickerContext from './DatePickerContext'

type DatePickerCalendarNavigationType = 'month_year' | 'month' | 'year'

export type DatePickerCalendarNavigationProps = Omit<
  React.HTMLProps<HTMLElement>,
  'onSelect' | 'onChange'
> & {
  type: DatePickerCalendarNavigationType
  id: string
  nr?: number
  /**
   * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.
   */
  date?: Date
  showPreviousButton?: boolean
  showNextButton?: boolean
  /**
   * To define the locale used in the calendar. Needs to be an `date-fns` "v2" locale object, like `import enLocale from &#39;date-fns/locale/en-GB&#39;`. Defaults to `nb-NO`.
   */
  locale?: CalendarLocales[keyof CalendarLocales]
}

// eslint-disable-next-line no-unused-vars
const titleFormats: { [key in DatePickerCalendarNavigationType]: string } =
  {
    month_year: 'MMMM yyyy',
    month: 'MMMM',
    year: 'yyyy',
  }

// eslint-disable-next-line no-unused-vars
const dateHandlers: {
  // eslint-disable-next-line no-unused-vars
  [key in DatePickerCalendarNavigationType]: {
    // eslint-disable-next-line no-unused-vars
    [key in CalendarNavButtonType]: typeof subMonths
  }
} = {
  month_year: {
    prev: subMonths,
    next: addMonths,
  },
  month: {
    prev: subMonths,
    next: addMonths,
  },
  year: { prev: subYears, next: addYears },
}

export function DatePickerCalendarNav({
  type = 'month_year',
  id,
  nr,
  date,
  locale,
  showPreviousButton,
  showNextButton,
}: DatePickerCalendarNavigationProps) {
  const {
    minDate,
    maxDate,
    views,
    setViews,
    props: { link: isLinkedCalendars },
  } = useContext(DatePickerContext)
  const { selectedMonth, selectedYear } = useTranslation().DatePicker

  const title = type === 'year' ? selectedYear : selectedMonth
  const titleFormat = titleFormats[type]

  const onNav = useCallback(
    ({ nr, type: navigationType }: CalendarNavigationEvent) => {
      const updatedViews = views.map((view) => {
        if (view.nr === nr || (isLinkedCalendars && view.nr === 1)) {
          const month = dateHandlers[type][navigationType](view.month, 1)

          return { ...view, month }
        }

        return view
      })
      setViews(updatedViews)
    },
    [type, views, setViews, isLinkedCalendars]
  )

  return (
    <>
      <div className="dnb-date-picker__header__nav">
        <CalendarNavButton
          type="prev"
          nr={nr}
          date={date}
          dateLimit={minDate}
          locale={locale}
          showButton={showPreviousButton}
          onClick={onNav}
        />
      </div>
      <label
        id={`${id}--title`}
        className="dnb-date-picker__header__title dnb-no-focus"
        title={title.replace(
          /%s/,
          format(date, titleFormat, {
            locale,
          })
        )}
        tabIndex={-1}
      >
        {format(date, titleFormat, {
          locale,
        })}
      </label>
      <div className="dnb-date-picker__header__nav">
        <CalendarNavButton
          type="next"
          nr={nr}
          date={date}
          dateLimit={maxDate}
          locale={locale}
          showButton={showNextButton}
          onClick={onNav}
        />
      </div>
    </>
  )
}

export type CalendarNavButtonType = 'prev' | 'next'

export type CalendarNavButtonProps = {
  type: CalendarNavButtonType
  nr: number
  date: Date
  dateLimit: Date
  locale: CalendarLocales[keyof CalendarLocales]
  showButton: boolean
  onClick: ({
    nr,
    type,
  }: {
    nr: number
    type: CalendarNavButtonProps['type']
  }) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void
}

function CalendarNavButton({
  type,
  nr,
  date,
  dateLimit,
  locale,
  showButton,
  onClick,
  onKeyDown,
}: CalendarNavButtonProps) {
  const tr = useTranslation().DatePicker

  if (!showButton) {
    return <></>
  }
  const disabled = dateLimit && isSameMonth(date, dateLimit)

  const title = tr[`${type}Month`].replace(
    /%s/,
    format(subMonths(date, 1), 'MMMM yyyy', {
      locale,
    })
  )

  const icon = type === 'prev' ? 'chevron_left' : 'chevron_right'

  return (
    <Button
      className={classnames(`dnb-date-picker__${type}`, { disabled })}
      icon={icon}
      size="small"
      aria-label={title}
      onClick={() => onClick && !disabled && onClick({ nr, type })}
      onKeyDown={onKeyDown}
    />
  )
}
