import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

export const Empty = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.BankAccountNumber
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.BankAccountNumber
        placeholder="Enter 11 digits..."
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.BankAccountNumber
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.BankAccountNumber
        label="Label text"
        value="20001234567"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.BankAccountNumber
        value="20001234567"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const Error = () => {
  return (
    <ComponentBox scope={{ Field, FormError }}>
      <Field.BankAccountNumber
        value="007"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new FormError('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.BankAccountNumber
        value="20001234567"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        required
      />
    </ComponentBox>
  )
}
