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
import { ReturnObject } from './DatePickerProvider'
import { DatePickerEvent, DatePickerEventAttributes } from './DatePicker'

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
  onSubmit?: (
    event: DatePickerEvent<React.FormEvent<HTMLInputElement>>
  ) => void
  onChange?: (
    event: ReturnObject<React.ChangeEvent<HTMLInputElement>>
  ) => void
  /**
   * Will be called once the input gets focus.
   */
  onFocus?: (
    event: DatePickerEvent<React.FocusEvent<HTMLInputElement>>
  ) => void
  /**
   * Will be called once the input lose focus.
   */
  onBlur?: (
    event: DatePickerEvent<React.FocusEvent<HTMLInputElement>>
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

  const [focusState, setFocusState] = useState<string>('virgin')
  const [partialDates, setpartialDates] = useState({
    partialStartDate: '',
    partialEndDate: '',
  })

  const context = useContext(DatePickerContext)

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

  const focusMode = useRef(null)
  const maskList = useMemo(() => {
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
  }, [props])

  const pasteHandler = useCallback(
    async (event: React.ClipboardEvent<HTMLInputElement>) => {
      if (focusMode.current) {
        const success = (
          event.clipboardData ||
          (typeof window !== 'undefined' && window['clipboardData'])
        ).getData('text')

        if (success) {
          event.preventDefault()
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

            if (date) {
              context.updateDates({
                [mode]: date,
              })
            }
          } catch (e) {
            warn(e)
          }
        }
      }
    },
    [context]
  )

  const callOnChangeAsInvalid = useCallback(
    (state: {
      endDate?: Date
      starDate?: Date
      event: React.ChangeEvent<HTMLInputElement>
    }) => {
      context.updateDates(
        {
          hoverDate: null,
        },
        (forward) => {
          if (context.hasHadValidDate) {
            const { startDate, endDate, event } = {
              ...context,
              ...state,
              ...forward,
            }
            context.callOnChangeHandler({ startDate, endDate, event })
          }
        }
      )
    },
    [context]
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
      if (!props.isRange) {
        endDate = startDate
      }
      if (typeof endDate !== 'undefined' && isValid(endDate)) {
        state['endDate'] = endDate
      }

      context.updateDates(state, (forward) => {
        if (
          (typeof startDate !== 'undefined' && isValid(startDate)) ||
          (typeof endDate !== 'undefined' && isValid(endDate))
        ) {
          context.callOnChangeHandler({ event, ...forward })
        }
      })
    },
    [context, props]
  )

  const callOnType = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const getDates = () =>
        ['start', 'end'].reduce(
          (acc, mode) => {
            acc[`${mode}Date`] = [
              dateRefs[`${mode}Year`].current ||
                context[`__${mode}Year`] ||
                'yyyy',
              dateRefs[`${mode}Month`].current ||
                context[`__${mode}Month`] ||
                'mm',
              dateRefs[`${mode}Day`].current ||
                context[`__${mode}Day`] ||
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

      let returnObject = context.getReturnObject({
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
    },
    [context, dateRefs, props]
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
      console.log('prepareCounting', event)
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
    },
    [callOnChange, context]
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

      props?.onFocus?.({
        ...event,
        ...context.getReturnObject({ event }),
      })
    },
    [context, props]
  )

  const onBlurHandler = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      focusMode.current = null
      setFocusState('blur')

      props?.onBlur?.({
        ...event,
        ...context.getReturnObject({ event }),
        ...partialDates,
      })
    },
    [props, context, partialDates]
  )

  const onKeyDownHandler = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      const keyCode = event.code
      const target = event.target as HTMLInputElement

      if (target.selectionStart !== target.selectionEnd) {
        selectStart(target)
      }

      // only to process key up and down press
      if (keyCode === 'ArrowUp' || keyCode === 'ArrowDown') {
        event.persist()
        event.preventDefault()
        prepareCounting({ event, keyCode, target })
        return false
      }

      if (keyCode === 'Tab') {
        return false
      }

      // the rest is for value entry
      const size = parseFloat(target.getAttribute('size'))
      const firstSelectionStart = target.selectionStart

      await wait(1) // to get the correct position afterwards

      const secondSelectionStart = target.selectionStart
      const isValid = /[0-9]/.test(keyCode)
      const refListArray = refList.current

      const index = refListArray.findIndex(
        ({ current }) => current === target
      )

      if (
        index < refListArray.length - 1 &&
        ((secondSelectionStart === size &&
          isValid &&
          keyCode !== 'left' &&
          keyCode !== 'backspace') ||
          (firstSelectionStart === size && keyCode === 'right'))
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
          case 'left':
          case 'backspace':
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

  const dateSetters = {
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
  }

  // HERE BE DEPENDENCY
  const setDate = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      mode: 'start' | 'end',
      type: 'Day' | 'Month' | 'Year'
    ) => {
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
        context.updateDates({
          [`${mode}Date`]: null,
        })
        context.updateDates({
          [`__${mode}${type}`]: value,
        })

        callOnChangeAsInvalid({
          [`${mode}Date`]: null,
          event,
        })
      }

      callOnType(event)
    },
    [
      callOnChange,
      callOnChangeAsInvalid,
      callOnType,
      context,
      dateRefs,
      temporaryDates,
    ]
  )

  const getPlaceholderChar = useCallback(
    (value: string) => {
      const index = props.maskOrder.indexOf(value)
      return props.maskPlaceholder[index]
    },
    [props]
  )

  const generateDateList = useCallback(
    (
      element: Omit<React.HTMLProps<HTMLInputElement>, 'size'> &
        DatePickerEventAttributes,
      mode: 'start' | 'end'
    ) => {
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
                    id={`${props.id}-${mode}-day`}
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
                    {...element}
                    id={`${props.id}-${mode}-month`}
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
                    {...element}
                    id={`${props.id}-${mode}-year`}
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
    },
    [
      context,
      dateSetters,
      inputRefs,
      maskList,
      onBlurHandler,
      onFocusHandler,
      getPlaceholderChar,
      pasteHandler,
      onKeyDownHandler,
      props,
    ]
  )

  // HERE BE DEPENDENCY
  const renderInputElement = useCallback(
    (
      element: React.HTMLProps<HTMLInputElement> &
        DatePickerEventAttributes
    ) => {
      const { id, isRange } = props
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
    [props, generateDateList]
  )

  const formatDate = useMemo(() => {
    const { open_picker_text } = context.translation.DatePicker

    const { selectedDateTitle } = props

    return selectedDateTitle
      ? `${selectedDateTitle}, ${open_picker_text}`
      : open_picker_text
  }, [context, props])

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
    onBlur, // eslint-disable-line
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

  validateDOMAttributes(props, attributes)
  validateDOMAttributes(null, submitAttributes)

  const UsedButton: React.ElementType = showInput ? SubmitButton : Button

  if (!showInput) {
    // Use Button inner ref
    submitAttributes.innerRef = submitAttributes.ref
    submitAttributes.ref = null
  }

  return (
    <fieldset className="dnb-date-picker__fieldset" lang={lang}>
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
