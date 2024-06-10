/**
 * Web DatePicker Component
 *
 */

import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useMemo,
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
import { warn, validateDOMAttributes } from '../../shared/component-helper'
import { convertStringToDate } from './DatePickerCalc'
import DatePickerContext from './DatePickerContext'

import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText,
} from '../FormStatus'
import type { SkeletonShow } from '../Skeleton'
import { ReturnObject } from './DatePickerProvider'
import { DatePickerEventAttributes } from './DatePicker'
import { useTranslation } from '../../shared'

export type DatePickerInputProps = Omit<
  React.HTMLProps<HTMLElement>,
  | 'children'
  | 'ref'
  | 'value'
  | 'size'
  | 'onFocus'
  | 'onBlur'
  | 'onSubmit'
  | 'label'
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
  onSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onChange?: (
    event: ReturnObject<React.ChangeEvent<HTMLInputElement>>
  ) => void
  /**
   * Will be called once the input gets focus.
   */
  onFocus?: (
    event: ReturnObject<React.FocusEvent<HTMLInputElement>>
  ) => void
  /**
   * Will be called once the input lose focus.
   */
  onBlur?: (
    event: ReturnObject<React.FocusEvent<HTMLInputElement>>
  ) => void
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

  const {
    isRange,
    maskOrder,
    separatorRexExp,
    id,
    title,
    submitAttributes,
    maskPlaceholder, // eslint-disable-line
    onFocus,
    onBlur,
    onChange, // eslint-disable-line
    onSubmit, // eslint-disable-line
    selectedDateTitle, // eslint-disable-line
    showInput, // eslint-disable-line
    input_element,
    lang,
    disabled,
    skeleton,
    opened,
    size,
    status,
    status_state,
    status_props,

    ...attributes
  } = props

  const [focusState, setFocusState] = useState<string>('virgin')
  const [partialDates, setpartialDates] = useState({
    partialStartDate: '',
    partialEndDate: '',
  })

  const {
    updateDates,
    callOnChangeHandler,
    hasHadValidDate,
    getReturnObject,
    __startDay,
    __startMonth,
    __startYear,
    __endDay,
    __endMonth,
    __endYear,
    startDate,
    endDate,
    props: { on_type, label },
  } = useContext(DatePickerContext)

  const translation = useTranslation().DatePicker

  const modeDate = useMemo(
    () => ({
      startDate,
      endDate,
    }),
    [startDate, endDate]
  )

  const inputDates = useMemo(
    () => ({
      __startDay,
      __startMonth,
      __startYear,
      __endDay,
      __endMonth,
      __endYear,
    }),
    [
      __startDay,
      __startMonth,
      __startYear,
      __endDay,
      __endMonth,
      __endYear,
    ]
  )

  // Used in reflist, and initatied inside object to to maintain the way of accessing mimic `this`, used in this component
  // Should probably refactor at one point, or move to own hook
  const startDayRef = useRef<HTMLInputElement>(null)
  const startMonthRef = useRef<HTMLInputElement>(null)
  const startYearRef = useRef<HTMLInputElement>(null)
  const endDayRef = useRef<HTMLInputElement>(null)
  const endMonthRef = useRef<HTMLInputElement>(null)
  const endYearRef = useRef<HTMLInputElement>(null)

  const inputRefs = useMemo(
    () => ({
      startDayRef,
      startMonthRef,
      startYearRef,
      endDayRef,
      endMonthRef,
      endYearRef,
    }),
    []
  )

  // TODO: Move to it's own hook
  const startDayDateRef = useRef<string>(null)
  const endDayDateRef = useRef<string>(null)
  const startMonthDateRef = useRef<string>(null)
  const endMonthDateRef = useRef<string>(null)
  const startYearDateRef = useRef<string>(null)
  const endYearDateRef = useRef<string>(null)

  const dateRefs = useMemo(
    () => ({
      startDay: startDayDateRef,
      startMonth: endDayDateRef,
      startYear: startMonthDateRef,
      endDay: endMonthDateRef,
      endMonth: startYearDateRef,
      endYear: endYearDateRef,
    }),
    []
  )

  const startDateRef = useRef<Date>(null)
  const endDateRef = useRef<Date>(null)

  const temporaryDates = useMemo(
    () => ({ startDate: startDateRef, endDate: endDateRef }),
    []
  )

  const refList = useRef<Array<MutableRefObject<HTMLInputElement>>>(null)

  const focusMode = useRef<string>(null)

  const maskList = useMemo(() => {
    const separators = maskOrder.match(separatorRexExp)

    return maskOrder
      .split(separatorRexExp)
      .reduce<Array<string>>((acc, cur) => {
        if (!cur) {
          return acc
        }

        acc.push(cur)

        if (separators.length > 0) {
          // makes sure that seperators are added at the correct places and removed from array when added
          acc.push(separators.shift())
        }

        return acc
      }, [])
  }, [maskOrder, separatorRexExp])

  const pasteHandler = useCallback(
    async (event: React.ClipboardEvent<HTMLInputElement>) => {
      if (!focusMode.current) {
        return // Stop here
      }

      const success = (
        event.clipboardData ||
        (typeof window !== 'undefined' && window['clipboardData'])
      ).getData('text')

      if (!success) {
        return // Stop here
      }

      event.preventDefault()

      try {
        const separators = ['.', '/']
        const possibleFormats = ['yyyy-MM-dd']

        // TODO: Merge these loops
        possibleFormats.forEach((date) => {
          separators.forEach((sep) => {
            possibleFormats.push(date.replace(/-/g, sep))
          })
        })

        possibleFormats.forEach((date) => {
          possibleFormats.push(date.split('').reverse().join(''))
        })

        let date: Date
        let index = 0

        for (index; index < possibleFormats.length; ++index) {
          date = convertStringToDate(success, {
            date_format: possibleFormats[index],
          })

          if (date) {
            break
          }
        }

        const mode =
          focusMode.current === 'start' ? 'startDate' : 'endDate'

        if (date) {
          updateDates({
            [mode]: date,
          })
        }
      } catch (error: unknown) {
        warn(error)
      }
    },
    [updateDates]
  )

  const callOnChangeAsInvalid = useCallback(
    (state: {
      endDate?: Date
      starDate?: Date
      event: React.ChangeEvent<HTMLInputElement>
    }) => {
      updateDates(
        {
          hoverDate: null,
        },
        (dates) => {
          if (hasHadValidDate) {
            const { startDate, endDate, event } = {
              ...state,
              ...dates,
            }
            callOnChangeHandler({ startDate, endDate, event })
          }
        }
      )
    },
    [updateDates, callOnChangeHandler, hasHadValidDate]
  )

  const callOnChange = useCallback(
    ({
      startDate,
      endDate,
      event,
    }: {
      startDate?: Date
      endDate?: Date
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.KeyboardEvent<HTMLInputElement>
    }) => {
      const state = {}
      if (typeof startDate !== 'undefined' && isValid(startDate)) {
        state['startDate'] = startDate
      }
      if (!isRange) {
        endDate = startDate
      }
      if (typeof endDate !== 'undefined' && isValid(endDate)) {
        state['endDate'] = endDate
      }

      updateDates(state, (dates) => {
        if (
          (typeof startDate !== 'undefined' && isValid(startDate)) ||
          (typeof endDate !== 'undefined' && isValid(endDate))
        ) {
          callOnChangeHandler({ event, ...dates })
        }
      })
    },
    [updateDates, callOnChangeHandler, isRange]
  )

  const callOnType = useCallback(
    ({ event }: { event: React.ChangeEvent<HTMLInputElement> }) => {
      const getDates = () =>
        ['start', 'end'].reduce(
          (acc, mode) => {
            acc[`${mode}Date`] = [
              dateRefs[`${mode}Year`].current ||
                inputDates[`__${mode}Year`] ||
                'yyyy',
              dateRefs[`${mode}Month`].current ||
                inputDates[`__${mode}Month`] ||
                'mm',
              dateRefs[`${mode}Day`].current ||
                inputDates[`__${mode}Day`] ||
                'dd',
            ].join('-')
            return acc
          },
          { startDate: undefined, endDate: undefined }
        )

      // Get the typed dates, so we can ...
      let { startDate, endDate } = getDates()
      // Get the partial dates, so we can know if something was typed or not in an optional date field
      const partialStartDate = startDate
      const partialEndDate = endDate

      setpartialDates({
        partialStartDate,
        partialEndDate,
      })

      startDate = parseISO(startDate)
      endDate = parseISO(endDate)

      // ... check if they were valid
      if (!isValid(startDate)) {
        startDate = null
      }
      if (!isValid(endDate)) {
        endDate = null
      }

      let returnObject = getReturnObject({
        startDate,
        endDate,
        event,
        partialStartDate,
        partialEndDate,
      })

      // Now, lets correct
      if (
        returnObject.is_valid === false ||
        returnObject.is_valid_start_date === false ||
        returnObject.is_valid_end_date === false
      ) {
        const { startDate, endDate } = getDates()

        const typedDates = isRange
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

      on_type?.({ ...returnObject })
    },
    [isRange, dateRefs, getReturnObject, inputDates, on_type]
  )

  const prepareCounting = useCallback(
    async ({
      keyCode,
      target,
      event,
    }: {
      keyCode: string
      target: HTMLInputElement
      event: React.KeyboardEvent<HTMLInputElement>
    }) => {
      try {
        const isDate = target
          .getAttribute('class')
          .match(/__input--([day|month|year]+)($|\s)/)[1]

        const isInRange = target
          .getAttribute('id')
          .match(/-([start|end]+)-/)[1]

        let date = isInRange === 'start' ? startDate : endDate

        // do nothing if date is not set yet
        if (!date) {
          return
        }

        const count = keyCode === 'ArrowUp' ? 1 : -1

        if (keyCode === 'ArrowUp' || keyCode === 'ArrowDown') {
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
    },
    [startDate, endDate, callOnChange]
  )

  const selectStart = useCallback((target: HTMLInputElement) => {
    target.focus()
    target.setSelectionRange(0, 0)
  }, [])

  const onFocusHandler = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      try {
        selectAll(event.target)
      } catch (e) {
        warn(e)
      }

      setFocusState('focus')

      onFocus?.({
        ...event,
        ...getReturnObject({ event }),
      })
    },
    [getReturnObject, onFocus]
  )

  const onBlurHandler = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      focusMode.current = null
      setFocusState('blur')

      onBlur?.({
        ...event,
        ...getReturnObject({ event }),
        ...partialDates,
      })
    },
    [onBlur, getReturnObject, partialDates]
  )

  const onKeyDownHandler = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      const keyCode = event.key
      const target = event.target as HTMLInputElement

      if (target.selectionStart !== target.selectionEnd) {
        selectStart(target)
      }

      // only to process key up and down press
      switch (keyCode) {
        case 'ArrowUp':
        case 'ArrowDown':
          event.persist()
          event.preventDefault()
          prepareCounting({ event, keyCode, target })
          return false
        // Never fires
        case 'Tab':
          // case 'backspace': // We need backspace down here
          return false
      }

      // the rest is for value entry

      const size = parseFloat(target.getAttribute('size'))
      const firstSelectionStart = target.selectionStart

      await wait(1) // to get the correct position afterwards

      const secondSelectionStart = target.selectionStart
      // Always false (since the old keycode function set number keys to undefined) but needed to not break tests
      const isValid = /[0-9]/g.test(keyCode)
      const refListArray = refList.current

      const index = refListArray.findIndex(
        ({ current }) => current === target
      )

      if (
        index < refListArray.length - 1 &&
        ((secondSelectionStart === size &&
          isValid &&
          keyCode !== 'ArrowLeft' &&
          keyCode !== 'Backspace') ||
          (firstSelectionStart === size && keyCode === 'ArrowRight'))
      ) {
        try {
          // stop in case there is no next input element
          if (!refListArray[index + 1].current) {
            return
          }
          const nextSibling = refListArray[index + 1].current
          if (nextSibling) {
            nextSibling.focus()
            nextSibling.setSelectionRange(0, 0)
          }
        } catch (e) {
          warn(e)
        }
      } else if (firstSelectionStart === 0 && index > 0) {
        switch (keyCode) {
          case 'ArrowLeft':
          case 'Backspace':
            try {
              const prevSibling = refListArray[index - 1].current
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
    },
    [prepareCounting, selectStart]
  )

  const setDate = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      mode: 'start' | 'end',
      type: 'Day' | 'Month' | 'Year'
    ) => {
      event.persist() // since we have later a state update and afterwards the callback

      const value = (event.target as HTMLInputElement).value

      dateRefs[`${mode}${type}`].current = value

      if (modeDate[`${mode}Date`]) {
        temporaryDates[`${mode}Date`].current = modeDate[`${mode}Date`]
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
        parseFloat(String(year)),
        parseFloat(String(month)) - 1,
        parseFloat(String(day))
      )

      const isValidDate =
        !/[^0-9]/.test(String(day)) &&
        !/[^0-9]/.test(String(month)) &&
        !/[^0-9]/.test(String(year)) &&
        isValid(date) &&
        date.getDate() == parseFloat(String(day)) &&
        date.getMonth() + 1 == parseFloat(String(month)) &&
        date.getFullYear() == parseFloat(String(year))

      // update the date
      if (isValidDate) {
        callOnChange({
          [`${mode}Date`]: date,
          event,
        })
      } else {
        updateDates({
          [`${mode}Date`]: null,
          [`__${mode}${type}`]: value,
        })

        callOnChangeAsInvalid({
          [`${mode}Date`]: null,
          event,
        })
      }

      callOnType({ event })
    },
    [
      updateDates,
      callOnChange,
      callOnChangeAsInvalid,
      callOnType,
      modeDate,
      dateRefs,
      temporaryDates,
    ]
  )

  const dateSetters = useMemo(
    () => ({
      set_startDay: (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event, 'start', 'Day')
      },

      set_startMonth: (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event, 'start', 'Month')
      },

      set_startYear: (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event, 'start', 'Year')
      },

      set_endDay: (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event, 'end', 'Day')
      },

      set_endMonth: (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event, 'end', 'Month')
      },

      set_endYear: (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event, 'end', 'Year')
      },
    }),
    [setDate]
  )

  const getPlaceholderChar = useCallback(
    (value: string) => {
      const index = maskOrder.indexOf(value)
      return maskPlaceholder[index]
    },
    [maskOrder, maskPlaceholder]
  )

  // TODO: Replace with MutliInputMask
  const generateDateList = useCallback(
    (
      element: Omit<React.HTMLProps<HTMLInputElement>, 'size'> &
        DatePickerEventAttributes,
      mode: 'start' | 'end'
    ) => {
      return maskList.map((value, i) => {
        const state = value.slice(0, 1)
        const placeholderChar = getPlaceholderChar(value)
        const { day, month, year } = translation
        const isRangeLabel = isRange ? `${translation[mode]} ` : ''

        if (!separatorRexExp.test(value)) {
          if (!input_element) {
            element = {
              ...element,
              onKeyDown: onKeyDownHandler,
              onPaste: pasteHandler,
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
                    {...element}
                    id={`${id}-${mode}-day`}
                    key={'di' + i}
                    className={classnames(
                      element.className,
                      'dnb-date-picker__input',
                      'dnb-date-picker__input--day',
                      inputSizeClassName
                    )}
                    size={2}
                    mask={[/[0-3]/, /[0-9]/]}
                    inputRef={inputRefs[`${mode}DayRef`]}
                    onChange={dateSetters[`set_${mode}Day`]}
                    value={inputDates[`__${mode}Day`] || ''}
                    aria-labelledby={`${id}-${mode}-day-label`}
                  />
                  <label
                    key={'dl' + i}
                    hidden
                    id={`${id}-${mode}-day-label`}
                    htmlFor={`${id}-${mode}-day`}
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
                    {...element}
                    id={`${id}-${mode}-month`}
                    key={'mi' + i}
                    className={classnames(
                      element.className,
                      'dnb-date-picker__input',
                      'dnb-date-picker__input--month',
                      inputSizeClassName
                    )}
                    size={2}
                    mask={[/[0-1]/, /[0-9]/]}
                    inputRef={inputRefs[`${mode}MonthRef`]}
                    onChange={dateSetters[`set_${mode}Month`]}
                    value={inputDates[`__${mode}Month`] || ''}
                    aria-labelledby={`${id}-${mode}-month-label`}
                  />
                  <label
                    key={'ml' + i}
                    hidden
                    id={`${id}-${mode}-month-label`}
                    htmlFor={`${id}-${mode}-month`}
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
                    {...element}
                    id={`${id}-${mode}-year`}
                    key={'yi' + i}
                    className={classnames(
                      element.className,
                      'dnb-date-picker__input',
                      'dnb-date-picker__input--year',
                      inputSizeClassName
                    )}
                    size={4}
                    mask={[/[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                    inputRef={inputRefs[`${mode}YearRef`]}
                    onChange={dateSetters[`set_${mode}Year`]}
                    value={inputDates[`__${mode}Year`] || ''}
                    aria-labelledby={`${id}-${mode}-year-label`}
                  />
                  <label
                    key={'yl' + i}
                    hidden
                    id={`${id}-${mode}-year-label`}
                    htmlFor={`${id}-${mode}-year`}
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
    },
    [
      id,
      input_element,
      isRange,
      size,
      translation,
      separatorRexExp,
      dateSetters,
      inputRefs,
      maskList,
      onBlurHandler,
      onFocusHandler,
      getPlaceholderChar,
      pasteHandler,
      onKeyDownHandler,
      inputDates,
    ]
  )

  const renderInputElement = useCallback(
    (
      element: React.HTMLProps<HTMLInputElement> &
        DatePickerEventAttributes
    ) => {
      refList.current = []
      const startDateList = generateDateList(element, 'start')
      const endDateList = generateDateList(element, 'end')

      return (
        <span
          id={`${id}-input`}
          className="dnb-date-picker__input__wrapper"
        >
          {startDateList}
          {isRange && (
            <span className="dnb-date-picker--separator" aria-hidden>
              {' – '}
            </span>
          )}
          {isRange && endDateList}
        </span>
      )
    },
    [id, isRange, generateDateList]
  )

  const formatDate = useMemo(
    () =>
      selectedDateTitle
        ? `${selectedDateTitle}, ${translation.open_picker_text}`
        : translation.open_picker_text,
    [selectedDateTitle, translation]
  )

  validateDOMAttributes(props, attributes)
  validateDOMAttributes(null, submitAttributes)

  const SubmitElement: React.ElementType = useMemo(
    () => (showInput ? SubmitButton : Button),
    [showInput]
  )

  if (!showInput) {
    // Use Button inner ref
    submitAttributes.innerRef = submitAttributes.ref
    submitAttributes.ref = null
  }

  return (
    <fieldset className="dnb-date-picker__fieldset" lang={lang}>
      {label && <legend className="dnb-sr-only">{label}</legend>}
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
          <SubmitElement
            id={id}
            disabled={disabled}
            skeleton={skeleton}
            className={classnames(
              showInput && 'dnb-button--input-button',
              opened ? 'dnb-button--active' : null
            )}
            aria-label={formatDate}
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
        lang={lang}
        {...attributes}
      />
    </fieldset>
  )
}

export default DatePickerInput

function selectAll(target: HTMLInputElement) {
  target.focus()
  target.select()
}

function InputElement({ className, value, ...props }: TextMaskProps) {
  return (
    <TextMask
      guide={true}
      showMask={true}
      keepCharPositions={false} // so we can overwrite next value, if it already exists
      autoComplete="off"
      autoCapitalize="none"
      spellCheck={false}
      autoCorrect="off"
      className={classnames(
        className,
        /\d+/.test(String(value)) && 'dnb-date-picker__input--highlight'
      )}
      value={value}
      {...props}
    />
  )
}

const wait = (duration: number) =>
  new Promise((r) => setTimeout(r, duration))
