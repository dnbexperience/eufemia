/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import {
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
  registerElement,
  dispatchCustomElementEvent,
  detectOutsideClick,
  validateDOMAttributes
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

// date-fns
import format from 'date-fns/format'
import toDate from 'date-fns/toDate'
import isValid from 'date-fns/isValid'
import parseISO from 'date-fns/parseISO'
import parse from 'date-fns/parse'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import nbLocale from 'date-fns/locale/nb'

import Context from '../../shared/Context'
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
  title: PropTypes.string,
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
  date_format: PropTypes.string,
  return_format: PropTypes.string,
  hide_navigation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  hide_navigation_buttons: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  hide_days: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  only_month: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disable_autofocus: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  show_input: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  show_submit_button: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  show_cancel_button: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  submit_button_text: PropTypes.string,
  cancel_button_text: PropTypes.string,
  reset_date: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  first_day: PropTypes.string,
  locale: PropTypes.object,
  range: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  link: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  sync: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  label_direction: PropTypes.oneOf(['horizontal', 'vertical']),
  input_element: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  global_status_id: PropTypes.string,
  opened: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  direction: PropTypes.oneOf(['auto', 'top', 'bottom']),
  align_picker: PropTypes.oneOf(['auto', 'left', 'right']),

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
  title: null,
  date: null,
  start_date: null,
  end_date: null,
  month: null,
  start_month: null,
  end_month: null,
  mask_order: 'dd/mm/yyyy',
  mask_placeholder: 'dd/mm/åååå', // have to be same setup as "mask" - but can be like: dd/mm/åååå
  date_format: 'yyyy-MM-dd', // in v1 of date-fns we where more flexible in terms of the format
  return_format: 'yyyy-MM-dd', // used in date-fns v1: YYYY-MM-DD
  hide_navigation: false,
  hide_navigation_buttons: false,
  hide_days: false,
  only_month: false,
  disable_autofocus: false,
  show_input: false,
  show_submit_button: null,
  show_cancel_button: null,
  submit_button_text: 'Ok',
  cancel_button_text: 'Lukk',
  reset_date: true,
  first_day: 'monday',
  min_date: null,
  max_date: null,
  locale: nbLocale,
  range: false,
  link: false,
  sync: true,
  label: null,
  label_direction: null,
  input_element: null,
  disabled: null,
  status: null,
  status_state: 'error',
  status_animation: null,
  global_status_id: null,
  opened: false,
  no_animation: false,
  align_picker: null,
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
  static contextType = Context

  static blurDelay = 201 // some ms more than "dropdownSlideDown 200ms"

  static enableWebComponent() {
    registerElement(DatePicker.tagName, DatePicker, defaultProps)
  }

  static parseOpened = state => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      let startDate = null
      const date_format = props.date_format
      if (props.date) {
        startDate = props.date
      }
      if (props.start_date) {
        startDate = props.start_date
      }
      if (startDate) {
        state.startDate = DatePicker.convertStringToDate(startDate, {
          date_format
        })
        if (!isTrue(props.range)) {
          state.endDate = state.startDate
        }
      }
      if (props.end_date) {
        state.endDate = DatePicker.convertStringToDate(props.end_date, {
          date_format
        })
      }
      if (props.month) {
        state.month = DatePicker.convertStringToDate(props.month, {
          date_format
        })
      }
      if (props.start_month) {
        state.startMonth = DatePicker.convertStringToDate(
          props.start_month,
          {
            date_format
          }
        )
      }
      if (props.end_month) {
        state.endMonth = DatePicker.convertStringToDate(props.end_month, {
          date_format
        })
      }
      if (props.min_date) {
        state.minDate = DatePicker.convertStringToDate(props.min_date, {
          date_format
        })
      }
      if (props.max_date) {
        state.maxDate = DatePicker.convertStringToDate(props.max_date, {
          date_format
        })
      }
    }
    state._listenForPropChanges = true
    return state
  }

  static convertStringToDate(date, { date_format = null } = {}) {
    let dateObject
    dateObject = typeof date === 'string' ? parseISO(date) : toDate(date)

    if (typeof date === 'string' && date_format && !isValid(dateObject)) {
      date_format = DatePicker.correctV1Format(date_format)
      dateObject = parse(date, date_format, new Date())
    }

    return dateObject
  }

  static correctV1Format(date) {
    // for backwords compatibility
    // TODO: Remvoe this in next major version
    if (/YYYY/.test(date) && /DD/.test(date)) {
      console.warn(
        'You are using "YYYY-MM-DD" as the date_format or return_format? Please use "yyyy-MM-dd" instead!'
      )
      date = date.replace(/DD/, 'dd').replace(/YYYY/, 'yyyy')
    }

    return date
  }

  constructor(props) {
    super(props)

    this._id = props.id || makeUniqueId() // cause we need an id anyway

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

    this._innerRef = React.createRef()
    this._triangleRef = React.createRef()
  }

  setTrianglePosition = () => {
    const { show_input, align_picker } = this.props
    if (
      isTrue(show_input) &&
      this._triangleRef.current &&
      this._innerRef.current
    ) {
      try {
        const shellWidth = this._innerRef.current
          .querySelector('.dnb-input__shell')
          .getBoundingClientRect().width
        const buttonWidth = this._innerRef.current
          .querySelector('.dnb-input__submit-button__button')
          .getBoundingClientRect().width
        if (align_picker === 'right') {
          const distance = buttonWidth / 2 - 8
          this._triangleRef.current.style.marginRight = `${distance /
            16}rem`
        } else {
          const distance = shellWidth - buttonWidth / 2 - 8
          this._triangleRef.current.style.marginLeft = `${distance /
            16}rem`
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  setOutsideClickHandler = () => {
    this.outsideClick = detectOutsideClick(
      this._innerRef.current,
      this.hidePicker
    )
  }

  removeOutsideClickHandler() {
    if (this.outsideClick) {
      this.outsideClick.remove()
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

  onInputChange = ({ startDate, endDate, ...args }) => {
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
        () => this.callOnChangeHandler(args)
      )
    }
    if (typeof endDate !== 'undefined') {
      this.setState(
        {
          endDate,
          _listenForPropChanges: false
        },
        () => !startDate && this.callOnChangeHandler(args)
      )
    }
  }

  onPickerChange = (
    { startDate, endDate, ...args },
    { hidePicker = true, callOnlyOnChangeHandler = false } = {}
  ) => {
    if (callOnlyOnChangeHandler) {
      return this.callOnChangeHandler(args)
    }
    this.setState(
      {
        startDate,
        endDate,
        _listenForPropChanges: false
      },
      () => this.callOnChangeHandler(args)
    )
    if (
      (!isTrue(this.state.show_submit_button) ||
        !isTrue(this.state.show_cancel_button)) &&
      hidePicker
    ) {
      this.hidePicker(args)
    }
  }

  onSubmitHandler = args => {
    this.hidePicker(args)
    dispatchCustomElementEvent(
      this,
      'on_submit',
      this.getReturnObject(args)
    )
  }

  onCancelHandler = args => {
    const { date_format } = this.props
    this.setState(
      {
        startDate: this.state._startDate
          ? DatePicker.convertStringToDate(this.state._startDate, {
              date_format
            })
          : null,
        endDate: this.state._endDate
          ? DatePicker.convertStringToDate(this.state._endDate, {
              date_format
            })
          : null
      },
      () => {
        this.hidePicker(args)
        dispatchCustomElementEvent(
          this,
          'on_cancel',
          this.getReturnObject(args)
        )
      }
    )
  }

  showPicker = args => {
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout)
    }
    this.setState({
      opened: true,
      hidden: false,
      _listenForPropChanges: false
    })
    dispatchCustomElementEvent(this, 'on_show', this.getReturnObject(args))

    this.setTrianglePosition()
    this.setOutsideClickHandler()
  }

  hidePicker = args => {
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
    dispatchCustomElementEvent(this, 'on_hide', this.getReturnObject(args))
    this.removeOutsideClickHandler()
  }

  togglePicker = args => {
    !this.state.opened
      ? this.showPicker((args && args.event) || args)
      : this.hidePicker((args && args.event) || args)
  }

  callOnChangeHandler = args => {
    const returnObject = this.getReturnObject(args)

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

  getReturnObject({ event = null } = {}) {
    const { startDate, endDate } = this.state
    const attributes = this.attributes || {}
    const return_format = DatePicker.correctV1Format(
      this.props.return_format
    )

    return isTrue(this.props.range)
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
          date: (startDate && format(startDate, return_format)) || null
        }
  }

  render() {
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    const {
      label,
      title,
      label_direction,
      only_month,
      disable_autofocus,
      hide_navigation_buttons,
      show_input, // eslint-disable-line
      range,
      first_day,
      reset_date,
      locale,
      link,
      sync,
      input_element,
      disabled,
      status,
      status_state,
      status_animation,
      global_status_id,
      mask_order,
      mask_placeholder,
      align_picker,

      hide_navigation: _hide_navigation, // eslint-disable-line
      return_format: _return_format, // eslint-disable-line
      date_format: _date_format, // eslint-disable-line
      hide_days: _hide_days, // eslint-disable-line
      month: _month, // eslint-disable-line
      date: _date, // eslint-disable-line
      start_date: _start_date, // eslint-disable-line
      end_date: _end_date, // eslint-disable-line
      min_date: _min_date, // eslint-disable-line
      max_date: _max_date, // eslint-disable-line
      opened: _opened, // eslint-disable-line
      direction: _direction, // eslint-disable-line
      id: _id, // eslint-disable-line

      ...attributes
    } = props

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

    const pickerParams = {}
    if (label) {
      pickerParams['aria-labelledby'] = id + '-label'
    }

    const inputParams = { ...attributes }
    const submitParams = { ['aria-expanded']: opened }

    const mainParams = {
      className: classnames(
        'dnb-date-picker',
        status && `dnb-date-picker__status--${status_state}`,
        label_direction && `dnb-date-picker--${label_direction}`,
        opened && 'dnb-date-picker--opened',
        hidden && 'dnb-date-picker--hidden',
        showInput && 'dnb-date-picker--show-input',
        (isTrue(show_submit_button) || isTrue(show_cancel_button)) &&
          'dnb-date-picker--show-footer',
        align_picker && `dnb-date-picker--${align_picker}`,
        createSpacingClasses(props)
      )
    }

    validateDOMAttributes(this.props, inputParams)
    validateDOMAttributes(null, submitParams)
    validateDOMAttributes(null, pickerParams)

    // make it pissible to grapt the rest attributes and return it with all events
    this.attributes = inputParams

    return (
      <span {...mainParams}>
        {(label && (
          <FormLabel
            id={id + '-label'}
            for_id={id}
            text={label}
            direction={label_direction}
            disabled={isTrue(disabled)}
          />
        )) || (
          <span className="dnb-date-picker__helper" aria-hidden>
            {'-'}
          </span>
        )}

        <span
          className="dnb-date-picker__inner"
          ref={this._innerRef}
          {...pickerParams}
        >
          {showStatus && (
            <FormStatus
              id={id + '-form-status'}
              global_status_id={global_status_id}
              text_id={id + '-status'} // used for "aria-describedby"
              width_selector={id + '-input'}
              text={status}
              status={status_state}
              animation={status_animation}
            />
          )}
          <span className="dnb-date-picker__shell">
            <DatePickerInput
              id={id}
              title={title}
              disabled={isTrue(disabled)}
              maskOrder={mask_order}
              maskPlaceholder={mask_placeholder}
              range={isTrue(range)}
              startDate={startDate}
              endDate={endDate}
              minDate={minDate}
              maxDate={maxDate}
              showInput={showInput}
              inputElement={input_element}
              opened={opened}
              status={status ? 'error' : null}
              status_state={status_state}
              // status_animation={status_animation}
              {...inputParams}
              submitAttributes={submitParams}
              onChange={this.onInputChange}
              onFocus={this.showPicker}
              onSubmit={this.togglePicker}
              onSubmitButtonFocus={this.onSubmitButtonFocus}
            />
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
                    noAutofocus={isTrue(disable_autofocus)}
                    onChange={this.onPickerChange}
                    month={month}
                    startMonth={startMonth}
                    endMonth={endMonth}
                    startDate={startDate}
                    endDate={endDate}
                  />
                  <DatePickerFooter
                    {...props}
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
      </span>
    )
  }
}
