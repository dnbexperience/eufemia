import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox>
      <Field.BankAccountNumber
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const OmitMask = () => {
  return (
    <ComponentBox>
      <Field.BankAccountNumber
        onChange={(value) => console.log('onChange', value)}
        omitMask
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Field.BankAccountNumber
        placeholder="Enter 11 digits..."
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Field.BankAccountNumber
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Field.BankAccountNumber
        label="Label text"
        value="20001234567"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.BankAccountNumber
        label="Label text"
        value="20001234567"
        help={{
          title: 'Help is available',
          content:
            'The real point is that we all need help somewhere along life’s path whether we think we will or not. And, if you are the one giving and helping, just remember this: no matter what happens later, you will always be secure in the fact knowing that you have remained strong and true to assist those that need your help.',
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Field.BankAccountNumber
        value="20001234567"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const WithError = () => {
  return (
    <ComponentBox>
      <Field.BankAccountNumber
        value="007"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox>
      <Field.BankAccountNumber
        value="20001234567"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        required
      />
    </ComponentBox>
  )
}

export const ValidationExtendValidator = () => {
  return (
    <ComponentBox>
      {() => {
        const firstDigitIs1Validator = (value: string) => {
          if (value.substring(0, 1) !== '1') {
            return new Error('First digit is not 1')
          }
        }

        const myValidator = (value, { validators }) => {
          const { bankAccountNumberValidator } = validators

          return [bankAccountNumberValidator, firstDigitIs1Validator]
        }

        return (
          <Field.BankAccountNumber
            required
            value="65845125621"
            onBlurValidator={myValidator}
            validateInitially
          />
        )
      }}
    </ComponentBox>
  )
}
