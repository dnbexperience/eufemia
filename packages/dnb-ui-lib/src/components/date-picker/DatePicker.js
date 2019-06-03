/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  isTrue,
  registerElement,
  dispatchCustomElementEvent,
  validateDOMAttributes
} from '../../shared/component-helper'
import { format, parse, differenceInCalendarDays } from 'date-fns'
import nbLocale from 'date-fns/locale/nb'

import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import DatePickerRange from './DatePickerRange'
import DatePickerInput from './DatePickerInput'
import DatePickerFooter from './DatePickerFooter'

const renderProps = {
  on_change: null,
  on_show: null,
  on_hide: null,
  on_submit: null,
  on_cancel: null
}

export const propTypes = {
  id: PropTypes.string,
  date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]), // e.g. 2019-04-03T00:00:00Z
  start_date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]), // e.g. 2019-04-03T00:00:00Z
  end_date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]), // e.g. 2019-04-03T00:00:00Z
  month: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  start_month: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  end_month: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  min_date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  max_date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  mask_order: PropTypes.string,
  mask_placeholder: PropTypes.string,
  return_format: PropTypes.string,
  hide_navigation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  hide_navigation_buttons: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  hide_days: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  only_month: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  show_input: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  show_submit_button: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  show_cancel_button: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  reset_date: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  first_day: PropTypes.string,
  locale: PropTypes.object,
  range: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  link: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  sync: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  status: PropTypes.string,
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  opened: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  direction: PropTypes.oneOf(['auto', 'top', 'bottom']),

  // Web Component props
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,
  on_change: PropTypes.func,
  on_show: PropTypes.func,
  on_hide: PropTypes.func,
  on_submit: PropTypes.func,
  on_cancel: PropTypes.func
}

export const defaultProps = {
  id: null,
  date: null,
  start_date: null,
  end_date: null,
  month: null,
  start_month: null,
  end_month: null,
  mask_order: 'dd/mm/yyyy',
  mask_placeholder: 'dd/mm/åååå', // have to be same setup as "mask" - but can be like: dd/mm/åååå
  return_format: 'YYYY-MM-DD',
  hide_navigation: false,
  hide_navigation_buttons: false,
  hide_days: false,
  only_month: false,
  show_input: false,
  show_submit_button: null,
  show_cancel_button: null,
  reset_date: true,
  first_day: 'monday',
  min_date: null,
  max_date: null,
  locale: nbLocale,
  range: false,
  link: false,
  sync: true,
  label: null,
  disabled: false,
  status: null,
  status_state: 'error',
  status_animation: null,
  opened: false,
  no_animation: false,
  direction: 'auto',

  // Web Component props
  custom_element: null,
  custom_method: null,
  ...renderProps
}

export default class DatePicker extends PureComponent {
  static tagName = 'dnb-date-picker'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  static blurDelay = 201 // some ms more than "dropdownSlideDown 200ms"

  static enableWebComponent() {
    registerElement(DatePicker.tagName, DatePicker, defaultProps)
  }

  static parseOpened = state => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      let startDate = null
      if (props.date) {
        startDate = props.date
      }
      if (props.start_date) {
        startDate = props.start_date
      }
      if (startDate) {
        state.startDate = DatePicker.convertStringToDate(startDate)
        if (!isTrue(props.range)) {
          state.endDate = state.startDate
        }
      }
      if (props.end_date) {
        state.endDate = DatePicker.convertStringToDate(props.end_date)
      }
      if (props.month) {
        state.month = DatePicker.convertStringToDate(props.month)
      }
      if (props.start_month) {
        state.startMonth = DatePicker.convertStringToDate(
          props.start_month
        )
      }
      if (props.end_month) {
        state.endMonth = DatePicker.convertStringToDate(props.end_month)
      }
      if (props.min_date) {
        state.minDate = DatePicker.convertStringToDate(props.min_date)
      }
      if (props.max_date) {
        state.maxDate = DatePicker.convertStringToDate(props.max_date)
      }
    }
    state._listenForPropChanges = true
    return state
  }

  static convertStringToDate(date) {
    return typeof date === Date ? date : parse(date)
  }

  constructor(props) {
    super(props)

    this._id =
      props.id || `dnb-date-picker-${Math.round(Math.random() * 999)}` // cause we need an id anyway

    const opened = DatePicker.parseOpened(props.opened)
    this.state = {
      show_submit_button:
        props.show_submit_button !== null
          ? isTrue(props.show_submit_button)
          : isTrue(props.range),
      show_cancel_button:
        props.show_cancel_button !== null
          ? isTrue(props.show_cancel_button)
          : isTrue(props.range),
      startDate: null,
      endDate: null,
      _startDate: props.start_date,
      _endDate: props.end_date,
      showInput: isTrue(props.show_input),
      opened,
      hidden: !opened,
      direction: props.direction,
      _listenForPropChanges: true
    }

    const separators = props.mask_order.match(/[^mdy]/g)
    this.maskList = props.mask_order.split(/[^mdy]/).reduce((acc, cur) => {
      acc.push(cur)
      if (separators.length > 0) {
        acc.push(separators.shift())
      }
      return acc
    }, [])

    if (props.end_date && !isTrue(props.range)) {
      console.log(
        `The DatePicker got a "end_date". You have to set range={true} as well!.`
      )
    }

    this._wrapperRef = React.createRef()
    this._triangleRef = React.createRef()
  }

  setTrianglePosition = () => {
    if (
      isTrue(this.props.show_input) &&
      this._triangleRef.current &&
      this._wrapperRef.current
    ) {
      try {
        const shellWidth = this._wrapperRef.current
          .querySelector('.dnb-input__shell')
          .getBoundingClientRect().width
        const buttonWidth = this._wrapperRef.current
          .querySelector('.dnb-input__submit-button__button')
          .getBoundingClientRect().width
        const left = shellWidth - buttonWidth / 2 - 8
        this._triangleRef.current.style.marginLeft = `${left / 16}rem`
      } catch (e) {
        console.log(e)
      }
    }
  }

  setOutsideClickHandler = () => {
    if (!this.handleClickOutside && typeof document !== 'undefined') {
      this.handleClickOutside = (event, onSuccess = null) => {
        try {
          let targetElement = event.target
          do {
            if (targetElement == this._wrapperRef.current) {
              return // stop here
            }
            targetElement = targetElement.parentNode
          } while (targetElement)

          if (onSuccess) {
            onSuccess()
          }
          this.hidePicker()
        } catch (e) {
          console.log(e)
        }
      }
      document.addEventListener('mousedown', this.handleClickOutside)
      document.addEventListener('touchstart', this.handleClickOutside)

      this.keydownCallback = event => {
        const keyCode = keycode(event)
        if (keyCode === 'esc') {
          window.removeEventListener('keydown', this.keydownCallback)
          this.hidePicker()
        }
      }
      window.addEventListener('keydown', this.keydownCallback)

      // use keyup so we get the correct new target
      this.keyupCallback = event => {
        const keyCode = keycode(event)
        if (
          keyCode === 'tab' &&
          typeof this.handleClickOutside === 'function'
        ) {
          this.handleClickOutside(event, () => {
            if (this.keyupCallback)
              window.removeEventListener('keyup', this.keyupCallback)
          })
        }
      }
      window.addEventListener('keyup', this.keyupCallback)
    }
  }

  removeOutsideClickHandler() {
    if (this.handleClickOutside && typeof document !== 'undefined') {
      document.removeEventListener('mousedown', this.handleClickOutside)
      document.removeEventListener('touchstart', this.handleClickOutside)
      this.handleClickOutside = null
    }
    if (this.keydownCallback) {
      window.removeEventListener('keydown', this.keydownCallback)
      this.keydownCallback = null
    }
    if (this.keyupCallback) {
      window.removeEventListener('keyup', this.keyupCallback)
      this.keyupCallback = null
    }
  }

  componentWillUnmount() {
    clearTimeout(this._hideTimeout)
    this.removeOutsideClickHandler()
  }

  onSubmitButtonFocus = () => {
    this.setState({
      showInput: true
    })
  }

  onInputChange = ({ startDate, endDate }) => {
    // make sure endDate is same as startDate if we don't use range
    if (!isTrue(this.props.range)) {
      endDate = startDate
    }
    if (typeof startDate !== 'undefined') {
      this.setState(
        {
          startDate,
          _listenForPropChanges: false
        },
        this.callOnChangeHandler
      )
    }
    if (typeof endDate !== 'undefined') {
      this.setState(
        {
          endDate,
          _listenForPropChanges: false
        },
        () => !startDate && this.callOnChangeHandler()
      )
    }
  }

  onPickerChange = (
    { startDate, endDate },
    { hidePicker = true, callOnlyOnChangeHandler = false } = {}
  ) => {
    if (callOnlyOnChangeHandler) {
      return this.callOnChangeHandler()
    }
    this.setState(
      {
        startDate,
        endDate,
        _listenForPropChanges: false
      },
      this.callOnChangeHandler
    )
    if (
      (!isTrue(this.state.show_submit_button) ||
        !isTrue(this.state.show_cancel_button)) &&
      hidePicker
    ) {
      this.hidePicker()
    }
  }

  onSubmitHandler = () => {
    this.hidePicker()
    dispatchCustomElementEvent(this, 'on_submit', this.getReturnObject())
  }

  onCancelHandler = () => {
    this.setState(
      {
        startDate: this.state._startDate
          ? DatePicker.convertStringToDate(this.state._startDate)
          : null,
        endDate: this.state._endDate
          ? DatePicker.convertStringToDate(this.state._endDate)
          : null
      },
      () => {
        this.hidePicker()
        dispatchCustomElementEvent(
          this,
          'on_cancel',
          this.getReturnObject()
        )
      }
    )
  }

  showPicker = () => {
    this.setState({
      opened: true,
      _listenForPropChanges: false
    })
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout)
    }
    this.setState({
      hidden: false,
      _listenForPropChanges: false
    })
    dispatchCustomElementEvent(this, 'on_show', this.getReturnObject())

    this.setTrianglePosition()
    this.setOutsideClickHandler()
  }

  hidePicker = () => {
    this.setState({
      opened: false,
      _listenForPropChanges: false
    })

    this._hideTimeout = setTimeout(
      () => {
        this.setState({
          hidden: true,
          _listenForPropChanges: false
        })
      },
      this.props.no_animation ? 1 : DatePicker.blurDelay
    ) // wait until animation is over
    dispatchCustomElementEvent(this, 'on_hide', this.getReturnObject())
    this.removeOutsideClickHandler()
  }

  togglePicker = () => {
    !this.state.opened ? this.showPicker() : this.hidePicker()
  }

  callOnChangeHandler = () => {
    const returnObject = this.getReturnObject()

    if (this.returnObject) {
      if (isTrue(this.props.range)) {
        if (
          this.returnObject.start_date === returnObject.start_date &&
          this.returnObject.end_date === returnObject.end_date
        ) {
          return
        }
      } else {
        if (this.returnObject.date === returnObject.date) {
          return
        }
      }
    }
    this.returnObject = returnObject
    dispatchCustomElementEvent(this, 'on_change', returnObject)
  }

  getReturnObject() {
    const { startDate, endDate } = this.state

    return isTrue(this.props.range)
      ? {
          // startDate,
          // endDate,
          days_between: endDate
            ? differenceInCalendarDays(endDate, startDate)
            : null,
          start_date: startDate
            ? format(startDate, this.props.return_format)
            : null,
          end_date: endDate
            ? format(endDate, this.props.return_format)
            : null
        }
      : { date: format(startDate, this.props.return_format) }
  }

  render() {
    const {
      label,
      only_month,
      hide_navigation_buttons,
      show_input /* eslint-disable-line */,
      range,
      first_day,
      reset_date,
      locale,
      link,
      sync,
      disabled,
      status,
      status_state,
      status_animation,
      mask_order,
      mask_placeholder,

      hide_navigation: _hide_navigation /* eslint-disable-line */,
      hide_days: _hide_days /* eslint-disable-line */,
      month: _month /* eslint-disable-line */,
      start_date: _start_date /* eslint-disable-line */,
      end_date: _end_date /* eslint-disable-line */,
      min_date: _min_date /* eslint-disable-line */,
      max_date: _max_date /* eslint-disable-line */,
      opened: _opened /* eslint-disable-line */,
      direction: _direction /* eslint-disable-line */,
      id: _id /* eslint-disable-line */,

      ...attributes
    } = this.props

    let { hide_navigation, hide_days } = this.props

    // never hsow days and navigation
    if (isTrue(only_month)) {
      hide_days = true
      hide_navigation = isTrue(hide_navigation_buttons) ? false : true
    }

    const {
      month,
      startDate,
      endDate,
      startMonth,
      endMonth,
      minDate,
      maxDate,
      opened,
      hidden,
      showInput,
      show_submit_button,
      show_cancel_button
    } = this.state

    const id = this._id
    const showStatus = status && status !== 'error'

    const pickerParams = { ...attributes }
    if (label) {
      pickerParams['aria-labelledby'] = id + '-label'
    }

    const inputParams = { ['aria-expanded']: opened }

    validateDOMAttributes(this.props, pickerParams)
    validateDOMAttributes(null, inputParams)

    return (
      <>
        {label && (
          <FormLabel
            id={id + '-label'}
            for_id={id}
            text={label}
            disabled={isTrue(disabled)}
          />
        )}

        <span
          className={classnames(
            'dnb-date-picker',
            opened && 'dnb-date-picker--opened',
            hidden && 'dnb-date-picker--hidden',
            showInput && 'dnb-date-picker--show-input',
            (isTrue(show_submit_button) || isTrue(show_cancel_button)) &&
              'dnb-date-picker--show-footer'

            // TODO: make status work on #date-picker
            // showStatus && 'dnb-date-picker__form-status',
            // status && `dnb-date-picker__status--${status_state}`,
          )}
          ref={this._wrapperRef}
          {...pickerParams}
        >
          <span className="dnb-date-picker__shell">
            <DatePickerInput
              id={id}
              disabled={isTrue(disabled)}
              maskOrder={mask_order}
              maskPlaceholder={mask_placeholder}
              range={isTrue(range)}
              onChange={this.onInputChange}
              onFocus={this.showPicker}
              onSubmit={this.togglePicker}
              startDate={startDate}
              endDate={endDate}
              minDate={minDate}
              maxDate={maxDate}
              showInput={showInput}
              onSubmitButtonFocus={this.onSubmitButtonFocus}
              {...inputParams}
            />
            {showStatus && (
              <FormStatus
                text={status}
                status={status_state}
                text_id={id + '-status'} // used for "aria-describedby"
                animation={status_animation}
              />
            )}

            <span className="dnb-date-picker__container">
              <span
                className="dnb-date-picker__triangle"
                ref={this._triangleRef}
              />
              {!hidden && (
                <>
                  <DatePickerRange
                    id={id}
                    range={isTrue(range)}
                    firstDayOfWeek={first_day}
                    minDate={minDate}
                    maxDate={maxDate}
                    locale={locale}
                    resetDate={isTrue(reset_date)}
                    link={isTrue(link)}
                    sync={isTrue(sync)}
                    hideDays={isTrue(hide_days)}
                    hideNav={isTrue(hide_navigation)}
                    views={
                      isTrue(hide_navigation_buttons)
                        ? [{ nextBtn: false, prevBtn: false }]
                        : null
                    }
                    onlyMonth={isTrue(only_month)}
                    onChange={this.onPickerChange}
                    month={month}
                    startMonth={startMonth}
                    endMonth={endMonth}
                    startDate={startDate}
                    endDate={endDate}
                  />
                  <DatePickerFooter
                    range={isTrue(range)}
                    onSubmit={
                      isTrue(show_submit_button) && this.onSubmitHandler
                    }
                    onCancel={
                      isTrue(show_cancel_button) && this.onCancelHandler
                    }
                  />
                </>
              )}
            </span>
          </span>
        </span>
      </>
    )
  }
}
