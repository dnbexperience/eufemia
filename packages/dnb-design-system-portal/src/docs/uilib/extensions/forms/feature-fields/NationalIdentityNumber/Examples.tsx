import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'

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

export const WithError = () => {
  return (
    <ComponentBox>
      <Field.NationalIdentityNumber
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
      <Field.NationalIdentityNumber
        value="12345678901"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        required
      />
    </ComponentBox>
  )
}

export const ValidationFnr = () => {
  return (
    <ComponentBox>
      <Field.NationalIdentityNumber
        value="29020112345"
        validateInitially
      />
    </ComponentBox>
  )
}

export const ValidationDnr = () => {
  return (
    <ComponentBox>
      <Field.NationalIdentityNumber
        value="69020112345"
        validateInitially
      />
    </ComponentBox>
  )
}

export const ValidationFunction = () => {
  return (
    <ComponentBox>
      {() => {
        const fnr = (value: string) =>
          value.length >= 11 ? { status: 'valid' } : { status: 'invalid' }

        const validator = (value, { errorMessages }) => {
          const result = fnr(value)
          return result.status === 'invalid'
            ? new Error(errorMessages.pattern)
            : undefined
        }

        return (
          <Field.NationalIdentityNumber
            required
            value="123"
            onBlurValidator={validator}
            validateInitially
          />
        )
      }}
    </ComponentBox>
  )
}

export const ValidationExtendValidator = () => {
  return (
    <ComponentBox>
      {() => {
        const bornInAprilValidator = (value: string) => {
          if (value.substring(2, 4) !== '04') {
            return new Error('My error')
          }
        }
        const myValidator = (value, { validators }) => {
          const { dnrValidator, fnrValidator } = validators

          return [dnrValidator, fnrValidator, bornInAprilValidator]
        }

        return (
          <Field.NationalIdentityNumber
            required
            value="53050129159"
            onBlurValidator={myValidator}
            validateInitially
          />
        )
      }}
    </ComponentBox>
  )
}
