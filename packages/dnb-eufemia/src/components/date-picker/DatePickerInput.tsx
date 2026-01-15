/**
 * Web DatePicker Component
 *
 */

import React, {
  RefObject,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

// date-fns
import { isValid as isValidFn, parseISO } from 'date-fns'

import classnames from 'classnames'
import TextMask, { TextMaskProps } from '../input-masked/TextMask'
import Button from '../button/Button'
import Input, { SubmitButton } from '../input/Input'
import type { InputInputElement, InputSize } from '../Input'
import {
  warn,
  validateDOMAttributes,
  toCapitalized,
} from '../../shared/component-helper'
import { IS_ANDROID, IS_IOS } from '../../shared/helpers'
import { convertStringToDate } from './DatePickerCalc'
import DatePickerContext from './DatePickerContext'

import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText,
} from '../FormStatus'
import type { SkeletonShow } from '../Skeleton'
import { ReturnObject } from './DatePickerProvider'
import { DatePickerEventAttributes, DatePickerProps } from './DatePicker'
import { Context, useTranslation } from '../../shared'
import usePartialDates from './hooks/usePartialDates'
import useInputDates, { DatePickerInputDates } from './hooks/useInputDates'
import { formatDate } from '../date-format/DateFormatUtils'

export type DatePickerInputProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  | 'children'
  | 'ref'
  | 'value'
  | 'size'
  | 'onFocus'
  | 'onBlur'
  | 'onSubmit'
  | 'label'
> & {
  selectedDateTitle?: string
  maskOrder?: DatePickerProps['maskOrder']
  maskPlaceholder?: DatePickerProps['maskPlaceholder']
  separatorRegExp?: RegExp
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
  statusState?: FormStatusState
  /**
   * Use an object to define additional FormStatus properties.
   */
  statusProps?: FormStatusProps
  /**
   * Gives you the possibility to use a plain/vanilla `<input />` HTML element by defining it as a string `inputElement="input"`, a React element, or a render function `inputElement={(internalProps) => (<Return />)}`. Can also be used in circumstances where the `react-text-mask` not should be used, e.g. in testing environments. Defaults to custom masked input.
   */
  inputElement?: InputInputElement
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

export type InvalidDates = {
  invalidDate?: string
  invalidStartDate?: string
  invalidEndDate?: string
}

const defaultProps: DatePickerInputProps = {
  separatorRegExp: /[-/ ]/g,
  statusState: 'error',
  opened: false,
}

function DatePickerInput(externalProps: DatePickerInputProps) {
  const props = { ...defaultProps, ...externalProps }

  const {
    maskOrder: defaultMaskOrder,
    maskPlaceholder: defaultMaskPlaceholder,
  } = useTranslation().DatePicker

  const {
    isRange,
    maskOrder = defaultMaskOrder,
    separatorRegExp,
    id,
    title,
    submitAttributes,
    maskPlaceholder = defaultMaskPlaceholder, // eslint-disable-line
    onFocus,
    onBlur,
    onChange, // eslint-disable-line
    onSubmit, // eslint-disable-line
    selectedDateTitle, // eslint-disable-line
    showInput, // eslint-disable-line
    inputElement,
    lang,
    disabled,
    skeleton,
    opened,
    size,
    status,
    statusState,
    statusProps,

    ...attributes
  } = props
  const [focusState, setFocusState] = useState<string>('virgin')

  const { partialDatesRef, setPartialDates } = usePartialDates()

  const invalidDatesRef = useRef<InvalidDates>({
    invalidStartDate: null,
    invalidEndDate: null,
  })
  const isDateFullyFilledOutRef = useRef(false)

  const {
    updateDates,
    callOnChangeHandler,
    getReturnObject,
    startDate,
    endDate,
    props: { onType, label },
  } = useContext(DatePickerContext)

  const { inputDates, updateInputDates } = useInputDates({
    startDate,
    endDate,
  })

  const translation = useTranslation().DatePicker
  const { locale } = useContext(Context)

  const hasHadValidDate = isValidFn(startDate) || isValidFn(endDate)

  const modeDate = useMemo(
    () => ({
      startDate,
      endDate,
    }),
    [startDate, endDate]
  )

  const inputRefs = useRef<Record<string, RefObject<HTMLInputElement>>>({
    startDayRef: { current: undefined },
    startMonthRef: { current: undefined },
    startYearRef: { current: undefined },
    endDayRef: { current: undefined },
    endMonthRef: { current: undefined },
    endYearRef: { current: undefined },
  })

  const dateRefs = useRef<DatePickerInputDates>({
    startDay: '',
    startMonth: '',
    startYear: '',
    endDay: '',
    endMonth: '',
    endYear: '',
  })

  // Keep dateRefs in sync with inputDates on re-render
  syncDateRefs(dateRefs, inputDates)

  const temporaryDates = useRef<Record<string, Date>>({
    startDate: undefined,
    endDate: undefined,
  })

  const refList = useRef<Array<RefObject<HTMLInputElement>>>(undefined)

  const focusMode = useRef<string>(undefined)

  const maskList = useMemo(() => {
    const separators = maskOrder.match(separatorRegExp)

    return maskOrder
      .split(separatorRegExp)
      .reduce<Array<string>>((acc, cur) => {
        if (!cur) {
          return acc
        }

        acc.push(cur)

        if (separators.length > 0) {
          // makes sure that separators are added at the correct places and removed from array when added
          acc.push(separators.shift())
        }

        return acc
      }, [])
  }, [maskOrder, separatorRegExp])

  const copyHandler = useCallback(
    (
      event: React.ClipboardEvent<HTMLInputElement>,
      mode: DatePickerEventAttributes['mode']
    ) => {
      const date = mode === 'end' ? endDate : startDate
      if (isValidFn(date)) {
        event.preventDefault()
        const valueToCopy = formatDate(date, { locale })
        event.clipboardData.setData('text/plain', valueToCopy)
      }
    },
    [endDate, locale, startDate]
  )

  const pasteHandler = useCallback(
    async (event: React.ClipboardEvent<HTMLInputElement>) => {
      if (!focusMode.current) {
        return // Stop here
      }

      const success = (
        event.clipboardData ||
        (typeof window !== 'undefined' && window['clipboardData'])
      ).getData('text/plain')

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
            dateFormat: possibleFormats[index],
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
    (params: {
      endDate?: Date
      startDate?: Date
      event: React.ChangeEvent<HTMLInputElement>
    }) => {
      // Should fire if user has filled out an invalid date,
      // or if the date was valid. Like if the user has pressed backspace or removed the valid date.
      if (isDateFullyFilledOutRef.current || hasHadValidDate) {
        const datesFromContext = { startDate, endDate }

        const {
          startDate: derivedStartDate,
          endDate: derivedEndDate,
          event,
        } = {
          ...datesFromContext,
          ...params,
        }

        callOnChangeHandler({
          startDate: derivedStartDate,
          endDate: derivedEndDate,
          event,
          ...invalidDatesRef.current,
        })
      }
    },
    [callOnChangeHandler, hasHadValidDate, startDate, endDate]
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
      if (typeof startDate !== 'undefined' && isValidFn(startDate)) {
        state['startDate'] = startDate
      }
      if (!isRange) {
        endDate = startDate
      }
      if (typeof endDate !== 'undefined' && isValidFn(endDate)) {
        state['endDate'] = endDate
      }

      updateDates(state, (dates) => {
        if (
          (typeof startDate !== 'undefined' && isValidFn(startDate)) ||
          (typeof endDate !== 'undefined' && isValidFn(endDate))
        ) {
          callOnChangeHandler({
            event,
            ...dates,
            ...invalidDatesRef.current,
          })
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
              dateRefs.current[`${mode}Year`] ||
                inputDates[`${mode}Year`] ||
                'yyyy',
              dateRefs.current[`${mode}Month`] ||
                inputDates[`${mode}Month`] ||
                'mm',
              dateRefs.current[`${mode}Day`] ||
                inputDates[`${mode}Day`] ||
                'dd',
            ].join('-')
            return acc
          },
          { startDate: undefined, endDate: undefined }
        )

      // Get the typed dates, so we can ...
      const { startDate, endDate } = getDates()

      // Get the partial dates, so we can know if something was typed or not in an optional date field
      setPartialDates({
        partialStartDate: startDate,
        // Only set endDate if in range mode
        ...(isRange && { partialEndDate: endDate }),
      })

      const parsedStartDate = parseISO(startDate)
      const parsedEndDate = parseISO(endDate)

      const isStartDateValid = isValidFn(parsedStartDate)
      const isEndDateValid = isValidFn(parsedEndDate)

      const {
        isValid,
        isValidStartDate,
        isValidEndDate,
        ...returnObject
      } = getReturnObject({
        startDate: isStartDateValid ? parsedStartDate : null,
        endDate: isEndDateValid ? parsedEndDate : null,
        event,
        ...partialDatesRef.current,
        ...invalidDatesRef.current,
      })

      // Re-assigns dates to the typed date, instead of `null` from getReturnObject, if dates are invalid
      const typedDates = {
        ...(!isRange && isValid === false && { date: startDate }),
        ...(isRange &&
          isValidStartDate === false && { startDate: startDate }),
        ...(isRange && isValidEndDate === false && { endDate: endDate }),
      }

      onType?.({
        isValid,
        isValidStartDate,
        isValidEndDate,
        ...returnObject,
        ...typedDates,
      })
    },
    [
      setPartialDates,
      isRange,
      getReturnObject,
      partialDatesRef,
      onType,
      inputDates,
    ]
  )

  const setDate = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      mode: 'start' | 'end',
      type: 'Day' | 'Month' | 'Year'
    ) => {
      event.persist() // since we have later a state update and afterwards the callback

      const value = (event.target as HTMLInputElement).value

      dateRefs.current[`${mode}${type}`] = value

      if (modeDate[`${mode}Date`]) {
        temporaryDates.current[`${mode}Date`] = modeDate[`${mode}Date`]
      }

      const fallback = temporaryDates.current[`${mode}Date`]

      // provide fallbacks to create a temp fallback
      const year =
        dateRefs.current[`${mode}Year`] ||
        (fallback && fallback.getFullYear())
      const month =
        dateRefs.current[`${mode}Month`] ||
        (fallback && fallback.getMonth() + 1)
      const day =
        dateRefs.current[`${mode}Day`] || (fallback && fallback.getDate())

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
        isValidFn(date) &&
        date.getDate() === parseFloat(String(day)) &&
        date.getMonth() + 1 === parseFloat(String(month)) &&
        date.getFullYear() === parseFloat(String(year))

      const dateString = `${year}-${month}-${day}`

      isDateFullyFilledOutRef.current =
        /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(dateString)

      // update the date
      if (isValidDate) {
        invalidDatesRef.current = {
          ...invalidDatesRef.current,
          ...(mode === 'start'
            ? { invalidStartDate: null }
            : { invalidEndDate: null }),
        }

        callOnChange({
          [`${mode}Date`]: date,
          event,
        })
      } else {
        updateDates({
          [`${mode}Date`]: null,
        })
        updateInputDates({ [`${mode}${type}`]: value })

        invalidDatesRef.current = {
          ...invalidDatesRef.current,
          ...(mode === 'start'
            ? { invalidStartDate: dateString }
            : { invalidEndDate: dateString }),
        }

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
      updateInputDates,
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

  const onFocusHandler = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setFocusState('focus')

      onFocus?.({
        ...event,
        ...getReturnObject({ event }),
      })

      if (isNaN(parseFloat(event.target.value))) {
        setCursorPosition(event.target)
      }
    },
    [getReturnObject, onFocus]
  )

  const onBlurHandler = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      focusMode.current = null
      setFocusState('blur')

      onBlur?.({
        ...event,
        ...getReturnObject({ event, ...partialDatesRef.current }),
      })
    },
    [onBlur, getReturnObject, partialDatesRef]
  )

  const onKeyDownHandler = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      const keyCode = event.key
      const target = event.target as HTMLInputElement

      if (target.selectionStart !== target.selectionEnd) {
        setCursorPosition(target)
      }

      // The rest is for value entry

      const size = parseFloat(target.getAttribute('size'))
      const firstSelectionStart = target.selectionStart
      const firstSelectionEnd = target.selectionEnd

      // To get the correct position afterwards.
      // Use 10ms in order to make it work on iOS Safari
      await wait(IS_IOS ? 10 : 1)

      const secondSelectionStart = target.selectionStart

      // Always false (since the old keycode function set number keys to undefined) but needed to not break tests
      const isValid = /[0-9]/g.test(keyCode)
      const refListArray = refList.current

      const index = refListArray.findIndex(
        ({ current }) => current === target
      )

      const isLastChar = secondSelectionStart === size
      const isFirstChar = firstSelectionStart === size

      const isMovingForward =
        keyCode !== 'ArrowLeft' &&
        keyCode !== 'Backspace' &&
        isValid &&
        isLastChar

      const isExplicitForward =
        (keyCode === 'ArrowRight' || keyCode === 'Enter') && isFirstChar

      const hasNextField = index < refListArray.length - 1

      if (hasNextField && (isMovingForward || isExplicitForward)) {
        // stop in case there is no next input element
        if (!refListArray[index + 1].current) {
          return // stop here
        }
        const nextSibling = refListArray[index + 1]?.current

        if (nextSibling) {
          setCursorPosition(nextSibling, 0, { withoutDelay: true })
        }

        // When the cursor is at the end of the input
        // and the user types a number, we want to set the value on the next input.
        if (
          parseFloat(keyCode) <= 9 &&
          firstSelectionStart === target.size
        ) {
          const name = toCapitalized(
            nextSibling
              .getAttribute('class')
              .match(/__input--(day|month|year)($|\s)/)[1]
          )
          const mode = nextSibling
            .getAttribute('id')
            .match(/-(start|end)-(day|month|year)/)[1]

          dateSetters[`set_${mode}${name}`]({
            persist: () => null,
            ...event,
            target: {
              value: keyCode + nextSibling.value.slice(1),
            },
          })

          setCursorPosition(nextSibling, 1)
        }
      } else if (index > 0 && firstSelectionStart === firstSelectionEnd) {
        const isMovingBackward =
          keyCode === 'ArrowLeft' && firstSelectionStart === 0
        const isPressingBackspace =
          keyCode === 'Backspace' && firstSelectionStart <= 1

        if (isMovingBackward || isPressingBackspace) {
          const prevSibling = refListArray[index - 1]?.current
          if (prevSibling) {
            const endPos = prevSibling.value.length
            setCursorPosition(prevSibling, endPos, {
              withoutDelay: true,
            })
          }
        }
      }
    },
    [dateSetters]
  )

  const onInputHandler = useCallback(
    (event) => {
      const target = event.currentTarget

      // Add support for "backspace" on Android virtual keyboard
      if (
        IS_ANDROID &&
        event.nativeEvent.inputType === 'deleteContentBackward' &&
        target.selectionStart === 0 &&
        target.selectionEnd === 0
      ) {
        onKeyDownHandler({
          ...event,
          key: 'Backspace',
        })
      }
    },
    [onKeyDownHandler]
  )

  const getPlaceholderChar = useCallback(
    (value: string) => {
      const index = maskOrder.indexOf(value)
      return maskPlaceholder[index]
    },
    [maskOrder, maskPlaceholder]
  )

  // TODO: Replace with MultiInputMask
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

        if (!separatorRegExp.test(value)) {
          if (!inputElement) {
            element = {
              ...element,
              onInput: onInputHandler,
              onKeyDown: onKeyDownHandler,
              onFocus: (e) => {
                focusMode.current = mode
                onFocusHandler(e)
              },
              onBlur: onBlurHandler,
              onPaste: pasteHandler,
              onCopy: (event) => {
                copyHandler(event, mode)
              },
              placeholderChar,
            }
          }

          // this makes it possible to use a vanilla <input /> like: inputElement="input"
          const DateField =
            inputElement && React.isValidElement(inputElement)
              ? inputElement.type
              : InputElement

          const inputSizeClassName =
            size && `dnb-date-picker__input--${size}`

          switch (state) {
            case 'd':
              refList.current.push(inputRefs.current[`${mode}DayRef`])

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
                    mask={[/[0-9]/, /[0-9]/]}
                    inputRef={inputRefs.current[`${mode}DayRef`]}
                    onChange={dateSetters[`set_${mode}Day`]}
                    value={inputDates[`${mode}Day`] || ''}
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
              refList.current.push(inputRefs.current[`${mode}MonthRef`])

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
                    mask={[/[0-9]/, /[0-9]/]}
                    inputRef={inputRefs.current[`${mode}MonthRef`]}
                    onChange={dateSetters[`set_${mode}Month`]}
                    value={inputDates[`${mode}Month`] || ''}
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
              refList.current.push(inputRefs.current[`${mode}YearRef`])

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
                    mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                    inputRef={inputRefs.current[`${mode}YearRef`]}
                    onChange={dateSetters[`set_${mode}Year`]}
                    value={inputDates[`${mode}Year`] || ''}
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
      maskList,
      getPlaceholderChar,
      translation,
      isRange,
      separatorRegExp,
      inputElement,
      size,
      onInputHandler,
      onKeyDownHandler,
      onBlurHandler,
      pasteHandler,
      onFocusHandler,
      copyHandler,
      id,
      dateSetters,
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

  const ariaLabel = useMemo(
    () =>
      selectedDateTitle
        ? `${selectedDateTitle}, ${translation.openPickerText}`
        : translation.openPickerText,
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
        inputState={disabled ? 'disabled' : focusState}
        inputElement={
          inputElement && typeof inputElement !== 'string'
            ? typeof inputElement === 'function'
              ? inputElement(props)
              : inputElement
            : renderInputElement
        }
        disabled={disabled || skeleton}
        skeleton={skeleton}
        size={size}
        status={!opened ? status : null}
        statusState={statusState}
        {...statusProps}
        submitElement={
          <SubmitElement
            id={id}
            disabled={disabled}
            skeleton={skeleton}
            className={classnames(
              showInput && 'dnb-button--input-button',
              opened ? 'dnb-button--active' : null
            )}
            aria-label={ariaLabel}
            title={title}
            size={size}
            status={status}
            statusState={statusState}
            type="button"
            icon="calendar"
            variant="secondary"
            onSubmit={onSubmit}
            onClick={onSubmit}
            {...submitAttributes}
            {...statusProps}
          />
        }
        lang={lang}
        {...attributes}
      />
    </fieldset>
  )
}

export default DatePickerInput

function setCursorPosition(
  target: HTMLInputElement,
  position = 0,
  options?: { withoutDelay?: boolean }
) {
  target.focus()

  const select = () => {
    target.setSelectionRange(position, position)
  }

  // Delay for correct iOS Safari appearance
  if (!options?.withoutDelay && process.env.NODE_ENV !== 'test') {
    setTimeout(select, 0)
  } else {
    select()
  }
}

function InputElement({ className, value, ...props }: TextMaskProps) {
  return (
    <TextMask
      guide={true}
      inputMode="numeric"
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

function syncDateRefs(
  dateRefs: React.RefObject<DatePickerInputDates>,
  inputDates: DatePickerInputDates
) {
  for (const date in dateRefs.current) {
    const dateRefValue = dateRefs.current[date]
    const inputDateValue = inputDates[date]

    if (dateRefValue !== inputDateValue) {
      dateRefs.current[date] = inputDateValue
    }
  }
}

const wait = (duration: number) =>
  new Promise((r) => setTimeout(r, duration))
