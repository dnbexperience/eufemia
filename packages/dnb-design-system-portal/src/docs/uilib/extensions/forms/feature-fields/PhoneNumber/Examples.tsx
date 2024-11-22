import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox>
      <Field.PhoneNumber
        onFocus={(value, additionalArgs) =>
          console.log('onFocus', value, additionalArgs)
        }
        onBlur={(value, additionalArgs) =>
          console.log('onBlur', value, additionalArgs)
        }
        onChange={(value, additionalArgs) =>
          console.log('onChange', value, additionalArgs)
        }
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
        onChange={(value, additionalArgs) =>
          console.log('onChange', value, additionalArgs)
        }
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Field.PhoneNumber
        label="Label text"
        onChange={(value, additionalArgs) =>
          console.log('onChange', value, additionalArgs)
        }
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
        onChange={(value, additionalArgs) =>
          console.log('onChange', value, additionalArgs)
        }
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.PhoneNumber
        onChange={(value, additionalArgs) =>
          console.log('onChange', value, additionalArgs)
        }
        help={{
          title: 'Help is available',
          content:
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
        onChange={(value, additionalArgs) =>
          console.log('onChange', value, additionalArgs)
        }
        disabled
      />
    </ComponentBox>
  )
}

export const WithError = () => {
  return (
    <ComponentBox data-visual-test="phone-number-error">
      <Field.PhoneNumber
        value="007"
        label="Label text"
        onChange={(value, additionalArgs) =>
          console.log('onChange', value, additionalArgs)
        }
        error={new Error('This is what is wrong...')}
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
        onChange={(value, additionalArgs) =>
          console.log('onChange', value, additionalArgs)
        }
        required
      />
    </ComponentBox>
  )
}

export const ValidationPattern = () => {
  return (
    <ComponentBox>
      <Field.PhoneNumber
        value="+41 123"
        label="Label text"
        onChange={(value, additionalArgs) =>
          console.log('onChange', value, additionalArgs)
        }
        pattern="^\\+41 [1]\\d{2}$"
      />
    </ComponentBox>
  )
}

export const WithFilter = () => {
  return (
    <ComponentBox>
      <Field.PhoneNumber
        label="Label text"
        onChange={(value, additionalArgs) =>
          console.log('onChange', value, additionalArgs)
        }
        countries="Scandinavia"
      />
    </ComponentBox>
  )
}

export const LongLabel = () => {
  return (
    <ComponentBox data-visual-test="phone-number-long-label">
      <Field.PhoneNumber label="Telefon/mobilnummer with long label" />
    </ComponentBox>
  )
}

export const InCard = () => {
  return (
    <ComponentBox data-visual-test="phone-number-in-card">
      <Form.Card>
        <Field.PhoneNumber />
      </Form.Card>
    </ComponentBox>
  )
}

export function FilterCountries() {
  return (
    <ComponentBox>
      <Field.PhoneNumber
        countries="Scandinavia"
        filterCountries={({ iso }) => iso !== 'DK'}
      />
    </ComponentBox>
  )
}
