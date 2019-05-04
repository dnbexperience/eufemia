/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  registerElement,
  //   processChildren,
  dispatchCustomElementEvent,
  validateDOMAttributes
} from '../../shared/component-helper'
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
  start_date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]), // e.g. 2019-04-03T00:00:00Z
  end_date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]), // e.g. 2019-04-03T00:00:00Z
  mask: PropTypes.string,
  mask_input: PropTypes.string,
  hide_navigation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  hide_days: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  show_input: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  show_submit_button: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  show_cancel_button: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  first_day: PropTypes.string,
  locale: PropTypes.object,
  range: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  link: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
  start_date: null,
  end_date: null,
  mask: 'dd/mm/yyyy',
  mask_input: 'dd/mm/åååå', // have to be same setup as "mask" - but can be like: dd/mm/åååå
  hide_navigation: false,
  hide_days: false,
  show_input: false,
  show_submit_button: null,
  show_cancel_button: null,
  first_day: 'monday',
  locale: nbLocale,
  range: false,
  link: false,
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
      if (props.start_date) {
        state.startDate = DatePicker.convertStringToDate(props.start_date)
        if (!props.range) {
          state.endDate = state.startDate
        }
      }
      if (props.end_date) {
        state.endDate = DatePicker.convertStringToDate(props.end_date)
      }
    }
    state._listenForPropChanges = true
    return state
  }

  static convertStringToDate(stringDate) {
    const date =
      typeof stringDate === Date ? stringDate : new Date(stringDate)
    return date
  }

  constructor(props) {
    super(props)

    this._id =
      props.id || `dnb-date-picker-${Math.round(Math.random() * 999)}` // cause we need an id anyway

    const opened = DatePicker.parseOpened(props.opened)
    this.state = {
      show_submit_button:
        props.show_submit_button !== null
          ? props.show_submit_button
          : props.range,
      show_cancel_button:
        props.show_cancel_button !== null
          ? props.show_cancel_button
          : props.range,
      startDate: null,
      endDate: null,
      _startDate: props.start_date,
      _endDate: props.end_date,
      opened,
      hidden: !opened,
      direction: props.direction,
      _listenForPropChanges: true
    }

    const separators = props.mask.match(/[^mdy]/g)
    this.maskList = props.mask.split(/[^mdy]/).reduce((acc, cur) => {
      acc.push(cur)
      if (separators.length > 0) {
        acc.push(separators.shift())
      }
      return acc
    }, [])

    if (props.end_date && !props.range) {
      console.log(
        `The DatePicker got a "end_date". You have to set range={true} as well!.`
      )
    }

    this._wrapperRef = React.createRef()
  }

  setOutsideClickHandler = () => {
    if (!this.handleClickOutside && typeof document !== 'undefined') {
      this.handleClickOutside = event => {
        let targetElement = event.target
        do {
          if (targetElement == this._wrapperRef.current) {
            return // stop here
          }
          targetElement = targetElement.parentNode
        } while (targetElement)

        this.hidePicker()
      }
      document.addEventListener('mousedown', this.handleClickOutside)
    }
  }

  componentWillUnmount() {
    clearTimeout(this._hideTimeout)
    if (this.handleClickOutside && typeof document !== 'undefined') {
      document.removeEventListener('mousedown', this.handleClickOutside)
    }
  }

  onInputChange = ({ startDate, endDate }) => {
    // make sure endDate is same as startDate if we don't use range
    if (!this.props.range) {
      endDate = startDate
    }
    if (startDate)
      this.setState(
        {
          startDate,
          _listenForPropChanges: false
        },
        this.callOnChangeHandler
      )
    if (endDate)
      this.setState(
        {
          endDate,
          _listenForPropChanges: false
        },
        () => !startDate && this.callOnChangeHandler()
      )
  }

  onPickerChange = ({ startDate, endDate }) => {
    this.setState(
      {
        startDate,
        endDate,
        _listenForPropChanges: false
      },
      this.callOnChangeHandler
    )
    if (!this.state.show_submit_button || !this.state.show_cancel_button) {
      this.hidePicker()
    }
  }

  onSubmitHandler = () => {
    this.hidePicker()
    const { startDate, endDate } = this.state
    dispatchCustomElementEvent(this, 'on_submit', {
      startDate,
      endDate
    })
  }

  onCancelHandler = () => {
    this.setState(
      {
        startDate: DatePicker.convertStringToDate(this.state._startDate),
        endDate: DatePicker.convertStringToDate(this.state._endDate)
      },
      () => {
        this.hidePicker()
        const { startDate, endDate } = this.state
        dispatchCustomElementEvent(this, 'on_cancel', {
          startDate,
          endDate
        })
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
    const { startDate, endDate } = this.state
    dispatchCustomElementEvent(this, 'on_show', {
      startDate,
      endDate
    })
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
    const { startDate, endDate } = this.state
    dispatchCustomElementEvent(this, 'on_hide', {
      startDate,
      endDate
    })
  }

  togglePicker = () => {
    !this.state.opened ? this.showPicker() : this.hidePicker()
  }

  callOnChangeHandler = () => {
    const { startDate, endDate } = this.state
    dispatchCustomElementEvent(
      this,
      'on_change',
      this.props.range
        ? {
            startDate,
            endDate,
            start_date: startDate,
            end_date: endDate
          }
        : { date: startDate }
    )
  }

  render() {
    const {
      label,
      hide_navigation,
      hide_days,
      show_input,
      range,
      first_day,
      locale,
      link,
      disabled,
      status,
      status_state,
      status_animation,
      mask,
      mask_input,

      start_date: _start_date /* eslint-disable-line */,
      end_date: _end_date /* eslint-disable-line */,
      opened: _opened /* eslint-disable-line */,
      direction: _direction /* eslint-disable-line */,
      id: _id /* eslint-disable-line */,

      ...attributes
    } = this.props

    const {
      opened,
      hidden,
      show_submit_button,
      show_cancel_button
    } = this.state

    const id = this._id
    const showStatus = status && status !== 'error'

    const pickerParams = {}
    if (label) {
      pickerParams['aria-labelledby'] = id + '-label'
    }

    const inputParams = { ['aria-expanded']: opened, ...attributes }

    validateDOMAttributes(this.props, pickerParams)
    validateDOMAttributes(null, inputParams)

    if (!hidden) {
      this.setOutsideClickHandler()
    }

    return (
      <>
        {label && (
          <FormLabel
            id={id + '-label'}
            aria-hidden
            for_id={id}
            text={label}
            disabled={disabled}
          />
        )}

        <span
          className={classnames(
            'dnb-date-picker',
            opened && 'dnb-date-picker--opened',
            hidden && 'dnb-date-picker--hidden',
            show_input && 'dnb-date-picker--show-input'
            // show_submit_button && 'dnb-date-picker--show-submit-footer'

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
              disabled={disabled}
              mask={mask}
              mask_input={mask_input}
              show_input={show_input}
              range={range}
              onChange={this.onInputChange}
              onFocus={this.showPicker}
              onSubmit={this.togglePicker}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
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
              <span className="dnb-date-picker__triangle" />
              {!hidden && (
                <>
                  <DatePickerRange
                    range={range}
                    firstDayOfWeek={first_day}
                    locale={locale}
                    link={link}
                    hideNav={hide_navigation}
                    hideDays={hide_days}
                    onChange={this.onPickerChange}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                  />
                  <DatePickerFooter
                    range={range}
                    onSubmit={show_submit_button && this.onSubmitHandler}
                    onCancel={show_cancel_button && this.onCancelHandler}
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
