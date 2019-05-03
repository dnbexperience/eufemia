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
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import DatePickerRange from './DatePickerRange'
import DatePickerInput from './DatePickerInput'
import DatePickerFooter from './DatePickerFooter'

const renderProps = {
  on_change: null
}

export const propTypes = {
  id: PropTypes.string,
  mask: PropTypes.string,
  show_input: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
  on_change: PropTypes.func
}

export const defaultProps = {
  id: null,
  mask: 'dd/mm/yyyy',
  show_input: false,
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

  constructor(props) {
    super(props)

    this._id =
      props.id || `dnb-date-picker-${Math.round(Math.random() * 999)}` // cause we need an id anyway

    const opened = DatePicker.parseOpened(props.opened)
    this.state = {
      startDate: null,
      endDate: null,
      opened,
      hidden: !opened,
      direction: props.direction
    }

    const separators = props.mask.match(/[^mdy]/g)
    this.maskList = props.mask.split(/[^mdy]/).reduce((acc, cur) => {
      acc.push(cur)
      if (separators.length > 0) {
        acc.push(separators.shift())
      }
      return acc
    }, [])

    // this._refInput = React.createRef()
  }

  // componentDidMount() {
  //   if (this.state.opened && this.state.hidden) {
  //     this.setFocus()
  //   }
  // }
  // setFocus = () => {
  //   if (this._refInput.current && !this.props.disabled) {
  //     this._refInput.current.focus()
  //   }
  // }

  onInputChange = ({ startDate, endDate }) => {
    if (startDate)
      this.setState(
        {
          startDate
        },
        this.callOnChangeHandler
      )
    if (endDate)
      this.setState(
        {
          endDate
        },
        this.callOnChangeHandler
      )
  }

  onPickerChange = ({ startDate, endDate }) => {
    this.setState(
      {
        startDate,
        endDate
      },
      this.callOnChangeHandler
    )
  }

  componentWillUnmount() {
    clearTimeout(this._hideTimeout)
  }

  showPicker = () => {
    this.setState({
      opened: true
    })

    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout)
    }
    this.setState({
      hidden: false,
      _listenForPropChanges: false
    })
    dispatchCustomElementEvent(this, 'on_show', {})
  }

  hidePicker = () => {
    this.setState({
      opened: false
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
    dispatchCustomElementEvent(this, 'on_hide')
  }

  togglePicker = () => {
    !this.state.opened ? this.showPicker() : this.hidePicker()
  }

  callOnChangeHandler = () => {
    const { startDay, endDay } = this.state
    dispatchCustomElementEvent(this, 'on_change', { startDay, endDay })
  }

  render() {
    const {
      label,
      show_input,
      range,
      link,
      disabled,
      status,
      status_state,
      status_animation,

      start_date: _start_date /* eslint-disable-line */,
      end_date: _end_date /* eslint-disable-line */,
      // on_change: on_change /* eslint-disable-line */,
      mask: _mask /* eslint-disable-line */,
      opened: _opened /* eslint-disable-line */,
      direction: _direction /* eslint-disable-line */,
      id: _id /* eslint-disable-line */,

      ...attributes
    } = this.props

    const { opened, hidden } = this.state

    const id = this._id
    const showStatus = status && status !== 'error'

    const pickerParams = {}
    if (label) {
      pickerParams['aria-labelledby'] = id + '-label'
    }

    const inputParams = { ['aria-expanded']: opened, ...attributes }

    validateDOMAttributes(this.props, pickerParams)
    validateDOMAttributes(null, inputParams)

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

            // TODO: make status work on #date-picker
            // showStatus && 'dnb-date-picker__form-status',
            // status && `dnb-date-picker__status--${status_state}`,
          )}
          {...pickerParams}
        >
          <span className="dnb-date-picker__shell">
            <DatePickerInput
              disabled={disabled}
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
                    link={link}
                    onChange={this.onPickerChange}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                  />
                  <DatePickerFooter
                    range={range}
                    onCancel={this.hidePicker}
                    onSubmit={this.hidePicker}
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
