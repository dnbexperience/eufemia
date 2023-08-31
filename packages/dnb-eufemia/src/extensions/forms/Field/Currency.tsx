import React from 'react'
import classnames from 'classnames'
import { InputMasked, HelpButton } from '../../../components'
import { useField } from './hooks'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../component-types'
import type { FieldProps, FieldHelpProps } from '../field-types'

export type Props = ComponentProps &
  FieldHelpProps &
  FieldProps<number, undefined> & {
    currency?: string
  }

function Currency(props: Props) {
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
    placeholder,
    label,
    value,
    help,
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
      placeholder={placeholder ?? 'kr'}
      value={value?.toString() ?? ''}
      label={label}
      label_direction="vertical"
      on_focus={onFocus}
      on_blur={onBlur}
      on_change={onChange}
      status={error?.message}
      disabled={disabled}
      suffix={
        help ? (
          <HelpButton title={help.title}>{help.contents}</HelpButton>
        ) : undefined
      }
      {...forwardSpaceProps(props)}
    />
  )
}

Currency._supportsEufemiaSpacingProps = true
export default Currency
