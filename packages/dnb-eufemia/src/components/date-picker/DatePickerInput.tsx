/**
 * Web DatePicker Component
 *
 */

import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

// date-fns
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import addYears from 'date-fns/addYears'
import isValid from 'date-fns/isValid'
import parseISO from 'date-fns/parseISO'

import classnames from 'classnames'
import TextMask, { TextMaskProps } from '../input-masked/TextMask'
import Button from '../button/Button'
import Input, { SubmitButton } from '../input/Input'
import type { InputInputElement, InputSize } from '../Input'
import keycode from 'keycode'
import {
  warn,
  validateDOMAttributes,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { convertStringToDate } from './DatePickerCalc'
import DatePickerContext from './DatePickerContext'

import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText,
} from '../FormStatus'
import type { SkeletonShow } from '../Skeleton'

export type DatePickerInputProps = Omit<
  React.HTMLProps<HTMLElement>,
  'children' | 'ref' | 'value'
> & {
  id?: string
  title?: string
  selectedDateTitle?: string
  maskOrder?: string
  maskPlaceholder?: string
  separatorRexExp?: RegExp
  submitAttributes?: Record<string, unknown>
  isRange?: boolean
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
  /**
   * Gives you the possibility to use a plain/vanilla `<input />` HTML element by defining it as a string `input_element="input"`, a React element, or a render function `input_element={(internalProps) => (<Return />)}`. Can also be used in circumstances where the `react-text-mask` not should be used, e.g. in testing environments. Defaults to custom masked input.
   */
  input_element?: InputInputElement
  /**
   * To define the locale used in the calendar. Needs to be an `date-fns` "v2" locale object, like `import enLocale from &#39;date-fns/locale/en-GB&#39;`. Defaults to `nb-NO`.
   */
  locale?: Record<string, unknown>
  disabled?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  /**
   * To open the date-picker by default. Defaults to `false`.
   */
  opened?: boolean
  showInput?: boolean
  onChange?: (...args: any[]) => any
  onSubmit?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
}

const defaultProps: DatePickerInputProps = {
  maskOrder: 'dd/mm/yyyy',
  maskPlaceholder: 'dd/mm/åååå',
  separatorRexExp: /[-/ ]/g,
  status_state: 'error',
  opened: false,
}

function DatePickerInput(externalProps: DatePickerInputProps) {
  const props = { ...defaultProps, ...externalProps }

  const [focusState, setFocusState] = useState<string>('virgin')
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const context = useContext(DatePickerContext)

  const shouldLog = context.props.id === 'first-datepicker'

  // Used in reflist, and initatied inside object to to maintain the way of accessing mimiic `this`, used in this component
  // Should probably refactor at one point
  const inputRefs = {
    startDayRef: useRef<HTMLInputElement>(null),
    startMonthRef: useRef<HTMLInputElement>(null),
    startYearRef: useRef<HTMLInputElement>(null),
    endDayRef: useRef<HTMLInputElement>(null),
    endMonthRef: useRef<HTMLInputElement>(null),
    endYearRef: useRef<HTMLInputElement>(null),
  }

  const dateRefs = {
    startDay: useRef(null),
    endDay: useRef(null),
    startMonth: useRef(null),
    endMonth: useRef(null),
    startYear: useRef(null),
    endYear: useRef(null),
  }

  const temporaryDates = {
    startDate: useRef(null),
    endDate: useRef(null),
  }

  const refList = useRef<Array<MutableRefObject<HTMLInputElement>>>(null)

  const shortcuts = useRef(null)
  const focusMode = useRef(null)
  const maskList = createMaskList()

  function createMaskList() {
    const separators = props.maskOrder.match(props.separatorRexExp)

    return props.maskOrder
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
  }

  useEffect(() => {
    return () => {
      if (shortcuts.current) {
        // OS specific shortcuts set somewhere? Could be removed, cannot find any references to this in the rest of the codebase
        shortcuts.current?.remove(this.osShortcut)
      }
    }
  }, [props.maskOrder])

  async function shortcutHandler(e) {
    if (focusMode.current) {
      const success = (
        e.clipboardData ||
        (typeof window !== 'undefined' && window['clipboardData'])
      ).getData('text')
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
              date_format: possibleFormats[i],
            })
            if (date) {
              break
            }
          }
          const mode =
            focusMode.current === 'start' ? 'startDate' : 'endDate'

          const modeOptions = { startDate, endDate }

          if (date && !modeOptions[mode]) {
            context.setState({
              [mode]: date,
            })
          }
        } catch (e) {
          warn(e)
        }
      }
    }
  }

  function callOnChangeAsInvalid(state: {
    endDate?: Date
    starDate?: Date
    event: React.SyntheticEvent
  }) {
    context.updateState(
      {
        hoverDate: null,
      },
      () => {
        if (context.hasHadValidDate) {
          const { startDate, endDate, event } = {
            ...context,
            ...state,
          }
          context.callOnChangeHandler({ startDate, endDate, event })
        }
      }
    )
  }

  function callOnChange({
    startDate,
    endDate,
    event,
  }: {
    startDate?: Date
    endDate?: Date
    event: React.SyntheticEvent
  }) {
    const state = { changeMonthViews: true }
    if (typeof startDate !== 'undefined' && isValid(startDate)) {
      setStartDate(startDate)
    }
    if (!props.isRange) {
      setEndDate(startDate)
    }
    if (typeof endDate !== 'undefined' && isValid(endDate)) {
      setEndDate(endDate)
    }

    context.updateState(state, () => {
      if (
        (typeof startDate !== 'undefined' && isValid(startDate)) ||
        (typeof endDate !== 'undefined' && isValid(endDate))
      ) {
        context.callOnChangeHandler({ event })
      }
    })
  }

  function callOnType({ event }) {
    const getDates = () =>
      ['start', 'end'].reduce(
        (acc, mode) => {
          acc[`${mode}Date`] = [
            dateRefs[`${mode}Year`] || context[`__${mode}Year`] || 'yyyy',
            dateRefs[`${mode}Month`] || context[`__${mode}Month`] || 'mm',
            dateRefs[`${mode}Day`] || context[`__${mode}Day`] || 'dd',
          ].join('-')
          return acc
        },
        { startDate, endDate }
      )

    // Get the typed dates, so we can ...
    let { startDate, endDate } = getDates()

    startDate = parseISO(startDate)
    endDate = parseISO(endDate)

    // ... check if they were valid
    if (!isValid(startDate)) {
      startDate = null
    }
    if (!isValid(endDate)) {
      endDate = null
    }

    let returnObject = context.getReturnObject({
      startDate,
      endDate,
      event,
    })

    // Now, lets correct
    if (
      returnObject.is_valid === false ||
      returnObject.is_valid_start_date === false ||
      returnObject.is_valid_end_date === false
    ) {
      const { startDate, endDate } = getDates()

      const typedDates = props.isRange
        ? {
            start_date: startDate,
            end_date: endDate,
          }
        : { date: startDate }

      returnObject = {
        ...returnObject,
        ...typedDates,
      }
    }

    dispatchCustomElementEvent(context, 'on_type', returnObject)
  }

  async function prepareCounting({ keyCode, target, event }) {
    try {
      const isDate = target
        .getAttribute('class')
        .match(/__input--([day|month|year]+)($|\s)/)[1]

      const isInRange = target
        .getAttribute('id')
        .match(/-([start|end]+)-/)[1]

      let date =
        isInRange === 'start' ? context.startDate : context.endDate

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

      callOnChange({
        [isInRange === 'start' ? 'startDate' : 'endDate']: date,
        event,
      })

      await wait(1) // to get the correct position afterwards

      selectAll(target)
    } catch (e) {
      warn(e)
    }
  }

  function selectStart(target) {
    target.focus()
    target.setSelectionRange(0, 0)
  }

  function onFocusHandler(event) {
    try {
      selectAll(event.target)
    } catch (e) {
      warn(e)
    }

    setFocusState('focus')
  }

  function onBlurHandler() {
    focusMode.current = null
    setFocusState('blur')
  }

  async function onKeyDownHandler(event) {
    const keyCode = keycode(event)
    const target = event.target

    if (target.selectionStart !== target.selectionEnd) {
      selectStart(target)
    }

    // only to process key up and down press
    switch (keyCode) {
      case 'up':
      case 'down':
        event.persist()
        event.preventDefault()
        prepareCounting({ event, keyCode, target })
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

    const index = refList.current.findIndex(
      ({ current }) => current === target
    )

    if (
      index < refList.current.length - 1 &&
      ((secondSelectionStart === size &&
        isValid &&
        keyCode !== 'left' &&
        keyCode !== 'backspace') ||
        (firstSelectionStart === size && keyCode === 'right'))
    ) {
      try {
        // stop in case there is no next input element
        if (!refList.current[index + 1].current) {
          return
        }
        const nextSibling = refList.current[index + 1].current
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
            const prevSibling = refList.current[index - 1].current
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

  const dateSetters = {
    set_startDay: (event: React.SyntheticEvent) => {
      setDate(event, 'start', 'Day')
    },

    set_startMonth: (event: React.SyntheticEvent) => {
      setDate(event, 'start', 'Month')
    },

    set_startYear: (event: React.SyntheticEvent) => {
      setDate(event, 'start', 'Year')
    },

    set_endDay: (event: React.SyntheticEvent) => {
      setDate(event, 'end', 'Day')
    },

    set_endMonth: (event: React.SyntheticEvent) => {
      setDate(event, 'end', 'Month')
    },

    set_endYear: (event: React.SyntheticEvent) => {
      setDate(event, 'end', 'Year')
    },
  }

  // Fix ref logic
  function setDate(
    event: React.SyntheticEvent,
    mode: 'start' | 'end',
    type: 'Day' | 'Month' | 'Year'
  ) {
    event.persist() // since we have later a state update and afterwards the callback

    const value = (event.target as HTMLInputElement).value

    dateRefs[`${mode}${type}`].current = value

    if (context[`${mode}Date`]) {
      temporaryDates[`${mode}Date`].current = context[`${mode}Date`]
    }

    const fallback = temporaryDates[`${mode}Date`].current

    // provide fallbacks to create a temp fallback
    const year =
      dateRefs[`${mode}Year`]?.current ||
      (fallback && fallback.getFullYear())
    const month =
      dateRefs[`${mode}Month`]?.current ||
      (fallback && fallback.getMonth() + 1)
    const day =
      dateRefs[`${mode}Day`]?.current || (fallback && fallback.getDate())

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
      callOnChange({
        [`${mode}Date`]: date,
        event,
      })
    } else {
      context.updateState({ [`${mode}Date`]: null })
      context.updateState({ [`__${mode}${type}`]: value })

      callOnChangeAsInvalid({
        [`${mode}Date`]: null,
        event,
      })
    }

    callOnType({
      event,
    })
  }

  function renderInputElement(params) {
    const { id, isRange } = props
    refList.current = []
    const startDateList = generateDateList(params, 'start')
    const endDateList = generateDateList(params, 'end')

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

  function getPlaceholderChar(value) {
    const index = props.maskOrder.indexOf(value)
    return props.maskPlaceholder[index]
  }

  function generateDateList(params, mode) {
    return maskList.map((value, i) => {
      const state = value.slice(0, 1)
      const placeholderChar = getPlaceholderChar(value)
      const { input_element, separatorRexExp, isRange, size } = props
      const { day, month, year } = context.translation.DatePicker
      const isRangeLabel = isRange
        ? `${context.translation.DatePicker[mode]} `
        : ''

      if (!separatorRexExp.test(value)) {
        if (!input_element) {
          params = {
            ...params,
            onKeyDown: onKeyDownHandler,
            onPaste: shortcutHandler,
            onFocus: (e) => {
              focusMode.current = mode
              onFocusHandler(e)
            },
            onBlur: onBlurHandler,
            placeholderChar,
          }
        }

        // this makes it possible to use a vanilla <input /> like: input_element="input"
        const DateField =
          input_element && React.isValidElement(input_element)
            ? input_element.type
            : InputElement

        const inputSizeClassName =
          size && `dnb-date-picker__input--${size}`

        switch (state) {
          case 'd':
            refList.current.push(inputRefs[`${mode}DayRef`])

            return (
              <React.Fragment key={'dd' + i}>
                <DateField
                  {...params}
                  id={`${props.id}-${mode}-day`}
                  key={'di' + i}
                  className={classnames(
                    params.className,
                    'dnb-date-picker__input',
                    'dnb-date-picker__input--day',
                    inputSizeClassName
                  )}
                  size="2"
                  mask={[/[0-3]/, /[0-9]/]}
                  inputRef={inputRefs[`${mode}DayRef`]}
                  onChange={dateSetters[`set_${mode}Day`]}
                  value={context[`__${mode}Day`] || ''}
                  aria-labelledby={`${props.id}-${mode}-day-label`}
                />
                <label
                  key={'dl' + i}
                  hidden
                  id={`${props.id}-${mode}-day-label`}
                  htmlFor={`${props.id}-${mode}-day`}
                >
                  {isRangeLabel + day}
                </label>
              </React.Fragment>
            )
          case 'm':
            refList.current.push(inputRefs[`${mode}MonthRef`])

            return (
              <React.Fragment key={'mm' + i}>
                <DateField
                  {...params}
                  id={`${props.id}-${mode}-month`}
                  key={'mi' + i}
                  className={classnames(
                    params.className,
                    'dnb-date-picker__input',
                    'dnb-date-picker__input--month',
                    inputSizeClassName
                  )}
                  size="2"
                  mask={[/[0-1]/, /[0-9]/]}
                  inputRef={inputRefs[`${mode}MonthRef`]}
                  onChange={dateSetters[`set_${mode}Month`]}
                  value={context[`__${mode}Month`] || ''}
                  aria-labelledby={`${props.id}-${mode}-month-label`}
                />
                <label
                  key={'ml' + i}
                  hidden
                  id={`${props.id}-${mode}-month-label`}
                  htmlFor={`${props.id}-${mode}-month`}
                >
                  {isRangeLabel + month}
                </label>
              </React.Fragment>
            )
          case 'y':
            refList.current.push(inputRefs[`${mode}YearRef`])

            return (
              <React.Fragment key={'yy' + i}>
                <DateField
                  {...params}
                  id={`${props.id}-${mode}-year`}
                  key={'yi' + i}
                  className={classnames(
                    params.className,
                    'dnb-date-picker__input',
                    'dnb-date-picker__input--year',
                    inputSizeClassName
                  )}
                  size="4"
                  mask={[/[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                  inputRef={inputRefs[`${mode}YearRef`]}
                  onChange={dateSetters[`set_${mode}Year`]}
                  value={context[`__${mode}Year`] || ''}
                  aria-labelledby={`${props.id}-${mode}-year-label`}
                />
                <label
                  key={'yl' + i}
                  hidden
                  id={`${props.id}-${mode}-year-label`}
                  htmlFor={`${props.id}-${mode}-year`}
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

  function formatDate() {
    const { open_picker_text } = context.translation.DatePicker

    const { selectedDateTitle } = props

    return selectedDateTitle
      ? `${selectedDateTitle}, ${open_picker_text}`
      : open_picker_text
  }

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
    size,
    status,
    status_state,
    status_props,

    ...attributes
  } = props

  validateDOMAttributes(props, attributes)
  validateDOMAttributes(null, submitAttributes)

  const UsedButton = (props) => {
    return showInput ? <SubmitButton {...props} /> : <Button {...props} />
  }

  if (!showInput) {
    // Use Button inner ref
    submitAttributes.innerRef = submitAttributes.ref
    submitAttributes.ref = null
  }

  // Fix lang.code type casting
  return (
    <fieldset
      className="dnb-date-picker__fieldset"
      lang={locale?.code as string}
    >
      {context.props.label && (
        <legend className="dnb-sr-only">{context.props.label}</legend>
      )}
      <Input
        id={`${id}__input`}
        input_state={disabled ? 'disabled' : focusState}
        input_element={
          input_element && typeof input_element !== 'string'
            ? typeof input_element === 'function'
              ? input_element(props)
              : input_element
            : renderInputElement
        }
        disabled={disabled || skeleton}
        skeleton={skeleton}
        size={size}
        status={!opened ? status : null}
        status_state={status_state}
        {...status_props}
        submit_element={
          <UsedButton
            id={id}
            disabled={disabled}
            skeleton={skeleton}
            className={classnames(
              showInput && 'dnb-button--input-button',
              opened ? 'dnb-button--active' : null
            )}
            aria-label={formatDate()}
            title={title}
            size={size}
            status={status}
            status_state={status_state}
            type="button"
            icon="calendar"
            variant="secondary"
            on_submit={onSubmit}
            on_click={onSubmit}
            {...submitAttributes}
            {...status_props}
          />
        }
        lang={locale?.code as string}
        {...attributes}
      />
    </fieldset>
  )
}

export default DatePickerInput

const selectAll = (target) => {
  target.focus()
  target.select()
}

function InputElement(props: TextMaskProps) {
  return (
    <TextMask
      guide={true}
      showMask={true}
      keepCharPositions={false} // so we can overwrite next value, if it already exists
      autoComplete="off"
      autoCapitalize="none"
      spellCheck={false}
      autoCorrect="off"
      {...props}
    />
  )
}

const wait = (t) => new Promise((r) => setTimeout(r, t))
