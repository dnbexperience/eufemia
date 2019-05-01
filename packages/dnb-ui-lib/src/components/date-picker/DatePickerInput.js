/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { setDate, setMonth, setYear, format } from 'date-fns'
import MaskedInput from 'react-text-mask' // https://github.com/text-mask/text-mask
import Input from '../input/Input'
// import Icon from '../icon-primary/IconPrimary'
// import keycode from 'keycode'

const renderProps = {
  on_change: null
}

export const propTypes = {
  mask: PropTypes.string,
  label: PropTypes.string,
  // startDate: PropTypes.instanceOf(Date),
  // endDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onFocus: PropTypes.func
}

export const defaultProps = {
  mask: 'dd/mm/yyyy',
  label: null,
  // startDate: null,
  // endDate: null,
  onChange: null,
  onSubmit: null,
  onFocus: null,
  ...renderProps
}

export default class DatePicker extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

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

    // this.dayRef = React.createRef()
  }

  static getDerivedStateFromProps(props, state) {
    // if (state._listenForPropChanges) {
    if (props.startDate) {
      state.startDate = props.startDate
    }
    if (props.endDate) {
      state.endDate = props.endDate
    }
    // }
    // state._listenForPropChanges = true
    return state
  }

  onPickerChange = ({ startDate, endDate }) => {
    this.setState({
      startDate,
      endDate
    })
  }

  setStartDay = event => {
    try {
      const value = event.currentTarget.value
      if (parseFloat(value) > 0 && /[0-9]{2}/.test(value)) {
        const startDate = setDate(this.state.startDate, parseFloat(value))
        this.callOnChange({
          startDate
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  setStartMonth = event => {
    try {
      const value = event.currentTarget.value
      if (parseFloat(value) > 0 && /[0-9]{2}/.test(value)) {
        const startDate = setMonth(this.state.startDate, parseFloat(value))
        this.callOnChange({
          startDate
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  setStartYear = event => {
    try {
      const value = event.currentTarget.value
      if (parseFloat(value) > 0 && /[0-9]{4}/.test(value)) {
        const startDate = setYear(this.state.startDate, parseFloat(value))
        this.callOnChange({
          startDate
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
    if (startDate)
      this.setState({
        startDate
      })
    if (endDate)
      this.setState({
        endDate
      })
    console.log('callOnChange', startDate)
    if (typeof this.props.onChange === 'function') {
      this.props.onChange({ startDate, endDate })
    }
  }

  // componentDidMount() {
  // console.log('this.dayRef', this.dayRef.current.inputElement)
  // this.dayRef.current.inputElement.value = '12'
  // }

  render() {
    const list = this.maskList.map((m, i) => {
      if (/[a-z]/.test(m)) {
        switch (m.slice(0, 1)) {
          case 'd':
            return (
              <InputElement
                key={'d' + i}
                className="dnb-date-picker__input dnb-date-picker__input--day"
                // ref={this.dayRef}
                value={
                  this.state.startDate &&
                  pad(format(this.state.startDate, 'D'), 2)
                }
                size="2"
                mask={[/[0-3]/, /[0-9]/]}
                placeholderChar="d"
                onFocus={this.props.onFocus}
                onMouseUp={selectInput}
                onChange={this.setStartDay}
                // defaultValue={this.state.startDay}
                // innerRef={innerRef}
                // {...props}
              />
            )
          case 'm':
            return (
              <InputElement
                key={'m' + i}
                className="dnb-date-picker__input dnb-date-picker__input--month"
                value={
                  this.state.startDate &&
                  pad(format(this.state.startDate, 'M'), 2)
                }
                size="2"
                mask={[/[0-1]/, /[0-9]/]}
                placeholderChar="m"
                onFocus={this.props.onFocus}
                onMouseUp={selectInput}
                onChange={this.setStartMonth}
              />
            )
          case 'y':
            return (
              <InputElement
                key={'y' + i}
                className="dnb-date-picker__input dnb-date-picker__input--year"
                value={
                  this.state.startDate &&
                  format(this.state.startDate, 'YYYY')
                }
                size="4"
                mask={[/[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                placeholderChar="y"
                onFocus={this.props.onFocus}
                onMouseUp={selectInput}
                onChange={this.setStartYear}
                // defaultValue={date && getYear(date)}
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

    return (
      <Input
        label={this.props.label}
        inputElement={
          <span className="dnb-date-picker--shell">{list}</span>
        }
        on_submit={this.props.onSubmit}
        submit_button_icon="calendar"
        on_change={val => {
          console.log('val', val)
        }}
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
