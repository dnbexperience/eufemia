/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { setDate, setMonth, setYear, isAfter, format } from 'date-fns'
import MaskedInput from 'react-text-mask' // https://github.com/text-mask/text-mask
import Input from '../input/Input'
// import keycode from 'keycode'

export const propTypes = {
  mask: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onFocus: PropTypes.func
}

export const defaultProps = {
  mask: 'dd/mm/yyyy',
  label: null,
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

    const separators = props.mask.match(/[^mdy]/g)
    this.maskList = props.mask.split(/[^mdy]/).reduce((acc, cur) => {
      acc.push(cur)
      if (separators.length > 0) {
        acc.push(separators.shift())
      }
      return acc
    }, [])
  }

  static getDerivedStateFromProps(props, state) {
    if (props.startDate) {
      state.startDate = props.startDate
    }
    if (props.endDate) {
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
    return isAfter(date, new Date(1971, 1, 1))
  }

  setStartDate = (event, count, type, fn) => {
    try {
      let value = event.currentTarget.value
      if (
        parseFloat(value) > 0 &&
        new RegExp(`[0-9]{${count}}`).test(value)
      ) {
        if (type === 'startMonth' || type === 'endMonth') {
          value--
        }
        const startDate = fn(this.state.startDate, parseFloat(value))
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
      const value = event.currentTarget.value
      if (
        parseFloat(value) > 0 &&
        new RegExp(`[0-9]{${count}}`).test(value)
      ) {
        const endDate = fn(this.state.endDate, parseFloat(value))
        this.callOnChange({
          endDate
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  callOnChange = ({
    startDate = this.state.startDate,
    endDate = this.state.endDate
  }) => {
    if (startDate) {
      this.setState({
        startDate
      })
    }
    if (endDate) {
      this.setState({
        endDate
      })
    }
    if (typeof this.props.onChange === 'function') {
      this.props.onChange({
        startDate: this.isValidDate(startDate) && startDate,
        endDate: this.isValidDate(endDate) && endDate
      })
    }
  }

  generateStartDateList() {
    return this.maskList.map((m, i) => {
      if (/[a-z]/.test(m)) {
        const params = {}
        switch (m.slice(0, 1)) {
          case 'd':
            if (this.isValidDate(this.state.startDate)) {
              params.value = pad(format(this.state.startDate, 'D'), 2)
            }
            return (
              <InputElement
                key={'d' + i}
                className="dnb-date-picker__input dnb-date-picker__input--day"
                size="2"
                mask={[/[0-3]/, /[0-9]/]}
                placeholderChar="d"
                onFocus={this.props.onFocus}
                onMouseUp={selectInput}
                onChange={this.setStartDay}
                {...params}
              />
            )
          case 'm':
            if (this.isValidDate(this.state.startDate)) {
              params.value = pad(format(this.state.startDate, 'M'), 2)
            }
            return (
              <InputElement
                key={'m' + i}
                className="dnb-date-picker__input dnb-date-picker__input--month"
                size="2"
                mask={[/[0-1]/, /[0-9]/]}
                placeholderChar="m"
                onFocus={this.props.onFocus}
                onMouseUp={selectInput}
                onChange={this.setStartMonth}
                {...params}
              />
            )
          case 'y':
            if (this.isValidDate(this.state.startDate)) {
              params.value = format(this.state.startDate, 'YYYY')
            }
            return (
              <InputElement
                key={'y' + i}
                className="dnb-date-picker__input dnb-date-picker__input--year"
                size="4"
                mask={[/[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                placeholderChar="y"
                onFocus={this.props.onFocus}
                onMouseUp={selectInput}
                onChange={this.setStartYear}
                {...params}
              />
            )
        }
      }
      return (
        <span key={'s' + i} className="dnb-date-picker--separator">
          {m}
        </span>
      )
    })
  }

  generateEndDateList() {
    return this.maskList.map((m, i) => {
      if (/[a-z]/.test(m)) {
        const params = {}
        switch (m.slice(0, 1)) {
          case 'd':
            if (this.isValidDate(this.state.endDate)) {
              params.value = pad(format(this.state.endDate, 'D'), 2)
            }
            return (
              <InputElement
                key={'d' + i}
                className="dnb-date-picker__input dnb-date-picker__input--day"
                size="2"
                mask={[/[0-3]/, /[0-9]/]}
                placeholderChar="d"
                onFocus={this.props.onFocus}
                onMouseUp={selectInput}
                onChange={this.setEndDay}
                {...params}
              />
            )
          case 'm':
            if (this.isValidDate(this.state.endDate)) {
              params.value = pad(format(this.state.endDate, 'M'), 2)
            }
            return (
              <InputElement
                key={'m' + i}
                className="dnb-date-picker__input dnb-date-picker__input--month"
                size="2"
                mask={[/[0-1]/, /[0-9]/]}
                placeholderChar="m"
                onFocus={this.props.onFocus}
                onMouseUp={selectInput}
                onChange={this.setEndMonth}
                {...params}
              />
            )
          case 'y':
            if (this.isValidDate(this.state.endDate)) {
              params.value = format(this.state.endDate, 'YYYY')
            }
            return (
              <InputElement
                key={'y' + i}
                className="dnb-date-picker__input dnb-date-picker__input--year"
                size="4"
                mask={[/[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                placeholderChar="y"
                onFocus={this.props.onFocus}
                onMouseUp={selectInput}
                onChange={this.setEndYear}
                {...params}
              />
            )
        }
      }
      return (
        <span key={'s' + i} className="dnb-date-picker--separator">
          {m}
        </span>
      )
    })
  }

  render() {
    const startDateList = this.generateStartDateList()
    const endDateList = this.generateEndDateList()

    return (
      <Input
        label={this.props.label}
        inputElement={
          <span className="dnb-date-picker--shell">
            {startDateList} - {endDateList}
          </span>
        }
        submit_button_icon="calendar"
        on_submit={this.props.onSubmit}
      />
    )
  }
}

const selectInput = e => {
  e.target.focus()
  e.target.select()
}

const InputElement = props => (
  <MaskedInput
    guide={true}
    showMask={true}
    keepCharPositions={true}
    autoComplete="off"
    {...props}
  />
)

const pad = (num, size) => ('000000000' + num).substr(-size)
