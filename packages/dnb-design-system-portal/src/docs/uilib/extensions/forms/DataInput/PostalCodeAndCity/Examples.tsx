import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { DataInput } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

export const Empty = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.PostalCodeAndCity
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
    <ComponentBox scope={{ DataInput }}>
      <DataInput.PostalCodeAndCity
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
    <ComponentBox scope={{ DataInput }}>
      <DataInput.PostalCodeAndCity
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
    <ComponentBox scope={{ DataInput }}>
      <DataInput.PostalCodeAndCity
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

export const Disabled = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.PostalCodeAndCity
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
    <ComponentBox scope={{ DataInput, FormError }}>
      <DataInput.PostalCodeAndCity
        postalCode={{}}
        city={{}}
        error={new FormError('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.PostalCodeAndCity
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
