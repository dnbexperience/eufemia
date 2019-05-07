/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  addDays,
  addMonths,
  addYears,
  setDate,
  setMonth,
  setYear,
  isAfter,
  format
} from 'date-fns'
import MaskedInput from 'react-text-mask' // https://github.com/text-mask/text-mask
import Input, { SubmitButton } from '../input/Input'
import keycode from 'keycode'

export const propTypes = {
  id: PropTypes.string,
  maskOrder: PropTypes.string,
  maskPlaceholder: PropTypes.string,
  separatorRexExp: PropTypes.instanceOf(RegExp),
  range: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onFocus: PropTypes.func
}

export const defaultProps = {
  id: null,
  maskOrder: 'dd/mm/yyyy',
  maskPlaceholder: 'dd/mm/åååå',
  separatorRexExp: /[-/ ]/g,
  range: null,
  onChange: null,
  onSubmit: null,
  onFocus: null
}

export default class DatePickerInput extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    startDate: null,
    endDate: null
  }

  constructor(props) {
    super(props)

    const separators = props.maskOrder.match(props.separatorRexExp)
    this.maskList = props.maskOrder
      .split(props.separatorRexExp)
      .reduce((acc, cur) => {
        acc.push(cur)
        if (separators.length > 0) {
          acc.push(separators.shift())
        }
        return acc
      }, [])

    this._startDayRef = React.createRef()
    this._startMonthRef = React.createRef()
    this._startYearRef = React.createRef()
    this._endDayRef = React.createRef()
    this._endMonthRef = React.createRef()
    this._endYearRef = React.createRef()
  }

  static getDerivedStateFromProps(props, state) {
    if (typeof props.startDate !== 'undefined') {
      state.startDate = props.startDate
    }
    if (typeof props.endDate !== 'undefined') {
      state.endDate = props.endDate
    }
    return state
  }

  onPickerChange = ({ startDate, endDate }) => {
    this.setState({
      startDate,
      endDate
    })
  }

  setStartDay = event => {
    this.setStartDate(event, 2, 'startDay', setDate)
  }

  setStartMonth = event => {
    this.setStartDate(event, 2, 'startMonth', setMonth)
  }

  setStartYear = event => {
    this.setStartDate(event, 4, 'startYear', setYear)
  }

  setEndDay = event => {
    this.setEndDate(event, 2, 'endDay', setDate)
  }

  setEndMonth = event => {
    this.setEndDate(event, 2, 'endMonth', setMonth)
  }

  setEndYear = event => {
    this.setEndDate(event, 4, 'endYear', setYear)
  }

  isValidDate = date => {
    return date && isAfter(date, new Date(1971, 1, 1))
  }

  setStartDate = (event, count, type, fn) => {
    try {
      let value = event.currentTarget.value
      if (
        parseFloat(value) > 0 &&
        new RegExp(`[0-9]{${count}}`).test(value)
      ) {
        if (type === 'startMonth') {
          value--
        }
        if (!this._startDate) {
          this._startDate = new Date(1111, 1, 1)
        }
        const startDate = (this._startDate = fn(
          this.state.startDate || this._startDate,
          parseFloat(value)
        ))
        this.callOnChange({
          startDate
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  setEndDate = (event, count, type, fn) => {
    try {
      let value = event.currentTarget.value
      if (
        parseFloat(value) > 0 &&
        new RegExp(`[0-9]{${count}}`).test(value)
      ) {
        if (type === 'endMonth') {
          value--
        }
        if (!this._endDate) {
          this._endDate = new Date(1111, 1, 1)
        }
        const endDate = (this._endDate = fn(
          this.state.endDate || this._endDate,
          parseFloat(value)
        ))
        this.callOnChange({
          endDate
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  callOnChange = (
    { startDate = this.state.startDate, endDate = this.state.endDate },
    onState = null
  ) => {
    if (startDate) {
      this.setState(
        {
          startDate
        },
        onState
      )
    }
    if (endDate) {
      this.setState(
        {
          endDate
        },
        onState
      )
    }
    if (typeof this.props.onChange === 'function') {
      this.props.onChange({
        startDate: this.isValidDate(startDate) && startDate,
        endDate: this.isValidDate(endDate) && endDate
      })
    }
  }

  prepareCounting = async ({ keyCode, target }) => {
    const isDate = target
      .getAttribute('class')
      .match(/__input--([day|month|year]+)($|\s)/)[1]
    const isInRange = target
      .getAttribute('id')
      .match(/[0-9]-([start|end]+)-/)[1]

    let date =
      isInRange === 'start' ? this.state.startDate : this.state.endDate

    const count = keyCode === 'up' ? 1 : -1

    if (keyCode === 'up' || keyCode === 'down') {
      switch (isDate) {
        case 'day':
          date = addDays(date, count)
          break
        case 'month':
          date = addMonths(date, count)
          break
        case 'year':
          date = addYears(date, count)
          break
      }
    }

    this.callOnChange({
      [isInRange === 'start' ? 'startDate' : 'endDate']: date
    })

    await wait(1) // to get the correct position afterwards

    const endPos = target.value.length
    target.focus()
    target.setSelectionRange(0, endPos)
  }

  onKeyDownHandler = async e => {
    const keyCode = keycode(e)
    const target = e.target

    // only to process key up and down press
    switch (keyCode) {
      case 'up':
      case 'down':
        this.prepareCounting({ keyCode, target })
        e.preventDefault()
        return false
      case 'tab':
        return false
    }

    // the rest is for value entry

    const size = parseFloat(target.getAttribute('size'))
    const firstSelectionStart = target.selectionStart

    await wait(1) // to get the correct position afterwards

    const secondSelectionStart = target.selectionStart
    // const isValid = /[0-9]/.test(target.value)
    const isValid = /[0-9]/.test(keyCode)
    const index = this.refList.findIndex(
      ({ current: { inputElement } }) => inputElement === target
    )

    if (
      index < this.refList.length - 1 &&
      ((secondSelectionStart === size &&
        isValid &&
        keyCode !== 'left' &&
        keyCode !== 'backspace') ||
        (firstSelectionStart === size && keyCode === 'right'))
    ) {
      try {
        const nextSibling = this.refList[index + 1].current.inputElement
        if (nextSibling) {
          nextSibling.focus()
          nextSibling.setSelectionRange(0, 0)
        }
      } catch (e) {
        console.log(e)
      }
    } else if (firstSelectionStart === 0 && index > 0) {
      switch (keyCode) {
        case 'left':
        case 'backspace':
          try {
            const prevSibling = this.refList[index - 1].current
              .inputElement
            if (prevSibling) {
              const endPos = prevSibling.value.length
              prevSibling.focus()
              prevSibling.setSelectionRange(endPos, endPos)
            }
          } catch (e) {
            console.log(e)
          }
          break
      }
    }
  }

  generateStartDateList() {
    this.refList = []
    return this.maskList.map((value, i) => {
      const state = value.slice(0, 1)
      const index = this.props.maskOrder.indexOf(value)
      const placeholderChar = this.props.maskPlaceholder[index]
      if (!this.props.separatorRexExp.test(value)) {
        const params = {
          onKeyDown: this.onKeyDownHandler,
          placeholderChar: placeholderChar,
          onMouseUp: selectInput
        }
        switch (state) {
          case 'd':
            this.refList.push(this._startDayRef)
            return (
              <InputElement
                id={`${this.props.id}-start-day`}
                key={'d' + i}
                className="dnb-date-picker__input dnb-date-picker__input--day"
                size="2"
                mask={[/[0-3]/, /[0-9]/]}
                onChange={this.setStartDay}
                ref={this._startDayRef}
                value={
                  this.isValidDate(this.state.startDate)
                    ? pad(format(this.state.startDate, 'D'), 2)
                    : ''
                }
                {...params}
              />
            )
          case 'm':
            this.refList.push(this._startMonthRef)
            return (
              <InputElement
                id={`${this.props.id}-start-month`}
                key={'m' + i}
                className="dnb-date-picker__input dnb-date-picker__input--month"
                size="2"
                mask={[/[0-1]/, /[0-9]/]}
                onChange={this.setStartMonth}
                ref={this._startMonthRef}
                value={
                  this.isValidDate(this.state.startDate)
                    ? pad(format(this.state.startDate, 'M'), 2)
                    : null
                }
                {...params}
              />
            )
          case 'y':
            this.refList.push(this._startYearRef)
            return (
              <InputElement
                id={`${this.props.id}-start-year`}
                key={'y' + i}
                className="dnb-date-picker__input dnb-date-picker__input--year"
                size="4"
                mask={[/[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                onChange={this.setStartYear}
                value={
                  this.isValidDate(this.state.startDate)
                    ? format(this.state.startDate, 'YYYY')
                    : null
                }
                ref={this._startYearRef}
                {...params}
              />
            )
        }
      }
      return (
        <span key={'s' + i} className="dnb-date-picker--separator">
          {placeholderChar}
        </span>
      )
    })
  }

  generateEndDateList() {
    return this.maskList.map((value, i) => {
      const state = value.slice(0, 1)
      const index = this.props.maskOrder.indexOf(value)
      const placeholderChar = this.props.maskPlaceholder[index]
      if (!this.props.separatorRexExp.test(value)) {
        const params = {
          onKeyDown: this.onKeyDownHandler,
          placeholderChar: placeholderChar,
          onMouseUp: selectInput
        }
        switch (state) {
          case 'd':
            this.refList.push(this._endDayRef)
            return (
              <InputElement
                id={`${this.props.id}-end-day`}
                key={'d' + i}
                className="dnb-date-picker__input dnb-date-picker__input--day"
                size="2"
                mask={[/[0-3]/, /[0-9]/]}
                onChange={this.setEndDay}
                value={
                  this.isValidDate(this.state.endDate)
                    ? pad(format(this.state.endDate, 'D'), 2)
                    : null
                }
                ref={this._endDayRef}
                {...params}
              />
            )
          case 'm':
            this.refList.push(this._endMonthRef)
            return (
              <InputElement
                id={`${this.props.id}-end-month`}
                key={'m' + i}
                className="dnb-date-picker__input dnb-date-picker__input--month"
                size="2"
                mask={[/[0-1]/, /[0-9]/]}
                onChange={this.setEndMonth}
                value={
                  this.isValidDate(this.state.endDate)
                    ? pad(format(this.state.endDate, 'M'), 2)
                    : null
                }
                ref={this._endMonthRef}
                {...params}
              />
            )
          case 'y':
            this.refList.push(this._endYearRef)
            return (
              <InputElement
                id={`${this.props.id}-end-year`}
                key={'y' + i}
                className="dnb-date-picker__input dnb-date-picker__input--year"
                size="4"
                mask={[/[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                onChange={this.setEndYear}
                value={
                  this.isValidDate(this.state.endDate)
                    ? format(this.state.endDate, 'YYYY')
                    : null
                }
                ref={this._endYearRef}
                {...params}
              />
            )
        }
      }
      return (
        <span key={'s' + i} className="dnb-date-picker--separator">
          {placeholderChar}
        </span>
      )
    })
  }

  render() {
    const startDateList = this.generateStartDateList()
    const endDateList = this.generateEndDateList()

    const { range, id } = this.props

    return (
      <Input
        inputElement={
          <span className="dnb-date-picker__input__wrapper">
            {startDateList}
            {range && ' - '}
            {range && endDateList}
          </span>
        }
        submitButton={
          <SubmitButton
            id={id}
            // title={submit_button_title}
            icon="calendar"
            variant="secondary"
            on_submit={this.props.onSubmit}
          />
        }
      />
    )
  }
}

const selectInput = e => {
  e.target.focus()
  e.target.select()
}

const InputElement = React.forwardRef((props, ref) => (
  <MaskedInput
    guide={true}
    showMask={true}
    keepCharPositions={true}
    autoComplete="off"
    ref={ref}
    {...props}
  />
))

const pad = (num, size) => ('000000000' + num).substr(-size)
const wait = t => new Promise(r => setTimeout(r, t))
