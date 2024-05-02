/**
 * Web DatePicker Component
 *
 */

import React, {
  HTMLProps,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import classnames from 'classnames'
import {
  warn,
  makeUniqueId,
  extendPropsWithContext,
  dispatchCustomElementEvent,
  detectOutsideClick,
  getStatusState,
  combineDescribedBy,
  validateDOMAttributes,
  DetectOutsideClickClass,
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import { skeletonDOMAttributes } from '../skeleton/SkeletonHelper'

// date-fns
import format from 'date-fns/format'

import Context, { Locale } from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import FormLabel from '../form-label/FormLabel'
import FormStatus, {
  FormStatusProps,
  FormStatusState,
  FormStatusText,
} from '../form-status/FormStatus'
import DatePickerProvider from './DatePickerProvider'
import DatePickerRange from './DatePickerRange'
import DatePickerInput from './DatePickerInput'
import DatePickerAddon from './DatePickerAddon'
import DatePickerFooter from './DatePickerFooter'
import { SpacingProps } from '../space/types'
import { InputInputElement, InputSize } from '../Input'
import { SkeletonShow } from '../Skeleton'
import { GlobalStatusConfigObject } from '../GlobalStatus'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'

type DatePickerAddonElement = string | React.ReactNode
type DatePickerShortcuts = any[] | ((...args: any[]) => any)
type DatePickerSuffix = React.ReactNode
type DatePickerDirection = 'auto' | 'top' | 'bottom'
type DatePickerAlignPicker = 'auto' | 'left' | 'right'

export type DatePickerProps = Omit<
  React.HTMLProps<HTMLElement>,
  'ref' | 'children' | 'label' | 'size' | 'onBlur' | 'onFocus'
> &
  SpacingProps & {
    id?: string
    title?: string
    /**
     * Defines the pre-filled date by either a JavaScript DateInstance or (ISO 8601) like `date="2019-05-05"`.
     */
    date?: Date | string
    /**
     * To set the pre-filled starting date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `mask_placeholder`.
     */
    start_date?: Date | string
    /**
     * To set the pre-filled ending date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `mask_placeholder`.
     */
    end_date?: Date | string
    /**
     * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `start_date`.
     */
    month?: Date | string
    /**
     * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `start_date`.
     */
    start_month?: Date | string
    /**
     * To display what month should be shown in the second calendar by default. Defaults to the `date` respective `start_date`.
     */
    end_month?: Date | string
    /**
     * To limit a date range to a minimum `start_date`. Defaults to `null`.
     */
    min_date?: Date | string
    /**
     * To limit a date range to a maximum `end_date`. Defaults to `null`.
     */
    max_date?: Date | string
    /**
     * Corrects the input date value to be the same as either `min_date` or `max_date`, when the user types in a date that is either before or after one of these. Defaults to `false`.
     */
    correct_invalid_date?: boolean
    /**
     * To define the order of the masked placeholder input fields. Defaults to `dd/mm/yyyy`
     */
    mask_order?: string
    /**
     * To display the placeholder on input. Defaults to `dd/mm/åååå`.
     */
    mask_placeholder?: string
    /**
     * Defines how the prop dates (`date`, `start_date` and `end_date`) should be parsed, e.g. `yyyy/MM/dd`. Defaults to `yyyy-MM-dd`.
     */
    date_format?: string
    /**
     * Defines how the returned date, as a string, should be formatted as. Defaults to `yyyy-MM-dd`.
     */
    return_format?: string
    /**
     * If set to `true`, the navigation will be hidden. Defaults to `false`.
     */
    hide_navigation?: boolean
    hide_navigation_buttons?: boolean
    /**
     * If set to `true`, the week days will be hidden. Defaults to `false`.
     */
    hide_days?: boolean
    /**
     * Use `true` to only show the defined month. Disables the month navigation possibility. Defaults to `false`.
     */
    only_month?: boolean
    /**
     * Use `true` to only show the last week in the current month if it needs to be shown. The result is that there will mainly be shows five (5) weeks (rows) instead of six (6). Defaults to `false`.
     */
    hide_last_week?: boolean
    /**
     * Once the date picker gets opened, there is a focus handling to ensure good accessibility. can be disabled with property. Defaults to `false`.
     */
    disable_autofocus?: boolean
    enable_keyboard_nav?: boolean
    /**
     * If the input fields with the mask should be visible. Defaults to `false`.
     */
    show_input?: boolean
    /**
     * If set to `true`, a submit button will be shown. You can change the default text by using `submit_button_text="Ok"`. Defaults to `false`. If the `range` prop is `true`, then the submit button is shown.
     */
    show_submit_button?: boolean
    /**
     * If set to `true`, a cancel button will be shown. You can change the default text by using `cancel_button_text="Avbryt"` Defaults to `false`. If the `range` prop is `true`, then the cancel button is shown.
     */
    show_cancel_button?: boolean
    /**
     * If set to `true`, a reset button will be shown. You can change the default text by using `reset_button_text="Tilbakestill"` Defaults to `false`.
     */
    show_reset_button?: boolean
    submit_button_text?: string
    cancel_button_text?: string
    reset_button_text?: string
    reset_date?: boolean
    /**
     * To define the first day of the week. Defaults to `monday`.
     */
    first_day?: string
    /**
     * @deprecated set locale with `Provider` instead.
     */
    locale?: Locale
    /**
     * If the date picker should support a range of two dates (starting and ending date). Defaults to `false`.
     */
    range?: boolean
    /**
     * Link both calendars, once to the user is navigating between months. Only meant to use if the range is set to `true`. Defaults to `false`.
     */
    link?: boolean
    /**
     * Sync input values with the calendars views. Once the input values get changed, the calendar changes its views in sync. Defaults to `true`.
     */
    sync?: boolean
    /**
     * A prepending label in sync with the date input field.
     */
    label?: React.ReactNode
    /**
     * Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`.
     */
    label_direction?: 'vertical' | 'horizontal'
    /**
     * Use `true` to make the label only readable by screen readers.
     */
    label_sr_only?: boolean
    /**
     * Gives you the possibility to use a plain/vanilla `<input />` HTML element by defining it as a string `input_element="input"`, a React element, or a render function `input_element={(internalProps) => (<Return />)}`. Can also be used in circumstances where the `react-text-mask` not should be used, e.g. in testing environments. Defaults to custom masked input.
     */
    input_element?: InputInputElement
    /**
     * Gives you the possibility to inject a React element showing up over the footer. Use it to customize `shortcuts`.
     */
    addon_element?: DatePickerAddonElement
    /**
     * Gives you the possibility to set predefined dates and date ranges so the user can select these by one click. Define either a JSON or an object with the defined shortcuts. More info is below.
     */
    shortcuts?: DatePickerShortcuts
    disabled?: boolean
    /**
     * If set to `true`, then the date-picker input field will be 100% in `width`.
     */
    stretch?: boolean
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow
    /**
     * The sizes you can choose is `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`.
     */
    size?: InputSize
    /**
     * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
     */
    status?: FormStatusText
    /**
     * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
     */
    status_state?: FormStatusState
    /**
     * Use an object to define additional FormStatus properties.
     */
    status_props?: FormStatusProps
    status_no_animation?: boolean
    /**
     * The <a href="/uilib/components/global-status/properties/#configuration-object">configuration</a> used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
     */
    globalStatus?: GlobalStatusConfigObject
    /**
     * Text describing the content of the DatePicker more than the label. You can also send in a React component, so it gets wrapped inside the DatePicker component.
     */
    suffix?: DatePickerSuffix
    /**
     * To open the date-picker by default. Defaults to `false`.
     */
    opened?: boolean
    /**
     * Provide a short Tooltip content that shows up on the picker button.
     */
    tooltip?: React.ReactNode
    tabIndex?: number
    prevent_close?: boolean
    no_animation?: boolean
    direction?: DatePickerDirection
    /**
     * Use `right` to change the calendar alignment direction. Defaults to `left`.
     */
    align_picker?: DatePickerAlignPicker
    class?: string
    className?: string
    /**
     * Will be called right before every new calendar view gets rendered. See the example above.
     */
    on_days_render?: (...args: any[]) => any
    /**
     * Will be called on a date change event. Returns an `object`. See Returned Object below.
     */
    on_change?: (...args: any[]) => any
    /**
     * Will be called on every input and date picker interaction. Returns an `object`. See Returned Object below.
     */
    on_type?: (...args: any[]) => any
    /**
     * Will be called once date-picker is visible.
     */
    on_show?: (...args: any[]) => any
    /**
     * Will be called once date-picker is hidden.
     */
    on_hide?: (...args: any[]) => any
    /**
     * Will be called once a user presses the submit button.
     */
    on_submit?: (...args: any[]) => any
    /**
     * Will be called once a user presses the cancel button.
     */
    on_cancel?: (...args: any[]) => any
    /**
     * Will be called once a user presses the reset button.
     */
    on_reset?: (...args: any[]) => any
    /**
     * Will be called once the input gets focus.
     */
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
    /**
     * Will be called once the input lose focus.
     */
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  }

const defaultProps: DatePickerProps = {
  mask_order: 'dd/mm/yyyy',
  mask_placeholder: 'dd/mm/åååå', // have to be same setup as "mask" - but can be like
  date_format: 'yyyy-MM-dd', // in v1 of date-fns we were more flexible in terms of the format
  return_format: 'yyyy-MM-dd', // used in date-fns v1
  hide_navigation: false,
  hide_navigation_buttons: false,
  hide_days: false,
  only_month: false,
  hide_last_week: false,
  disable_autofocus: false,
  enable_keyboard_nav: false,
  show_input: false,
  submit_button_text: 'Ok',
  cancel_button_text: 'Avbryt',
  reset_button_text: 'Tilbakestill',
  reset_date: true,
  first_day: 'monday',
  range: false,
  link: false,
  sync: true,
  status_state: 'error',
  opened: false,
  no_animation: false,
  direction: 'auto',
}

function DatePicker(externalProps: DatePickerProps) {
  const props = { ...defaultProps, ...externalProps }

  const [opened, setOpened] = useState<boolean>(props.opened)
  const [hidden, setHidden] = useState(!opened)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const showInput = props.show_input

  const context = useContext(Context)
  const blurDelay = 201 // some ms more than "dropdownSlideDown 200ms"
  const id = props.id || makeUniqueId()

  const innerRef = useRef<HTMLSpanElement>()
  const triangleRef = useRef<HTMLSpanElement>()
  const submitButtonRef = useRef<HTMLButtonElement>()
  const getReturnObject = useRef<(...args: any) => void>()
  const hideTimeout = useRef<NodeJS.Timeout>()
  const outsideClick = useRef<DetectOutsideClickClass>()

  const componentReference = {
    id,
    props,
    context,
    state: { opened, showInput, hidden, startDate, endDate },
    innerRef,
    triangleRef,
    submitButtonRef,
    getReturnObject: getReturnObject.current,
    hideTimeout: hideTimeout.current,
    outsideClick: outsideClick.current,
    hidePicker,
    setTrianglePosition,
    setOutsideClickHandler,
    removeOutsideClickHandler,
    onPickerChange,
    onSubmitHandler,
    onCancelHandler,
    onResetHandler,
    showPicker,
    togglePicker,
    formatSelectedDateTitle,
  }

  if (props.end_date && !props.range) {
    warn(
      `The DatePicker got a "end_date". You have to set range={true} as well!.`
    )
  }

  useEffect(() => {
    if (props.opened) {
      showPicker()
    }

    return () => {
      clearTimeout(hideTimeout.current)
      removeOutsideClickHandler()
    }
  }, [])

  function hidePicker(args) {
    if (props.prevent_close) {
      return // stop here
    }

    if (args && args.event && args.event.persist) {
      args.event.persist()
    }

    setOpened(false)

    dispatchCustomElementEvent(
      componentReference,
      'on_hide',
      getReturnObject.current(args)
    )

    hideTimeout.current = setTimeout(
      () => {
        setHidden(true)
        if (args?.focusOnHide) {
          try {
            this._submitButtonRef.current.focus({
              preventScroll: true,
            })
          } catch (e) {
            warn(e)
          }
        }
      },
      props.no_animation ? 1 : blurDelay
    ) // wait until animation is over

    removeOutsideClickHandler()
  }

  function setTrianglePosition() {
    const { show_input, align_picker } = props
    const triangleWidth = 16
    if (show_input && triangleRef.current && innerRef.current) {
      try {
        const shellWidth = innerRef.current
          .querySelector('.dnb-input__shell')
          .getBoundingClientRect().width
        const buttonWidth = innerRef.current
          .querySelector('.dnb-input__submit-button__button')
          .getBoundingClientRect().width
        if (align_picker === 'right') {
          const distance = buttonWidth / 2 - triangleWidth / 2
          triangleRef.current.style.marginRight = `${distance / 16}rem`
        } else {
          const distance = shellWidth - buttonWidth / 2 - triangleWidth / 2
          triangleRef.current.style.marginLeft = `${distance / 16}rem`
        }
      } catch (e) {
        warn(e)
      }
    }
  }

  function setOutsideClickHandler() {
    outsideClick.current = detectOutsideClick(innerRef.current, (e) => {
      hidePicker({ focusOnHide: e?.event?.key })
    })
  }

  function removeOutsideClickHandler() {
    if (outsideClick.current) {
      outsideClick.current.remove()
    }
  }

  function onPickerChange({
    hidePicker: shouldHidePicker = true,
    ...args
  }) {
    if (
      shouldHidePicker &&
      !props.show_submit_button &&
      !props.show_cancel_button
    ) {
      hidePicker(args)
    }

    setStartDate(args.startDate)
    setEndDate(args.endDate)
  }

  function onSubmitHandler(args) {
    hidePicker(args)
    dispatchCustomElementEvent(
      componentReference,
      'on_submit',
      getReturnObject.current(args)
    )
  }

  function onCancelHandler(args) {
    hidePicker(args)
    dispatchCustomElementEvent(
      componentReference,
      'on_cancel',
      getReturnObject.current(args)
    )
  }

  function onResetHandler(args) {
    hidePicker(args)
    dispatchCustomElementEvent(
      componentReference,
      'on_reset',
      getReturnObject.current(args)
    )
  }

  function showPicker(args?) {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current)
    }

    setOpened(true)
    setHidden(false)

    dispatchCustomElementEvent(
      componentReference,
      'on_show',
      getReturnObject.current(args)
    )

    setTrianglePosition()
    setOutsideClickHandler()
  }

  function togglePicker(args) {
    !opened
      ? showPicker((args && args.event) || args)
      : hidePicker((args && args.event) || args)
  }

  function formatSelectedDateTitle() {
    const { range } = props

    const { selected_date, start, end } =
      context.getTranslation(props).DatePicker

    let currentDate = startDate ? format(startDate, 'PPPP') : null

    if (range && startDate && endDate) {
      currentDate = `${start} ${currentDate} - ${end} ${format(
        endDate,
        'PPPP'
      )}`
    }

    return currentDate ? selected_date.replace(/%s/, currentDate) : ''
  }

  // use only the props from context, who are available here anyway
  const extendedProps = extendPropsWithContext(
    props,
    defaultProps,
    { skeleton: context?.skeleton },
    context.getTranslation(props).DatePicker,
    pickFormElementProps(context?.FormRow), // Deprecated – can be removed in v11
    pickFormElementProps(context?.formElement),
    context.DatePicker
  )

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
    stretch,
    skeleton,
    size,
    status,
    status_state,
    status_props,
    status_no_animation,
    globalStatus,
    suffix,
    mask_order,
    mask_placeholder,
    align_picker,
    submit_button_text,
    cancel_button_text,
    reset_button_text,

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
    id: __id, // eslint-disable-line
    className,
    class: _className,
    show_submit_button, // eslint-disable-line
    show_cancel_button, // eslint-disable-line
    show_reset_button, // eslint-disable-line
    tooltip,

    ...attributes
  } = extendedProps

  let { hide_navigation, hide_days } = props

  // never show days and navigation
  if (only_month) {
    hide_days = true
    hide_navigation = hide_navigation_buttons ? false : true
  }

  const showStatus = getStatusState(status)

  const pickerParams = {} as HTMLProps<HTMLSpanElement>

  if (showStatus || suffix) {
    pickerParams['aria-describedby'] = combineDescribedBy(
      pickerParams,
      showStatus ? id + '-status' : null,
      suffix ? id + '-suffix' : null
    )
  }

  const submitParams = {
    ['aria-expanded']: opened,
    ref: submitButtonRef,
    tabIndex: extendedProps.tabIndex,
    tooltip,
  }

  const selectedDateTitle = formatSelectedDateTitle()

  const mainParams = {
    className: classnames(
      'dnb-date-picker',
      status && `dnb-date-picker__status--${status_state}`,
      label_direction && `dnb-date-picker--${label_direction}`,
      opened && 'dnb-date-picker--opened',
      hidden && 'dnb-date-picker--hidden',
      showInput && 'dnb-date-picker--show-input',
      (range ||
        show_submit_button ||
        show_cancel_button ||
        show_reset_button) &&
        'dnb-date-picker--show-footer',
      align_picker && `dnb-date-picker--${align_picker}`,
      stretch && `dnb-date-picker--stretch`,
      'dnb-form-component',
      size && `dnb-date-picker--${size}`,
      createSpacingClasses(props),
      _className,
      className
    ),
    lang: context.locale,
  } as HTMLProps<HTMLSpanElement>

  skeletonDOMAttributes(pickerParams, skeleton, context)

  validateDOMAttributes(props, attributes)
  validateDOMAttributes(null, submitParams)
  validateDOMAttributes(null, pickerParams)

  return (
    <DatePickerProvider
      {...props}
      attributes={attributes}
      setReturnObject={(fn) => (getReturnObject.current = fn)}
      enhanceWithMethods={{
        hidePicker,
      }}
    >
      <span {...mainParams}>
        {label && (
          <FormLabel
            id={id + '-label'}
            forId={id}
            text={label}
            label_direction={label_direction}
            srOnly={label_sr_only}
            disabled={disabled}
            skeleton={skeleton}
          />
        )}

        <span
          className="dnb-date-picker__inner"
          ref={innerRef}
          {...pickerParams}
        >
          <AlignmentHelper />

          <FormStatus
            show={showStatus}
            id={id + '-form-status'}
            globalStatus={globalStatus}
            label={String(label)}
            text_id={id + '-status'} // used for "aria-describedby"
            width_selector={id + '-shell'}
            text={status}
            state={status_state}
            no_animation={status_no_animation}
            skeleton={skeleton}
            {...status_props}
          />

          <span className="dnb-date-picker__row">
            <span className="dnb-date-picker__shell" id={`${id}-shell`}>
              <DatePickerInput
                id={id}
                title={title}
                disabled={disabled}
                stretch={stretch}
                skeleton={skeleton}
                maskOrder={mask_order}
                maskPlaceholder={mask_placeholder}
                isRange={range}
                showInput={showInput}
                selectedDateTitle={selectedDateTitle}
                input_element={input_element}
                opened={opened}
                hidden={hidden}
                size={size}
                status={status ? 'error' : null}
                status_state={status_state}
                lang={context.locale}
                {...attributes}
                submitAttributes={submitParams}
                onSubmit={togglePicker}
                {...status_props}
              />
              <span className="dnb-date-picker__container">
                <span
                  className="dnb-date-picker__triangle"
                  ref={triangleRef}
                />
                {!hidden && (
                  <>
                    <DatePickerRange
                      id={id}
                      firstDayOfWeek={first_day}
                      resetDate={reset_date}
                      isRange={range}
                      isLink={link}
                      isSync={sync}
                      hideDays={hide_days}
                      hideNav={hide_navigation}
                      views={
                        hide_navigation_buttons
                          ? [{ nextBtn: false, prevBtn: false }]
                          : null
                      }
                      onlyMonth={only_month}
                      hideNextMonthWeek={hide_last_week}
                      noAutofocus={disable_autofocus}
                      onChange={onPickerChange}
                      locale={context.locale}
                    />
                    {(addon_element || shortcuts) && (
                      <DatePickerAddon
                        {...props}
                        renderElement={addon_element}
                        shortcuts={shortcuts}
                      />
                    )}
                    <DatePickerFooter
                      isRange={range}
                      onSubmit={onSubmitHandler}
                      onCancel={onCancelHandler}
                      onReset={onResetHandler}
                      submitButtonText={submit_button_text}
                      cancelButtonText={cancel_button_text}
                      resetButtonText={reset_button_text}
                    />
                  </>
                )}
              </span>
            </span>
            {suffix && (
              <Suffix
                className="dnb-date-picker__suffix"
                id={id + '-suffix'} // used for "aria-describedby"
                context={props}
              >
                {suffix}
              </Suffix>
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

export default DatePicker

DatePicker._supportsSpacingProps = true
