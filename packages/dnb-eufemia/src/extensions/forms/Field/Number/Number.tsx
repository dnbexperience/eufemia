import React, { useContext, useMemo, useCallback } from 'react'
import { InputMasked, HelpButton, Button } from '../../../../components'
import { InputMaskedProps } from '../../../../components/InputMasked'
import type { InputAlign, InputSize } from '../../../../components/Input'
import SharedContext from '../../../../shared/Context'
import FieldBlockContext from '../../FieldBlock/FieldBlockContext'
import classnames from 'classnames'
import FieldBlock from '../../FieldBlock'
import { useFieldProps } from '../../hooks'
import {
  FieldProps,
  FieldHelpProps,
  AllJSONSchemaVersions,
  CustomErrorMessages,
  FieldBlockWidth,
} from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { ButtonProps, ButtonSize } from '../../../../components/Button'
import { clamp } from '../../../../components/slider/SliderHelpers'
import useErrorMessage from '../../hooks/useErrorMessage'
import useTranslation from '../../hooks/useTranslation'

interface ErrorMessages extends CustomErrorMessages {
  required?: string
  schema?: string
  minimum?: string
  maximum?: string
  exclusiveMinimum?: string
  exclusiveMaximum?: string
  multipleOf?: string
}

export type Props = FieldHelpProps &
  FieldProps<number, undefined, ErrorMessages> & {
    inputClassName?: string
    currency?: InputMaskedProps['as_currency']
    currencyDisplay?: 'code' | 'symbol' | 'narrowSymbol' | 'name'
    percent?: InputMaskedProps['as_percent']
    mask?: InputMaskedProps['mask']
    step?: number
    startWith?: number
    // Formatting
    decimalLimit?: number
    prefix?: string
    suffix?: string
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

function NumberComponent(props: Props) {
  const fieldBlockContext = useContext(FieldBlockContext)
  const sharedContext = useContext(SharedContext)
  const translations = useTranslation()

  const {
    currency,
    currencyDisplay,
    percent,
    mask,
    step = 1,
    decimalLimit = 12,
    prefix,
    suffix,
    showStepControls,
  } = props

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: translations.Field.errorRequired,
    minimum: translations.NumberField.errorMinimum,
    maximum: translations.NumberField.errorMaximum,
    exclusiveMinimum: translations.NumberField.errorExclusiveMinimum,
    exclusiveMaximum: translations.NumberField.errorExclusiveMaximum,
    multipleOf: translations.NumberField.errorMultipleOf,
  })

  const schema = useMemo<AllJSONSchemaVersions>(
    () =>
      props.schema ?? {
        type: 'number',
        minimum: props.minimum,
        maximum: props.maximum,
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
  const transformValue = useCallback(
    (value: number, currentValue: number) => {
      if (
        value > Number.MAX_SAFE_INTEGER ||
        value < Number.MIN_SAFE_INTEGER
      ) {
        return currentValue
      }

      return value
    },
    []
  )

  const maskProps: Partial<InputMaskedProps> = useMemo(() => {
    const mask_options = { prefix, suffix, decimalLimit }

    if (currency) {
      return {
        as_currency: currency,
        mask_options,
        currency_mask: {
          currencyDisplay,
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
  ])

  const preparedProps: Props = {
    valueType: 'number',
    ...props,
    errorMessages,
    schema,
    toInput,
    fromInput,
    transformValue,
    width:
      props.width ??
      (fieldBlockContext?.composition ? 'stretch' : 'medium'),
  }

  const {
    id,
    name,
    className,
    inputClassName,
    autoComplete,
    layout,
    placeholder,
    label,
    labelDescription,
    value,
    startWith = null,
    minimum = Number.MIN_SAFE_INTEGER,
    maximum = Number.MAX_SAFE_INTEGER,
    disabled,
    htmlAttributes,
    info,
    warning,
    error,
    hasError,
    help,
    size,
    width,
    align,
    handleFocus,
    handleBlur,
    handleChange,
  } = useFieldProps(preparedProps)

  const onKeyDownHandler = useCallback(
    ({ key, event }) => {
      if (!showStepControls) {
        return
      }

      let numberValue = null

      switch (key) {
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
      handleChange,
      maximum,
      minimum,
      showStepControls,
      startWith,
      step,
      value,
    ]
  )

  const fieldBlockProps = {
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
    forId: id,
    layout,
    label,
    labelDescription,
    info,
    warning,
    error,
    disabled,
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

  const ariaParams = showStepControls && {
    role: 'spinbutton',
    'aria-valuemin': String(minimum),
    'aria-valuemax': String(maximum),
    'aria-valuenow': String(value), // without it, VO will read an invalid value
    'aria-valuetext': String(value), // without it, VO will read %
  }

  const inputProps = {
    id,
    name,
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
    stretch: Boolean(
      width !== undefined || fieldBlockContext?.composition
    ),
    suffix:
      help && !showStepControls ? (
        <HelpButton title={help.title}>{help.content}</HelpButton>
      ) : undefined,
    ...ariaParams,
  }

  if (showStepControls) {
    return (
      <FieldBlock {...fieldBlockProps} asFieldset={false}>
        <span className="dnb-input__border dnb-input__border--root">
          {<Button {...decreaseProps} />}
          <InputMasked {...inputProps} />
          {<Button {...increaseProps} />}
        </span>
        {help && (
          <HelpButton left="x-small" title={help.title}>
            {help.content}
          </HelpButton>
        )}
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
