import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

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
          placeholder: 'Your city..',
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
    <ComponentBox>
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

export const Error = () => {
  return (
    <ComponentBox scope={{ FormError }}>
      <Field.PostalCodeAndCity
        postalCode={{}}
        city={{}}
        error={new FormError('This is what is wrong...')}
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
