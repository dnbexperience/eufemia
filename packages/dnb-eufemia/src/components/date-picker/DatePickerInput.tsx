/**
 * Web DatePicker Component
 *
 */

import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

// date-fns
import { isValid as isValidFn, parseISO } from 'date-fns'

import classnames from 'classnames'
import MultiInputMask, {
  type MultiInputMaskInput as MInputs,
  type MultiInputMaskValue as MValues,
} from '../input-masked/MultiInputMask'
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
import { DatePickerEventAttributes, DatePickerProps } from './DatePicker'
import { Context, useTranslation } from '../../shared'
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

  // Snapshot of last mask values to detect changed field reliably
  const lastMaskValuesRef = useRef<{
    start: { day: string; month: string; year: string }
    end: { day: string; month: string; year: string }
  }>({
    start: { day: '', month: '', year: '' },
    end: { day: '', month: '', year: '' },
  })

  const temporaryDates = useRef<Record<string, Date>>({
    startDate: undefined,
    endDate: undefined,
  })

  const focusMode = useRef<string>()

  // Build ordered parts from maskOrder (e.g., ['dd','mm','yyyy'])
  const orderedParts = useMemo(() => {
    return maskOrder
      .split(separatorRegExp)
      .filter(Boolean)
      .map((p) =>
        p.toLowerCase().startsWith('d')
          ? 'day'
          : p.toLowerCase().startsWith('m')
          ? 'month'
          : 'year'
      ) as Array<'day' | 'month' | 'year'>
  }, [maskOrder, separatorRegExp])

  // Extract delimiter from maskPlaceholder to align with visual format shown to user
  const delimiter = useMemo(() => {
    // Match common separator characters directly
    return maskPlaceholder.match(/[./-]/)?.[0]
  }, [maskPlaceholder])

  const getValues = useCallback(
    (mode: 'start' | 'end'): MValues<'day' | 'month' | 'year'> => {
      return {
        day: String(dateRefs.current[`${mode}Day`] || ''),
        month: String(dateRefs.current[`${mode}Month`] || ''),
        year: String(dateRefs.current[`${mode}Year`] || ''),
      }
    },
    []
  )

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
          // Update provider dates
          updateDates({
            [mode]: date,
          })

          // Also update input fields so values reflect immediately
          const mm = String(date.getMonth() + 1).padStart(2, '0')
          const dd = String(date.getDate()).padStart(2, '0')
          const yyyy = String(date.getFullYear()).padStart(4, '0')
          const m = focusMode.current === 'start' ? 'start' : 'end'

          dateRefs.current[`${m}Day`] = dd
          dateRefs.current[`${m}Month`] = mm
          dateRefs.current[`${m}Year`] = yyyy
          updateInputDates({
            [`${m}Day`]: dd,
            [`${m}Month`]: mm,
            [`${m}Year`]: yyyy,
          })
        }
      } catch (error: unknown) {
        warn(error)
      }
    },
    [updateDates, updateInputDates]
  )

  const buildInputs = useCallback(
    (mode: 'start' | 'end'): MInputs<'day' | 'month' | 'year'>[] => {
      const phChars = translation.placeholderCharacters || {
        day: 'd',
        month: 'm',
        year: 'y',
      }
      const byPart = (part: 'day' | 'month' | 'year') => {
        const len = part === 'year' ? 4 : 2
        const placeholder = String(
          phChars[part] || (part === 'year' ? 'y' : part[0])
        ).repeat(len)
        const labelBase = translation[part]
        const label = isRange
          ? `${translation[mode]} ${labelBase}`
          : labelBase
        const cls = `dnb-date-picker__input dnb-date-picker__input--${part}`
        const mask = new Array(len).fill(/[0-9]/)
        return {
          id: part,
          label,
          placeholder,
          mask,
          className: cls,
          inputMode: 'numeric' as const,
          onPaste: pasteHandler,
          onCopy: (e: React.ClipboardEvent<HTMLInputElement>) =>
            copyHandler(e, mode),
        }
      }
      return orderedParts.map((p) => byPart(p))
    },
    [isRange, orderedParts, pasteHandler, copyHandler, translation]
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
    [isRange, getReturnObject, onType, inputDates]
  )

  const setDate = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      mode: 'start' | 'end',
      type: 'Day' | 'Month' | 'Year'
    ) => {
      event.persist() // since we have later a state update and afterwards the callback

      const value = event.target.value

      // console.log('setDate', mode, type, value)
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

      const [yStr, mStr, dStr] = [
        String(dateRefs.current[`${mode}Year`] || ''),
        String(dateRefs.current[`${mode}Month`] || ''),
        String(dateRefs.current[`${mode}Day`] || ''),
      ]

      const fullyTyped =
        /^\d{4}$/.test(yStr) &&
        /^\d{2}$/.test(mStr) &&
        /^\d{2}$/.test(dStr)

      const y = Number(yStr)
      const m = Number(mStr)
      const d = Number(dStr)
      const dt = new Date(y, m - 1, d)

      const isValidDate =
        fullyTyped &&
        dt.getFullYear() === y &&
        dt.getMonth() + 1 === m &&
        dt.getDate() === d

      isDateFullyFilledOutRef.current = fullyTyped

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

        const dateString = `${y}-${m}-${d}`
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

  const onMultiChange = useCallback(
    (mode: 'start' | 'end', values: MValues<'day' | 'month' | 'year'>) => {
      // Use the current controlled values to detect the changed part.
      // This ensures we detect changes correctly after a prop-driven rerender.
      const prev = getValues(mode)
      let changed: 'day' | 'month' | 'year' | null = null
      if (values.day !== prev.day) {
        changed = 'day'
      }
      if (values.month !== prev.month) {
        changed = 'month'
      }
      if (values.year !== prev.year) {
        changed = 'year'
      }
      if (!changed) {
        return // stop here
      }

      // Sync refs with full values before computing validity
      dateRefs.current[`${mode}Day`] = values.day
      dateRefs.current[`${mode}Month`] = values.month
      dateRefs.current[`${mode}Year`] = values.year
      lastMaskValuesRef.current[mode] = {
        day: values.day,
        month: values.month,
        year: values.year,
      }

      const Type =
        changed === 'day' ? 'Day' : changed === 'month' ? 'Month' : 'Year'
      const synthetic = {
        persist: () => null,
        target: { value: values[changed] },
      } as React.ChangeEvent<HTMLInputElement>
      setDate(synthetic, mode, Type)
    },
    [setDate, getValues]
  )

  const onMultiChangeStart = useCallback(
    (values: MValues<'day' | 'month' | 'year'>) => {
      onMultiChange('start', values)
    },
    [onMultiChange]
  )

  const onMultiChangeEnd = useCallback(
    (values: MValues<'day' | 'month' | 'year'>) => {
      onMultiChange('end', values)
    },
    [onMultiChange]
  )

  const scopeRef = useRef<HTMLSpanElement>(null)

  const renderInputElement = useCallback(() => {
    return (
      <span
        id={`${id}-input`}
        className="dnb-date-picker__input__wrapper"
        ref={scopeRef}
      >
        <MultiInputMask
          id={`${id}-start`}
          omitInputShellClass
          size={size}
          inputs={buildInputs('start')}
          values={getValues('start')}
          delimiter={delimiter}
          disabled={disabled || skeleton}
          onChange={onMultiChangeStart}
          scopeRef={scopeRef}
          onFocus={() => {
            focusMode.current = 'start'
            setFocusState('focus')
            onFocus?.({
              ...getReturnObject({
                event: null,
              }),
            })
          }}
          onBlur={() => {
            focusMode.current = null
            setFocusState('blur')
            onBlur?.({
              ...getReturnObject({
                event: null,
              }),
            })
          }}
          {...attributes}
        />
        {isRange && (
          <span className="dnb-date-picker--separator" aria-hidden>
            {' – '}
          </span>
        )}
        {isRange && (
          <MultiInputMask
            id={`${id}-end`}
            omitInputShellClass
            size={size}
            inputs={buildInputs('end')}
            values={getValues('end')}
            delimiter={delimiter}
            disabled={disabled || skeleton}
            onChange={onMultiChangeEnd}
            scopeRef={scopeRef}
            onFocus={() => {
              focusMode.current = 'end'
              setFocusState('focus')
              onFocus?.({
                ...getReturnObject({
                  event: null,
                }),
              })
            }}
            onBlur={() => {
              focusMode.current = null
              setFocusState('blur')
              onBlur?.({
                ...getReturnObject({
                  event: null,
                }),
              })
            }}
            {...attributes}
          />
        )}
      </span>
    )
  }, [
    id,
    size,
    buildInputs,
    getValues,
    delimiter,
    disabled,
    skeleton,
    attributes,
    isRange,
    onFocus,
    onBlur,
    getReturnObject,
    onMultiChangeStart,
    onMultiChangeEnd,
  ])

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

function syncDateRefs(
  dateRefs: React.MutableRefObject<DatePickerInputDates>,
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
