/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import AlignmentHelper from '../../shared/AlignmentHelper'
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
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import nbLocale from 'date-fns/locale/nb'

import Context from '../../shared/Context'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import {
  convertStringToDate,
  correctV1Format,
  isDisabled
} from './DatePickerCalc'
import DatePickerRange from './DatePickerRange'
import DatePickerInput from './DatePickerInput'
import DatePickerAddon from './DatePickerAddon'
import DatePickerFooter from './DatePickerFooter'

const renderProps = {
  on_change: null,
  on_show: null,
  on_hide: null,
  on_submit: null,
  on_cancel: null,
  on_reset: null
}

const propTypes = {
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
  hide_last_week: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
  show_reset_button: PropTypes.oneOfType([
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
  label_sr_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  input_element: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  addon_element: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  shortcuts: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
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
  on_cancel: PropTypes.func,
  on_reset: PropTypes.func
}

const defaultProps = {
  id: null,
  title: null,
  date: undefined,
  start_date: undefined,
  end_date: undefined,
  month: undefined,
  start_month: undefined,
  end_month: undefined,
  mask_order: 'dd/mm/yyyy',
  mask_placeholder: 'dd/mm/åååå', // have to be same setup as "mask" - but can be like: dd/mm/åååå
  date_format: 'yyyy-MM-dd', // in v1 of date-fns we where more flexible in terms of the format
  return_format: 'yyyy-MM-dd', // used in date-fns v1: YYYY-MM-DD
  hide_navigation: false,
  hide_navigation_buttons: false,
  hide_days: false,
  only_month: false,
  hide_last_week: false,
  disable_autofocus: false,
  show_input: false,
  show_submit_button: null,
  show_cancel_button: null,
  show_reset_button: null,
  submit_button_text: 'Ok',
  cancel_button_text: 'Avbryt',
  reset_button_text: 'Tilbakestill',
  reset_date: true,
  first_day: 'monday',
  min_date: undefined,
  max_date: undefined,
  locale: nbLocale,
  range: false,
  link: false,
  sync: true,
  label: null,
  label_direction: null,
  label_sr_only: null,
  input_element: null,
  addon_element: null,
  shortcuts: null,
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
      let startDate = undefined
      const date_format = props.date_format

      if (typeof props.date !== 'undefined') {
        startDate = props.date
      }
      if (typeof props.start_date !== 'undefined') {
        startDate = props.start_date
      }
      if (
        typeof startDate !== 'undefined' &&
        startDate !== state.startDate
      ) {
        state.startDate =
          convertStringToDate(startDate, {
            date_format
          }) || undefined

        if (!isTrue(props.range)) {
          state.endDate = state.startDate
        }
      }
      if (typeof props.end_date !== 'undefined' && isTrue(props.range)) {
        state.endDate =
          convertStringToDate(props.end_date, {
            date_format
          }) || undefined
      }
      if (typeof props.month !== 'undefined') {
        state.month = convertStringToDate(props.month, {
          date_format
        })
      }
      if (typeof props.start_month !== 'undefined') {
        state.startMonth = convertStringToDate(props.start_month, {
          date_format
        })
      }
      if (typeof props.end_month !== 'undefined') {
        state.endMonth = convertStringToDate(props.end_month, {
          date_format
        })
      }
      if (typeof props.min_date !== 'undefined') {
        state.minDate = convertStringToDate(props.min_date, {
          date_format
        })
      }
      if (typeof props.max_date !== 'undefined') {
        state.maxDate = convertStringToDate(props.max_date, {
          date_format
        })
      }
    }
    state._listenForPropChanges = true
    return state
  }

  constructor(props) {
    super(props)

    this._id = props.id || makeUniqueId() // cause we need an id anyway

    const opened = DatePicker.parseOpened(props.opened)
    this.state = {
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
      console.warn(
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
        console.warn(e)
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

  onInputChange = args => {
    let { startDate, endDate } = args
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
    // While the user starts changing the date range
    // we reset the endDate also in the "DatePickerInput" end date
    if (endDate === null) {
      endDate = undefined
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
      hidePicker &&
      !isTrue(this.props.show_submit_button) &&
      !isTrue(this.props.show_cancel_button)
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
    if (args && args.event) {
      args.event.persist()
    }
    this.setState(
      {
        startDate: this.state._startDate
          ? convertStringToDate(this.state._startDate, {
              date_format
            })
          : null,
        endDate: this.state._endDate
          ? convertStringToDate(this.state._endDate, {
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

  onResetHandler = args => {
    if (args && args.event) {
      args.event.persist()
    }
    this.setState(
      {
        date: undefined,
        startDate: undefined,
        endDate: undefined,
        _listenForPropChanges: false
      },
      () => {
        this.callOnChangeHandler(args)
        dispatchCustomElementEvent(
          this,
          'on_reset',
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
    const return_format = correctV1Format(this.props.return_format)

    const ret = isTrue(this.props.range)
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

    if (this.props.min_date || this.props.max_date) {
      ret.is_valid_start_date = !isDisabled(
        startDate,
        this.state.minDate,
        this.state.maxDate
      )
      ret.is_valid_end_date = !isDisabled(
        endDate,
        this.state.minDate,
        this.state.maxDate
      )
    }

    return ret
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      defaultProps,
      this.context.formRow,
      this.context.translation.DatePicker
    )

    const {
      label,
      title,
      label_direction,
      label_sr_only,
      only_month,
      hide_last_week,
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
      addon_element,
      shortcuts,
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
      show_submit_button, // eslint-disable-line
      show_cancel_button, // eslint-disable-line
      show_reset_button, // eslint-disable-line

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
      showInput
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
        (isTrue(range) ||
          isTrue(show_submit_button) ||
          isTrue(show_cancel_button) ||
          isTrue(show_reset_button)) &&
          'dnb-date-picker--show-footer',
        align_picker && `dnb-date-picker--${align_picker}`,
        'dnb-form-component',
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
        {label && (
          <FormLabel
            id={id + '-label'}
            for_id={id}
            text={label}
            direction={label_direction}
            sr_only={label_sr_only}
            disabled={isTrue(disabled)}
          />
        )}

        <AlignmentHelper className="dnb-date-picker__helper" />

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
                    hideNextMonthWeek={isTrue(hide_last_week)}
                    noAutofocus={isTrue(disable_autofocus)}
                    onChange={this.onPickerChange}
                    month={month}
                    startMonth={startMonth}
                    endMonth={endMonth}
                    startDate={startDate}
                    endDate={endDate}
                  />
                  {(addon_element || shortcuts) && (
                    <DatePickerAddon
                      {...props}
                      startDate={startDate}
                      endDate={endDate}
                      onChange={this.onPickerChange}
                      renderElement={addon_element}
                      shortcuts={shortcuts}
                    />
                  )}
                  <DatePickerFooter
                    {...props}
                    range={isTrue(range)}
                    onSubmit={
                      (isTrue(range) || isTrue(show_submit_button)) &&
                      this.onSubmitHandler
                    }
                    onCancel={
                      (isTrue(range) || isTrue(show_cancel_button)) &&
                      this.onCancelHandler
                    }
                    onReset={
                      isTrue(show_reset_button) && this.onResetHandler
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
