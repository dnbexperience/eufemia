/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  format,
  isSameDay,
  startOfDay,
  endOfDay,
  isSameMonth,
  subMonths,
  addDays,
  addWeeks,
  addMonths,
  differenceInCalendarDays
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

  onHover: PropTypes.func,
  onSelect: PropTypes.func,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,

  locale: PropTypes.object,
  rtl: PropTypes.bool,

  range: PropTypes.bool,
  resetDate: PropTypes.bool,
  hoverDate: PropTypes.instanceOf(Date),
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date)
}

export const defaultProps = {
  id: null,
  nr: null,
  month: null,
  prevBtn: true,
  nextBtn: true,
  titleFormat: 'MMMM YYYY',
  dayOfWeekFormat: 'dd',
  firstDayOfWeek: 'monday',
  hideNav: false,
  hideDays: false,
  onlyMonth: false,

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
  resetDate: true, // reset start/end date once we already have them
  startDate: null,
  endDate: null,

  // Limit selection with minDate and maxDate
  minDate: null,
  maxDate: null // addDays(new Date(), 45)
}

export default class DatePickerCalendar extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.startDate) {
        state.startDate = props.startDate
      }
      if (props.endDate) {
        state.endDate = props.endDate
      }
    }
    state._listenForPropChanges = true
    return state
  }

  state = {
    startDate: null,
    endDate: null,
    _listenForPropChanges: true
  }

  constructor(props) {
    super(props)
    this._listRef = React.createRef()
  }

  componentDidMount() {
    if (this.props.nr === 0 && this._listRef.current) {
      this._listRef.current.focus()
    }
  }

  onKeyDownHandler = event => {
    const keyCode = keycode(event)

    switch (keyCode) {
      case 'left':
      case 'right':
      case 'up':
      case 'down':
        event.preventDefault()
        if (event.currentTarget.tagName === 'UL') {
          try {
            const elem = event.currentTarget.querySelector(
              '.dnb-date-picker__day--start-date button'
            )
            if (elem) {
              elem.focus()
            }
            // dnb-date-picker__day  dnb-date-picker__day--within-selection dnb-date-picker__day--selectable
          } catch (e) {
            console.log(e)
          }
          return
        }
        break
    }

    // only to process key up and down press
    switch (keyCode) {
      case 'left':
        this.setState({
          startDate: addDays(this.state.startDate, -1),
          _listenForPropChanges: false
        })
        break
      case 'right':
        this.setState({
          startDate: addDays(this.state.startDate, 1),
          _listenForPropChanges: false
        })
        break
      case 'up':
        this.setState({
          startDate: addWeeks(this.state.startDate, -1),
          _listenForPropChanges: false
        })
        break
      case 'down':
        this.setState({
          startDate: addWeeks(this.state.startDate, 1),
          _listenForPropChanges: false
        })
        break
    }

    // !day.isLastMonth &&
    // !day.isNextMonth &&
    // !day.isDisabled &&
    // onSelectRange({
    //   day,
    //   range,
    //   startDate,
    //   endDate,
    //   onSelect,
    //   resetDate
    // })
  }

  buildClassNames = day =>
    classnames({
      'dnb-date-picker__day--start-date': day.isStartDate,
      'dnb-date-picker__day--end-date': day.isEndDate,
      'dnb-date-picker__day--preview': day.isPreview,
      'dnb-date-picker__day--within-selection': day.isWithinSelection,
      'dnb-date-picker__day--selectable':
        !day.isLastMonth && !day.isNextMonth && !day.isDisabled,
      'dnb-date-picker__day--inactive':
        day.isLastMonth || day.isNextMonth || day.isDisabled,
      'dnb-date-picker__day--disabled': day.isDisabled,
      'dnb-date-picker__day--today': day.isToday,
      'dnb-date-picker__day--weekend': day.isWeekend,
      'dnb-date-picker__day--last-month': day.isLastMonth,
      'dnb-date-picker__day--next-month': day.isNextMonth
    })

  render() {
    const {
      id,
      nr,
      rtl,
      month,
      range,
      titleFormat,
      locale,
      firstDayOfWeek,
      dayOfWeekFormat,
      hideNav,
      hideDays,
      onlyMonth,
      onPrev,
      onNext,
      onSelect,
      resetDate,
      onHover,
      prevBtn,
      nextBtn,
      maxDate,
      minDate,
      hoverDate
    } = this.props
    const { startDate, endDate } = this.state

    this.days = getCalendar(
      month || new Date(),
      dayOffset(firstDayOfWeek),
      { onlyMonth }
    ).map(date =>
      makeDayObject(date, {
        startDate,
        endDate,
        hoverDate,
        minDate,
        maxDate,
        month
      })
    )

    const params = {
      onKeyDown: this.onKeyDownHandler
    }

    return (
      <div
        className={classnames('dnb-date-picker__calendar', rtl && 'rtl')}
      >
        {!hideNav && (
          <div className="dnb-date-picker__header">
            <div className="dnb-date-picker__header__nav">
              <PrevButton
                nr={nr}
                minDate={minDate}
                month={month}
                prevBtn={prevBtn}
                onPrev={onPrev}
                locale={locale}
              />
            </div>
            <div
              id={`${id}--title`}
              className="dnb-date-picker__header__title"
              aria-hidden
            >
              {format(month, titleFormat, {
                locale
              })}
            </div>
            <div className="dnb-date-picker__header__nav">
              <NextButton
                nr={nr}
                maxDate={maxDate}
                month={month}
                nextBtn={nextBtn}
                onNext={onNext}
                locale={locale}
              />
            </div>
          </div>
        )}
        {!hideDays && (
          <ul className="dnb-date-picker__labels" aria-hidden>
            {getWeek(dayOffset(firstDayOfWeek)).map((day, i) => (
              <li key={i} className="dnb-date-picker__labels__day">
                {format(day, dayOfWeekFormat, {
                  locale
                })}
              </li>
            ))}
          </ul>
        )}
        <ul
          className="dnb-date-picker__days dnb-no-focus"
          aria-labelledby={`${id}--title`}
          tabIndex="-1"
          ref={this._listRef}
          {...params}
        >
          {this.days.map((day, i) => {
            const title = format(day.date, 'dddd, Do MMMM YYYY', {
              locale
            })
            const params = {}
            if (day.isLastMonth || day.isNextMonth) {
              params['aria-hidden'] = true
            } else if (day.isWithinSelection) {
              params['aria-selected'] = true
            }
            return (
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
                      onSelect,
                      resetDate
                    })
                  }
                  onKeyDown={this.onKeyDownHandler}
                  onMouseOver={() =>
                    onHoverDay({ day, hoverDate, onHover })
                  }
                  onFocus={() => onHoverDay({ day, hoverDate, onHover })}
                  size="medium"
                  variant="secondary"
                  text={format(day.date, 'D', { locale })}
                  aria-label={title}
                  title={title}
                  bounding={true}
                  disabled={
                    day.isLastMonth || day.isNextMonth || day.isDisabled
                  }
                  {...params}
                />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const PrevButton = ({ nr, minDate, month, prevBtn, onPrev, locale }) => {
  if (!prevBtn) {
    return <></>
  }
  const disabled = minDate && isSameMonth(month, minDate)
  const onClick = () => onPrev && !disabled && onPrev({ nr })
  const title = format(subMonths(month, 1), 'MMMM YYYY', {
    locale
  })
  return (
    <Button
      className={classnames('dnb-date-picker__prev', { disabled })}
      icon="chevron-left"
      size="small"
      aria-label={title}
      title={title}
      onClick={onClick}
    />
  )
}
PrevButton.propTypes = {
  nr: PropTypes.number.isRequired,
  minDate: PropTypes.instanceOf(Date),
  month: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  prevBtn: PropTypes.bool.isRequired,
  onPrev: PropTypes.func.isRequired
}
PrevButton.defaultProps = {
  minDate: null
}

const NextButton = ({ nr, maxDate, month, nextBtn, onNext, locale }) => {
  if (!nextBtn) {
    return <></>
  }
  const disabled = maxDate && isSameMonth(month, maxDate)
  const onClick = () => onNext && !disabled && onNext({ nr })
  const title = format(addMonths(month, 1), 'MMMM YYYY', {
    locale
  })
  return (
    nextBtn && (
      <Button
        className={classnames('dnb-date-picker__next', { disabled })}
        icon="chevron-right"
        size="small"
        aria-label={title}
        title={title}
        onClick={onClick}
      />
    )
  )
}
NextButton.propTypes = {
  nr: PropTypes.number.isRequired,
  maxDate: PropTypes.instanceOf(Date),
  month: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  nextBtn: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired
}
NextButton.defaultProps = {
  maxDate: null
}

const onSelectRange = ({
  day,
  range,
  startDate,
  endDate,
  onSelect,
  resetDate
}) => {
  if (onSelect) {
    if (!range) {
      // set only date
      onSelect({
        startDate: startOfDay(day.date),
        endDate: endOfDay(day.date)
      })

      // for setting date new on every selection, do this here
    } else if (!startDate || (resetDate && (startDate && endDate))) {
      // set startDate
      // user is selecting startDate
      onSelect({
        startDate: startOfDay(day.date),
        endDate: null
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
