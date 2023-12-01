import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

export const Empty = () => {
  return (
    <ComponentBox>
      <Field.PhoneNumber
        onFocus={(value) => console.log('onFocus', value)}
        onBlur={(value) => console.log('onBlur', value)}
        onChange={(...args) => console.log('onChange', ...args)}
        onCountryCodeChange={(countryCode) =>
          console.log('onCountryCodeChange', countryCode)
        }
        onNumberChange={(phoneNumber) =>
          console.log('onNumberChange', phoneNumber)
        }
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Field.PhoneNumber
        placeholder="Call this number"
        onChange={(...args) => console.log('onChange', ...args)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Field.PhoneNumber
        label="Label text"
        onChange={(...args) => console.log('onChange', ...args)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox data-visual-test="phone-number-label">
      <Field.PhoneNumber
        label="Label text"
        value="+47 98765432"
        onChange={(...args) => console.log('onChange', ...args)}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.PhoneNumber
        onChange={(...args) => console.log('onChange', ...args)}
        help={{
          title: 'Help is available',
          contents:
            'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
        }}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Field.PhoneNumber
        value="+47 12345678"
        label="Label text"
        onChange={(...args) => console.log('onChange', ...args)}
        disabled
      />
    </ComponentBox>
  )
}

export const Error = () => {
  return (
    <ComponentBox scope={{ FormError }}>
      <Field.PhoneNumber
        value="007"
        label="Label text"
        onChange={(...args) => console.log('onChange', ...args)}
        error={new FormError('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox>
      <Field.PhoneNumber
        value="+47 888"
        label="Label text"
        onChange={(...args) => console.log('onChange', ...args)}
        required
      />
    </ComponentBox>
  )
}

export const WithFilter = () => {
  return (
    <ComponentBox>
      <Field.PhoneNumber
        label="Label text"
        onChange={(...args) => console.log('onChange', ...args)}
        filterCountries={({ regions }) =>
          regions && regions.includes('Scandinavia')
        }
      />
    </ComponentBox>
  )
}
