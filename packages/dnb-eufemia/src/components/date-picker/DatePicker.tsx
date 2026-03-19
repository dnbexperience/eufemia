/**
 * Web DatePicker Component
 *
 */

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { HTMLProps } from 'react'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import clsx from 'clsx'
import {
  warn,
  extendPropsWithContext,
  getStatusState,
  combineDescribedBy,
  validateDOMAttributes,
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import { skeletonDOMAttributes } from '../skeleton/SkeletonHelper'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import FormLabel from '../form-label/FormLabel'
import type { FormStatusBaseProps } from '../form-status/FormStatus'
import FormStatus from '../form-status/FormStatus'
import DatePickerProvider from './DatePickerProvider'
import type {
  DatePickerChangeEvent,
  DatePickerReturnObject,
} from './DatePickerProvider'
import DatePickerRange from './DatePickerRange'
import DatePickerInput from './DatePickerInput'
import type { DatePickerAddonProps } from './DatePickerAddon'
import DatePickerAddon from './DatePickerAddon'
import DatePickerFooter from './DatePickerFooter'
import type { SpacingProps } from '../space/types'
import type { InputElement, InputSize } from '../Input'
import type { SkeletonShow } from '../Skeleton'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import type {
  DatePickerCalendarDay,
  DatePickerCalendarProps,
} from './DatePickerCalendar'
import type {
  DatePickerContextValue,
  DatePickerDateType,
} from './DatePickerContext'
import type { DatePickerDates } from './hooks/useDates'
import { useTranslation } from '../../shared'
import Popover from '../popover/Popover'
import type { DateFormatOptions } from '../date-format/DateFormatUtils'
import {
  formatDate,
  formatDateRange,
} from '../date-format/DateFormatUtils'
import useId from '../../shared/helpers/useId'

export type DatePickerEventAttributes = {
  day?: string
  year?: string
  start?: string
  end?: string
} & Record<string, unknown>

// Takes the return object from DatePickerProvider and extends it with the event
export type DatePickerEvent<T> = DatePickerReturnObject<T>

type FocusOnClose = { focusOnClose?: boolean | string }

export type DisplayPickerEvent = (
  | React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLElement>
  | MouseEvent
  | KeyboardEvent
  | FocusOnClose
) &
  DatePickerDates &
  FocusOnClose & {
    event?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  }

export type DatePickerProps = {
  /**
   * Defines the pre-filled date by either a JavaScript DateInstance or (ISO 8601) like `date="2019-05-05"`.
   */
  date?: DatePickerDateType
  /**
   * To set the pre-filled starting date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `maskPlaceholder`.
   */
  startDate?: DatePickerDateType
  /**
   * To set the pre-filled ending date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `maskPlaceholder`.
   */
  endDate?: DatePickerDateType
  /**
   * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.
   */
  month?: DatePickerDateType
  /**
   * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.
   */
  startMonth?: DatePickerDateType
  /**
   * To display what month should be shown in the second calendar by default. Defaults to the `date` respective `startDate`.
   */
  endMonth?: DatePickerDateType
  /**
   * To limit a date range to a minimum `startDate`. Defaults to `null`.
   */
  minDate?: DatePickerDateType
  /**
   * To limit a date range to a maximum `endDate`. Defaults to `null`.
   */
  maxDate?: DatePickerDateType
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
   * If set to `true`, renders the calendar inline without a button or input. The calendar is always visible and not wrapped in a Popover. Defaults to `false`.
   */
  inline?: boolean
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
   * Gives you the possibility to use a plain/vanilla `<input />` HTML element by defining it as a string `inputElement="input"`, a React element, or a render function `inputElement={(internalProps) => (<Return />)}`. Can also be used in circumstances where the masked input should not be used, e.g. in testing environments. Defaults to custom masked input.
   */
  inputElement?: InputElement
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
   * Text describing the content of the DatePicker more than the label. You can also send in a React component, so it gets wrapped inside the DatePicker component.
   */
  suffix?: React.ReactNode
  /**
   * To open the date-picker by default. Defaults to `false`.
   */
  open?: boolean
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
  alignPicker?: 'left' | 'center' | 'right'
  /**
   * Sets the alignment of the label. Defaults to `left`.
   */
  labelAlignment?: 'left' | 'center' | 'right'
  /**
   * If set to `true`, the calendar will not be rendered inside a react portal. Defaults to `false`.
   */
  skipPortal?: boolean
  /**
   * Will enable year navigation in the calendar if set to `true`. Defaults to `false`.
   */
  yearNavigation?: boolean
  className?: string
  /**
   * Will be called right before every new calendar view gets rendered. See the example above.
   */
  onDaysRender?: (
    days: Array<DatePickerCalendarDay>,
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
  onOpen?: (event: DatePickerEvent<DisplayPickerEvent>) => void
  /**
   * Will be called once date-picker is hidden.
   */
  onClose?: (event: DatePickerEvent<DisplayPickerEvent>) => void
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
  /** @internal */
  _omitInputShellClass?: boolean
}

export type DatePickerAllProps = DatePickerProps &
  FormStatusBaseProps &
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

const defaultProps: Partial<DatePickerAllProps> = {
  hideNavigation: false,
  hideDays: false,
  onlyMonth: false,
  hideLastWeek: false,
  disableAutofocus: false,
  enableKeyboardNav: false,
  showInput: false,
  inline: false,
  resetDate: true,
  range: false,
  link: false,
  sync: true,
  statusState: 'error',
  open: false,
  noAnimation: false,
  direction: 'auto',
  skipPortal: false,
  yearNavigation: false,
}

function DatePicker(externalProps: DatePickerAllProps) {
  const props = { ...defaultProps, ...externalProps }

  const {
    preventClose,
    onClose,
    onOpen,
    onSubmit,
    onCancel,
    onReset,
    noAnimation,
    showInput,
    inline,
    alignPicker,
    showSubmitButton,
    showCancelButton,
    range,
    hideDays,
    hideNavigation,
    open: openProp,
    endDate: endDateProp,
  } = props

  const [open, setOpen] = useState<boolean>(inline ? true : openProp)
  const [hidden, setHidden] = useState(inline ? false : !open)
  const [dates, setDates] = useState<
    Pick<DatePickerDates, 'startDate' | 'endDate'>
  >({})

  const context = useContext(Context)
  const blurDelay = 201 // some ms more than "dropdownSlideDown 200ms"
  const id = useId(props.id)

  const shellRef = useRef<HTMLSpanElement>(undefined)
  const submitButtonRef = useRef<HTMLButtonElement>(undefined)
  const getReturnObject =
    useRef<DatePickerContextValue['getReturnObject']>(undefined)
  const hideTimeout = useRef<NodeJS.Timeout>(undefined)
  const calendarContainerRef = useRef<HTMLSpanElement>(null)

  const translation = useTranslation().DatePicker

  const focusCalendarTable = useCallback(
    () => calendarContainerRef.current?.querySelector('table'),
    []
  )

  if (endDateProp && !range) {
    warn(
      `The DatePicker got a "endDate". You have to set range={true} as well!.`
    )
  }

  const hidePicker = useCallback(
    (args?: DisplayPickerEvent) => {
      if (preventClose) {
        return // stop here
      }

      if (args && args.event && args.event.persist) {
        args.event.persist()
      }

      setOpen(false)

      hideTimeout.current = setTimeout(
        () => {
          setHidden(true)
          onClose?.({
            ...getReturnObject.current(args),
          })
          if (args?.['focusOnClose']) {
            try {
              submitButtonRef.current?.focus({
                preventScroll: true,
              })
            } catch (e) {
              warn(e)
            }
          }
        },
        noAnimation ? 1 : blurDelay
      ) // wait until animation is over
    },
    [noAnimation, preventClose, onClose]
  )

  const showPicker = useCallback(
    (event?: DisplayPickerEvent) => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current)
      }

      setOpen(true)
      setHidden(false)

      onOpen?.({ ...getReturnObject.current(event) })
    },
    [onOpen]
  )

  // React to open prop changes (only when not inline)
  useEffect(() => {
    if (openProp && !inline) {
      showPicker()
    }
  }, [openProp, showPicker, inline])

  const onPickerChange = useCallback(
    ({
      hidePicker: shouldHidePicker = true,
      ...args
    }: DatePickerChangeEvent<
      | React.MouseEvent<HTMLSpanElement>
      | React.KeyboardEvent<HTMLTableElement>
    >) => {
      if (shouldHidePicker && !showSubmitButton && !showCancelButton) {
        hidePicker({ focusOnClose: true })
      }

      setDates({ startDate: args.startDate, endDate: args.endDate })
    },
    [hidePicker, showSubmitButton, showCancelButton]
  )

  const onSubmitHandler = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (open) {
        // If picker is open, close it and call onSubmit
        hidePicker(event)
        onSubmit?.({
          ...getReturnObject.current({ event }),
        })
      } else {
        // If picker is closed, open it (don't call onSubmit)
        showPicker(event)
      }
    },
    [open, hidePicker, showPicker, onSubmit]
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
      !open ? showPicker(args) : hidePicker(args)
    },
    [open, showPicker, hidePicker]
  )

  // use only the props from context, who are available here anyway
  const extendedProps = extendPropsWithContext(
    props,
    defaultProps,
    { skeleton: context?.skeleton },
    context.getTranslation(props).DatePicker,
    pickFormElementProps(context?.formElement),
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
    labelAlignment,
    _omitInputShellClass,
    ...restProps
  } = extendedProps

  const attributes = useMemo(
    () => filterOutNonAttributes(restProps),
    [restProps]
  )

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
    ['aria-expanded']: open,
    ref: submitButtonRef,
    tabIndex: extendedProps.tabIndex,
    tooltip,
  }

  const selectedDateTitle = useMemo(() => {
    const { selectedDate, selectedDateRange } = translation
    const { startDate, endDate } = dates

    if (!startDate) {
      return ''
    }

    const options: DateFormatOptions = {
      locale: context.locale,
      options: {
        dateStyle: 'full',
      },
    }

    return range && endDate
      ? selectedDateRange.replace(
          /%s/,
          formatDateRange({ startDate, endDate }, options)
        )
      : selectedDate.replace(/%s/, formatDate(startDate, options))
  }, [range, translation, dates, context.locale])

  const mainParams = {
    className: clsx(
      'dnb-date-picker',
      status && `dnb-date-picker__status--${statusState}`,
      labelDirection && `dnb-date-picker--${labelDirection}`,
      open && 'dnb-date-picker--open',
      hidden && 'dnb-date-picker--hidden',
      showInput && 'dnb-date-picker--show-input',
      inline && 'dnb-date-picker--inline',
      label &&
        labelAlignment === 'right' &&
        'dnb-date-picker__input--label-alignment-right',
      stretch && `dnb-date-picker--stretch`,
      'dnb-form-component',
      size && `dnb-date-picker--${size}`,
      createSpacingClasses(props),
      className
    ),
    lang: context.locale,
  } as HTMLProps<HTMLSpanElement>

  const containerClassNames = clsx(
    'dnb-date-picker__container',
    open && 'dnb-date-picker__container--open',
    !open && 'dnb-date-picker__container--closed',
    hidden && 'dnb-date-picker__container--hidden',
    showInput && 'dnb-date-picker__container--show-input',
    size && `dnb-date-picker--${size}`,
    ((inline ? false : range) ||
      showSubmitButton ||
      showCancelButton ||
      showResetButton) &&
      'dnb-date-picker__container--show-footer'
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
          ref={shellRef}
          {...remainingPickerProps}
        >
          <AlignmentHelper />

          <FormStatus
            show={showStatus}
            id={id + '-form-status'}
            globalStatus={globalStatus}
            label={String(label)}
            textId={id + '-status'} // used for "aria-describedby"
            widthSelector={id + '-shell'}
            text={status}
            state={statusState}
            noAnimation={statusNoAnimation}
            skeleton={skeleton}
            {...statusProps}
          />

          <span className="dnb-date-picker__row">
            {inline ? (
              <span
                className={containerClassNames}
                ref={calendarContainerRef}
              >
                <DatePickerRange
                  id={id}
                  firstDayOfWeek={firstDay}
                  resetDate={resetDate}
                  isRange={range}
                  isLink={link}
                  isSync={sync}
                  hideDays={hideDays}
                  hideNavigation={hideNavigation}
                  onlyMonth={onlyMonth}
                  hideNextMonthWeek={hideLastWeek}
                  onPickerChange={onPickerChange}
                  locale={context.locale}
                />
                {(addonElement || shortcuts) && (
                  <DatePickerAddon
                    renderElement={addonElement}
                    shortcuts={shortcuts}
                  />
                )}
                <DatePickerFooter
                  isRange={inline ? false : range}
                  onSubmit={onSubmitHandler}
                  onCancel={onCancelHandler}
                  onReset={onResetHandler}
                  submitButtonText={submitButtonText}
                  cancelButtonText={cancelButtonText}
                  resetButtonText={resetButtonText}
                />
              </span>
            ) : (
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
                  open={open}
                  hidden={hidden}
                  size={size}
                  status={status ? 'error' : null}
                  statusState={statusState}
                  lang={context.locale}
                  _omitInputShellClass={_omitInputShellClass}
                  {...attributes}
                  submitAttributes={remainingSubmitProps}
                  // @ts-expect-error - strictFunctionTypes
                  onSubmit={togglePicker}
                  {...statusProps}
                />

                <Popover
                  open={open}
                  targetElement={{
                    verticalRef: submitButtonRef,
                    horizontalRef: shellRef,
                  }}
                  noAnimation={noAnimation}
                  skipPortal={skipPortal}
                  keepInDOM={!hidden}
                  focusOnOpen={!disableAutofocus}
                  focusOnOpenElement={focusCalendarTable}
                  alignOnTarget={
                    alignPicker === 'right' || stretch ? 'right' : 'left'
                  }
                  horizontalOffset={showInput ? 8 : -8}
                  placement={
                    props.direction === 'auto' ? 'bottom' : props.direction
                  }
                  onOpenChange={(isOpen) => !isOpen && hidePicker()}
                  hideCloseButton
                  hideOutline
                  preventClose={preventClose}
                  triggerOffset={0}
                  arrowEdgeOffset={4}
                  noInnerSpace
                  noMaxWidth
                  portalRootClass="dnb-date-picker__portal"
                  arrowPosition={
                    alignPicker === 'right' ? 'right' : 'left'
                  }
                  arrowPositionSelector={`#${id}`}
                >
                  <span
                    className={containerClassNames}
                    ref={calendarContainerRef}
                  >
                    <DatePickerRange
                      id={id}
                      firstDayOfWeek={firstDay}
                      resetDate={resetDate}
                      isRange={range}
                      isLink={link}
                      isSync={sync}
                      hideDays={hideDays}
                      hideNavigation={hideNavigation}
                      onlyMonth={onlyMonth}
                      hideNextMonthWeek={hideLastWeek}
                      onPickerChange={onPickerChange}
                      locale={context.locale}
                    />
                    {(addonElement || shortcuts) && (
                      <DatePickerAddon
                        renderElement={addonElement}
                        shortcuts={shortcuts}
                      />
                    )}
                    <DatePickerFooter
                      isRange={inline ? false : range}
                      onSubmit={onSubmitHandler}
                      onCancel={onCancelHandler}
                      onReset={onResetHandler}
                      submitButtonText={submitButtonText}
                      cancelButtonText={cancelButtonText}
                      resetButtonText={resetButtonText}
                    />
                  </span>
                </Popover>
              </span>
            )}
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
  'day',
  'month',
  'year',
  'date',
  'start',
  'end',
  'startDate',
  'endDate',
  'minDate',
  'maxDate',
  'hidden',
  'stretch',
  'enableKeyboardNav',
  'hideNavigation',
  'returnFormat',
  'dateFormat',
  'hideDays',
  'open',
  'direction',
  'range',
  'showInput',
  'inline',
  'noAnimation',
  'onDaysRender',
  'onOpen',
  'onType',
  'onClose',
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
  'selectedDateRange',
  'yearNavigation',
]

function filterOutNonAttributes(props: DatePickerProps) {
  return Object.keys(props).reduce((attributes, key) => {
    if (!NonAttributes.includes(key)) {
      attributes[key] = props[key]
    }
    return attributes
  }, {})
}

withComponentMarkers(DatePicker, {
  _formElement: true,
  _supportsSpacingProps: true,
})

export default DatePicker
