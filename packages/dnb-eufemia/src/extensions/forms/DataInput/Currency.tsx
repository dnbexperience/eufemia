import React from 'react'
import { InputMasked } from '../../../components'
import { useInput } from './hooks'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../component-types'
import type { InputProps } from '../input-types'

export type Props = ComponentProps &
  InputProps<number> & {
    stretch?: boolean
    currency?: string
  }

export default function CurrencyInput(props: Props) {
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
    stretch = true,
    placeholder,
    label,
    value,
    error,
    disabled,
    onFocus,
    onBlur,
    onChange,
  } = useInput(preparedProps)

  return (
    <InputMasked
      as_currency={currency ?? true}
      className={className}
      data-testid={dataTestId ?? path ?? 'currency-input'}
      placeholder={placeholder}
      value={value?.toString() ?? ''}
      label={label}
      label_direction="vertical"
      on_focus={onFocus}
      on_blur={onBlur}
      on_change={onChange}
      status={error?.message}
      disabled={disabled}
      stretch={stretch}
      {...forwardSpaceProps(props)}
    />
  )
}
