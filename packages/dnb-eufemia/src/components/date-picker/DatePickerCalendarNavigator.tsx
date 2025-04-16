import React from 'react'
import { format, isSameMonth, subMonths } from 'date-fns'
import {
  CalendarLocales,
  CalendarNavigationEvent,
} from './DatePickerCalendar'
import classnames from 'classnames'
import Button from '../Button'
import { useTranslation } from '../../shared'
import { DatePickerDates } from './hooks/useDates'

export type DatePickerCalendarNavigationProps = Omit<
  React.HTMLProps<HTMLElement>,
  'onSelect' | 'onChange'
> & {
  id?: string
  nr?: number
  /**
   * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.
   */
  date?: Date
  prevBtn?: boolean
  nextBtn?: boolean
  minDate: DatePickerDates['minDate']
  maxDate: DatePickerDates['maxDate']
  onPrev?: (event: CalendarNavigationEvent) => void
  onNext?: (event: CalendarNavigationEvent) => void
  /**
   * To define the locale used in the calendar. Needs to be an `date-fns` "v2" locale object, like `import enLocale from &#39;date-fns/locale/en-GB&#39;`. Defaults to `nb-NO`.
   */
  locale?: CalendarLocales[keyof CalendarLocales]
}

const titleFormat = 'MMMM yyyy'

export function DatePickerCalendarNav({
  id,
  nr,
  date,
  minDate,
  maxDate,
  locale,
  prevBtn,
  onPrev,
  nextBtn,
  onNext,
}: DatePickerCalendarNavigationProps) {
  const { selectedMonth } = useTranslation().DatePicker

  return (
    <div className="dnb-date-picker__header">
      <div className="dnb-date-picker__header__nav">
        <CalendarNavButton
          type="prev"
          nr={nr}
          date={minDate}
          month={date}
          locale={locale}
          showButton={prevBtn}
          onClick={onPrev}
        />
      </div>
      <label
        id={`${id}--title`}
        className="dnb-date-picker__header__title dnb-no-focus"
        title={selectedMonth.replace(
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
          date={maxDate}
          month={date}
          locale={locale}
          showButton={nextBtn}
          onClick={onNext}
        />
      </div>
    </div>
  )
}

export type CalendarNavButtonProps = {
  type: 'prev' | 'next'
  nr: number
  date: Date
  month: Date
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
  month,
  locale,
  showButton,
  onClick,
  onKeyDown,
}: CalendarNavButtonProps) {
  const tr = useTranslation().DatePicker

  if (!showButton) {
    return <></>
  }
  const disabled = date && isSameMonth(month, date)

  const title = tr[`${type}Month`].replace(
    /%s/,
    format(subMonths(month, 1), 'MMMM yyyy', {
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
