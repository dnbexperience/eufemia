/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
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
import {
  makeDayObject,
  toRange,
  getWeek,
  dayOffset,
  getCalendar
} from './DatePickerCalc'
import Button from '../button/Button'

export const propTypes = {
  id: PropTypes.number,
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

export const defaultProps = {
  id: null,
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
  range: null,
  startDate: null,
  endDate: null,

  // Limit selection with minDate and maxDate
  minDate: null,
  maxDate: null // addDays(new Date(), 45)
}

export default class DatePickerCalendar extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  buildClassNames = day =>
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

  render() {
    const {
      id,
      rtl,
      month,
      range,
      titleFormat,
      locale,
      firstDayOfWeek,
      dayOfWeekFormat,
      onPrev,
      onNext,
      onSelect,
      onHover,
      prevBtn,
      nextBtn,
      maxDate,
      minDate,
      hoverDate
    } = this.props
    const { startDate, endDate } = this.props

    this.days = getCalendar(month, dayOffset(firstDayOfWeek)).map(date =>
      makeDayObject(date, this.props)
    )

    return (
      <div
        className={classnames('dnb-date-picker__calendar', rtl && 'rtl')}
      >
        <div className="dnb-date-picker__header">
          <div className="dnb-date-picker__header__nav">
            <PrevButton
              id={id}
              minDate={minDate}
              month={month}
              prevBtn={prevBtn}
              onPrev={onPrev}
            />
          </div>
          <div className="dnb-date-picker__header__title">
            {format(month, titleFormat, {
              locale: locale
            })}
          </div>
          <div className="dnb-date-picker__header__nav">
            <NextButton
              id={id}
              maxDate={maxDate}
              month={month}
              nextBtn={nextBtn}
              onNext={onNext}
            />
          </div>
        </div>
        <ul className="dnb-date-picker__labels">
          {getWeek(dayOffset(firstDayOfWeek)).map((day, i) => (
            <li key={i} className="dnb-date-picker__labels__day">
              {format(day, dayOfWeekFormat, {
                locale: locale
              })}
            </li>
          ))}
        </ul>
        <ul className="dnb-date-picker__days">
          {this.days.map((day, i) => (
            <li
              key={'day' + i}
              className={classnames(
                'dnb-date-picker__day',
                this.buildClassNames(day)
              )}
            >
              <Button
                key={'day' + i}
                onClick={() =>
                  !day.isLastMonth &&
                  !day.isNextMonth &&
                  !day.isDisabled &&
                  onSelectRange({
                    day,
                    range,
                    startDate,
                    endDate,
                    onSelect
                  })
                }
                onMouseOver={() => onHoverDay({ day, hoverDate, onHover })}
                onFocus={() => onHoverDay({ day, hoverDate, onHover })}
                size="medium"
                variant="secondary"
                text={format(day.date, 'D', { locale: locale })}
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
}

const PrevButton = ({ id, minDate, month, prevBtn, onPrev }) => {
  if (prevBtn) {
    const disabled = minDate && isSameMonth(month, minDate)
    const onClick = () => onPrev && !disabled && onPrev({ id })
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

const NextButton = ({ id, maxDate, month, nextBtn, onNext }) => {
  const disabled = maxDate && isSameMonth(month, maxDate)
  const onClick = () => onNext && !disabled && onNext({ id })
  return (
    nextBtn && (
      <Button
        className={classnames('dnb-date-picker__next', { disabled })}
        icon="chevron-right"
        size="small"
        onClick={onClick}
      />
    )
  )
}

const onSelectRange = ({ day, range, startDate, endDate, onSelect }) => {
  if (onSelect) {
    if (!range) {
      onSelect({
        startDate: startOfDay(day.date),
        endDate: endOfDay(day.date)
      })
    } else if (!startDate || (startDate && endDate)) {
      // user is selecting startDate
      onSelect({
        startDate: startOfDay(day.date),
        endDate: null
      })
    } else {
      // user is selecting endDate
      const range = toRange(startDate, day.date)
      onSelect({
        startDate: startOfDay(range.startDate),
        endDate: endOfDay(range.endDate)
      })
    }
  }
}

const onHoverDay = ({ day, hoverDate, onHover }) => {
  if (!isSameDay(day.date, hoverDate)) {
    onHover && onHover(day.date)
  }
}
