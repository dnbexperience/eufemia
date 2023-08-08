import React from 'react'
import classnames from 'classnames'
import { InputMasked } from '../../../components'
import { useField } from './hooks'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../component-types'
import type { FieldProps } from '../field-types'

export type Props = ComponentProps &
  FieldProps<number> & {
    currency?: string
  }

export default function FieldCurrency(props: Props) {
  const preparedProps: Props = {
    ...props,
    fromInput: ({
      value,
      numberValue,
    }: {
      value: string
      numberValue: number
    }) => {
      if (value === '') {
        return props.emptyValue
      }
      return numberValue
    },
  }
  const {
    className,
    currency,
    path,
    'data-testid': dataTestId,
    placeholder,
    label,
    value,
    error,
    disabled,
    onFocus,
    onBlur,
    onChange,
  } = useField(preparedProps)

  return (
    <InputMasked
      as_currency={currency ?? true}
      className={classnames('dnb-forms-field-currency', className)}
      data-testid={dataTestId ?? path ?? 'currency-input'}
      placeholder={placeholder ?? 'kr'}
      value={value?.toString() ?? ''}
      label={label}
      label_direction="vertical"
      on_focus={onFocus}
      on_blur={onBlur}
      on_change={onChange}
      status={error?.message}
      disabled={disabled}
      {...forwardSpaceProps(props)}
    />
  )
}
