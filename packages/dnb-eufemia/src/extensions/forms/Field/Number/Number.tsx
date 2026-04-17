import React, {
  useContext,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { InputMasked, Button } from '../../../../components'
import type { InputMaskedProps } from '../../../../components/InputMasked'
import type { NumberFormatOptionParams } from '../../../../components/number-format/NumberUtils'
import { format } from '../../../../components/number-format/NumberUtils'
import type { InputAlign, InputSize } from '../../../../components/Input'
import SharedContext from '../../../../shared/Context'
import FieldBlockContext from '../../FieldBlock/FieldBlockContext'
import clsx from 'clsx'
import type { FieldBlockProps, FieldBlockWidth } from '../../FieldBlock'
import FieldBlock from '../../FieldBlock'
import { useFieldProps } from '../../hooks'
import type { FieldProps, Schema } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import type {
  ButtonProps,
  ButtonSize,
} from '../../../../components/Button'
import { clamp } from '../../../../shared/helpers/clamp'
import DataContext from '../../DataContext/Context'
import * as z from 'zod'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type FieldNumberProps = FieldProps<number, undefined | number> & {
  /** Ref to the underlying input element. */
  ref?: React.RefObject<HTMLInputElement>
  /** Additional CSS class applied to the inner input element. */
  inputClassName?: string
  /** Formats the value as a currency. Pass `true` for locale default or a currency code string. */
  currency?: InputMaskedProps['asCurrency']
  /** How to display the currency symbol: `code` (e.g., USD), `symbol` (e.g., $), `narrowSymbol`, or `name`. */
  currencyDisplay?: 'code' | 'symbol' | 'narrowSymbol' | 'name' | false
  /** Formats the value as a percentage. */
  percent?: InputMaskedProps['asPercent']
  /** Input mask configuration for the underlying masked input. */
  mask?: InputMaskedProps['mask']
  /** Step increment/decrement value for the step controls. Defaults to `1`. */
  step?: number
  /** Initial value when the field is empty and the user clicks a step control. */
  startWith?: number
  /** Maximum number of decimal digits allowed. Defaults to `12`. */
  decimalLimit?: number
  /** If `true`, allows negative numbers. Defaults to `true`. */
  allowNegative?: boolean
  /** If `true`, disallows leading zeroes (e.g. `007`). */
  disallowLeadingZeroes?: boolean
  /** Text or function returning text to display before the number value. */
  prefix?: string | ((value: number) => string)
  /** Text or function returning text to display after the number value. */
  suffix?: string | ((value: number) => string)
  /** Minimum allowed value (inclusive, i.e. greater than or equal to). */
  minimum?: number
  /** Maximum allowed value (inclusive, i.e. less than or equal to). */
  maximum?: number
  /** Exclusive minimum (value must be strictly greater than this). */
  exclusiveMinimum?: number
  /** Exclusive maximum (value must be strictly less than this). */
  exclusiveMaximum?: number
  /** Value must be a multiple of this number. */
  multipleOf?: number
  /** The size of the input. Available sizes: `small`, `medium` (default), `large`. */
  size?: InputSize
  /** Defines the width of the field block container. */
  width?: FieldBlockWidth
  /** Text alignment inside the input: `left`, `center`, or `right`. */
  align?: InputAlign
  /** If `true`, shows increment/decrement step control buttons. */
  showStepControls?: boolean
}

const defaultMinimum = Number.MIN_SAFE_INTEGER
const defaultMaximum = Number.MAX_SAFE_INTEGER

function NumberComponent(props: FieldNumberProps) {
  const dataContext = useContext(DataContext)
  const fieldBlockContext = useContext(FieldBlockContext)
  const sharedContext = useContext(SharedContext)
  const locale = sharedContext?.locale

  const validateContinuouslyRef = useRef(props?.validateContinuously)

  const {
    currency,
    currencyDisplay,
    percent,
    mask,
    step = 1,
    decimalLimit = 12,
    allowNegative = true,
    disallowLeadingZeroes = false,
    prefix: prefixProp,
    suffix: suffixProp,
    showStepControls,
  } = props

  const schema = useMemo<Schema>(() => {
    return (
      // Use a factory so the schema is created using the current props
      // at validation time (min/max/exclusive/multipleOf). This keeps rules
      // in sync with dynamic prop changes and avoids stale closures.
      props.schema ??
      ((p: FieldNumberProps) => {
        // Helper function to format validation values with currency/percent suffix
        const formatValidationValue = (value: number) => {
          const formatOptions: Partial<NumberFormatOptionParams> = {
            locale,
          }

          if (p.currency) {
            formatOptions.currency = p.currency
          }
          if (p.percent) {
            formatOptions.percent = true
          }
          if (p.decimalLimit !== undefined) {
            formatOptions.decimals = p.decimalLimit
          }

          return format(value, formatOptions)
        }

        return z
          .number()
          .nullish()
          .superRefine((val, ctx) => {
            // Skip validation for null/undefined values (they are treated as empty)
            if (val === null || val === undefined) {
              return
            }
            // Default JavaScript safe integer limits
            if (
              (p.minimum === undefined || p.minimum < defaultMinimum) &&
              val < defaultMinimum
            ) {
              ctx.addIssue({
                code: 'too_small',
                minimum: defaultMinimum,
                type: 'number',
                inclusive: true,
                message: 'NumberField.errorMinimum',
                messageValues: {
                  minimum: formatValidationValue(defaultMinimum),
                },
                origin: 'number',
                locale,
              })
            }

            if (
              (p.maximum === undefined || p.maximum > defaultMaximum) &&
              val > defaultMaximum
            ) {
              ctx.addIssue({
                code: 'too_big',
                maximum: defaultMaximum,
                type: 'number',
                inclusive: true,
                message: 'NumberField.errorMaximum',
                messageValues: {
                  maximum: formatValidationValue(defaultMaximum),
                },
                origin: 'number',
                locale,
              })
            }

            // minimum validation
            if (p.minimum !== undefined && val < p.minimum) {
              ctx.addIssue({
                code: 'too_small',
                minimum: p.minimum,
                type: 'number',
                inclusive: true,
                message: 'NumberField.errorMinimum',
                messageValues: {
                  minimum: formatValidationValue(p.minimum),
                },
                origin: 'number',
                locale,
              })
            }

            // maximum validation
            if (p.maximum !== undefined && val > p.maximum) {
              ctx.addIssue({
                code: 'too_big',
                maximum: p.maximum,
                type: 'number',
                inclusive: true,
                message: 'NumberField.errorMaximum',
                messageValues: {
                  maximum: formatValidationValue(p.maximum),
                },
                origin: 'number',
                locale,
              })
            }

            // exclusiveMinimum validation
            if (
              p.exclusiveMinimum !== undefined &&
              val <= p.exclusiveMinimum
            ) {
              ctx.addIssue({
                code: 'too_small',
                minimum: p.exclusiveMinimum,
                type: 'number',
                inclusive: false,
                message: 'NumberField.errorExclusiveMinimum',
                messageValues: {
                  exclusiveMinimum: formatValidationValue(
                    p.exclusiveMinimum
                  ),
                },
                origin: 'number',
                exclusiveMinimum: p.exclusiveMinimum,
                locale,
              })
            }

            // exclusiveMaximum validation
            if (
              p.exclusiveMaximum !== undefined &&
              val >= p.exclusiveMaximum
            ) {
              ctx.addIssue({
                code: 'too_big',
                maximum: p.exclusiveMaximum,
                type: 'number',
                inclusive: false,
                message: 'NumberField.errorExclusiveMaximum',
                messageValues: {
                  exclusiveMaximum: formatValidationValue(
                    p.exclusiveMaximum
                  ),
                },
                origin: 'number',
                exclusiveMaximum: p.exclusiveMaximum,
                locale,
              })
            }

            // multipleOf validation
            if (p.multipleOf !== undefined && val % p.multipleOf !== 0) {
              ctx.addIssue({
                code: 'custom',
                message: 'NumberField.errorMultipleOf',
                messageValues: {
                  multipleOf: formatValidationValue(p.multipleOf),
                },
                origin: 'number',
                multipleOf: p.multipleOf,
                locale,
              })
            }
          })
      })
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.schema,
    props.minimum,
    props.maximum,
    props.exclusiveMinimum,
    props.exclusiveMaximum,
    props.multipleOf,
    props.currency,
    props.percent,
    props.decimalLimit,
    locale,
  ])

  const toInput = useCallback((external: number | undefined | unknown) => {
    if (external === undefined || external === null) {
      return null
    }
    // Handle invalid types (e.g., strings) by converting to empty string for display
    if (typeof external !== 'number' || isNaN(external)) {
      return ''
    }
    return external
  }, [])
  const fromInput = useCallback(
    ({
      value,
      numberValue,
      cleanedValue,
    }: {
      value: string
      numberValue: number
      cleanedValue: string
    }) => {
      if (value === '' || cleanedValue === '') {
        return props.emptyValue
      }

      // When the user types just a minus sign, numberValue is -0.
      // Return emptyValue to keep the display showing the minus
      // without converting the value to 0.
      if (allowNegative && Object.is(numberValue, -0)) {
        return props.emptyValue
      }

      return numberValue
    },
    [props.emptyValue, allowNegative]
  )

  const ref = useRef<HTMLInputElement>(undefined)
  const preparedProps: FieldNumberProps = {
    valueType: 'number',
    validateContinuously: validateContinuouslyRef.current,
    ...props,
    schema,
    toInput,
    // @ts-expect-error - strictFunctionTypes
    fromInput,
    width:
      props.width ??
      (fieldBlockContext?.composition ? 'stretch' : 'medium'),
    ref: props.ref ?? ref,
  }

  const {
    id,
    name,
    className,
    ref: inputRef,
    inputClassName,
    autoComplete,
    placeholder,
    value,
    startWith = null,
    minimum = defaultMinimum,
    maximum = defaultMaximum,
    disabled,
    htmlAttributes,
    hasError,
    size,
    width,
    align,
    handleFocus,
    handleBlur,
    handleChange,
    setDisplayValue,
  } = useFieldProps(preparedProps)

  useEffect(() => {
    // Use getElementById to read the current DOM input value
    const input = id ? document.getElementById(id) : null
    if (input instanceof HTMLInputElement) {
      setDisplayValue(input.value)
    }
  }, [id, setDisplayValue, value])

  const { handleSubmit } = dataContext ?? {}
  const onKeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // InputMasked wraps onKeyDown to pass { event, value } instead of raw event
      const { event } = e as unknown as {
        event: React.KeyboardEvent<HTMLInputElement>
      }
      if (dataContext?.props?.isolate && event.key === 'Enter') {
        handleSubmit() // So we commit the data to the outer context
        event.preventDefault?.() // And prevent the default form submit
      }

      if (!showStepControls) {
        return
      }

      let numberValue = null

      switch (event.key) {
        case 'ArrowUp':
          numberValue = clamp(
            (value ?? startWith) + step,
            minimum,
            maximum
          )
          break
        case 'ArrowDown':
          numberValue = clamp(
            (value ?? startWith) - step,
            minimum,
            maximum
          )
          break
      }

      if (numberValue !== null) {
        event.preventDefault()
        handleChange({ numberValue })
      }
    },
    [
      dataContext?.props?.isolate,
      handleChange,
      handleSubmit,
      maximum,
      minimum,
      showStepControls,
      startWith,
      step,
      value,
    ]
  )

  const onChangeHandler = useCallback(
    (args: { numberValue?: number; stringValue?: string }) => {
      handleChange(args)
      if (typeof args?.numberValue === 'number') {
        if (
          args.numberValue > defaultMaximum ||
          args.numberValue < defaultMinimum
        ) {
          // After the value/validation update, trigger blur logic to reveal immediately
          handleBlur()
        }
      }
    },
    [handleChange, handleBlur]
  )

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    className: clsx(
      'dnb-forms-field-number',
      'dnb-input__border--tokens', // Used by "dnb-input__border"
      className
    ),
    contentClassName: clsx(
      'dnb-forms-field-number__contents',
      showStepControls && 'dnb-forms-field-number__contents--has-controls',
      hasError && 'dnb-input__status--error', // Also used by "dnb-input__border"
      disabled && 'dnb-input--disabled' // Also used by "dnb-input__border"
    ),
    width:
      (width === 'stretch' || fieldBlockContext?.composition) &&
      !showStepControls
        ? width
        : undefined,
    contentWidth: width !== false ? width : undefined,
    ...pickSpacingProps(props),
  }

  const increaseClickHandler = useCallback(() => {
    handleChange({
      numberValue: clamp((value ?? startWith) + step, minimum, maximum),
    })
  }, [handleChange, maximum, minimum, startWith, step, value])

  const increaseProps: ButtonProps = showStepControls && {
    'aria-hidden': true,
    className: 'dnb-button--control-after',
    variant: 'secondary',
    icon: 'add',
    size: (size || 'small') as ButtonSize,
    tabIndex: -1,
    disabled: disabled || value >= maximum,
    onClick: increaseClickHandler,
    title: sharedContext?.translation.Slider.addTitle?.replace(
      '%s',
      String(value + step)
    ),
    status: hasError ? 'error' : undefined,
  }

  const decreaseClickHandler = useCallback(() => {
    handleChange({
      numberValue: clamp((value ?? startWith) - step, minimum, maximum),
    })
  }, [handleChange, maximum, minimum, startWith, step, value])

  const decreaseProps: ButtonProps = showStepControls && {
    ...increaseProps,
    className: 'dnb-button--control-before',
    icon: 'subtract',
    size: (size || 'small') as ButtonSize,
    disabled: disabled || value <= minimum,
    onClick: decreaseClickHandler,
    title: sharedContext?.translation.Slider.subtractTitle?.replace(
      '%s',
      String(value - step)
    ),
  }

  const prefix =
    typeof prefixProp === 'function' ? prefixProp(value) : prefixProp
  const suffix =
    typeof suffixProp === 'function' ? suffixProp(value) : suffixProp

  const maskProps: Partial<InputMaskedProps> = useMemo(() => {
    const maskOptions = {
      prefix,
      suffix,
      decimalLimit,
      allowNegative,
      disallowLeadingZeroes,
    }

    if (currency) {
      return {
        asCurrency: currency,
        maskOptions,
        currencyMask: {
          currencyDisplay,
          decimalLimit,
        },
      }
    }

    if (percent) {
      return {
        asPercent: percent,
        maskOptions,
      }
    }

    // Custom mask based on props
    return {
      mask,
      asNumber: mask ? undefined : true,
      numberMask: mask ? undefined : maskOptions,
    }
  }, [
    currency,
    currencyDisplay,
    decimalLimit,
    mask,
    percent,
    prefix,
    suffix,
    allowNegative,
    disallowLeadingZeroes,
  ])

  const ariaParams = showStepControls && {
    role: 'spinbutton' as const,
    'aria-valuemin': minimum,
    'aria-valuemax': maximum,
    'aria-valuenow': value ?? 0, // without it, VO will read an invalid value
    'aria-valuetext': String(value ?? ''), // without it, VO will read %
  }

  const inputProps = {
    id,
    name,
    ref: inputRef,
    autoComplete,
    className: clsx(
      'dnb-forms-field-number__input',
      `dnb-input--${size}`,
      inputClassName
    ),
    step: showStepControls ? step : undefined,
    placeholder,
    value,
    align: showStepControls ? 'center' : align,
    onKeyDown: onKeyDownHandler,
    onPaste: handleBlur, // So that we trigger validation on paste as well
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: onChangeHandler,
    disabled,
    status: hasError ? 'error' : undefined,
    stretch: Boolean(width),
    ...maskProps,
    ...htmlAttributes,
    ...(ariaParams || {}),
  }

  if (showStepControls) {
    return (
      <FieldBlock {...fieldBlockProps} asFieldset={false}>
        <span className="dnb-input__border dnb-input__border--root">
          <Button {...decreaseProps} />
          <InputMasked {...inputProps} />
          <Button {...increaseProps} />
        </span>
      </FieldBlock>
    )
  }

  return (
    <FieldBlock {...fieldBlockProps} asFieldset={false}>
      <InputMasked {...inputProps} />
    </FieldBlock>
  )
}

withComponentMarkers(NumberComponent, {
  _supportsSpacingProps: true,
})

export default NumberComponent
