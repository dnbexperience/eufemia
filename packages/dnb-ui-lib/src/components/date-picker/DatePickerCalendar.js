/**
 * Web DatePicker Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  format,
  isSameDay,
  startOfDay,
  endOfDay,
  isSameMonth
} from 'date-fns'
import nbLocale from 'date-fns/locale/nb'
import DatePickerCalc, {
  toRange,
  getWeek,
  dayOffset,
  getCalendar
} from './DatePickerCalc'
import Button from '../button/Button'

const Calendar = props => {
  const onSelect = day => {
    if (props.onSelect) {
      if (!props.range) {
        props.onSelect({
          startDate: startOfDay(day.date),
          endDate: endOfDay(day.date)
        })
      } else if (!props.startDate || (props.startDate && props.endDate)) {
        // user is selecting startDate
        props.onSelect({
          startDate: startOfDay(day.date),
          endDate: null
        })
      } else {
        // user is selecting endDate
        const range = toRange(props.startDate, day.date)
        props.onSelect({
          startDate: startOfDay(range.startDate),
          endDate: endOfDay(range.endDate)
        })
      }
    }
  }

  const onHover = day => {
    if (!isSameDay(day.date, props.hoverDate)) {
      props.onHover && props.onHover(day.date)
    }
  }

  const getPrevButton = () => {
    if (props.prevBtn) {
      const disabled =
        props.minDate && isSameMonth(props.month, props.minDate)
      const onClick = () =>
        props.onPrev && !disabled && props.onPrev(props)
      return (
        <Button
          className={classnames('dnb-date-picker__prev', { disabled })}
          icon="chevron-left"
          size="small"
          onClick={onClick}
        />
      )
    }
  }

  const getNextButton = () => {
    const disabled =
      props.maxDate && isSameMonth(props.month, props.maxDate)
    const onClick = () => props.onNext && !disabled && props.onNext(props)
    return (
      props.nextBtn && (
        <Button
          className={classnames('dnb-date-picker__next', { disabled })}
          icon="chevron-right"
          size="small"
          onClick={onClick}
        />
      )
    )
  }

  return (
    <div
      className={classnames(
        'dnb-date-picker__calendar',
        props.rtl && 'rtl'
      )}
    >
      <div className="dnb-date-picker__header">
        <div className="dnb-date-picker__header__nav">
          {getPrevButton()}
        </div>
        <div className="dnb-date-picker__header__title">
          {format(props.month, props.titleFormat, {
            locale: props.locale
          })}
        </div>
        <div className="dnb-date-picker__header__nav">
          {getNextButton()}
        </div>
      </div>
      <ul className="dnb-date-picker__labels">
        {getWeek(dayOffset(props.firstDayOfWeek)).map((day, i) => (
          <li key={i} className="dnb-date-picker__labels__day">
            {format(day, props.dayOfWeekFormat, {
              locale: props.locale
            })}
          </li>
        ))}
      </ul>
      <ul className="dnb-date-picker__days">
        {getCalendar(props.month, dayOffset(props.firstDayOfWeek))
          .map(date => DatePickerCalc(date, props))
          .map((day, i) => (
            <li
              key={'day' + i}
              className={classnames(
                'dnb-date-picker__day',
                buildClassNames(day)
              )}
            >
              <Button
                key={'day' + i}
                onClick={() =>
                  !day.isLastMonth &&
                  !day.isNextMonth &&
                  !day.isDisabled &&
                  onSelect(day)
                }
                onMouseOver={() => onHover(day)}
                onFocus={() => onHover(day)}
                size="medium"
                variant="secondary"
                text={format(day.date, 'D', { locale: props.locale })}
                disabled={
                  day.isLastMonth || day.isNextMonth || day.isDisabled
                }
              />
            </li>
          ))}
      </ul>
    </div>
  )
}

Calendar.propTypes = {
  month: PropTypes.instanceOf(Date), // What month will be displayed in the first calendar. Default: new Date()
  prevBtn: PropTypes.bool,
  nextBtn: PropTypes.bool,
  titleFormat: PropTypes.string,
  dayOfWeekFormat: PropTypes.string,
  firstDayOfWeek: PropTypes.string,

  onHover: PropTypes.func,
  onSelect: PropTypes.func,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,

  locale: PropTypes.object,
  rtl: PropTypes.bool,

  range: PropTypes.bool,
  hoverDate: PropTypes.instanceOf(Date),
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date)
}

Calendar.defaultProps = {
  month: new Date(),
  prevBtn: true,
  nextBtn: true,
  titleFormat: 'MMMM YYYY',
  dayOfWeekFormat: 'dd',
  firstDayOfWeek: 'monday',

  // locale
  locale: nbLocale,
  rtl: false,

  // events
  onHover: null,
  onSelect: null,
  onPrev: null,
  onNext: null,
  hoverDate: null,

  // dates
  range: true,
  startDate: null,
  endDate: null,

  // Limit selection with minDate and maxDate
  minDate: null,
  maxDate: null // addDays(new Date(), 45)
}

const buildClassNames = day =>
  classnames({
    'dnb-date-picker__day--start-date': day.isStartDate,
    'dnb-date-picker__day--end-date': day.isEndDate,
    'dnb-date-picker__day--preview': day.isPreview,
    'dnb-date-picker__day--within-selection': day.isWithinSelection,
    'dnb-date-picker__day--selectable':
      !day.isLastMonth && !day.isNextMonth && !day.isDisabled,
    'dnb-date-picker__day--inactive': day.isLastMonth || day.isNextMonth,
    'dnb-date-picker__day--disabled': day.isDisabled,
    'dnb-date-picker__day--today': day.isToday,
    'dnb-date-picker__day--weekend': day.isWeekend,
    'dnb-date-picker__day--last-month': day.isLastMonth,
    'dnb-date-picker__day--next-month': day.isNextMonth
  })

export default Calendar
