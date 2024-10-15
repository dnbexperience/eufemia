import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox>
      <Field.OrganizationNumber
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const OmitMask = () => {
  return (
    <ComponentBox>
      <Field.OrganizationNumber
        onChange={(value) => console.log('onChange', value)}
        omitMask
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Field.OrganizationNumber
        placeholder="Enter 9 digits..."
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Field.OrganizationNumber
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Field.OrganizationNumber
        label="Label text"
        value="987654321"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.OrganizationNumber
        label="Label text"
        value="987654321"
        help={{
          title: 'Help is available',
          content:
            'Success has nothing to do with what you gain in life or accomplish for yourself. It’s what you do for others.',
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Field.OrganizationNumber
        value="989898989"
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
      <Field.OrganizationNumber
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
      <Field.OrganizationNumber
        value="123456789"
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
            return new Error('My error')
          }
        }

        const myValidator = (value, { validators }) => {
          const { organizationNumberValidator } = validators

          return [organizationNumberValidator, firstDigitIs1Validator]
        }

        return (
          <Field.OrganizationNumber
            required
            value="991541209"
            onBlurValidator={myValidator}
            validateInitially
          />
        )
      }}
    </ComponentBox>
  )
}
