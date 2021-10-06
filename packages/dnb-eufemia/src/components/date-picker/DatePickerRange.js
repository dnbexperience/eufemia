/**
 * Web DatePicker Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

// date-fns
import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'

import DatePickerCalendar from './DatePickerCalendar'
import DatePickerContext from './DatePickerContext'

export default class DatePickerRange extends React.PureComponent {
  static contextType = DatePickerContext

  static propTypes = {
    id: PropTypes.string,
    isRange: PropTypes.bool,
    isLink: PropTypes.bool,
    isSync: PropTypes.bool,
    onlyMonth: PropTypes.bool,
    hideNav: PropTypes.bool,
    views: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.object),
    ]),

    onChange: PropTypes.func,
    onNav: PropTypes.func,
  }

  static defaultProps = {
    id: null,

    // appearance
    isRange: null,
    isLink: null,
    isSync: null,
    onlyMonth: null,
    hideNav: null,
    views: null,

    // events
    onChange: null, // fires when user makes a selection or navigates
    onNav: null, // [{'id': 0, 'month': Date}, {'id': 1, 'month': Date}]
  }

  onSelectHandler = (args) => {
    this.context.callOnChangeHandler(args)

    this.props.onChange &&
      this.props.onChange({
        hidePicker: !this.props.isRange,
        ...args,
      })
  }

  callOnNav = () => {
    this.props.onNav && this.props.onNav(this.context.views)
  }

  setNavState = (state) => {
    this.context.updateState(state)
  }

  onNext = ({ nr }) => {
    const views = this.context.views.map((c) => {
      if (c.nr === nr) {
        const month = addMonths(c.month, 1)
        this.setNavState({
          nr,
          [`${nr === 0 ? 'start' : 'end'}Month`]: month,
        })
        return { ...c, month }
      }
      if (this.props.isLink && c.nr === 1) {
        const month = addMonths(c.month, 1)
        this.setNavState({
          nr,
          [`${nr !== 0 ? 'start' : 'end'}Month`]: month,
        })
        return { ...c, month }
      }
      return c
    })
    this.context.setViews(views, this.callOnNav)
  }

  onPrev = ({ nr }) => {
    const views = this.context.views.map((c) => {
      if (c.nr === nr) {
        const month = subMonths(c.month, 1)
        this.setNavState({
          nr,
          [`${nr === 0 ? 'start' : 'end'}Month`]: month,
        })
        return { ...c, month }
      }
      if (this.props.isLink && c.nr === 1) {
        const month = subMonths(c.month, 1)
        this.setNavState({
          nr,
          [`${nr !== 0 ? 'start' : 'end'}Month`]: month,
        })
        return { ...c, month }
      }
      return c
    })
    this.context.setViews(views, this.callOnNav)
  }

  onHover = (hoverDate) => {
    this.context.updateState({ hoverDate })
  }

  render() {
    const { id, ...props } = this.props
    return (
      <div className="dnb-date-picker__views">
        {this.context.views.map((calendar, i) => (
          <DatePickerCalendar
            key={calendar.nr}
            id={`${id}-${i}-`}
            {...props}
            {...calendar}
            onSelect={this.onSelectHandler}
            onHover={this.onHover}
            onPrev={this.onPrev}
            onNext={this.onNext}
          />
        ))}
      </div>
    )
  }
}

export const getViews = (state, isRange, calendar_amount = 1) => {
  // fill the views with the calendar data getMonth()
  return (
    Array.isArray(state.views)
      ? state.views
      : Array(
          isRange
            ? calendar_amount // set default range calendars
            : state.views
        ).fill(1)
  ).map((view, nr) => ({
    ...view,
    month: getMonthView(state, nr),
    nr,
  }))
}

const getMonthView = (state, nr) => {
  if ((state.startMonth || state.startDate) && nr === 0) {
    return state.startMonth || state.startDate
  }
  if ((state.endMonth || state.endDate) && nr === 1) {
    return state.endMonth || state.endDate
  }

  // Here we add that default offset to every new calendar added,
  // the first will get 0, the next one 1, and so forth
  return addMonths(getFallbackMonth(state), nr)
}

const getFallbackMonth = (state) => {
  return state.startMonth || state.startDate || new Date()
}
