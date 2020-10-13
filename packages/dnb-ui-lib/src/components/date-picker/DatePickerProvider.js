/**
 * Web DatePicker Provider
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import isSameMonth from 'date-fns/isSameMonth'
import isValid from 'date-fns/isValid'
import format from 'date-fns/format'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'

import Context from '../../shared/Context'
import {
  isTrue,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import {
  convertStringToDate,
  correctV1Format,
  isDisabled
} from './DatePickerCalc'
import DatePickerContext from './DatePickerContext'
import { getViews } from './DatePickerRange'

export default class DatePickerProvider extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    min_date: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string
    ]),
    max_date: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string
    ]),
    return_format: PropTypes.string,

    range: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
      .isRequired,
    setReturnObject: PropTypes.func.isRequired,

    attributes: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
      PropTypes.object,
      PropTypes.array
    ]).isRequired
  }

  static defaultProps = {
    min_date: null,
    max_date: null,
    return_format: 'yyyy-MM-dd', // used in date-fns v1: YYYY-MM-DD
    attributes: null
  }

  state = { _listenForPropChanges: true, changeMonthViews: false }

  static getDerivedStateFromProps(props, state) {
    const isRange = isTrue(props.range)

    if (state._listenForPropChanges) {
      let startDate = undefined
      const date_format = props.date_format

      // Handle startDate/endDate
      if (
        typeof props.date !== 'undefined' &&
        props.date !== state._date
      ) {
        startDate = props.date
        // state._startDate = props.date
      }
      if (
        typeof props.start_date !== 'undefined' &&
        props.start_date !== state._startDate
      ) {
        startDate = props.start_date
      }
      if (
        typeof startDate !== 'undefined' &&
        startDate !== state.startDate
      ) {
        state.startDate =
          convertStringToDate(startDate, {
            date_format
          }) || undefined

        if (!isTrue(props.range)) {
          state.endDate = state.startDate
        }
      }
      if (
        typeof props.end_date !== 'undefined' &&
        isTrue(props.range) &&
        props.end_date !== state._endDate
      ) {
        state.endDate =
          convertStringToDate(props.end_date, {
            date_format
          }) || undefined
      }

      // Handle startMonth/endMonth
      if (
        typeof props.start_month !== 'undefined' &&
        props.start_month !== state._startMonth
      ) {
        state.startMonth = convertStringToDate(props.start_month, {
          date_format
        })
      }
      if (
        typeof props.end_month !== 'undefined' &&
        props.end_month !== state._endMonth
      ) {
        state.endMonth = convertStringToDate(props.end_month, {
          date_format
        })
      }

      // Handle minDate/maxDate
      if (
        typeof props.min_date !== 'undefined' &&
        props.min_date !== state._minDate
      ) {
        state.minDate = convertStringToDate(props.min_date, {
          date_format
        })
      }
      if (
        typeof props.max_date !== 'undefined' &&
        props.max_date !== state._maxDate
      ) {
        state.maxDate = convertStringToDate(props.max_date, {
          date_format
        })
      }

      if (isDisabled(state.startDate, state.minDate, state.maxDate)) {
        state.startDate = state.minDate
      }
      if (isDisabled(state.endDate, state.minDate, state.maxDate)) {
        state.endDate = state.maxDate
      }
    }

    if (isValid(state.startDate)) {
      state.__startDay = pad(format(state.startDate, 'dd'), 2)
      state.__startMonth = pad(format(state.startDate, 'MM'), 2)
      state.__startYear = format(state.startDate, 'yyyy')
    } else if (state.startDate === undefined) {
      state.__startDay = null
      state.__startMonth = null
      state.__startYear = null
    }

    if (isValid(state.endDate)) {
      state.__endDay = pad(format(state.endDate, 'dd'), 2)
      state.__endMonth = pad(format(state.endDate, 'MM'), 2)
      state.__endYear = format(state.endDate, 'yyyy')
    } else if (state.endDate === undefined) {
      state.__endDay = null
      state.__endMonth = null
      state.__endYear = null
    }

    if (
      !state.startMonth ||
      (state.changeMonthViews &&
        !isSameMonth(state.startMonth, state.startDate))
    ) {
      state.startMonth = state.startDate
    }

    if (
      !state.endMonth ||
      (isRange &&
        state.changeMonthViews &&
        !isSameMonth(state.endMonth, state.endDate))
    ) {
      state.endMonth = state.endDate || state.startMonth
    }

    state.views = getViews(state, isRange)

    // Update the months, in case they do not exist
    if (!state.startMonth) {
      state.startMonth = state.views[0].month
      if (
        isRange &&
        !state.endMonth &&
        typeof state.views[1] !== 'undefined'
      ) {
        state.endMonth = state.views[1].month
      }
    }

    state.changeMonthViews = false
    state._listenForPropChanges = true
    state._date = props.date
    state._startDate = props.start_date || props.date
    state._endDate = props.end_date
    state._startMonth = props.start_month
    state._endMonth = props.end_month
    state._month = props.month
    state._minDate = props.min_date
    state._maxDate = props.max_date

    return state
  }

  constructor(props) {
    super(props)

    if (typeof props.setReturnObject === 'function') {
      props.setReturnObject(this.getReturnObject)
    }
  }

  setViews = (views, cb = null) => {
    this.setState({ views, _listenForPropChanges: false }, cb)
  }

  updateState = (state, cb = null) => {
    this.setState({ ...state, _listenForPropChanges: false }, cb)
  }

  setDate = (state, cb = null) => {
    this.setState({ ...state, _listenForPropChanges: false }, cb)
  }

  callOnChangeHandler = (args) => {
    const eventData = this.getReturnObject(args)

    if (this.eventData) {
      if (isTrue(this.props.range)) {
        if (
          this.eventData.start_date === eventData.start_date &&
          this.eventData.end_date === eventData.end_date
        ) {
          return
        }
      } else {
        if (this.eventData.date === eventData.date) {
          return
        }
      }
    }

    this.eventData = eventData

    dispatchCustomElementEvent(this, 'on_change', eventData)
  }

  getReturnObject = ({ event = null, ...rest } = {}) => {
    const { startDate, endDate } = { ...this.state, ...rest }
    const attributes = this.props.attributes || {}
    const return_format = correctV1Format(this.props.return_format)

    const ret = isTrue(this.props.range)
      ? {
          event,
          attributes,
          days_between:
            startDate && endDate
              ? differenceInCalendarDays(endDate, startDate)
              : null,
          start_date: startDate ? format(startDate, return_format) : null,
          end_date: endDate ? format(endDate, return_format) : null
        }
      : {
          event,
          attributes,
          date: startDate ? format(startDate, return_format) : null
        }

    if (this.props.min_date || this.props.max_date) {
      ret.is_valid_start_date = !isDisabled(
        startDate,
        this.state.minDate,
        this.state.maxDate
      )
      ret.is_valid_end_date = !isDisabled(
        endDate,
        this.state.minDate,
        this.state.maxDate
      )
    }

    return ret
  }

  render() {
    const { children } = this.props

    return (
      <DatePickerContext.Provider
        value={{
          translation: this.context.translation,
          setViews: this.setViews,
          setDate: this.setDate,
          updateState: this.updateState,
          callOnChangeHandler: this.callOnChangeHandler,
          props: this.props,
          ...this.state
        }}
      >
        {children}
      </DatePickerContext.Provider>
    )
  }
}

const pad = (num, size) => ('000000000' + num).substr(-size)
