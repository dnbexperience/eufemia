import { useCallback, useMemo } from 'react'
import type {
  FieldProps,
  Validator,
  ValidatorWithCustomValidators,
} from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { useFieldProps } from '../../hooks'
import clsx from 'clsx'
import type { FieldBlockProps } from '../../FieldBlock'
import FieldBlock from '../../FieldBlock'
import type {
  SegmentedFieldProps,
  SegmentedFieldValue,
} from '../../../../components/input-masked/segmented-field/SegmentedField'
import SegmentedField from '../../../../components/input-masked/segmented-field/SegmentedField'
import useTranslation from '../../hooks/useTranslation'
import { FormError } from '../../utils'

type TimeValue = SegmentedFieldValue<'hours' | 'minutes' | 'seconds'>

export type TimeValidator = ValidatorWithCustomValidators<
  string,
  {
    timeValidator: Validator<string>
  }
>

export type TimeProps = Omit<
  FieldProps<string, undefined | ''>,
  'width' | 'contentWidth'
> & {
  /**
   * The size of the component.
   */
  size?: SegmentedFieldProps<'hours' | 'minutes' | 'seconds'>['size']

  /**
   * If set to `true`, a seconds input is shown in addition to hours and minutes.
   */
  showSeconds?: boolean
}

function Time(props: TimeProps = {}) {
  const {
    label: timeLabel,
    errorRequired,
    hoursPlaceholder,
    minutesPlaceholder,
    secondsPlaceholder,
    hours: hoursLabel,
    minutes: minutesLabel,
    seconds: secondsLabel,
  } = useTranslation().Time ?? {}

  const { showSeconds } = props

  const timeValidator = useCallback(
    (value: string) => validateTime(value, showSeconds),
    [showSeconds]
  )

  const {
    onBlurValidator = timeValidator,
    onChangeValidator,
    errorMessages: propErrorMessages,
    validateInitially: validateInitiallyProp,
    validateContinuously,
    value: valueProp,
    transformIn: transformInProp,
    onStatusChange,
  } = props

  const errorMessages = useMemo(
    () => ({
      'Field.errorRequired': errorRequired,
      ...propErrorMessages,
    }),
    [errorRequired, propErrorMessages]
  )

  const fromInput = useCallback(
    (values: TimeValue) => {
      const { hours, minutes, seconds } = values

      if (
        isTimeEmpty(hours, minutes) &&
        (!showSeconds || isFieldEmpty(seconds))
      ) {
        return undefined
      }

      return showSeconds
        ? `${hours}:${minutes}:${seconds}`
        : `${hours}:${minutes}`
    },
    [showSeconds]
  )

  const validateRequired = useCallback(
    (
      value: string,
      {
        required,
        error,
      }: { required: boolean; error: FormError | undefined }
    ) => {
      return required && !value ? error : undefined
    },
    []
  )

  const validateInitially = useMemo(
    () => validateInitiallyProp || (valueProp ? true : undefined),
    [validateInitiallyProp, valueProp]
  )

  const fromExternal = useCallback((external: string | undefined) => {
    if (typeof external !== 'string') {
      return external
    }

    const { hours, minutes, seconds } = stringToTimeValue(external)

    if (isTimeEmpty(hours, minutes)) {
      return undefined
    }

    return seconds
      ? `${hours}:${minutes}:${seconds}`
      : `${hours}:${minutes}`
  }, [])

  const transformIn = useCallback(
    (value: string) => {
      if (!transformInProp) {
        return value
      }

      const external = transformInProp(value)

      if (typeof external === 'string') {
        return external
      }

      if (!external?.hours && !external?.minutes && !external?.seconds) {
        return value
      }

      const hours = external.hours as string
      const minutes = external.minutes as string

      if (isTimeEmpty(hours, minutes)) {
        return undefined
      }

      const seconds = external.seconds as string

      return seconds
        ? `${hours}:${minutes}:${seconds}`
        : `${hours}:${minutes}`
    },
    [transformInProp]
  )

  const provideAdditionalArgs = useCallback(
    (value: string) => {
      const { hours, minutes, seconds } = stringToTimeValue(value)

      return {
        hours: hours || undefined,
        minutes: minutes || undefined,
        ...(showSeconds && { seconds: seconds || undefined }),
      }
    },
    [showSeconds]
  )

  const preparedProps: TimeProps = {
    ...props,
    errorMessages,
    validateInitially,
    validateContinuously,
    fromExternal,
    // @ts-expect-error - strictFunctionTypes
    transformIn,
    // @ts-expect-error - strictFunctionTypes
    fromInput,
    provideAdditionalArgs,
    validateRequired,
    onBlurValidator: onBlurValidator,
    onChangeValidator,
    onStatusChange,
    exportValidators: { timeValidator },
  }

  const {
    id,
    path,
    itemPath,
    className,
    label = timeLabel,
    hasError,
    info,
    warning,
    disabled,
    size,
    value = '',
    htmlAttributes,
    handleFocus,
    handleBlur,
    handleChange,
    setDisplayValue,
  } = useFieldProps(preparedProps)

  const time: TimeValue = useMemo(() => {
    const { hours, minutes, seconds } = stringToTimeValue(value)

    return {
      hours: hours || '',
      minutes: minutes || '',
      seconds: (showSeconds && seconds) || '',
    }
  }, [value, showSeconds])

  useMemo(() => {
    if ((path || itemPath) && time.hours && time.minutes) {
      setDisplayValue(
        time.seconds
          ? `${time.hours}:${time.minutes}:${time.seconds}`
          : `${time.hours}:${time.minutes}`
      )
    }
  }, [
    time.hours,
    time.minutes,
    time.seconds,
    itemPath,
    path,
    setDisplayValue,
  ])

  const status = hasError
    ? 'error'
    : warning
      ? 'warning'
      : info
        ? 'information'
        : null

  const fieldBlockProps: FieldBlockProps = {
    id,
    forId: `${id}-input`,
    className: clsx('dnb-forms-field-time', className),
    label,
    ...pickSpacingProps(props),
  }

  return (
    <FieldBlock {...fieldBlockProps}>
      <SegmentedField
        stretch
        id={`${id}-input`}
        values={time}
        status={status === 'error'}
        disabled={disabled}
        size={size}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        delimiter=":"
        inputMode="numeric"
        inputs={[
          {
            id: 'hours',
            label: hoursLabel,
            mask: [/[0-9]/, /[0-9]/],
            spinButton: {
              min: 0,
              max: 23,
              getInitialValue: () => new Date().getHours(),
            },
            placeholder: hoursPlaceholder?.repeat(2),
            ...htmlAttributes,
          },
          {
            id: 'minutes',
            label: minutesLabel,
            mask: [/[0-9]/, /[0-9]/],
            spinButton: {
              min: 0,
              max: 59,
              getInitialValue: () => new Date().getMinutes(),
            },
            placeholder: minutesPlaceholder?.repeat(2),
            ...htmlAttributes,
          },
          ...(showSeconds
            ? [
                {
                  id: 'seconds' as const,
                  label: secondsLabel,
                  mask: [/[0-9]/, /[0-9]/],
                  spinButton: {
                    min: 0,
                    max: 59,
                    getInitialValue: () => new Date().getSeconds(),
                  },
                  placeholder: secondsPlaceholder?.repeat(2),
                  ...htmlAttributes,
                },
              ]
            : []),
        ]}
      />
    </FieldBlock>
  )
}

function isFieldEmpty(value: string | undefined) {
  return !value || value.trim() === ''
}

function isTimeEmpty(
  hours: string | undefined,
  minutes: string | undefined,
  seconds?: string | undefined
) {
  return (
    isFieldEmpty(hours) && isFieldEmpty(minutes) && isFieldEmpty(seconds)
  )
}

function stringToTimeValue(value: string) {
  if (typeof value !== 'string' || !value.includes(':')) {
    return { hours: undefined, minutes: undefined, seconds: undefined }
  }

  const [hours, minutes, seconds] = value.split(':')

  return { hours, minutes, seconds }
}

function validateTime(time: string, showSeconds?: boolean) {
  if (!time || !time.includes(':')) {
    return undefined
  }

  const { hours, minutes, seconds } = stringToTimeValue(time)

  if (
    isFieldEmpty(hours) &&
    isFieldEmpty(minutes) &&
    (!showSeconds || isFieldEmpty(seconds))
  ) {
    return []
  }

  const hoursNumber = Number(hours)
  const minutesNumber = Number(minutes)
  const secondsNumber = Number(seconds)

  const hoursInvalid =
    isFieldEmpty(hours) ||
    hours.length !== 2 ||
    isNaN(hoursNumber) ||
    hoursNumber < 0 ||
    hoursNumber > 23

  const minutesInvalid =
    isFieldEmpty(minutes) ||
    minutes.length !== 2 ||
    isNaN(minutesNumber) ||
    minutesNumber < 0 ||
    minutesNumber > 59

  const secondsInvalid =
    showSeconds &&
    (isFieldEmpty(seconds) ||
      seconds.length !== 2 ||
      isNaN(secondsNumber) ||
      secondsNumber < 0 ||
      secondsNumber > 59)

  if (hoursInvalid || minutesInvalid || secondsInvalid) {
    return new FormError('Time.errorInvalidTime')
  }

  return undefined
}

Time._supportsEufemiaSpacingProps = true
export default Time
