import React, { useCallback, useContext } from 'react'
import {
  addMonths,
  addYears,
  format,
  isSameMonth,
  isSameYear,
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
  showPreviousButton?: boolean
  showNextButton?: boolean
  /**
   * To define the locale used in the calendar. Needs to be an `date-fns` "v2" locale object, like `import enLocale from &#39;date-fns/locale/en-GB&#39;`. Defaults to `nb-NO`.
   */
  locale?: CalendarLocales[keyof CalendarLocales]
}

// eslint-disable-next-line no-unused-vars
const titleFormats: { [key in CalendarNavigationDateType]: string } = {
  month: 'MMMM',
  year: 'yyyy',
}

// eslint-disable-next-line no-unused-vars
const dateHandlers: {
  // eslint-disable-next-line no-unused-vars
  [key in CalendarNavigationDateType]: {
    // eslint-disable-next-line no-unused-vars
    [key in CalendarNavButtonType]: typeof subMonths
  }
} = {
  month: {
    prev: subMonths,
    next: addMonths,
  },
  year: { prev: subYears, next: addYears },
}

export function DatePickerCalendarNav({
  type = 'both',
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
  const titleFormat =
    type === 'both'
      ? `${titleFormats.month} ${titleFormats.year}`
      : titleFormats[type]
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
    <>
      <div className="dnb-date-picker__header__nav">
        <CalendarNavButton
          type="prev"
          nr={nr}
          date={date}
          dateLimit={minDate}
          dateType={buttonDateType}
          dateFormat={titleFormat}
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
          dateType={buttonDateType}
          nr={nr}
          date={date}
          dateLimit={maxDate}
          dateFormat={titleFormat}
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
  dateType: CalendarNavigationDateType
  type: CalendarNavButtonType
  nr: number
  dateFormat: string
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

const navButtonDisabledHandlers: {
  // eslint-disable-next-line no-unused-vars
  [key in CalendarNavigationDateType]: typeof isSameMonth
} = {
  month: isSameMonth,
  year: isSameYear,
} // for month navigation}

function CalendarNavButton({
  type,
  dateType,
  dateFormat,
  nr,
  date,
  dateLimit,
  locale,
  showButton,
  onClick,
  onKeyDown,
}: CalendarNavButtonProps) {
  const translations = useTranslation().DatePicker

  if (!showButton) {
    return <></>
  }

  const translationKey = `${type}${capitalizeFirstLetter(dateType)}`

  const title = translations[translationKey].replace(
    /%s/,
    format(dateHandlers[dateType][type](date, 1), dateFormat, {
      locale,
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
