import React, { useContext } from 'react'
import classnames from 'classnames'
import { InputMasked } from '../../../components'
import { useInput } from './hooks'
import { forwardSpaceProps } from '../utils'
import { Props as StringComponentProps } from './String'
import SharedContext from '../../../shared/Context'

export type Props = StringComponentProps

export default function FieldBankAccountNumber(props: Props) {
  const sharedContext = useContext(SharedContext)

  const preparedProps: Props = {
    ...props,
    label:
      props.label ??
      sharedContext?.translation.Forms.bankAccountNumberLabel,
    errorMessages: {
      required:
        sharedContext?.translation.Forms.bankAccountNumberErrorRequired,
      pattern:
        sharedContext?.translation.Forms.bankAccountNumberErrorPattern,
      ...props.errorMessages,
    },
    fromInput: ({ value }: { value: string }) => {
      if (value === '') {
        return props.emptyValue
      }
      return value
    },
  }
  const {
    className,
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
      className={classnames(
        'dnb-forms-field-bank-account-number',
        className
      )}
      mask={[
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholder={placeholder}
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
