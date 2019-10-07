/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// date-fns
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import addYears from 'date-fns/addYears'
import setDate from 'date-fns/setDate'
import setMonth from 'date-fns/setMonth'
import setYear from 'date-fns/setYear'
import format from 'date-fns/format'
import isValid from 'date-fns/isValid'

import classnames from 'classnames'
import MaskedInput from 'react-text-mask' // https://github.com/text-mask/text-mask
import Input, { SubmitButton } from '../input/Input'
import keycode from 'keycode'
import { validateDOMAttributes } from '../../shared/component-helper'
import { isDisabled } from './DatePickerCalc'

export const propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  maskOrder: PropTypes.string,
  maskPlaceholder: PropTypes.string,
  separatorRexExp: PropTypes.instanceOf(RegExp),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  submitAttributes: PropTypes.object,
  range: PropTypes.bool,
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  status_state: PropTypes.string,
  inputElement: PropTypes.string,
  disabled: PropTypes.bool,
  opened: PropTypes.bool,
  showInput: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onSubmitButtonFocus: PropTypes.func,
  onFocus: PropTypes.func
}

export const defaultProps = {
  id: null,
  title: null,
  maskOrder: 'dd/mm/yyyy',
  maskPlaceholder: 'dd/mm/åååå',
  separatorRexExp: /[-/ ]/g,
  submitAttributes: null,
  range: null,
  status: null,
  status_state: 'error',
  minDate: null,
  maxDate: null,
  inputElement: null,
  disabled: null,
  opened: false,
  showInput: null,
  onChange: null,
  onSubmit: null,
  onSubmitButtonFocus: null,
  onFocus: null
}

export default class DatePickerInput extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    _listenForPropChanges: true,
    focusState: 'virgin',
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

  static isValidDate(date) {
    return (
      date &&
      isValid(date) &&
      (date instanceof Date ? date : new Date(date)).getFullYear() !== 1111
    )
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      // watch for updates from the range calendar
      if (typeof props.startDate !== 'undefined') {
        state.startDate = props.startDate
      }
      if (typeof props.endDate !== 'undefined') {
        state.endDate = props.endDate
      }

      if (isDisabled(state.startDate, props.minDate, props.maxDate)) {
        state.startDate = props.minDate
      }
      if (isDisabled(state.endDate, props.minDate, props.maxDate)) {
        state.endDate = props.maxDate
      }
    }
    state._listenForPropChanges = true
    // set the input values
    if (DatePickerInput.isValidDate(state.startDate)) {
      state._startDay = pad(format(state.startDate, 'dd'), 2)
      state._startMonth = pad(format(state.startDate, 'MM'), 2)
      state._startYear = format(state.startDate, 'yyyy')
    } else {
      state._startDay = null
      state._startMonth = null
      state._startYear = null
    }
    if (DatePickerInput.isValidDate(state.endDate)) {
      state._endDay = pad(format(state.endDate, 'dd'), 2)
      state._endMonth = pad(format(state.endDate, 'MM'), 2)
      state._endYear = format(state.endDate, 'yyyy')
    } else {
      state._endDay = null
      state._endMonth = null
      state._endYear = null
    }
    return state
  }

  onKeyUpHandler = () => {
    if (this.props.showInput) {
      return
    }
    if (this._startDayRef.current) {
      setTimeout(() => {
        try {
          const elem = this._startDayRef.current.inputElement
          elem.focus()
          elem.select()
        } catch (e) {
          console.log(e)
        }
      }, 100)
    }
    if (typeof this.props.onSubmitButtonFocus === 'function') {
      this.props.onSubmitButtonFocus()
    }
    this.onKeyUpHandler = null
  }

  callOnChange = ({ startDate, endDate, event }, onState = null) => {
    if (
      typeof startDate !== 'undefined' &&
      DatePickerInput.isValidDate(startDate)
    ) {
      this.setState(
        {
          startDate,
          _listenForPropChanges: false
        },
        onState
      )
      if (typeof this.props.onChange === 'function') {
        this.props.onChange({
          startDate,
          event
        })
      }
    }
    if (
      typeof endDate !== 'undefined' &&
      DatePickerInput.isValidDate(endDate)
    ) {
      this.setState(
        {
          endDate,
          _listenForPropChanges: false
        },
        onState
      )
      if (typeof this.props.onChange === 'function') {
        this.props.onChange({
          endDate,
          event
        })
      }
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

    // do nowting if date is not set yet
    if (!date) {
      return
    }

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
      [isInRange === 'start' ? 'startDate' : 'endDate']: date,
      event
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
        // stop in case there is no next input element
        if (!this.refList[index + 1].current) {
          return
        }
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

  set_startDay = event => {
    this.setDate(event, 2, 'start', 'Day', setDate)
  }

  set_startMonth = event => {
    this.setDate(event, 2, 'start', 'Month', setMonth)
  }

  set_startYear = event => {
    this.setDate(event, 4, 'start', 'Year', setYear)
  }

  set_endDay = event => {
    this.setDate(event, 2, 'end', 'Day', setDate)
  }

  set_endMonth = event => {
    this.setDate(event, 2, 'end', 'Month', setMonth)
  }

  set_endYear = event => {
    this.setDate(event, 4, 'end', 'Year', setYear)
  }

  setDate = (event, count, mode, type, fn) => {
    event.persist()
    try {
      let value = event.target.value
      if (
        parseFloat(value) > 0 &&
        new RegExp(`[0-9]{${count}}`).test(value)
      ) {
        //  define a reset date
        if (!this[`_${mode}Date`]) {
          this[`_${mode}Date`] = new Date(1111, 1, 1)
        }

        value = parseFloat(value)

        // months have to be decented
        if (type === 'Month') {
          value--
        }

        // calculate new date
        const date = (this[`_${mode}Date`] = fn(
          this.state[`${mode}Date`] || this[`_${mode}Date`],
          value
        ))

        // update the date
        this.callOnChange({
          [`${mode}Date`]: date,
          event
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  renderInputElement = params => {
    const { id, range } = this.props
    this.refList = []
    const startDateList = this.generateDateList(params, 'start')
    const endDateList = this.generateDateList(params, 'end')
    return (
      <span id={`${id}-input`} className="dnb-date-picker__input__wrapper">
        {startDateList}
        {range && (
          <span className="dnb-date-picker--separator" aria-hidden>
            {' – '}
          </span>
        )}
        {range && endDateList}
      </span>
    )
  }

  generateDateList(params, mode) {
    return this.maskList.map((value, i) => {
      const state = value.slice(0, 1)
      const index = this.props.maskOrder.indexOf(value)
      const placeholderChar = this.props.maskPlaceholder[index]

      if (!this.props.separatorRexExp.test(value)) {
        if (!this.props.inputElement) {
          params = {
            ...params,
            'aria-labelledby': this.props.id,
            onKeyDown: this.onKeyDownHandler,
            onMouseUp: selectInput,
            onFocus: () => {
              this.setState({
                focusState: 'focus',
                _listenForPropChanges: false
              })
            },
            onBlur: () => {
              this.setState({
                focusState: 'blur',
                _listenForPropChanges: false
              })
            },
            placeholderChar: placeholderChar
          }
        } else {
          params = {
            ...params,
            'aria-labelledby': this.props.id
          }
        }

        // this makes it possible to use a vanilla <input /> like: inputElement="input"
        const Input = this.props.inputElement || InputElement

        switch (state) {
          case 'd':
            this.refList.push(this[`_${mode}DayRef`])

            return (
              <Input
                {...params}
                id={`${this.props.id}-${mode}-day`}
                key={'d' + i}
                className={classnames(
                  params.className,
                  'dnb-date-picker__input',
                  'dnb-date-picker__input--day'
                )}
                size="2"
                mask={[/[0-3]/, /[0-9]/]}
                ref={this[`_${mode}DayRef`]}
                onChange={this[`set_${mode}Day`]}
                value={this.state[`_${mode}Day`]}
              />
            )
          case 'm':
            this.refList.push(this[`_${mode}MonthRef`])

            return (
              <Input
                {...params}
                id={`${this.props.id}-${mode}-month`}
                key={'m' + i}
                className={classnames(
                  params.className,
                  'dnb-date-picker__input',
                  'dnb-date-picker__input--month'
                )}
                size="2"
                mask={[/[0-1]/, /[0-9]/]}
                ref={this[`_${mode}MonthRef`]}
                onChange={this[`set_${mode}Month`]}
                value={this.state[`_${mode}Month`]}
              />
            )
          case 'y':
            this.refList.push(this[`_${mode}YearRef`])

            return (
              <Input
                {...params}
                id={`${this.props.id}-${mode}-year`}
                key={'y' + i}
                className={classnames(
                  params.className,
                  'dnb-date-picker__input',
                  'dnb-date-picker__input--year'
                )}
                size="4"
                mask={[/[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                ref={this[`_${mode}YearRef`]}
                onChange={this[`set_${mode}Year`]}
                value={this.state[`_${mode}Year`]}
              />
            )
        }
      }
      return (
        <span
          key={'s' + i}
          className="dnb-date-picker--separator"
          aria-hidden
        >
          {placeholderChar}
        </span>
      )
    })
  }

  render() {
    const {
      id,
      title,

      submitAttributes,
      range /* eslint-disable-line */,
      maskOrder /* eslint-disable-line */,
      maskPlaceholder /* eslint-disable-line */,
      separatorRexExp /* eslint-disable-line */,
      date /* eslint-disable-line */,
      endDate /* eslint-disable-line */,
      startDate /* eslint-disable-line */,
      minDate /* eslint-disable-line */,
      maxDate /* eslint-disable-line */,
      onChange /* eslint-disable-line */,
      onFocus /* eslint-disable-line */,
      onSubmit /* eslint-disable-line */,
      onSubmitButtonFocus /* eslint-disable-line */,
      showInput /* eslint-disable-line */,
      inputElement /* eslint-disable-line */,
      disabled,
      opened,
      status,
      status_state,

      ...attributes
    } = this.props

    const { focusState } = this.state

    validateDOMAttributes(this.props, attributes)
    validateDOMAttributes(null, submitAttributes)

    return (
      <Input
        id={`${id}__input`}
        input_state={disabled ? 'disabled' : focusState}
        inputElement={this.renderInputElement}
        disabled={disabled}
        status={!opened ? status : null}
        status_state={status_state}
        submitButton={
          <SubmitButton
            id={id}
            disabled={disabled}
            className={opened ? 'dnb-button--active' : null}
            title={title}
            type="button"
            icon="calendar"
            variant="secondary"
            on_submit={onSubmit}
            onKeyUp={this.onKeyUpHandler}
            {...submitAttributes}
          />
        }
        {...attributes}
      />
    )
  }
}

const selectInput = e => {
  e.target.focus()
  e.target.select()
}

const InputElement = React.forwardRef((props, innerRef) => (
  <MaskedInput
    guide={true}
    showMask={true}
    keepCharPositions={false} // so we can overwrite next value, if it already exists
    autoComplete="off"
    ref={innerRef}
    {...props}
  />
))

const pad = (num, size) => ('000000000' + num).substr(-size)
const wait = t => new Promise(r => setTimeout(r, t))
