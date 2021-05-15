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
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import {
  convertStringToDate,
  correctV1Format,
  isDisabled,
} from './DatePickerCalc'
import DatePickerContext from './DatePickerContext'
import { getViews } from './DatePickerRange'

export default class DatePickerProvider extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    min_date: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
    max_date: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
    return_format: PropTypes.string,

    range: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
      .isRequired,
    setReturnObject: PropTypes.func.isRequired,
    enhanceWithMethods: PropTypes.object,

    attributes: PropTypes.object,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    min_date: null,
    max_date: null,
    return_format: 'yyyy-MM-dd', // used in date-fns v1: YYYY-MM-DD
    attributes: null,
    enhanceWithMethods: null,
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
            date_format,
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
            date_format,
          }) || undefined
      }

      // Handle startMonth/endMonth
      if (
        typeof props.start_month !== 'undefined' &&
        props.start_month !== state._startMonth
      ) {
        state.startMonth = convertStringToDate(props.start_month, {
          date_format,
        })
      }
      if (
        typeof props.end_month !== 'undefined' &&
        props.end_month !== state._endMonth
      ) {
        state.endMonth = convertStringToDate(props.end_month, {
          date_format,
        })
      }

      // Handle minDate/maxDate
      if (
        typeof props.min_date !== 'undefined' &&
        props.min_date !== state._minDate
      ) {
        state.minDate = convertStringToDate(props.min_date, {
          date_format,
        })
      }
      if (
        typeof props.max_date !== 'undefined' &&
        props.max_date !== state._maxDate
      ) {
        state.maxDate = convertStringToDate(props.max_date, {
          date_format,
        })
      }

      /**
       * Because now we do not any more relay on auto "correction",
       * but rather return "is_valid_start_date=false"
       */
      if (isTrue(props.correct_invalid_date)) {
        if (isDisabled(state.startDate, state.minDate, state.maxDate)) {
          state.startDate = state.minDate
        }
        if (isDisabled(state.endDate, state.minDate, state.maxDate)) {
          state.endDate = state.maxDate
        }
      }
    }

    if (
      state.lastEventCallCache &&
      (String(state.lastEventCallCache.startDate) !==
        String(state.startDate) ||
        String(state.lastEventCallCache.endDate) !== String(state.endDate))
    ) {
      state.lastEventCallCache = {}
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

    const startDateIsValid = Boolean(
      state.startDate && isValid(state.startDate)
    )
    const endDateIsValid = Boolean(state.endDate && isValid(state.endDate))

    this.setState({
      hasHadValidDate: startDateIsValid || endDateIsValid,
    })
  }

  callOnChangeHandler = (args) => {
    /**
     * Prevent on_change to be fired twite if date not has actually changed
     * We clear the cache inside getDerivedStateFromProps
     */
    if (
      this.state.lastEventCallCache &&
      String(this.state.lastEventCallCache.startDate) ===
        String(this.state.startDate) &&
      String(this.state.lastEventCallCache.endDate) ===
        String(this.state.endDate)
    ) {
      return // stop here
    }

    dispatchCustomElementEvent(
      this,
      'on_change',
      this.getReturnObject(args)
    )

    const lastEventCallCache = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    }
    this.setState({ lastEventCallCache })
  }

  getReturnObject = ({ event = null, ...rest } = {}) => {
    const { startDate, endDate } = { ...this.state, ...rest }
    const attributes = this.props.attributes || {}
    const returnFormat = correctV1Format(this.props.return_format)
    const startDateIsValid = Boolean(startDate && isValid(startDate))
    const endDateIsValid = Boolean(endDate && isValid(endDate))

    let ret = null

    if (isTrue(this.props.range)) {
      ret = {
        event,
        attributes,
        days_between:
          startDateIsValid && endDateIsValid
            ? differenceInCalendarDays(endDate, startDate)
            : null,
        start_date: startDateIsValid
          ? format(startDate, returnFormat)
          : null,
        end_date: endDateIsValid ? format(endDate, returnFormat) : null,
        is_valid_start_date: startDateIsValid,
        is_valid_end_date: endDateIsValid,
      }
    } else {
      ret = {
        event,
        attributes,
        date: startDateIsValid ? format(startDate, returnFormat) : null,
        is_valid: startDateIsValid,
      }
    }

    if (this.props.min_date || this.props.max_date) {
      if (isTrue(this.props.range)) {
        if (
          startDateIsValid &&
          isDisabled(startDate, this.state.minDate, this.state.maxDate)
        ) {
          ret.is_valid_start_date = false
        }
        if (
          endDateIsValid &&
          isDisabled(endDate, this.state.minDate, this.state.maxDate)
        ) {
          ret.is_valid_end_date = false
        }
      } else {
        if (
          startDateIsValid &&
          isDisabled(startDate, this.state.minDate, this.state.maxDate)
        ) {
          ret.is_valid = false
        }
      }
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
          getReturnObject: this.getReturnObject,
          callOnChangeHandler: this.callOnChangeHandler,
          props: this.props,
          ...this.props.enhanceWithMethods,
          ...this.state,
        }}
      >
        {children}
      </DatePickerContext.Provider>
    )
  }
}

export const pad = (num, size) => ('000000000' + num).substr(-size)
