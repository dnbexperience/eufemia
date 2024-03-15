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
} from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { ButtonProps, ButtonSize } from '../../../../components/Button'
import { clamp } from '../../../../components/slider/SliderHelpers'
import useErrorMessage from '../../hooks/useErrorMessage'

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
    width?: false | 'small' | 'medium' | 'large' | 'stretch'
    align?: InputAlign
    showStepControls?: boolean
  }

function NumberComponent(props: Props) {
  const fieldBlockContext = useContext(FieldBlockContext)
  const sharedContext = useContext(SharedContext)
  const tr = sharedContext?.translation.Forms

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
    required: tr.inputErrorRequired,
    minimum: tr.numberFieldErrorMinimum,
    maximum: tr.numberFieldErrorMaximum,
    exclusiveMinimum: tr.numberFieldErrorExclusiveMinimum,
    exclusiveMaximum: tr.numberFieldErrorExclusiveMaximum,
    multipleOf: tr.numberFieldErrorMultipleOf,
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
    minimum = Number.MIN_SAFE_INTEGER,
    maximum = Number.MAX_SAFE_INTEGER,
    disabled,
    ariaAttributes,
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
      hasError && 'dnb-forms-field-number__contents--has-error'
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
      width === 'stretch' || fieldBlockContext?.composition
        ? width
        : undefined,
    contentWidth: width !== false ? width : undefined,
    ...pickSpacingProps(props),
  }

  const increaseProps: ButtonProps = showStepControls && {
    'aria-hidden': true,
    className: 'dnb-button--control-after',
    variant: 'secondary',
    icon: 'add',
    size: (size || 'small') as ButtonSize,
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
    size: (size || 'small') as ButtonSize,
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
    ...ariaAttributes,
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

  return (
    <FieldBlock {...fieldBlockProps} asFieldset={false}>
      {showStepControls && <Button {...decreaseProps} />}
      <InputMasked {...inputProps} />
      {showStepControls && <Button {...increaseProps} />}
      {help && showStepControls && (
        <HelpButton title={help.title}>{help.content}</HelpButton>
      )}
    </FieldBlock>
  )
}

NumberComponent._supportsSpacingProps = true
export default NumberComponent
