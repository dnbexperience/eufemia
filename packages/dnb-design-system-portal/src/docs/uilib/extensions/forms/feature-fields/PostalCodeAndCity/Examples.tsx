import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form, Iterate } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox>
      <Field.PostalCodeAndCity
        postalCode={{
          onChange: (value) => console.log('postalCode onChange', value),
        }}
        city={{
          onChange: (value) => console.log('city onChange', value),
        }}
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Field.PostalCodeAndCity
        postalCode={{
          placeholder: '????',
          onChange: (value) => console.log('postalCode onChange', value),
        }}
        city={{
          placeholder: 'Your city',
          onChange: (value) => console.log('city onChange', value),
        }}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Field.PostalCodeAndCity
        postalCode={{
          label: 'PNR',
          onChange: (value) => console.log('postalCode onChange', value),
        }}
        city={{
          label: 'CTY',
          onChange: (value) => console.log('city onChange', value),
        }}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox data-visual-test="postal-code-and-city-label">
      <Field.PostalCodeAndCity
        postalCode={{
          label: 'Pnr.',
          value: '0788',
          onChange: (value) => console.log('postalCode onChange', value),
        }}
        city={{
          value: 'Oslo',
          onChange: (value) => console.log('city onChange', value),
        }}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.PostalCodeAndCity
        postalCode={{
          onChange: (value) => console.log('postalCode onChange', value),
        }}
        city={{
          onChange: (value) => console.log('city onChange', value),
        }}
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
      <Field.PostalCodeAndCity
        postalCode={{
          value: '1234',
          disabled: true,
          onChange: (value) => console.log('postalCode onChange', value),
        }}
        city={{
          value: 'Oslo',
          disabled: true,
          onChange: (value) => console.log('city onChange', value),
        }}
      />
    </ComponentBox>
  )
}

export const WithError = () => {
  return (
    <ComponentBox data-visual-test="postal-code-and-city-error">
      <Field.PostalCodeAndCity
        postalCode={{}}
        city={{}}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox>
      <Field.PostalCodeAndCity
        postalCode={{
          required: true,
        }}
        city={{
          required: true,
        }}
      />
    </ComponentBox>
  )
}

export const LongLabel = () => {
  return (
    <ComponentBox data-visual-test="postal-code-and-city-long-label">
      <Field.PostalCodeAndCity
        postalCode={{
          label: 'With a very long label',
        }}
        city={{
          label: 'With a very long label',
        }}
      />
    </ComponentBox>
  )
}

export const IterateArray = () => {
  return (
    <ComponentBox>
      <Iterate.Array
        value={[
          {
            postalCode: '0788',
            city: 'Oslo',
          },
          {
            postalCode: '0789',
            city: 'Bergen',
          },
        ]}
      >
        <Field.PostalCodeAndCity
          postalCode={{ itemPath: '/postalCode' }}
          city={{ itemPath: '/city' }}
        />
      </Iterate.Array>
    </ComponentBox>
  )
}

export const SettingCountryBasedOnPath = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Field.SelectCountry
          path="/myCountry"
          defaultValue="NO"
          bottom="medium"
        />
        <Field.PostalCodeAndCity country="/myCountry" />
      </Form.Handler>
    </ComponentBox>
  )
}

export const NonNorwegianPostalCode = () => {
  return (
    <ComponentBox>
      <Field.PostalCodeAndCity
        country="de"
        postalCode={{
          pattern: '^[0-9]{5}$',
          mask: [/\\d/, /\\d/, /\\d/, /\\d/, /\\d/],
          placeholder: '00000',
          width: 'medium',
        }}
        city={{ pattern: '^[a-zA-ZäöüÄÖÜß -]+$', width: 'stretch' }}
      />
    </ComponentBox>
  )
}
