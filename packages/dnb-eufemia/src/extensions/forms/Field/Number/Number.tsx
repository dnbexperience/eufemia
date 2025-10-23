import React, {
  useContext,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { InputMasked, Button } from '../../../../components'
import { InputMaskedProps } from '../../../../components/InputMasked'
import {
  format,
  formatOptionParams,
} from '../../../../components/number-format/NumberUtils'
import type {
  InputAlign,
  InputProps,
  InputSize,
} from '../../../../components/Input'
import SharedContext from '../../../../shared/Context'
import FieldBlockContext from '../../FieldBlock/FieldBlockContext'
import classnames from 'classnames'
import FieldBlock, {
  Props as FieldBlockProps,
  FieldBlockWidth,
} from '../../FieldBlock'
import { useFieldProps } from '../../hooks'
import { FieldProps, Schema } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { ButtonProps, ButtonSize } from '../../../../components/Button'
import { clamp } from '../../../../components/slider/SliderHelpers'
import DataContext from '../../DataContext/Context'
import * as z from 'zod'

export type Props = FieldProps<number, undefined | number> & {
  innerRef?: React.RefObject<HTMLInputElement>
  inputClassName?: string
  currency?: InputMaskedProps['asCurrency']
  currencyDisplay?: 'code' | 'symbol' | 'narrowSymbol' | 'name' | false
  percent?: InputMaskedProps['asPercent']
  mask?: InputMaskedProps['mask']
  step?: number
  startWith?: number
  // Formatting
  decimalLimit?: number
  allowNegative?: boolean
  disallowLeadingZeroes?: boolean
  prefix?: string | ((value: number) => string)
  suffix?: string | ((value: number) => string)
  // Validation
  minimum?: number // aka greater than or equal to
  maximum?: number // aka less than or equal to
  exclusiveMinimum?: number // aka greater than
  exclusiveMaximum?: number // aka less than
  multipleOf?: number
  // Styling
  size?: InputSize
  width?: FieldBlockWidth
  align?: InputAlign
  showStepControls?: boolean
}

const defaultMinimum = Number.MIN_SAFE_INTEGER
const defaultMaximum = Number.MAX_SAFE_INTEGER

function NumberComponent(props: Props) {
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
      ((p: Props) => {
        // Helper function to format validation values with currency/percent suffix
        const formatValidationValue = (value: number) => {
          const formatOptions: Partial<formatOptionParams> = { locale }

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
    ({ value, numberValue }: { value: string; numberValue: number }) => {
      if (value === '') {
        return props.emptyValue
      }
      return numberValue
    },
    [props.emptyValue]
  )

  const ref = useRef<HTMLInputElement>()
  const preparedProps: Props = {
    valueType: 'number',
    validateContinuously: validateContinuouslyRef.current,
    ...props,
    schema,
    toInput,
    fromInput,
    width:
      props.width ??
      (fieldBlockContext?.composition ? 'stretch' : 'medium'),
    innerRef: props.innerRef ?? ref,
  }

  const {
    id,
    name,
    className,
    innerRef,
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
    setDisplayValue(innerRef.current?.value)
  }, [innerRef, setDisplayValue, value])

  const { handleSubmit } = dataContext ?? {}
  const onKeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        event.persist()
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
    className: classnames(
      'dnb-forms-field-number',
      'dnb-input__border--tokens', // Used by "dnb-input__border"
      className
    ),
    contentClassName: classnames(
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
    role: 'spinbutton',
    'aria-valuemin': String(minimum),
    'aria-valuemax': String(maximum),
    'aria-valuenow': String(value), // without it, VO will read an invalid value
    'aria-valuetext': String(value), // without it, VO will read %
  }

  const inputProps: InputProps = {
    id,
    name,
    innerRef: innerRef,
    autoComplete,
    className: classnames(
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
    ...(ariaParams as any),
  }

  if (showStepControls) {
    return (
      <FieldBlock {...fieldBlockProps} asFieldset={false}>
        <span className="dnb-input__border dnb-input__border--root">
          {<Button {...decreaseProps} />}
          <InputMasked {...inputProps} />
          {<Button {...increaseProps} />}
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

NumberComponent._supportsSpacingProps = true
export default NumberComponent
