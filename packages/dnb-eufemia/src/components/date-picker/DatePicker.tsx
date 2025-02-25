/**
 * Web DatePicker Component
 *
 */

import React, {
  HTMLProps,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import classnames from 'classnames'
import {
  warn,
  makeUniqueId,
  extendPropsWithContext,
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
import DatePickerProvider, {
  DatePickerChangeEvent,
  type ReturnObject,
} from './DatePickerProvider'
import DatePickerRange from './DatePickerRange'
import DatePickerInput from './DatePickerInput'
import DatePickerAddon, { DatePickerAddonProps } from './DatePickerAddon'
import DatePickerFooter from './DatePickerFooter'
import { SpacingProps } from '../space/types'
import { InputInputElement, InputSize } from '../Input'
import { SkeletonShow } from '../Skeleton'
import { GlobalStatusConfigObject } from '../GlobalStatus'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import { CalendarDay, DatePickerCalendarProps } from './DatePickerCalendar'
import { DatePickerContextValues, DateType } from './DatePickerContext'
import { DatePickerDates } from './hooks/useDates'
import { useTranslation } from '../../shared'
import { convertSnakeCaseProps } from '../../shared/helpers/withSnakeCaseProps'
import DatePickerPortal from './DatePickerPortal'

export type DatePickerEventAttributes = {
  day?: string
  year?: string
  start?: string
  end?: string
} & Record<string, unknown>

// Takes the return object from DatePickerProvider and extends it with the event
export type DatePickerEvent<T> = ReturnObject<T>

export type DisplayPickerEvent = (
  | React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLElement>
  | Partial<MouseEvent>
  | Partial<KeyboardEvent>
) &
  DatePickerDates & {
    focusOnHide?: boolean | string
    event?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  }

export type DatePickerProps = {
  /**
   * Defines the pre-filled date by either a JavaScript DateInstance or (ISO 8601) like `date="2019-05-05"`.
   */
  date?: DateType
  /**
   * To set the pre-filled starting date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `maskPlaceholder`.
   */
  startDate?: DateType
  /**
   * To set the pre-filled ending date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `maskPlaceholder`.
   */
  endDate?: DateType
  /**
   * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.
   */
  month?: DateType
  /**
   * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.
   */
  startMonth?: DateType
  /**
   * To display what month should be shown in the second calendar by default. Defaults to the `date` respective `startDate`.
   */
  endMonth?: DateType
  /**
   * To limit a date range to a minimum `startDate`. Defaults to `null`.
   */
  minDate?: DateType
  /**
   * To limit a date range to a maximum `endDate`. Defaults to `null`.
   */
  maxDate?: DateType
  /**
   * Corrects the input date value to be the same as either `minDate` or `maxDate`, when the user types in a date that is either before or after one of these. Defaults to `false`.
   */
  correctInvalidDate?: boolean
  /**
   * To define the order of the masked placeholder input fields. Defaults to `dd/mm/yyyy`
   */
  maskOrder?: string
  /**
   * To display the placeholder on input. Defaults to `dd/mm/åååå`.
   */
  maskPlaceholder?: string
  /**
   * Defines how the prop dates (`date`, `startDate` and `endDate`) should be parsed, e.g. `yyyy/MM/dd`. Defaults to `yyyy-MM-dd`.
   */
  dateFormat?: string
  /**
   * Defines how the returned date, as a string, should be formatted as. Defaults to `yyyy-MM-dd`.
   */
  returnFormat?: string
  /**
   * If set to `true`, the navigation will be hidden. Defaults to `false`.
   */
  hideNavigation?: boolean
  hideNavigationButtons?: boolean
  /**
   * If set to `true`, the week days will be hidden. Defaults to `false`.
   */
  hideDays?: boolean
  /**
   * Use `true` to only show the defined month. Disables the month navigation possibility. Defaults to `false`.
   */
  onlyMonth?: boolean
  /**
   * Use `true` to only show the last week in the current month if it needs to be shown. The result is that there will mainly be shows five (5) weeks (rows) instead of six (6). Defaults to `false`.
   */
  hideLastWeek?: boolean
  /**
   * Once the date picker gets opened, there is a focus handling to ensure good accessibility. can be disabled with property. Defaults to `false`.
   */
  disableAutofocus?: boolean
  enableKeyboardNav?: boolean
  /**
   * If the input fields with the mask should be visible. Defaults to `false`.
   */
  showInput?: boolean
  /**
   * If set to `true`, a submit button will be shown. You can change the default text by using `submitButtonText="Ok"`. Defaults to `false`. If the `range` prop is `true`, then the submit button is shown.
   */
  showSubmitButton?: boolean
  /**
   * If set to `true`, a cancel button will be shown. You can change the default text by using `cancelButtonText="Avbryt"` Defaults to `false`. If the `range` prop is `true`, then the cancel button is shown.
   */
  showCancelButton?: boolean
  /**
   * If set to `true`, a reset button will be shown. You can change the default text by using `resetButtonText="Tilbakestill"` Defaults to `false`.
   */
  showResetButton?: boolean
  submitButtonText?: string
  cancelButtonText?: string
  resetButtonText?: string
  resetDate?: boolean
  /**
   * To define the first day of the week. Defaults to `monday`.
   */
  firstDay?:
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday'
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
   * Use `labelDirection="vertical"` to change the label layout direction. Defaults to `horizontal`.
   */
  labelDirection?: 'vertical' | 'horizontal'
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean
  /**
   * Gives you the possibility to use a plain/vanilla `<input />` HTML element by defining it as a string `inputElement="input"`, a React element, or a render function `inputElement={(internalProps) => (<Return />)}`. Can also be used in circumstances where the `react-text-mask` not should be used, e.g. in testing environments. Defaults to custom masked input.
   */
  inputElement?: InputInputElement
  /**
   * Gives you the possibility to inject a React element showing up over the footer. Use it to customize `shortcuts`.
   */
  addonElement?: React.ReactNode
  /**
   * Gives you the possibility to set predefined dates and date ranges so the user can select these by one click. Define either a JSON or an object with the defined shortcuts. More info is below.
   */
  shortcuts?: DatePickerAddonProps['shortcuts']
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
  statusState?: FormStatusState
  /**
   * Use an object to define additional FormStatus properties.
   */
  statusProps?: FormStatusProps
  statusNoAnimation?: boolean
  /**
   * The <a href="/uilib/components/global-status/properties/#configuration-object">configuration</a> used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  globalStatus?: GlobalStatusConfigObject
  /**
   * Text describing the content of the DatePicker more than the label. You can also send in a React component, so it gets wrapped inside the DatePicker component.
   */
  suffix?: React.ReactNode
  /**
   * To open the date-picker by default. Defaults to `false`.
   */
  opened?: boolean
  /**
   * Provide a short Tooltip content that shows up on the picker button.
   */
  tooltip?: React.ReactNode
  tabIndex?: number
  preventClose?: boolean
  noAnimation?: boolean
  direction?: 'auto' | 'top' | 'bottom'
  /**
   * Use `right` to change the calendar alignment direction. Defaults to `left`.
   */
  alignPicker?: 'auto' | 'left' | 'right'
  /**
   * If set to `true`, the calendar will not be rendered inside a react portal. Defaults to `false`.
   */
  skipPortal?: boolean
  className?: string
  /**
   * Will be called right before every new calendar view gets rendered. See the example above.
   */
  onDaysRender?: (
    days: Array<CalendarDay>,
    nr?: DatePickerCalendarProps['nr']
  ) => void
  /**
   * Will be called on a date change event. Returns an `object`. See Returned Object below.
   */
  onChange?: (
    event: DatePickerEvent<React.ChangeEvent<HTMLInputElement>>
  ) => void
  /**
   * Will be called on every input and date picker interaction. Returns an `object`. See Returned Object below.
   */
  onType?: (
    event: DatePickerEvent<React.ChangeEvent<HTMLInputElement>>
  ) => void
  /**
   * Will be called once date-picker is visible.
   */
  onShow?: (event: DatePickerEvent<DisplayPickerEvent>) => void
  /**
   * Will be called once date-picker is hidden.
   */
  onHide?: (event: DatePickerEvent<DisplayPickerEvent>) => void
  /**
   * Will be called once a user presses the submit button.
   */
  onSubmit?: (
    event: DatePickerEvent<React.MouseEvent<HTMLButtonElement>>
  ) => void
  /**
   * Will be called once a user presses the cancel button.
   */
  onCancel?: (
    event: DatePickerEvent<React.MouseEvent<HTMLButtonElement>>
  ) => void
  /**
   * Will be called once a user presses the reset button.
   */
  onReset?: (
    event: DatePickerEvent<React.MouseEvent<HTMLButtonElement>>
  ) => void
  /**
   * Will be called once the input gets focus.
   */
  onFocus?: (event: DatePickerEvent<React.FocusEvent<HTMLElement>>) => void
  /**
   * Will be called once the input lose focus.
   */
  onBlur?: (event: DatePickerEvent<React.FocusEvent<HTMLElement>>) => void
}
// Can be removed in v11
type DatePickerDeprecatedProps = {
  /**
   * @deprecated use `startDate` instead.
   */
  start_date?: DateType
  /**
   * @deprecated use `endDate` instead.
   */
  end_date?: DateType
  /**
   * @deprecated use `startMonth` instead.
   */
  start_month?: DateType
  /**
   * @deprecated use `endMonth` instead.
   */
  end_month?: DateType
  /**
   * @deprecated use `minDate` instead.
   */
  min_date?: DateType
  /**
   * @deprecated use `maxDate` instead.
   */
  max_date?: DateType
  /**
   * @deprecated use `correctInvalidDate` instead.
   */
  correct_invalid_date?: boolean
  /**
   * @deprecated use `maskOrder` instead.
   */
  mask_order?: string
  /**
   * @deprecated use `maskPlaceholder` instead.
   */
  mask_placeholder?: string
  /**
   * @deprecated use `dateFormat` instead.
   */
  date_format?: string
  /**
   * @deprecated use `returnFormat` instead.
   */
  return_format?: string
  /**
   * @deprecated use `hideNavigation` instead.
   */
  hide_navigation?: boolean
  /**
   * @deprecated use `hideNavigationButtons` instead.
   */
  hide_navigation_buttons?: boolean
  /**
   * @deprecated use `hideDays` instead.
   */
  hide_days?: boolean
  /**
   * @deprecated use `onlyMonth` instead.
   */
  only_month?: boolean
  /**
   * @deprecated use `hideLastWeek` instead.
   */
  hide_last_week?: boolean
  /**
   * @deprecated use `disableAutofocus` instead.
   */
  disable_autofocus?: boolean
  /**
   * @deprecated use `enableKeyboardNav` instead.
   */
  enable_keyboard_nav?: boolean
  /**
   * @deprecated use `showInput` instead.
   */
  show_input?: boolean
  /**
   * @deprecated use `showSubmitButton` instead.
   */
  show_submit_button?: boolean
  /**
   * @deprecated use `showCancelButton` instead.
   */
  show_cancel_button?: boolean
  /**
   * @deprecated
   */
  show_reset_button?: boolean
  /**
   * @deprecated use `submitButtonText` instead.
   */
  submit_button_text?: string
  /**
   * @deprecated use `cancelButtonText` instead.
   */
  cancel_button_text?: string
  /**
   * @deprecated use `resetButtonText` instead.
   */
  reset_button_text?: string
  /**
   * @deprecated use `resetDate` instead.
   */
  reset_date?: boolean
  /**
   * @deprecated use `firstDay` instead.
   */
  first_day?: string
  /**
   * @deprecated set locale with `Provider` instead.
   */
  locale?: Locale
  /**
   * @deprecated use `labelDirection` instead.
   */
  label_direction?: 'vertical' | 'horizontal'
  /**
   * @deprecated use `labelSrOnly` instead.
   */
  label_sr_only?: boolean
  /**
   * @deprecated use `inputElement` instead.
   */
  input_element?: InputInputElement
  /**
   * @deprecated use `addonElement` instead.
   */
  addon_element?: React.ReactNode
  /**
   * @deprecated use `statusState` instead.
   */
  status_state?: FormStatusState
  /**
   * @deprecated use `statusProps` instead.
   */
  status_props?: FormStatusProps
  /**
   * @deprecated use `statusNoAnimation` instead.
   */
  status_no_animation?: boolean
  /**
   * @deprecated use `preventClose` instead.
   */
  prevent_close?: boolean
  /**
   * @deprecated use `no_animation` instead.
   */
  no_animation?: boolean
  /**
   * @deprecated use `alignPicker` instead.
   */
  align_picker?: 'auto' | 'left' | 'right'
  /**
   * @deprecated use `onDaysRender` instead.
   */
  on_days_render?: (
    days: Array<CalendarDay>,
    nr?: DatePickerCalendarProps['nr']
  ) => void
  /**
   * @deprecated use `onChange` instead.
   */
  on_change?: (
    event: DatePickerEvent<React.ChangeEvent<HTMLInputElement>>
  ) => void
  /**
   * @deprecated use `onType` instead.
   */
  on_type?: (
    event: DatePickerEvent<React.ChangeEvent<HTMLInputElement>>
  ) => void
  /**
   * @deprecated use `onShow` instead.
   */
  on_show?: (event: DatePickerEvent<DisplayPickerEvent>) => void
  /**
   * @deprecated use `onHide` instead.
   */
  on_hide?: (event: DatePickerEvent<DisplayPickerEvent>) => void
  /**
   * @deprecated use `onSubmit` instead.
   */
  on_submit?: (
    event: DatePickerEvent<React.MouseEvent<HTMLButtonElement>>
  ) => void
  /**
   * @deprecated use `onCancel` instead.
   */
  on_cancel?: (
    event: DatePickerEvent<React.MouseEvent<HTMLButtonElement>>
  ) => void
  /**
   * @deprecated use `onReset` instead.
   */
  on_reset?: (
    event: DatePickerEvent<React.MouseEvent<HTMLButtonElement>>
  ) => void
}

export type DatePickerAllProps = DatePickerProps &
  DatePickerDeprecatedProps &
  SpacingProps &
  Omit<
    React.HTMLProps<HTMLElement>,
    | 'ref'
    | 'children'
    | 'label'
    | 'size'
    | 'onChange'
    | 'onBlur'
    | 'onFocus'
    | 'onSubmit'
    | 'onReset'
    | 'start'
  >

const defaultProps: DatePickerProps = {
  maskOrder: 'dd/mm/yyyy',
  maskPlaceholder: 'dd/mm/åååå', // have to be same setup as "mask" - but can be like
  dateFormat: 'yyyy-MM-dd', // in v1 of date-fns we were more flexible in terms of the format
  returnFormat: 'yyyy-MM-dd', // used in date-fns v1
  hideNavigation: false,
  hideNavigationButtons: false,
  hideDays: false,
  onlyMonth: false,
  hideLastWeek: false,
  disableAutofocus: false,
  enableKeyboardNav: false,
  showInput: false,
  submitButtonText: 'Ok',
  cancelButtonText: 'Avbryt',
  resetButtonText: 'Tilbakestill',
  resetDate: true,
  firstDay: 'monday',
  range: false,
  link: false,
  sync: true,
  statusState: 'error',
  opened: false,
  noAnimation: false,
  direction: 'auto',
  skipPortal: false,
}

function DatePicker(externalProps: DatePickerAllProps) {
  const props = { ...defaultProps, ...externalProps }

  const {
    preventClose,
    onHide,
    onShow,
    onSubmit,
    onCancel,
    onReset,
    noAnimation,
    showInput,
    alignPicker,
    showSubmitButton,
    showCancelButton,
    range,
    hideDays,
    hideNavigation,
    opened: openedProp,
    endDate: endDateProp,
  } = convertSnakeCaseProps(props) // convertSnakeCaseProps - can be removed in v11

  const [opened, setOpened] = useState<boolean>(openedProp)
  const [hidden, setHidden] = useState(!opened)
  const [dates, setDates] = useState<
    Pick<DatePickerDates, 'startDate' | 'endDate'>
  >({})

  const context = useContext(Context)
  const blurDelay = 201 // some ms more than "dropdownSlideDown 200ms"
  const id = props.id || makeUniqueId()

  const innerRef = useRef<HTMLSpanElement>()
  const triangleRef = useRef<HTMLSpanElement>()
  const submitButtonRef = useRef<HTMLButtonElement>()
  const getReturnObject =
    useRef<DatePickerContextValues['getReturnObject']>()
  const hideTimeout = useRef<NodeJS.Timeout>()
  const outsideClick = useRef<DetectOutsideClickClass>()
  const calendarContainerRef = useRef<HTMLDivElement>()

  const translation = useTranslation().DatePicker

  if (endDateProp && !range) {
    warn(
      `The DatePicker got a "endDate". You have to set range={true} as well!.`
    )
  }

  const removeOutsideClickHandler = useCallback(() => {
    if (outsideClick.current) {
      outsideClick.current.remove()
    }
  }, [])

  const hidePicker = useCallback(
    (args?: DisplayPickerEvent) => {
      if (preventClose) {
        return // stop here
      }

      if (args && args.event && args.event.persist) {
        args.event.persist()
      }

      setOpened(false)

      hideTimeout.current = setTimeout(
        () => {
          setHidden(true)
          onHide?.({
            ...getReturnObject.current(args),
          })
          if (args?.['focusOnHide']) {
            try {
              submitButtonRef.current.focus({
                preventScroll: true,
              })
            } catch (e) {
              warn(e)
            }
          }
        },
        noAnimation ? 1 : blurDelay
      ) // wait until animation is over

      removeOutsideClickHandler()
    },
    [noAnimation, preventClose, onHide, removeOutsideClickHandler]
  )

  const setOutsideClickHandler = useCallback(() => {
    outsideClick.current = detectOutsideClick(
      // Sending in portalRef, instead of portalRef.current,
      // as that would lead to the ignoreElement being null/undefined,
      // since the portal has not been rendered yet,
      // causing the calendar to close when clicking on the calendar itself
      [innerRef.current, calendarContainerRef],
      ({ event }: { event: MouseEvent | KeyboardEvent }) => {
        hidePicker({ ...event, focusOnHide: event?.['code'] })
      }
    )
  }, [hidePicker])

  const setTrianglePosition = useCallback(() => {
    const triangleWidth = 16
    if (showInput && triangleRef.current && innerRef.current) {
      try {
        const shellWidth = innerRef.current
          .querySelector('.dnb-input__shell')
          .getBoundingClientRect().width

        const buttonWidth = innerRef.current
          .querySelector('.dnb-input__submit-button__button')
          .getBoundingClientRect().width

        if (alignPicker === 'right') {
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
  }, [showInput, alignPicker])

  const showPicker = useCallback(
    (event?: DisplayPickerEvent) => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current)
      }

      setOpened(true)
      setHidden(false)

      onShow?.({ ...getReturnObject.current(event) })

      setOutsideClickHandler()
    },
    [setOutsideClickHandler, onShow]
  )

  // Make sure the triangle is positioned correctly after calendar is mounted
  useLayoutEffect(() => {
    if (!hidden) {
      setTrianglePosition()
    }
  }, [hidden, setTrianglePosition])

  // React to opened prop changes
  useEffect(() => {
    if (openedProp) {
      showPicker()
    }
  }, [openedProp, showPicker])

  const onPickerChange = useCallback(
    ({
      hidePicker: shouldHidePicker = true,
      ...args
    }: DatePickerChangeEvent<
      | React.MouseEvent<HTMLSpanElement>
      | React.KeyboardEvent<HTMLTableElement>
    >) => {
      if (shouldHidePicker && !showSubmitButton && !showCancelButton) {
        hidePicker({ focusOnHide: true })
      }

      setDates({ startDate: args.startDate, endDate: args.endDate })
    },
    [hidePicker, showSubmitButton, showCancelButton]
  )

  const onSubmitHandler = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      hidePicker(event)
      onSubmit?.({
        ...getReturnObject.current({ event }),
      })
    },
    [hidePicker, onSubmit]
  )

  const onCancelHandler = useCallback(
    (
      event: DatePickerChangeEvent<React.MouseEvent<HTMLButtonElement>>
    ) => {
      hidePicker()
      onCancel?.({ ...getReturnObject.current(event) })
    },
    [hidePicker, onCancel]
  )

  const onResetHandler = useCallback(
    (
      event: DatePickerChangeEvent<React.MouseEvent<HTMLButtonElement>>
    ) => {
      hidePicker()
      onReset?.({ ...getReturnObject.current(event) })
    },
    [hidePicker, onReset]
  )

  const togglePicker = useCallback(
    (args: React.MouseEvent<HTMLButtonElement>) => {
      !opened ? showPicker(args) : hidePicker(args)
    },
    [opened, showPicker, hidePicker]
  )

  const formatSelectedDateTitle = useCallback(() => {
    const { selectedDate, start, end } = translation
    const { startDate, endDate } = dates

    let currentDate = startDate ? format(startDate, 'PPPP') : null

    if (range && startDate && endDate) {
      currentDate = `${start} ${currentDate} - ${end} ${format(
        endDate,
        'PPPP'
      )}`
    }

    return currentDate ? selectedDate.replace(/%s/, currentDate) : ''
  }, [range, translation, dates])

  // use only the props from context, who are available here anyway
  const extendedProps = extendPropsWithContext(
    props,
    defaultProps,
    { skeleton: context?.skeleton },
    convertSnakeCaseProps(context.getTranslation(props).DatePicker), // convertSnakeCaseProps - can be removed in v11
    pickFormElementProps(context?.FormRow), // Deprecated – can be removed in v11
    convertSnakeCaseProps(pickFormElementProps(context?.formElement)), // Deprecated – can be removed in v11
    context.DatePicker
  )

  const {
    label,
    title,
    labelDirection,
    labelSrOnly,
    onlyMonth,
    hideLastWeek,
    disableAutofocus,
    hideNavigationButtons,
    firstDay,
    resetDate,
    link,
    sync,
    inputElement,
    addonElement,
    shortcuts,
    disabled,
    stretch,
    skeleton,
    size,
    status,
    statusState,
    statusProps,
    statusNoAnimation,
    globalStatus,
    suffix,
    maskOrder,
    maskPlaceholder,
    submitButtonText,
    cancelButtonText,
    resetButtonText,
    showResetButton,
    className,
    tooltip,
    skipPortal,
    ...restProps
  } = extendedProps

  const attributes = useMemo(
    () => filterOutNonAttributes(restProps),
    [restProps]
  )

  const shouldHideDays = onlyMonth ? true : hideDays
  const shouldHideNavigation = onlyMonth
    ? hideNavigationButtons
      ? false
      : true
    : hideNavigation

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
      status && `dnb-date-picker__status--${statusState}`,
      labelDirection && `dnb-date-picker--${labelDirection}`,
      opened && 'dnb-date-picker--opened',
      hidden && 'dnb-date-picker--hidden',
      showInput && 'dnb-date-picker--show-input',
      (range || showSubmitButton || showCancelButton || showResetButton) &&
        'dnb-date-picker--show-footer',
      alignPicker && `dnb-date-picker--${alignPicker}`,
      stretch && `dnb-date-picker--stretch`,
      'dnb-form-component',
      size && `dnb-date-picker--${size}`,
      createSpacingClasses(props),
      className
    ),
    lang: context.locale,
  } as HTMLProps<HTMLSpanElement>

  const containerClassNames = classnames(
    'dnb-date-picker__container',
    opened && 'dnb-date-picker__container--opened',
    !opened && 'dnb-date-picker__container--closed',
    hidden && 'dnb-date-picker__container--hidden',
    showInput && 'dnb-date-picker__container--show-input',
    alignPicker && `dnb-date-picker__container--${alignPicker}`,
    size && `dnb-date-picker--${size}`
  )

  const remainingDOMProps = validateDOMAttributes(props, attributes)
  const remainingSubmitProps = validateDOMAttributes(null, submitParams)
  const remainingPickerProps = validateDOMAttributes(
    null,
    skeletonDOMAttributes(pickerParams, skeleton, context)
  )

  return (
    <DatePickerProvider
      {...props}
      attributes={remainingDOMProps}
      setReturnObject={(fn) => (getReturnObject.current = fn)}
      hidePicker={hidePicker}
    >
      <span {...mainParams}>
        {label && (
          <FormLabel
            id={id + '-label'}
            forId={id}
            text={label}
            labelDirection={labelDirection}
            srOnly={labelSrOnly}
            disabled={disabled}
            skeleton={skeleton}
          />
        )}

        <span
          className="dnb-date-picker__inner"
          ref={innerRef}
          {...remainingPickerProps}
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
            state={statusState}
            no_animation={statusNoAnimation}
            skeleton={skeleton}
            {...statusProps}
          />

          <span className="dnb-date-picker__row">
            <span className="dnb-date-picker__shell" id={`${id}-shell`}>
              <DatePickerInput
                id={id}
                title={title}
                disabled={disabled}
                stretch={stretch}
                skeleton={skeleton}
                maskOrder={maskOrder}
                maskPlaceholder={maskPlaceholder}
                isRange={range}
                showInput={showInput}
                selectedDateTitle={selectedDateTitle}
                inputElement={inputElement}
                opened={opened}
                hidden={hidden}
                size={size}
                status={status ? 'error' : null}
                statusState={statusState}
                lang={context.locale}
                {...attributes}
                submitAttributes={remainingSubmitProps}
                onSubmit={togglePicker}
                {...statusProps}
              />

              {!hidden && (
                <DatePickerPortal
                  alignment={alignPicker}
                  skipPortal={skipPortal}
                  targetElementRef={innerRef}
                >
                  <span
                    className={containerClassNames}
                    ref={calendarContainerRef}
                  >
                    <span
                      className="dnb-date-picker__triangle"
                      ref={triangleRef}
                    />
                    <DatePickerRange
                      id={id}
                      firstDayOfWeek={firstDay}
                      resetDate={resetDate}
                      isRange={range}
                      isLink={link}
                      isSync={sync}
                      hideDays={shouldHideDays}
                      hideNav={shouldHideNavigation}
                      views={
                        hideNavigationButtons
                          ? [{ nextBtn: false, prevBtn: false }]
                          : null
                      }
                      onlyMonth={onlyMonth}
                      hideNextMonthWeek={hideLastWeek}
                      noAutoFocus={disableAutofocus}
                      onChange={onPickerChange}
                      locale={context.locale}
                    />
                    {(addonElement || shortcuts) && (
                      <DatePickerAddon
                        renderElement={addonElement}
                        shortcuts={shortcuts}
                      />
                    )}
                    <DatePickerFooter
                      isRange={range}
                      onSubmit={onSubmitHandler}
                      onCancel={onCancelHandler}
                      onReset={onResetHandler}
                      submitButtonText={submitButtonText}
                      cancelButtonText={cancelButtonText}
                      resetButtonText={resetButtonText}
                    />
                  </span>
                </DatePickerPortal>
              )}
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

const NonAttributes = [
  'locale',
  'id',
  'month',
  'date',
  'startDate',
  'endDate',
  'minDate',
  'maxDate',
  'enableKeyboardNav',
  'hideNavigation',
  'returnFormat',
  'dateFormat',
  'hideDays',
  'correctInvalidDate',
  'opened',
  'direction',
  'range',
  'showInput',
  'noAnimation',
  'onDaysRender',
  'onShow',
  'onType',
  'onHide',
  'showSubmitButton',
  'showCancelButton',
  'selectedDate',
  'selectedMonth',
  'selectedYear',
  'nextMonth',
  'nextYear',
  'openPickerText',
  'placeholderCharacters',
  'prevMonth',
  'prevYear',
  'endMonth',
  'startMonth',
  'alignPicker',
  'preventClose',
]

function filterOutNonAttributes(props: DatePickerProps) {
  return Object.keys(props).reduce((attributes, key) => {
    if (!NonAttributes.includes(key)) {
      attributes[key] = props[key]
    }
    return attributes
  }, {})
}

export default DatePicker

DatePicker._supportsSpacingProps = true
