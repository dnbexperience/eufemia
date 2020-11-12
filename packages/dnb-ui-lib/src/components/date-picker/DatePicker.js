/**
 * Web DatePicker Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  warn,
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
  registerElement,
  dispatchCustomElementEvent,
  detectOutsideClick,
  validateDOMAttributes
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import { skeletonDOMAttributes } from '../skeleton/SkeletonHelper'

// date-fns
import format from 'date-fns/format'
import nbLocale from 'date-fns/locale/nb'
import enLocale from 'date-fns/locale/en-GB'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import DatePickerProvider from './DatePickerProvider'
import DatePickerRange from './DatePickerRange'
import DatePickerInput from './DatePickerInput'
import DatePickerAddon from './DatePickerAddon'
import DatePickerFooter from './DatePickerFooter'

export default class DatePicker extends React.PureComponent {
  static tagName = 'dnb-date-picker'
  static contextType = Context

  static propTypes = {
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
    correct_invalid_date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    mask_order: PropTypes.string,
    mask_placeholder: PropTypes.string,
    date_format: PropTypes.string,
    return_format: PropTypes.string,
    hide_navigation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    hide_navigation_buttons: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    hide_days: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    only_month: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    hide_last_week: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    disable_autofocus: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    enable_keyboard_nav: PropTypes.oneOfType([
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
    reset_button_text: PropTypes.string,
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
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),
    status_state: PropTypes.string,
    status_animation: PropTypes.string,
    global_status_id: PropTypes.string,
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),
    opened: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    prevent_close: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    direction: PropTypes.oneOf(['auto', 'top', 'bottom']),
    align_picker: PropTypes.oneOf(['auto', 'left', 'right']),
    class: PropTypes.string,
    className: PropTypes.string,

    custom_element: PropTypes.object,
    custom_method: PropTypes.func,
    on_days_render: PropTypes.func,
    on_change: PropTypes.func,
    on_type: PropTypes.func,
    on_show: PropTypes.func,
    on_hide: PropTypes.func,
    on_submit: PropTypes.func,
    on_cancel: PropTypes.func,
    on_reset: PropTypes.func
  }

  static defaultProps = {
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
    enable_keyboard_nav: false,
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
    correct_invalid_date: null,
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
    skeleton: null,
    status: null,
    status_state: 'error',
    status_animation: null,
    global_status_id: null,
    suffix: null,
    opened: false,
    prevent_close: null,
    no_animation: false,
    direction: 'auto',
    align_picker: null,
    class: null,
    className: null,

    custom_element: null,
    custom_method: null,

    on_days_render: null,
    on_change: null,
    on_type: null,
    on_show: null,
    on_hide: null,
    on_submit: null,
    on_cancel: null,
    on_reset: null
  }

  static blurDelay = 201 // some ms more than "dropdownSlideDown 200ms"

  static enableWebComponent() {
    registerElement(
      DatePicker.tagName,
      DatePicker,
      DatePicker.defaultProps
    )
  }

  constructor(props) {
    super(props)

    this._id = props.id || makeUniqueId() // cause we need an id anyway

    const opened = isTrue(props.opened)
    this.state = {
      showInput: isTrue(props.show_input),
      opened,
      hidden: !opened,
      direction: props.direction,
      _listenForPropChanges: true
    }

    if (props.end_date && !isTrue(props.range)) {
      warn(
        `The DatePicker got a "end_date". You have to set range={true} as well!.`
      )
    }

    this._innerRef = React.createRef()
    this._triangleRef = React.createRef()
    this._submitButtonRef = React.createRef()
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
          this._triangleRef.current.style.marginRight = `${
            distance / 16
          }rem`
        } else {
          const distance = shellWidth - buttonWidth / 2 - 8
          this._triangleRef.current.style.marginLeft = `${
            distance / 16
          }rem`
        }
      } catch (e) {
        warn(e)
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

  onPickerChange = ({ hidePicker = true, ...args }) => {
    if (
      hidePicker &&
      !isTrue(this.props.show_submit_button) &&
      !isTrue(this.props.show_cancel_button)
    ) {
      this.hidePicker(args)
    }
  }

  onSubmitHandler = (args) => {
    this.hidePicker(args)
    dispatchCustomElementEvent(
      this,
      'on_submit',
      this.getReturnObject(args)
    )
  }

  onCancelHandler = (args) => {
    this.hidePicker(args)
    dispatchCustomElementEvent(
      this,
      'on_cancel',
      this.getReturnObject(args)
    )
  }

  onResetHandler = (args) => {
    dispatchCustomElementEvent(
      this,
      'on_reset',
      this.getReturnObject(args)
    )
  }

  componentDidMount() {
    if (isTrue(this.props.opened)) {
      this.showPicker()
    }
  }

  showPicker = (args) => {
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

  hidePicker = (args) => {
    if (isTrue(this.props.prevent_close)) {
      return // stop here
    }
    if (args.event && args.event.persist) {
      args.event.persist()
    }
    this.setState(
      {
        opened: false,
        _listenForPropChanges: false
      },
      () =>
        dispatchCustomElementEvent(
          this,
          'on_hide',
          this.getReturnObject(args)
        )
    )

    this._hideTimeout = setTimeout(
      () => {
        this.setState(
          {
            hidden: true,
            _listenForPropChanges: false
          },
          () => {
            try {
              this._submitButtonRef.current.focus({ preventScroll: true })
            } catch (e) {
              warn(e)
            }
          }
        )
      },
      isTrue(this.props.no_animation) ? 1 : DatePicker.blurDelay
    ) // wait until animation is over

    this.removeOutsideClickHandler()
  }

  togglePicker = (args) => {
    !this.state.opened
      ? this.showPicker((args && args.event) || args)
      : this.hidePicker((args && args.event) || args)
  }

  formatSelectedDateTitle() {
    const { range } = this.props
    const { startDate, endDate } = this.state
    const {
      selected_date,
      start,
      end
    } = this.context.translation.DatePicker

    let currentDate = startDate ? format(startDate, 'PPPP') : null

    if (isTrue(range) && startDate && endDate) {
      currentDate = `${start} ${currentDate} - ${end} ${format(
        endDate,
        'PPPP'
      )}`
    }

    return currentDate ? selected_date.replace(/%s/, currentDate) : ''
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      DatePicker.defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.formRow,
      this.context.translation.DatePicker
    )

    if (props.locale !== enLocale && /en-/.test(this.context.locale)) {
      props.locale = enLocale
    }

    const {
      label,
      title,
      label_direction,
      label_sr_only,
      only_month,
      hide_last_week,
      disable_autofocus,
      enable_keyboard_nav, // eslint-disable-line
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
      skeleton,
      status,
      status_state,
      status_animation,
      global_status_id,
      suffix,
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
      correct_invalid_date: _correct_invalid_date, // eslint-disable-line
      opened: _opened, // eslint-disable-line
      direction: _direction, // eslint-disable-line
      id: _id, // eslint-disable-line
      className,
      class: _className,
      show_submit_button, // eslint-disable-line
      show_cancel_button, // eslint-disable-line
      show_reset_button, // eslint-disable-line

      ...attributes
    } = props

    let { hide_navigation, hide_days } = this.props

    // never show days and navigation
    if (isTrue(only_month)) {
      hide_days = true
      hide_navigation = isTrue(hide_navigation_buttons) ? false : true
    }

    const { opened, hidden, showInput } = this.state

    const id = this._id
    const showStatus = status && status !== 'error'

    const pickerParams = {}
    if (showStatus || suffix) {
      pickerParams['aria-describedby'] = [
        pickerParams['aria-describedby'],
        showStatus ? id + '-status' : null,
        suffix ? id + '-suffix' : null
      ]
        .filter(Boolean)
        .join(' ')
    }

    const submitParams = {
      ['aria-expanded']: opened,
      ref: this._submitButtonRef
    }
    const selectedDateTitle = this.formatSelectedDateTitle()

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
        createSpacingClasses(props),
        _className,
        className
      )
    }

    if (locale?.code) {
      mainParams.lang = locale.code
    }

    skeletonDOMAttributes(pickerParams, skeleton, this.context)

    validateDOMAttributes(this.props, attributes)
    validateDOMAttributes(null, submitParams)
    validateDOMAttributes(null, pickerParams)

    return (
      <DatePickerProvider
        {...this.props}
        attributes={attributes}
        setReturnObject={(fn) => (this.getReturnObject = fn)}
      >
        <span {...mainParams}>
          {label && (
            <FormLabel
              id={id + '-label'}
              for_id={id}
              text={label}
              label_direction={label_direction}
              sr_only={label_sr_only}
              disabled={disabled}
              skeleton={skeleton}
            />
          )}

          <span
            className="dnb-date-picker__inner"
            ref={this._innerRef}
            {...pickerParams}
          >
            <AlignmentHelper />
            {showStatus && (
              <FormStatus
                id={id + '-form-status'}
                global_status_id={global_status_id}
                label={label}
                text_id={id + '-status'} // used for "aria-describedby"
                width_selector={id + '-input'}
                text={status}
                status={status_state}
                animation={status_animation}
                skeleton={skeleton}
              />
            )}
            <span className="dnb-date-picker__row">
              <span className="dnb-date-picker__shell">
                <DatePickerInput
                  id={id}
                  title={title}
                  disabled={isTrue(disabled)}
                  skeleton={isTrue(skeleton)}
                  maskOrder={mask_order}
                  maskPlaceholder={mask_placeholder}
                  isRange={isTrue(range)}
                  showInput={showInput}
                  selectedDateTitle={selectedDateTitle}
                  input_element={input_element}
                  opened={opened}
                  hidden={hidden}
                  status={status ? 'error' : null}
                  status_state={status_state}
                  locale={locale}
                  {...attributes}
                  submitAttributes={submitParams}
                  onFocus={this.showPicker}
                  onSubmit={this.togglePicker}
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
                        firstDayOfWeek={first_day}
                        locale={locale}
                        resetDate={isTrue(reset_date)}
                        isRange={isTrue(range)}
                        isLink={isTrue(link)}
                        isSync={isTrue(sync)}
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
                      />
                      {(addon_element || shortcuts) && (
                        <DatePickerAddon
                          {...props}
                          renderElement={addon_element}
                          shortcuts={shortcuts}
                        />
                      )}
                      <DatePickerFooter
                        isRange={isTrue(range)}
                        onSubmit={this.onSubmitHandler}
                        onCancel={this.onCancelHandler}
                        onReset={this.onResetHandler}
                      />
                    </>
                  )}
                </span>
              </span>
              {suffix && (
                <span
                  className="dnb-date-picker__suffix"
                  id={id + '-suffix'} // used for "aria-describedby"
                >
                  <Suffix {...props}>{suffix}</Suffix>
                </span>
              )}
            </span>
          </span>

          <p className="dnb-sr-only" aria-live="assertive">
            {selectedDateTitle}
          </p>
        </span>
      </DatePickerProvider>
    )
  }
}
