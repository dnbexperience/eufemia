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
  withSeconds?: boolean
}

function Time(props: TimeProps = {}) {
  const {
    label: timeLabel,
    errorRequired,
    hours,
    minutes,
    seconds,
  } = useTranslation().Time ?? {}

  const { withSeconds } = props

  const timeValidator = useCallback(
    (value: string) => validateTime(value, withSeconds),
    [withSeconds]
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
      const hoursString = padValue(values.hours, 2)
      const minutesString = padValue(values.minutes, 2)
      const secondsString = withSeconds
        ? padValue(values.seconds, 2)
        : undefined

      if (
        isFieldEmpty(hoursString) &&
        isFieldEmpty(minutesString) &&
        (!withSeconds || isFieldEmpty(secondsString))
      ) {
        return undefined
      }

      if (withSeconds) {
        return `${hoursString}:${minutesString}:${secondsString}`
      }

      return `${hoursString}:${minutesString}`
    },
    [withSeconds]
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

  const validateInitially = useMemo(() => {
    if (validateInitiallyProp) {
      return validateInitiallyProp
    }

    if (valueProp) {
      return true
    }

    return undefined
  }, [validateInitiallyProp, valueProp])

  const fromExternal = useCallback(
    (external: string | undefined) => {
      if (typeof external === 'string') {
        const {
          hours,
          minutes,
          seconds: secs,
        } = stringToTimeValue(external)

        if (
          isFieldEmpty(hours) &&
          isFieldEmpty(minutes) &&
          (!withSeconds || isFieldEmpty(secs))
        ) {
          return undefined
        }

        if (withSeconds) {
          return `${padValue(hours, 2)}:${padValue(minutes, 2)}:${padValue(
            secs,
            2
          )}`
        }

        return `${padValue(hours, 2)}:${padValue(minutes, 2)}`
      }

      return external
    },
    [withSeconds]
  )

  const transformIn = useCallback(
    (value: string) => {
      if (transformInProp) {
        const external = transformInProp(value)

        if (typeof external === 'string') {
          return external
        }

        if (external?.hours || external?.minutes || external?.seconds) {
          const hoursString = padValue(external.hours as string, 2)
          const minutesString = padValue(external.minutes as string, 2)
          const secondsString = withSeconds
            ? padValue(external.seconds as string, 2)
            : undefined

          if (
            isFieldEmpty(hoursString) &&
            isFieldEmpty(minutesString) &&
            (!withSeconds || isFieldEmpty(secondsString))
          ) {
            return undefined
          }

          if (withSeconds) {
            return `${hoursString}:${minutesString}:${secondsString}`
          }

          return `${hoursString}:${minutesString}`
        }
      }

      return value
    },
    [transformInProp]
  )

  const provideAdditionalArgs = useCallback(
    (value: string) => {
      const { hours, minutes, seconds: secs } = stringToTimeValue(value)

      return {
        hours: hours || undefined,
        minutes: minutes || undefined,
        ...(withSeconds && { seconds: secs || undefined }),
      }
    },
    [withSeconds]
  )

  const preparedProps: TimeProps = {
    ...props,
    errorMessages,
    validateInitially,
    validateContinuously,
    // @ts-expect-error - strictFunctionTypes
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
    // @ts-expect-error - strictFunctionTypes
  } = useFieldProps(preparedProps)

  const time: TimeValue = useMemo(() => {
    const { hours, minutes, seconds: secs } = stringToTimeValue(value)

    return {
      hours: hours || '',
      minutes: minutes || '',
      seconds: withSeconds ? secs || '' : '',
    }
  }, [value, withSeconds])

  useMemo(() => {
    if ((path || itemPath) && time.hours && time.minutes) {
      const display = withSeconds
        ? `${time.hours}:${time.minutes}:${time.seconds}`
        : `${time.hours}:${time.minutes}`
      setDisplayValue(display)
    }
  }, [
    time.hours,
    time.minutes,
    time.seconds,
    withSeconds,
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
            label: hours,
            mask: [/[0-9]/, /[0-9]/],
            spinButton: {
              min: 0,
              max: 23,
              getInitialValue: () => new Date().getHours(),
            },
            placeholder: 'tt',
            ...htmlAttributes,
          },
          {
            id: 'minutes',
            label: minutes,
            mask: [/[0-9]/, /[0-9]/],
            spinButton: {
              min: 0,
              max: 59,
              getInitialValue: () => new Date().getMinutes(),
            },
            placeholder: 'mm',
            ...htmlAttributes,
          },
          ...(withSeconds
            ? [
                {
                  id: 'seconds' as const,
                  label: seconds,
                  mask: [/[0-9]/, /[0-9]/],
                  spinButton: {
                    min: 0,
                    max: 59,
                    getInitialValue: () => new Date().getSeconds(),
                  },
                  placeholder: 'ss',
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

function stringToTimeValue(value: string) {
  if (typeof value !== 'string' || !value.includes(':')) {
    return { hours: undefined, minutes: undefined, seconds: undefined }
  }

  const [hours, minutes, seconds] = value.split(':')

  return { hours, minutes, seconds }
}

function padValue(value: string | undefined, length: number) {
  if (!value) {
    return ''
  }

  return value.padStart(length, '0').slice(-length)
}

function validateTime(time: string, withSeconds?: boolean) {
  if (!time || !time.includes(':')) {
    return undefined
  }

  const { hours, minutes, seconds } = stringToTimeValue(time)
  const hoursNumber = Number(hours)
  const minutesNumber = Number(minutes)
  const secondsNumber = Number(seconds)

  const messages: Array<FormError> = []

  const isHoursEmpty = !hours || hours.trim() === ''
  const isMinutesEmpty = !minutes || minutes.trim() === ''
  const isSecondsEmpty = !seconds || seconds.trim() === ''

  if (isHoursEmpty && isMinutesEmpty && (!withSeconds || isSecondsEmpty)) {
    return messages
  }

  if (
    isHoursEmpty ||
    isNaN(hoursNumber) ||
    hoursNumber < 0 ||
    hoursNumber > 23
  ) {
    messages.push(
      new FormError('Time.errorHours', {
        messageValues: { hours: hours ?? '' },
      })
    )
  }

  if (
    isMinutesEmpty ||
    isNaN(minutesNumber) ||
    minutesNumber < 0 ||
    minutesNumber > 59
  ) {
    messages.push(
      new FormError('Time.errorMinutes', {
        messageValues: { minutes: minutes ?? '' },
      })
    )
  }

  if (
    withSeconds &&
    (isSecondsEmpty ||
      isNaN(secondsNumber) ||
      secondsNumber < 0 ||
      secondsNumber > 59)
  ) {
    messages.push(
      new FormError('Time.errorSeconds', {
        messageValues: { seconds: seconds ?? '' },
      })
    )
  }

  if (messages.length) {
    return messages
  }

  return undefined
}

Time._supportsEufemiaSpacingProps = true
export default Time
