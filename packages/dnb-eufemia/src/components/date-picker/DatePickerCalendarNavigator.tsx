import React, { useCallback, useContext } from 'react'
import { addMonths } from 'date-fns/addMonths'
import { addYears } from 'date-fns/addYears'
import { isSameMonth } from 'date-fns/isSameMonth'
import { isSameYear } from 'date-fns/isSameYear'
import { subMonths } from 'date-fns/subMonths'
import { subYears } from 'date-fns/subYears'
import { CalendarNavigationEvent } from './DatePickerCalendar'
import classnames from 'classnames'
import Button from '../Button'
import { useTranslation } from '../../shared'
import DatePickerContext from './DatePickerContext'
import { InternalLocale } from '../../shared/Context'
import { formatDate } from '../date-format/DateFormatUtils'

type CalendarNavigationDateType = 'month' | 'year'
type CalendarNavigationType = 'both' | CalendarNavigationDateType

export type DatePickerCalendarNavigationProps = Omit<
  React.HTMLProps<HTMLElement>,
  'onSelect' | 'onChange'
> & {
  type: CalendarNavigationType
  id: string
  nr?: number
  /**
   * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.
   */
  date?: Date

  /**
   * To define the locale used in the calendar. Needs to be an `date-fns` locale object, like `import enLocale from &#39;date-fns/locale/en-GB&#39;`. Defaults to `nb-NO`.
   */
  locale?: InternalLocale
}

type TitleFormatMap = {
  // eslint-disable-next-line no-unused-vars
  [T in CalendarNavigationType]: Intl.DateTimeFormatOptions
}

const titleFormats: TitleFormatMap = {
  both: {
    month: 'long',
    year: 'numeric',
  },
  month: { month: 'long' },
  year: { year: 'numeric' },
}

type CalendarDateHandlers = {
  // eslint-disable-next-line no-unused-vars
  [D in CalendarNavigationDateType]: {
    // eslint-disable-next-line no-unused-vars
    [B in CalendarNavButtonType]: typeof subMonths
  }
}

const dateHandlers: CalendarDateHandlers = {
  month: {
    prev: subMonths,
    next: addMonths,
  },
  year: {
    prev: subYears,
    next: addYears,
  },
}

export function DatePickerCalendarNav({
  type = 'both',
  id,
  nr,
  date,
  locale,
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
  const buttonDateType = type === 'year' ? 'year' : 'month'

  const onNav = useCallback(
    ({ nr, type: navigationType }: CalendarNavigationEvent) => {
      const handlerType = type === 'year' ? 'year' : 'month'
      const updatedViews = views.map((view) => {
        if (view.nr === nr || (isLinkedCalendars && view.nr === 1)) {
          const month = dateHandlers[handlerType][navigationType](
            view.month,
            1
          )

          return { ...view, month }
        }

        return view
      })
      setViews(updatedViews)
    },
    [type, views, setViews, isLinkedCalendars]
  )

  return (
    <div
      className={classnames(
        'dnb-date-picker__header__row',
        type === 'year' && 'dnb-date-picker__header__row--year'
      )}
    >
      <div className="dnb-date-picker__header__nav">
        <CalendarNavButton
          type="prev"
          nr={nr}
          date={date}
          dateLimit={minDate}
          dateType={buttonDateType}
          dateFormat={titleFormat}
          locale={locale}
          onClick={onNav}
        />
      </div>
      <label
        id={`${id}--title`}
        className="dnb-date-picker__header__title dnb-no-focus"
        title={title.replace(
          /%s/,
          formatDate(date, { locale, options: titleFormat })
        )}
        tabIndex={-1}
      >
        {formatDate(date, { locale, options: titleFormat })}
      </label>
      <div className="dnb-date-picker__header__nav">
        <CalendarNavButton
          type="next"
          dateType={buttonDateType}
          nr={nr}
          date={date}
          dateLimit={maxDate}
          dateFormat={titleFormat}
          locale={locale}
          onClick={onNav}
        />
      </div>
    </div>
  )
}

export type CalendarNavButtonType = 'prev' | 'next'

export type CalendarNavButtonProps = {
  dateType: CalendarNavigationDateType
  type: CalendarNavButtonType
  nr: number
  dateFormat: Intl.DateTimeFormatOptions
  date: Date
  dateLimit: Date
  locale: InternalLocale
  onClick: ({
    nr,
    type,
  }: {
    nr: number
    type: CalendarNavButtonProps['type']
  }) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void
}

type NavButtonDisabledHandlerMap = {
  // eslint-disable-next-line no-unused-vars
  [T in CalendarNavigationDateType]: typeof isSameMonth
}

const navButtonDisabledHandlers: NavButtonDisabledHandlerMap = {
  month: isSameMonth,
  year: isSameYear,
}

function CalendarNavButton({
  type,
  dateType,
  dateFormat,
  nr,
  date,
  dateLimit,
  locale,
  onClick,
  onKeyDown,
}: CalendarNavButtonProps) {
  const translations = useTranslation().DatePicker

  const translationKey = `${type}${capitalizeFirstLetter(dateType)}`
  const dateHandler = dateHandlers[dateType][type]

  const title = translations[translationKey].replace(
    /%s/,
    formatDate(dateHandler(date, 1), {
      locale,
      options: dateFormat,
    })
  )

  const disabled =
    dateLimit && navButtonDisabledHandlers[dateType](date, dateLimit)

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

function capitalizeFirstLetter(value: string) {
  return `${value.charAt(0).toLocaleUpperCase()}${value.slice(1)}`
}
