/**
 * Web DatePicker Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

// date-fns
import format from 'date-fns/format'
import subMonths from 'date-fns/subMonths'
import addMonths from 'date-fns/addMonths'
import addWeeks from 'date-fns/addWeeks'
import addDays from 'date-fns/addDays'
import isSameDay from 'date-fns/isSameDay'
import isSameMonth from 'date-fns/isSameMonth'
import startOfDay from 'date-fns/startOfDay'
import endOfDay from 'date-fns/endOfDay'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import differenceInMonths from 'date-fns/differenceInMonths'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import setDate from 'date-fns/setDate'

import keycode from 'keycode'
import nbLocale from 'date-fns/locale/nb'
import {
  isDisabled,
  makeDayObject,
  toRange,
  getWeek,
  dayOffset,
  getCalendar
} from './DatePickerCalc'
import Button from '../button/Button'
import DatePickerContext from './DatePickerContext'

export default class DatePickerCalendar extends React.PureComponent {
  static contextType = DatePickerContext

  static propTypes = {
    id: PropTypes.string,
    nr: PropTypes.number,
    month: PropTypes.instanceOf(Date), // What month will be displayed in the first calendar. Default: new Date()
    prevBtn: PropTypes.bool,
    nextBtn: PropTypes.bool,
    titleFormat: PropTypes.string,
    dayOfWeekFormat: PropTypes.string,
    firstDayOfWeek: PropTypes.string,
    hideNav: PropTypes.bool,
    hideDays: PropTypes.bool,
    onlyMonth: PropTypes.bool,
    hideNextMonthWeek: PropTypes.bool,
    noAutofocus: PropTypes.bool,

    onHover: PropTypes.func,
    onSelect: PropTypes.func,
    onPrev: PropTypes.func,
    onNext: PropTypes.func,

    locale: PropTypes.object,
    rtl: PropTypes.bool,

    isRange: PropTypes.bool,
    resetDate: PropTypes.bool,
    onKeyDown: PropTypes.func
  }

  static defaultProps = {
    id: null,
    nr: null,
    month: null,
    prevBtn: true,
    nextBtn: true,
    titleFormat: 'MMMM yyyy',
    dayOfWeekFormat: 'EEEEEE',
    firstDayOfWeek: 'monday',
    hideNav: false,
    hideDays: false,
    onlyMonth: false,
    hideNextMonthWeek: false,
    noAutofocus: false,

    // locale
    locale: nbLocale,
    rtl: false,

    // events
    onHover: null,
    onSelect: null,
    onPrev: null,
    onNext: null,

    // dates
    isRange: null,
    resetDate: true, // reset start/end date once we already have them

    // Limit selection with minDate and maxDate
    // maxDate: null, // addDays(new Date(), 45)
    onKeyDown: null
  }

  constructor(props) {
    super(props)
    this._listRef = React.createRef()
    this._labelRef = React.createRef()
    this._days = {}
  }

  componentDidMount() {
    if (!this.props.noAutofocus && this.props.nr === 0) {
      if (this._listRef.current) {
        this._listRef.current.focus({ preventScroll: true })
      }
    }
  }

  onKeyDownHandler = (event) => {
    if (String(event?.target?.nodeName).toLowerCase() === 'td') {
      try {
        this._listRef.current.focus({ preventScroll: true })
      } catch (e) {
        //
      }
    }

    const { nr, isRange, onlyMonth, hideNav, onKeyDown } = this.props

    if (typeof onKeyDown === 'function') {
      return onKeyDown(event, this._listRef, nr)
    }

    const keyCode = keycode(event)

    // only continue of key is one of these
    switch (keyCode) {
      case 'enter':
      case 'space':
      case 'left':
      case 'right':
      case 'up':
      case 'down':
        event.preventDefault()
        event.persist() // since we use the event after setState
        break
      default:
        return
    }

    let type = nr === 0 ? 'start' : 'end'
    if (!isRange) {
      type = 'start'
    }
    let newDate = this.context[`${type}Date`]

    if (newDate) {
      newDate = this.keyNavCalc(newDate, keyCode)
    } else {
      // use the date picker month, if provided
      newDate =
        this.context[`${type}Month`] ||
        (isRange && nr === 1 ? addMonths(new Date(), 1) : new Date())
    }

    if (newDate === this.context[`${type}Date`]) {
      switch (keyCode) {
        case 'enter':
        case 'space':
          this.callOnChange({
            event,
            nr,
            hidePicker: true
          })
          break
      }
    } else {
      // const state = {...this.context}
      const state = {}

      const currentMonth = this.context[`${type}Month`]

      if (
        // in case we don't have a start/end date, then we use the current month date
        (currentMonth && !this.context[`${type}Date`]) ||
        // if we have a larger gap between the new date and the curent month in the calendar
        (currentMonth &&
          Math.abs(differenceInMonths(newDate, currentMonth)) > 1)
      ) {
        if (!isRange) {
          newDate = currentMonth
        } else {
          newDate =
            nr === 0
              ? setDate(currentMonth, 1)
              : lastDayOfMonth(currentMonth)
        }
        // only to make sure we navigate the calendar to the new date
      } else if (
        currentMonth &&
        !isSameMonth(this.context[`${type}Date`], currentMonth)
      ) {
        state[`${type}Month`] = newDate
      }

      newDate = this.findValid(newDate, keyCode)

      if (this.hasReachedEnd(newDate)) {
        return
      }

      state[`${type}Date`] = newDate

      // set fallbacks
      if (!isRange) {
        state.endDate = newDate
      } else {
        if (!this.context.startDate) {
          state.startDate = newDate
        }
        if (!this.context.endDate) {
          state.endDate = newDate
        }
      }

      // make sure we stay on the same month
      if (onlyMonth || hideNav) {
        if (
          !isSameMonth(state.startDate, this.context.startDate) ||
          !isSameMonth(state.endDate, this.context.startDate) // Heads up, should this not be context.endDate?
        ) {
          return
        }
      }

      state.changeMonthViews = true

      this.context.setDate(state, () => {
        // call after state update, so the input get's the latest state as well
        this.callOnChange({
          event,
          nr,
          hidePicker: false
        })

        // and set the focus back again
        if (this._listRef && this._listRef.current) {
          this._listRef.current.focus({ preventScroll: true })
        }
      })
    }
  }

  callOnChange(args) {
    this.props.onSelect && this.props.onSelect(args)
  }

  keyNavCalc(date, keyCode) {
    // only to process key up and down press
    switch (keyCode) {
      case 'left':
        date = addDays(date, -1)
        break
      case 'right':
        date = addDays(date, 1)
        break
      case 'up':
        date = addWeeks(date, -1)
        break
      case 'down':
        date = addWeeks(date, 1)
        break
    }

    return date
  }

  findValid(date, keyCode) {
    if (this.context.props.on_days_render) {
      const month = format(date, 'yyyy-MM')

      if (!this._days) {
        return date
      }

      if (!this._days[month]) {
        // re-render with new month
        this.getDays(date)
      }

      if (Array.isArray(this._days[month])) {
        const foundDate = this._days[month].find((cur) =>
          isSameDay(cur.date, date)
        )

        if (
          foundDate &&
          foundDate.date &&
          (foundDate.isDisabled ||
            foundDate.isSelectable === false ||
            foundDate.isInactive)
        ) {
          const nextDate = this.keyNavCalc(foundDate.date, keyCode)
          foundDate.date = this.findValid(nextDate, keyCode)
        }

        if (foundDate && foundDate.date) {
          return foundDate.date
        }
      }
    }

    return date
  }

  hasReachedEnd = (date) =>
    isDisabled(date, this.context.minDate, this.context.maxDate)

  buildClassNames = (day) =>
    classnames(
      {
        'dnb-date-picker__day--start-date': day.isStartDate,
        'dnb-date-picker__day--end-date': day.isEndDate,
        'dnb-date-picker__day--preview': day.isPreview,
        'dnb-date-picker__day--within-selection': day.isWithinSelection,
        'dnb-date-picker__day--selectable': day.isSelectable,
        'dnb-date-picker__day--inactive': day.isInactive,
        'dnb-date-picker__day--disabled': day.isDisabled,
        'dnb-date-picker__day--today': day.isToday
      },
      day.className
    )

  getDays(month) {
    const { nr, firstDayOfWeek, onlyMonth, hideNextMonthWeek } = this.props

    const {
      startDate,
      endDate,
      hoverDate,
      maxDate,
      minDate
    } = this.context

    let days = getCalendar(
      month || new Date(),
      dayOffset(firstDayOfWeek),
      {
        onlyMonth,
        hideNextMonthWeek
      }
    ).map((date) =>
      makeDayObject(date, {
        startDate,
        endDate,
        hoverDate,
        minDate,
        maxDate,
        month
      })
    )

    /**
     * NB: There is sadly no way to just call the render callback on every new reconciliation
     */
    if (this.context.props.on_days_render) {
      const changedDays = this.context.props.on_days_render(days, nr)
      if (Array.isArray(changedDays)) {
        days = changedDays
      }
    }

    // Save for later check agains disabled days during key navigation
    this._days[format(month, 'yyyy-MM')] = days

    return days
  }

  render() {
    const {
      id,
      nr,
      rtl,
      month,
      isRange,
      titleFormat,
      locale,
      firstDayOfWeek,
      dayOfWeekFormat,
      hideNav,
      hideDays,
      onPrev,
      onNext,
      resetDate,
      onHover,
      prevBtn,
      nextBtn
    } = this.props

    const {
      startDate,
      endDate,
      hoverDate,
      maxDate,
      minDate,
      translation: {
        DatePicker: { selected_month }
      }
    } = this.context

    let count = 0
    const days = this.getDays(month).reduce((acc, cur, i) => {
      acc[count] = acc[count] || []
      acc[count].push(cur)
      if (i % 7 === 6) {
        count++
      }
      return acc
    }, {})

    const weekDays = Object.values(days)

    return (
      <div
        className={classnames('dnb-date-picker__calendar', rtl && 'rtl')}
        lang={locale?.code}
      >
        {!hideNav && (
          <div className="dnb-date-picker__header">
            <div className="dnb-date-picker__header__nav">
              <PrevButton
                nr={nr}
                minDate={minDate}
                month={month}
                locale={locale}
                context={this.context}
                prevBtn={prevBtn}
                onPrev={onPrev}
              />
            </div>
            <label
              id={`${id}--title`}
              className="dnb-date-picker__header__title dnb-no-focus"
              title={selected_month.replace(
                /%s/,
                format(month, titleFormat, {
                  locale
                })
              )}
              tabIndex="-1"
              ref={this._labelRef}
            >
              {format(month, titleFormat, {
                locale
              })}
            </label>
            <div className="dnb-date-picker__header__nav">
              <NextButton
                nr={nr}
                maxDate={maxDate}
                month={month}
                locale={locale}
                context={this.context}
                nextBtn={nextBtn}
                onNext={onNext}
              />
            </div>
          </div>
        )}
        <table
          role="grid"
          className="dnb-no-focus"
          tabIndex="0"
          aria-labelledby={`${id}--title`}
          onKeyDown={this.onKeyDownHandler}
          ref={this._listRef}
        >
          {!hideDays && (
            <thead aria-hidden>
              <tr role="row" className="dnb-date-picker__labels">
                {getWeek(dayOffset(firstDayOfWeek)).map((day, i) => (
                  <th
                    key={i}
                    role="columnheader"
                    scope="col"
                    className={classnames(
                      'dnb-date-picker__labels__day',
                      `dnb-date-picker__labels__day--${format(day, 'i', {
                        locale
                      })}`
                    )}
                    aria-label={format(day, 'EEEE', {
                      locale
                    })}
                  >
                    {format(day, dayOfWeekFormat, {
                      locale
                    })}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {weekDays.map((week, i) => {
              return (
                <tr
                  key={'week' + i}
                  role="row"
                  className="dnb-date-picker__days"
                >
                  {week.map((day, i) => {
                    const title = format(day.date, 'PPPP', {
                      locale
                    })
                    const handleAsDisabled =
                      day.isLastMonth ||
                      day.isNextMonth ||
                      day.isDisabled ||
                      day.isInactive

                    // cell params
                    const paramsCell = {}
                    paramsCell.tabIndex = '-1'
                    if (day.isStartDate) {
                      paramsCell.id = id + '--button-start'
                    } else if (day.isEndDate) {
                      paramsCell.id = id + '--button-end'
                    }

                    // cell + button params
                    const paramsButton = {}
                    if (nr === 0 ? day.isStartDate : day.isEndDate) {
                      paramsButton['aria-current'] = 'date'
                      paramsCell['aria-selected'] = true // aria-selected is not allowed on buttons
                    }

                    return (
                      <td
                        key={'day' + i}
                        role="gridcell"
                        className={classnames(
                          'dnb-date-picker__day',
                          'dnb-no-focus',
                          this.buildClassNames(day)
                        )}
                        onFocus={this.onKeyDownHandler}
                        {...paramsCell}
                      >
                        <Button
                          size="medium"
                          variant="secondary"
                          text={format(day.date, 'd', { locale })}
                          bounding={true}
                          disabled={handleAsDisabled}
                          tabIndex={handleAsDisabled ? '0' : '-1'} // fix for NVDA
                          aria-disabled={handleAsDisabled}
                          aria-label={title}
                          {...paramsButton}
                          onClick={
                            handleAsDisabled
                              ? undefined
                              : ({ event }) =>
                                  onSelectRange({
                                    day,
                                    isRange,
                                    startDate,
                                    endDate,
                                    resetDate,
                                    event,
                                    onSelect: (state) =>
                                      this.context.setDate(state)
                                  })
                          }
                          onMouseOver={
                            handleAsDisabled
                              ? undefined
                              : () =>
                                  onHoverDay({ day, hoverDate, onHover })
                          }
                          onFocus={
                            handleAsDisabled
                              ? undefined
                              : () =>
                                  onHoverDay({ day, hoverDate, onHover })
                          }
                        />
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const PrevButton = ({
  nr,
  minDate,
  month,
  locale,
  context,
  prevBtn,
  onPrev,
  onKeyDown
}) => {
  if (!prevBtn) {
    return <></>
  }
  const disabled = minDate && isSameMonth(month, minDate)
  const onClick = () => onPrev && !disabled && onPrev({ nr })

  const {
    translation: {
      DatePicker: { prev_month }
    }
  } = context
  const title = prev_month.replace(
    /%s/,
    format(subMonths(month, 1), 'MMMM yyyy', {
      locale
    })
  )

  return (
    <Button
      className={classnames('dnb-date-picker__prev', { disabled })}
      icon="chevron_left"
      size="small"
      aria-label={title}
      onClick={onClick}
      onKeyDown={onKeyDown}
    />
  )
}
PrevButton.propTypes = {
  nr: PropTypes.number.isRequired,
  minDate: PropTypes.instanceOf(Date),
  month: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  prevBtn: PropTypes.bool.isRequired,
  onPrev: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func
}
PrevButton.defaultProps = {
  minDate: null,
  onKeyDown: null
}

const NextButton = ({
  nr,
  maxDate,
  month,
  locale,
  context,
  nextBtn,
  onNext,
  onKeyDown
}) => {
  if (!nextBtn) {
    return <></>
  }
  const disabled = maxDate && isSameMonth(month, maxDate)
  const onClick = () => onNext && !disabled && onNext({ nr })

  const {
    translation: {
      DatePicker: { next_month }
    }
  } = context
  const title = next_month.replace(
    /%s/,
    format(addMonths(month, 1), 'MMMM yyyy', {
      locale
    })
  )

  return (
    nextBtn && (
      <Button
        className={classnames('dnb-date-picker__next', { disabled })}
        icon="chevron_right"
        size="small"
        aria-label={title}
        onClick={onClick}
        onKeyDown={onKeyDown}
      />
    )
  )
}
NextButton.propTypes = {
  nr: PropTypes.number.isRequired,
  maxDate: PropTypes.instanceOf(Date),
  month: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  nextBtn: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func
}
NextButton.defaultProps = {
  maxDate: null,
  onKeyDown: null
}

const onSelectRange = ({
  day,
  isRange,
  startDate,
  endDate,
  onSelect,
  resetDate,
  event
}) => {
  event.persist()
  if (!isRange) {
    // set only date
    onSelect({
      startDate: startOfDay(day.date),
      endDate: endOfDay(day.date),
      event
    })

    // for setting date new on every selection, do this here
  } else if (!startDate || (resetDate && startDate && endDate)) {
    // set startDate
    // user is selecting startDate
    onSelect({
      startDate: startOfDay(day.date),
      endDate: undefined,
      event
    })
  } else {
    const hasEndDate = endDate
    // set either startDate or endDate
    const daysToStartDate = Math.abs(
      differenceInCalendarDays(startDate, day.date)
    )
    const daysToEndDate = Math.abs(
      differenceInCalendarDays(endDate, day.date)
    )

    let range = toRange(startDate, day.date)
    if (hasEndDate && !resetDate && daysToStartDate < daysToEndDate) {
      range = toRange(endDate, day.date)
    }
    onSelect({
      startDate: startOfDay(range.startDate),
      endDate: endOfDay(range.endDate),
      event
    })
  }
}

const onHoverDay = ({ day, hoverDate, onHover }) => {
  if (!isSameDay(day.date, hoverDate)) {
    onHover && onHover(day.date)
  }
}
