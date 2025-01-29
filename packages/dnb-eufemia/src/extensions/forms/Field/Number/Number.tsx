import React, {
  useContext,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { InputMasked, Button } from '../../../../components'
import { InputMaskedProps } from '../../../../components/InputMasked'
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
import { FieldProps, AllJSONSchemaVersions } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { ButtonProps, ButtonSize } from '../../../../components/Button'
import { clamp } from '../../../../components/slider/SliderHelpers'
import DataContext from '../../DataContext/Context'

export type Props = FieldProps<number, undefined | number> & {
  innerRef?: React.RefObject<HTMLInputElement>
  inputClassName?: string
  currency?: InputMaskedProps['as_currency']
  currencyDisplay?: 'code' | 'symbol' | 'narrowSymbol' | 'name'
  percent?: InputMaskedProps['as_percent']
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

  const schema = useMemo<AllJSONSchemaVersions>(
    () =>
      props.schema ?? {
        type: 'number',
        minimum: props.minimum ?? defaultMinimum,
        maximum: props.maximum ?? defaultMaximum,
        exclusiveMinimum: props.exclusiveMinimum,
        exclusiveMaximum: props.exclusiveMaximum,
        multipleOf: props.multipleOf,
      },
    [
      props.schema,
      props.minimum,
      props.maximum,
      props.exclusiveMinimum,
      props.exclusiveMaximum,
      props.multipleOf,
    ]
  )

  const toInput = useCallback((external: number | undefined) => {
    if (external === undefined) {
      return null
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
    const mask_options = {
      prefix,
      suffix,
      decimalLimit,
      allowNegative,
      disallowLeadingZeroes,
    }

    if (currency) {
      return {
        as_currency: currency,
        mask_options,
        currency_mask: {
          currencyDisplay,
          decimalLimit,
        },
      }
    }

    if (percent) {
      return {
        as_percent: percent,
        mask_options,
      }
    }

    // Custom mask based on props
    return {
      as_number: true,
      mask,
      number_mask: {
        ...mask_options,
      },
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
    inner_ref: innerRef,
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
    ...maskProps,
    onKeyDown: onKeyDownHandler,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    disabled,
    ...htmlAttributes,
    status: hasError ? 'error' : undefined,
    stretch: Boolean(width),
  }
  Object.assign(inputProps, ariaParams)

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
