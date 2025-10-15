import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form, Tools } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox>
      <Field.PhoneNumber
        onFocus={(value, { countryCode, phoneNumber, iso }) =>
          console.log('onFocus', value, { countryCode, phoneNumber, iso })
        }
        onBlur={(value, { countryCode, phoneNumber, iso }) =>
          console.log('onBlur', value, { countryCode, phoneNumber, iso })
        }
        onChange={(value, { countryCode, phoneNumber, iso }) =>
          console.log('onChange', value, { countryCode, phoneNumber, iso })
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
        onChange={(value, { countryCode, phoneNumber, iso }) =>
          console.log('onChange', value, { countryCode, phoneNumber, iso })
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
        onChange={(value, { countryCode, phoneNumber, iso }) =>
          console.log('onChange', value, { countryCode, phoneNumber, iso })
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
        onChange={(value, { countryCode, phoneNumber, iso }) =>
          console.log('onChange', value, { countryCode, phoneNumber, iso })
        }
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.PhoneNumber
        onChange={(value, { countryCode, phoneNumber, iso }) =>
          console.log('onChange', value, { countryCode, phoneNumber, iso })
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
        onChange={(value, { countryCode, phoneNumber, iso }) =>
          console.log('onChange', value, { countryCode, phoneNumber, iso })
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
        onChange={(value, { countryCode, phoneNumber, iso }) =>
          console.log('onChange', value, { countryCode, phoneNumber, iso })
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
        onChange={(value, { countryCode, phoneNumber, iso }) =>
          console.log('onChange', value, { countryCode, phoneNumber, iso })
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
        onChange={(value, { countryCode, phoneNumber, iso }) =>
          console.log('onChange', value, { countryCode, phoneNumber, iso })
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
        onChange={(value, { countryCode, phoneNumber, iso }) =>
          console.log('onChange', value, { countryCode, phoneNumber, iso })
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

export const Width = () => {
  return (
    <ComponentBox data-visual-test="phone-number-width">
      <Form.Card>
        <Field.String width="stretch" />
        <Field.PhoneNumber label="default" />
        <Field.PhoneNumber width="large" label="large" />
        <Field.PhoneNumber width="stretch" label="stretch" />
        <Field.PhoneNumber omitCountryCodeField label="default" />
        <Field.PhoneNumber
          omitCountryCodeField
          width="large"
          label="large"
        />
        <Field.PhoneNumber
          omitCountryCodeField
          width="stretch"
          label="stretch"
        />
      </Form.Card>
    </ComponentBox>
  )
}

export const TransformInAndOut = () => {
  return (
    <ComponentBox>
      {() => {
        const transformOut = (internal, additionalArgs) => {
          return {
            countryCode: additionalArgs?.iso,
            phoneNumber: additionalArgs?.phoneNumber,
            countryCodePrefix: additionalArgs?.countryCode,
          }
        }

        const transformIn = (external) => {
          return {
            countryCode: external?.countryCodePrefix,
            phoneNumber: external?.phoneNumber,
          }
        }

        return (
          <Form.Handler
            defaultData={{
              myField: {
                countryCode: 'GB',
                phoneNumber: '9123457',
                countryCodePrefix: '+44',
              },
            }}
          >
            <Form.Card>
              <Field.PhoneNumber
                path="/myField"
                transformOut={transformOut}
                transformIn={transformIn}
                label="Transform in and out"
              />
              <Tools.Log />
            </Form.Card>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}
