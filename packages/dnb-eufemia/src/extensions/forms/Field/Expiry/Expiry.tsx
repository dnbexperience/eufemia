import React, { useCallback, useMemo } from 'react'
import { FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { useFieldProps } from '../../hooks'
import classnames from 'classnames'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'
import { MultiInputMask } from '../../../../components/input-masked'
import type { MultiInputMaskValue } from '../../../../components/input-masked'
import { useTranslation as useSharedTranslation } from '../../../../shared'
import useTranslation from '../../hooks/useTranslation'

type ExpiryValue = MultiInputMaskValue<'month' | 'year'>

export type ExpiryProps = FieldProps<string, undefined | ''>

function Expiry(props: ExpiryProps) {
  const {
    Date: { errorRequired },
    Expiry: { label: expiryLabel },
  } = useTranslation()

  const {
    DatePicker: {
      placeholderCharacters: placeholders,
      month: monthLabel,
      year: yearLabel,
    },
  } = useSharedTranslation()

  const errorMessages = useMemo(
    () => ({
      'Field.errorRequired': errorRequired,
      ...props.errorMessages,
    }),
    [errorRequired, props.errorMessages]
  )

  const validateRequired = useCallback(
    (value: string, { required, error }) => {
      return required && !value ? error : undefined
    },
    []
  )

  const preparedProps: ExpiryProps = {
    ...props,
    errorMessages,
    fromInput: (value: ExpiryValue) => Object.values(value).join(''),
    validateRequired,
  }

  const {
    id,
    path,
    itemPath,
    className,
    label = expiryLabel,
    hasError,
    info,
    warning,
    disabled,
    value = '',
    htmlAttributes,
    handleFocus,
    handleBlur,
    handleChange,
    setDisplayValue,
  } = useFieldProps(preparedProps)

  const expiry: ExpiryValue = useMemo(() => {
    return {
      month: value?.substring(0, 2) ?? '',
      year: value?.substring(2, 4) ?? '',
    }
  }, [value])

  useMemo(() => {
    if ((path || itemPath) && expiry.month && expiry.year) {
      setDisplayValue(`${expiry.month}/${expiry.year}`)
    }
  }, [expiry.month, expiry.year, itemPath, path, setDisplayValue])

  const status = hasError
    ? 'error'
    : warning
    ? 'warn'
    : info
    ? 'info'
    : null

  const fieldBlockProps: FieldBlockProps = {
    id,
    forId: `${id}-input-month`,
    className: classnames('dnb-forms-field-expiry', className),
    label,
    ...pickSpacingProps(props),
  }

  return (
    <FieldBlock {...fieldBlockProps}>
      <MultiInputMask
        stretch
        id={`${id}-input`}
        values={expiry}
        status={status}
        statusState={disabled ? 'disabled' : undefined}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        delimiter="/"
        inputMode="numeric"
        inputs={[
          {
            id: 'month',
            label: monthLabel,
            mask: [/[0-9]/, /[0-9]/],
            placeholderCharacter: placeholders['month'],
            autoComplete: 'cc-exp-month',
            ...htmlAttributes,
          },
          {
            id: 'year',
            label: yearLabel,
            mask: [/[0-9]/, /[0-9]/],
            placeholderCharacter: placeholders['year'],
            autoComplete: 'cc-exp-year',
            ...htmlAttributes,
          },
        ]}
      />
    </FieldBlock>
  )
}

Expiry._supportsEufemiaSpacingProps = true
export default Expiry
