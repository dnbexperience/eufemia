/**
 * Web DatePicker Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

// date-fns
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import addYears from 'date-fns/addYears'
import isValid from 'date-fns/isValid'
import parseISO from 'date-fns/parseISO'

import classnames from 'classnames'
import MaskedInput from 'react-text-mask' // https://github.com/text-mask/text-mask
import Button from '../button/Button'
import Input, { SubmitButton } from '../input/Input'
import keycode from 'keycode'
import {
  warn,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { convertStringToDate } from './DatePickerCalc'
import DatePickerContext from './DatePickerContext'

export default class DatePickerInput extends React.PureComponent {
  static contextType = DatePickerContext

  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    selectedDateTitle: PropTypes.string,
    maskOrder: PropTypes.string,
    maskPlaceholder: PropTypes.string,
    separatorRexExp: PropTypes.instanceOf(RegExp),
    submitAttributes: PropTypes.object,
    isRange: PropTypes.bool,
    status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.func,
      PropTypes.node
    ]),
    status_state: PropTypes.string,
    input_element: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),
    locale: PropTypes.object,
    disabled: PropTypes.bool,
    skeleton: PropTypes.bool,
    opened: PropTypes.bool,
    showInput: PropTypes.bool,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onFocus: PropTypes.func
  }

  static defaultProps = {
    id: null,
    title: null,
    selectedDateTitle: null,
    maskOrder: 'dd/mm/yyyy',
    maskPlaceholder: 'dd/mm/åååå',
    separatorRexExp: /[-/ ]/g,
    submitAttributes: null,
    isRange: null,
    status: null,
    status_state: 'error',
    input_element: null,
    disabled: null,
    locale: null,
    skeleton: null,
    opened: false,
    showInput: null,
    onChange: null,
    onSubmit: null,
    onFocus: null
  }

  state = {
    _listenForPropChanges: true,
    focusState: 'virgin'
  }

  constructor(props) {
    super(props)

    const separators = props.maskOrder.match(props.separatorRexExp)
    this.maskList = props.maskOrder
      .split(props.separatorRexExp)
      .reduce((acc, cur) => {
        if (cur) {
          acc.push(cur)
          if (separators.length > 0) {
            acc.push(separators.shift())
          }
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

  componentWillUnmount() {
    if (this._shortcuts) {
      this._shortcuts.remove(this.osShortcut)
    }
  }

  shortcutHandler = async (e) => {
    if (this.focusMode) {
      const success = (e.clipboardData || window?.clipboardData).getData(
        'text'
      )
      if (success) {
        e.preventDefault()
        try {
          const separators = ['.', '/']
          const possibleFormats = ['yyyy-MM-dd']

          possibleFormats.forEach((date) => {
            separators.forEach((sep) => {
              possibleFormats.push(date.replace(/-/g, sep))
            })
          })
          possibleFormats.forEach((date) => {
            possibleFormats.push(date.split('').reverse().join(''))
          })

          let date
          for (let i = 0, l = possibleFormats.length; i < l; ++i) {
            date = convertStringToDate(success, {
              date_format: possibleFormats[i]
            })
            if (date) {
              break
            }
          }
          const mode = this.focusMode === 'start' ? 'startDate' : 'endDate'
          if (date && !this.state[mode]) {
            this.context.setState({
              [mode]: date
            })
          }
        } catch (e) {
          warn(e)
        }
      }
    }
  }

  callOnChangeAsInvalid = (state) => {
    const { startDate, endDate, event } = { ...this.context, ...state }
    this.context.updateState({ hoverDate: null })
    if (this.context.hasHadValidDate) {
      this.context.callOnChangeHandler({ startDate, endDate, event })
      this.context.updateState({ hasHadValidDate: false })
    }
  }

  callOnChange = ({ startDate, endDate, event }) => {
    const state = { changeMonthViews: true, hasHadValidDate: false }
    if (typeof startDate !== 'undefined' && isValid(startDate)) {
      state.startDate = startDate
    }
    if (!this.props.isRange) {
      endDate = startDate
    }
    if (typeof endDate !== 'undefined' && isValid(endDate)) {
      state.endDate = endDate
    }

    this.context.setDate(state, () => {
      if (
        (typeof startDate !== 'undefined' && isValid(startDate)) ||
        (typeof endDate !== 'undefined' && isValid(endDate))
      ) {
        this.context.callOnChangeHandler({ event })
      }
    })
  }

  callOnType = ({ event }) => {
    const getDates = () =>
      ['start', 'end'].reduce((acc, mode) => {
        acc[`${mode}Date`] = [
          this[`_${mode}Year`] || this.context[`__${mode}Year`] || 'yyyy',
          this[`_${mode}Month`] || this.context[`__${mode}Month`] || 'mm',
          this[`_${mode}Day`] || this.context[`__${mode}Day`] || 'dd'
        ].join('-')
        return acc
      }, {})

    // Get the typed dates, so we can ...
    let { startDate, endDate } = getDates()

    startDate = parseISO(startDate)
    endDate = parseISO(endDate)

    // ... check if they where valid
    if (!isValid(startDate)) {
      startDate = null
    }
    if (!isValid(endDate)) {
      endDate = null
    }

    let returnObject = this.context.getReturnObject({
      startDate,
      endDate,
      event
    })

    // Now, lets correct
    if (
      returnObject.is_valid === false ||
      returnObject.is_valid_start_date === false ||
      returnObject.is_valid_end_date === false
    ) {
      const { startDate, endDate } = getDates()

      const typedDates = this.props.isRange
        ? {
            start_date: startDate,
            end_date: endDate
          }
        : { date: startDate }

      returnObject = {
        ...returnObject,
        ...typedDates
      }
    }

    dispatchCustomElementEvent(this.context, 'on_type', returnObject)
  }

  prepareCounting = async ({ keyCode, target, event }) => {
    const isDate = target
      .getAttribute('class')
      .match(/__input--([day|month|year]+)($|\s)/)[1]
    const isInRange = target
      .getAttribute('id')
      .match(/[0-9]-([start|end]+)-/)[1]

    let date =
      isInRange === 'start' ? this.context.startDate : this.context.endDate

    // do nothing if date is not set yet
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

  onFocusHandler = (event) => {
    try {
      const target = event.target
      const endPos = target.value.length
      target.focus()
      target.setSelectionRange(0, endPos)
    } catch (e) {
      warn(e)
    }

    this.setState({
      focusState: 'focus',
      _listenForPropChanges: false
    })
  }

  onBlurHandler = () => {
    this.focusMode = null
    this.setState({
      focusState: 'blur',
      _listenForPropChanges: false
    })
  }

  onKeyDownHandler = async (event) => {
    const keyCode = keycode(event)
    const target = event.target

    // only to process key up and down press
    switch (keyCode) {
      case 'up':
      case 'down':
        event.persist()
        event.preventDefault()
        this.prepareCounting({ event, keyCode, target })
        return false
      case 'tab':
        // case 'backspace': // We need backspace down here
        return false
    }

    // the rest is for value entry

    const size = parseFloat(target.getAttribute('size'))
    const firstSelectionStart = target.selectionStart

    await wait(1) // to get the correct position afterwards

    const secondSelectionStart = target.selectionStart
    const isValid = /[0-9]/.test(keyCode)
    const index = this.refList.findIndex(
      ({ current }) => current.inputElement === target
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
        warn(e)
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
            warn(e)
          }
          break
      }
    }
  }

  set_startDay = (event) => {
    this.setDate(event, 'start', 'Day')
  }

  set_startMonth = (event) => {
    this.setDate(event, 'start', 'Month')
  }

  set_startYear = (event) => {
    this.setDate(event, 'start', 'Year')
  }

  set_endDay = (event) => {
    this.setDate(event, 'end', 'Day')
  }

  set_endMonth = (event) => {
    this.setDate(event, 'end', 'Month')
  }

  set_endYear = (event) => {
    this.setDate(event, 'end', 'Year')
  }

  setDate = (event, mode, type) => {
    event.persist() // since we have later a state update and afterwards the callback

    const value = event.target.value

    this[`_${mode}${type}`] = value

    if (this.context[`${mode}Date`]) {
      this[`tmp_${mode}Date`] = this.context[`${mode}Date`]
    }

    const fallback = this[`tmp_${mode}Date`]

    // provide fallbacks to create a temp fallback
    const year =
      this[`_${mode}Year`] || (fallback && fallback.getFullYear())
    const month =
      this[`_${mode}Month`] || (fallback && fallback.getMonth() + 1)
    const day = this[`_${mode}Day`] || (fallback && fallback.getDate())

    // calculate new date
    const date = new Date(
      parseFloat(year),
      parseFloat(month) - 1,
      parseFloat(day)
    )

    const isValidDate =
      !/[^0-9]/.test(day) &&
      !/[^0-9]/.test(month) &&
      !/[^0-9]/.test(year) &&
      isValid(date) &&
      date.getDate() == parseFloat(day) &&
      date.getMonth() + 1 == parseFloat(month) &&
      date.getFullYear() == parseFloat(year)

    // update the date
    if (isValidDate) {
      this.callOnChange({
        [`${mode}Date`]: date,
        event
      })
    } else {
      this.context.setDate({ [`${mode}Date`]: null })
      this.context.updateState({ [`__${mode}${type}`]: value })

      this.callOnChangeAsInvalid({
        [`${mode}Date`]: null,
        event
      })
    }

    this.callOnType({
      event
    })
  }

  renderInputElement = (params) => {
    const { id, isRange } = this.props
    this.refList = []
    const startDateList = this.generateDateList(params, 'start')
    const endDateList = this.generateDateList(params, 'end')
    return (
      <span id={`${id}-input`} className="dnb-date-picker__input__wrapper">
        {startDateList}
        {isRange && (
          <span className="dnb-date-picker--separator" aria-hidden>
            {' – '}
          </span>
        )}
        {isRange && endDateList}
      </span>
    )
  }

  getPlaceholderChar(value) {
    const index = this.props.maskOrder.indexOf(value)
    return this.props.maskPlaceholder[index]
  }

  generateDateList(params, mode) {
    return this.maskList.map((value, i) => {
      const state = value.slice(0, 1)
      const placeholderChar = this.getPlaceholderChar(value)
      const { input_element, separatorRexExp, isRange } = this.props
      const { day, month, year } = this.context.translation.DatePicker
      const isRangeLabel = isRange
        ? `${this.context.translation.DatePicker[mode]} `
        : ''

      if (!separatorRexExp.test(value)) {
        if (!input_element) {
          params = {
            ...params,
            onKeyDown: this.onKeyDownHandler,
            onMouseUp: selectInput,
            onPaste: this.shortcutHandler,
            onFocus: (e) => {
              this.focusMode = mode
              this.onFocusHandler(e)
            },
            onBlur: this.onBlurHandler,
            placeholderChar
          }
        }

        // this makes it possible to use a vanilla <input /> like: input_element="input"
        const Input =
          typeof input_element === 'string' ? input_element : InputElement

        switch (state) {
          case 'd':
            this.refList.push(this[`_${mode}DayRef`])

            return (
              <React.Fragment key={'dd' + i}>
                <Input
                  {...params}
                  id={`${this.props.id}-${mode}-day`}
                  key={'di' + i}
                  className={classnames(
                    params.className,
                    'dnb-date-picker__input',
                    'dnb-date-picker__input--day'
                  )}
                  size="2"
                  mask={[/[0-3]/, /[0-9]/]}
                  ref={this[`_${mode}DayRef`]}
                  onChange={this[`set_${mode}Day`]}
                  value={this.context[`__${mode}Day`] || ''}
                  aria-labelledby={`${this.props.id}-${mode}-day-label`}
                />
                <label
                  key={'dl' + i}
                  hidden
                  id={`${this.props.id}-${mode}-day-label`}
                >
                  {isRangeLabel + day}
                </label>
              </React.Fragment>
            )
          case 'm':
            this.refList.push(this[`_${mode}MonthRef`])

            return (
              <React.Fragment key={'mm' + i}>
                <Input
                  {...params}
                  id={`${this.props.id}-${mode}-month`}
                  key={'mi' + i}
                  className={classnames(
                    params.className,
                    'dnb-date-picker__input',
                    'dnb-date-picker__input--month'
                  )}
                  size="2"
                  mask={[/[0-1]/, /[0-9]/]}
                  ref={this[`_${mode}MonthRef`]}
                  onChange={this[`set_${mode}Month`]}
                  value={this.context[`__${mode}Month`] || ''}
                  aria-labelledby={`${this.props.id}-${mode}-month-label`}
                />
                <label
                  key={'ml' + i}
                  hidden
                  id={`${this.props.id}-${mode}-month-label`}
                >
                  {isRangeLabel + month}
                </label>
              </React.Fragment>
            )
          case 'y':
            this.refList.push(this[`_${mode}YearRef`])

            return (
              <React.Fragment key={'yy' + i}>
                <Input
                  {...params}
                  id={`${this.props.id}-${mode}-year`}
                  key={'yi' + i}
                  className={classnames(
                    params.className,
                    'dnb-date-picker__input',
                    'dnb-date-picker__input--year'
                  )}
                  size="4"
                  mask={[/[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                  ref={this[`_${mode}YearRef`]}
                  onChange={this[`set_${mode}Year`]}
                  value={this.context[`__${mode}Year`] || ''}
                  aria-labelledby={`${this.props.id}-${mode}-year-label`}
                />
                <label
                  key={'yl' + i}
                  hidden
                  id={`${this.props.id}-${mode}-year-label`}
                >
                  {isRangeLabel + year}
                </label>
              </React.Fragment>
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

  formatDate() {
    const { open_picker_text } = this.context.translation.DatePicker

    const { selectedDateTitle } = this.props

    return selectedDateTitle
      ? `${selectedDateTitle}, ${open_picker_text}`
      : open_picker_text
  }

  render() {
    const {
      id,
      title,

      submitAttributes,
      isRange, // eslint-disable-line
      maskOrder, // eslint-disable-line
      maskPlaceholder, // eslint-disable-line
      separatorRexExp, // eslint-disable-line
      onChange, // eslint-disable-line
      onFocus, // eslint-disable-line
      onSubmit, // eslint-disable-line
      selectedDateTitle, // eslint-disable-line
      showInput, // eslint-disable-line
      input_element,
      locale,
      disabled,
      skeleton,
      opened,
      status,
      status_state,

      ...attributes
    } = this.props

    const { focusState } = this.state

    validateDOMAttributes(this.props, attributes)
    validateDOMAttributes(null, submitAttributes)

    const UsedButton = showInput ? SubmitButton : Button
    if (!showInput) {
      // Use Button inner ref
      submitAttributes.innerRef = submitAttributes.ref
      submitAttributes.ref = null
    }

    return (
      <fieldset className="dnb-date-picker__fieldset" lang={locale?.code}>
        {this.context.props.label && (
          <legend className="dnb-sr-only">
            {this.context.props.label}
          </legend>
        )}
        <Input
          id={`${id}__input`}
          input_state={disabled ? 'disabled' : focusState}
          input_element={
            input_element && typeof input_element !== 'string'
              ? typeof input_element === 'function'
                ? input_element(this.props)
                : input_element
              : this.renderInputElement
          }
          disabled={disabled || skeleton}
          skeleton={skeleton}
          status={!opened ? status : null}
          status_state={status_state}
          submit_element={
            <UsedButton
              id={id}
              disabled={disabled}
              skeleton={skeleton}
              className={classnames(
                showInput && 'dnb-button--input-button',
                opened ? 'dnb-button--active' : null
              )}
              aria-label={this.formatDate()}
              title={title}
              status={status}
              status_state={status_state}
              type="button"
              icon="calendar"
              variant="secondary"
              on_submit={onSubmit}
              on_click={onSubmit}
              {...submitAttributes}
            />
          }
          lang={locale?.code}
          {...attributes}
        />{' '}
      </fieldset>
    )
  }
}

const selectInput = (e) => {
  e.target.focus()
  e.target.select()
}

const InputElement = React.forwardRef((props, innerRef) => {
  return (
    <MaskedInput
      guide={true}
      showMask={true}
      keepCharPositions={false} // so we can overwrite next value, if it already exists
      autoComplete="off"
      autoCapitalize="none"
      spellCheck={false}
      autoCorrect="off"
      ref={innerRef}
      {...props}
    />
  )
})

// const pad = (num, size) => ('000000000' + num).substr(-size)
const wait = (t) => new Promise((r) => setTimeout(r, t))
