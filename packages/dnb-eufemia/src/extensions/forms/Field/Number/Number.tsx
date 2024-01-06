import React, { useContext, useMemo, useCallback } from 'react'
import { JSONSchema7 } from 'json-schema'
import { InputMasked, HelpButton, Button } from '../../../../components'
import { InputMaskedProps } from '../../../../components/InputMasked'
import type { InputAlign, InputSize } from '../../../../components/Input'
import SharedContext from '../../../../shared/Context'
import classnames from 'classnames'
import FieldBlock from '../../FieldBlock'
import { useDataValue } from '../../hooks'
import { FieldProps, FieldHelpProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { ButtonProps, ButtonSize } from '../../../../components/Button'
import { clamp } from '../../../../components/slider/SliderHelpers'

interface ErrorMessages {
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
    percent?: InputMaskedProps['as_percent']
    mask?: InputMaskedProps['mask']
    step?: number
    // Formatting
    thousandSeparator?: string | true
    decimalSymbol?: string
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
    width?: false | 'small' | 'medium' | 'large' | 'stretch'
    align?: InputAlign
    showStepControls?: boolean
  }

function NumberComponent(props: Props) {
  const sharedContext = useContext(SharedContext)
  const tr = sharedContext?.translation.Forms

  const {
    currency,
    percent,
    mask,
    step = 1,
    thousandSeparator,
    decimalSymbol,
    decimalLimit = 12,
    prefix,
    suffix,
    showStepControls,
  } = props

  const errorMessages = useMemo(
    () => ({
      required: tr.inputErrorRequired,
      minimum: tr.numberFieldErrorMinimum,
      maximum: tr.numberFieldErrorMaximum,
      exclusiveMinimum: tr.numberFieldErrorExclusiveMinimum,
      exclusiveMaximum: tr.numberFieldErrorExclusiveMaximum,
      multipleOf: tr.numberFieldErrorMultipleOf,
      ...props.errorMessages,
    }),
    [tr, props.errorMessages]
  )
  const schema = useMemo<JSONSchema7>(
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
      return ''
    }
    return external
  }, [])
  const fromInput = useCallback(
    (event: { value?: string; numberValue: number }) => {
      if (typeof event === 'number') {
        event = { numberValue: event }
      }

      if (event?.value === '') {
        return props.emptyValue
      }

      return event?.numberValue
    },
    [props.emptyValue]
  )
  const transformValue = useCallback(
    (value: number, currentValue: number) => {
      if (
        value > Number.MAX_SAFE_INTEGER ||
        value < -Number.MAX_SAFE_INTEGER
      ) {
        return currentValue
      }

      return value
    },
    []
  )

  const maskProps: Partial<InputMaskedProps> = useMemo(() => {
    if (currency) {
      return {
        as_currency: currency,
      }
    }
    if (percent) {
      return {
        as_percent: percent,
      }
    }
    // Custom mask based on props
    return {
      as_number: true,
      mask,
      number_mask: {
        decimalLimit,
        decimalSymbol,
        includeThousandsSeparator: thousandSeparator !== undefined,
        thousandsSeparatorSymbol:
          thousandSeparator === true ? ' ' : thousandSeparator,
        prefix,
        suffix,
      },
    }
  }, [
    currency,
    percent,
    mask,
    decimalLimit,
    decimalSymbol,
    thousandSeparator,
    prefix,
    suffix,
  ])

  const preparedProps: Props = {
    ...props,
    errorMessages,
    schema,
    toInput,
    fromInput,
    transformValue,
    size:
      props.size !== 'small' && props.size !== 'large'
        ? 'medium'
        : props.size,
    width: props.width ?? 'medium',
  }

  const {
    id,
    name,
    className,
    autoComplete,
    inputClassName,
    layout,
    placeholder,
    label,
    labelDescription,
    labelSecondary,
    value,
    minimum = -Number.MAX_SAFE_INTEGER,
    maximum = Number.MAX_SAFE_INTEGER,
    disabled,
    info,
    warning,
    error,
    help,
    size,
    width,
    align,
    handleFocus,
    handleBlur,
    handleChange,
  } = useDataValue(preparedProps)

  const onKeyDownHandler = useCallback(
    ({ key, event }) => {
      if (!showStepControls) {
        return
      }

      let numberValue = null

      switch (key) {
        case 'ArrowUp':
          numberValue = clamp((value as number) + step, minimum, maximum)
          break
        case 'ArrowDown':
          numberValue = clamp((value as number) - step, minimum, maximum)
          break
      }

      if (numberValue !== null) {
        event.persist()
        event.preventDefault()
        handleChange({ numberValue })
      }
    },
    [handleChange, maximum, minimum, showStepControls, step, value]
  )

  const fieldBlockProps = {
    className: classnames('dnb-forms-field-number', className),
    contentClassName: classnames(
      'dnb-forms-field-number__contents',
      showStepControls && 'dnb-forms-field-number__contents--has-controls',
      disabled && 'dnb-forms-field-number__contents--is-disabled',
      error && 'dnb-forms-field-number__contents--has-error'
    ),
    forId: id,
    layout,
    label,
    labelDescription,
    labelSecondary,
    info,
    warning,
    error,
    disabled,
    width: width === 'stretch' ? width : undefined,
    contentsWidth: width !== false ? width : undefined,
    ...pickSpacingProps(props),
  }

  const increaseProps: ButtonProps = showStepControls && {
    'aria-hidden': true,
    className: 'dnb-button--control-after',
    variant: 'secondary',
    icon: 'add',
    size: convertInputSizeToButtonSize(size),
    tabIndex: -1,
    disabled: disabled || value >= maximum,
    onClick: () => {
      handleChange({
        numberValue: clamp((value as number) + step, minimum, maximum),
      })
    },
    title: sharedContext?.translation.Slider.addTitle?.replace(
      '%s',
      String(value + step)
    ),
  }

  const decreaseProps: ButtonProps = showStepControls && {
    ...increaseProps,
    className: 'dnb-button--control-before',
    icon: 'subtract',
    disabled: disabled || value <= minimum,
    onClick: () => {
      handleChange({
        numberValue: clamp((value as number) - step, minimum, maximum),
      })
    },
    title: sharedContext?.translation.Slider.subtractTitle?.replace(
      '%s',
      String(value - step)
    ),
  }

  const ariaParams = showStepControls && {
    role: 'spinbutton',
    'aria-valuemin': String(minimum),
    'aria-valuemax': String(maximum),
    'aria-valuenow': String(value), // without it, VO will read an invlaid value
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
    step,
    placeholder,
    value,
    align: showStepControls ? 'center' : align,
    ...maskProps,
    onKeyDown: onKeyDownHandler,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    disabled,
    status: error ? 'error' : undefined,
    stretch: width !== undefined,
    suffix:
      help && !showStepControls ? (
        <HelpButton title={help.title}>{help.contents}</HelpButton>
      ) : undefined,
    ...ariaParams,
  }

  return (
    <FieldBlock {...fieldBlockProps} asFieldset={false}>
      {showStepControls && <Button {...decreaseProps} />}
      <InputMasked {...inputProps} />
      {showStepControls && <Button {...increaseProps} />}
      {help && showStepControls && (
        <HelpButton title={help.title}>{help.contents}</HelpButton>
      )}
    </FieldBlock>
  )
}

const convertInputSizeToButtonSize = (
  inputSize: InputSize
): ButtonSize => {
  const buttonSize =
    ['small', 'medium', 'large'].indexOf(inputSize as string) > -1
      ? inputSize
      : 'medium'
  return buttonSize as ButtonSize
}

NumberComponent._supportsSpacingProps = true
export default NumberComponent
