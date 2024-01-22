import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, FormError } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox>
      <Field.NationalIdentityNumber
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const OmitMask = () => {
  return (
    <ComponentBox>
      <Field.NationalIdentityNumber
        onChange={(value) => console.log('onChange', value)}
        omitMask
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Field.NationalIdentityNumber
        placeholder="Enter 11 digits..."
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Field.NationalIdentityNumber
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Field.NationalIdentityNumber
        label="Label text"
        value="01017501234"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.NationalIdentityNumber
        label="Label text"
        value="01017501234"
        help={{
          title: 'Help is available',
          content:
            'The more I help others to succeed, the more I succeed.',
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Field.NationalIdentityNumber
        value="01010101010"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const Error = () => {
  return (
    <ComponentBox scope={{ FormError }}>
      <Field.NationalIdentityNumber
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
    <ComponentBox>
      <Field.NationalIdentityNumber
        value="12345678901"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        required
      />
    </ComponentBox>
  )
}

export const ValidationFunction = () => {
  return (
    <ComponentBox scope={{ FormError }}>
      {() => {
        const fnr = (value: string) =>
          value.length >= 11 ? { status: 'valid' } : { status: 'invalid' }

        const validator = (value, errorMessages) => {
          const result = fnr(value)
          return result.status === 'invalid'
            ? new FormError(errorMessages.pattern)
            : undefined
        }

        return (
          <Field.NationalIdentityNumber
            required
            value="123"
            validator={validator}
            validateInitially
          />
        )
      }}
    </ComponentBox>
  )
}
