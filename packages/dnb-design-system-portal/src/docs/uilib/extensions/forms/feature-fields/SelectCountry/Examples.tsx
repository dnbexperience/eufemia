import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, FormError } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox>
      <Field.SelectCountry
        onChange={(value, obj) => console.log('onChange', value, obj)}
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Field.SelectCountry
        placeholder="Select something...."
        onChange={(value, obj) => console.log('onChange', value, obj)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Field.SelectCountry
        label="Label text"
        onChange={(value, obj) => console.log('onChange', value, obj)}
      />
    </ComponentBox>
  )
}

export const OptionSelected = () => {
  return (
    <ComponentBox>
      <Field.SelectCountry
        value="NO"
        onChange={(value, obj) => console.log('onChange', value, obj)}
      />
    </ComponentBox>
  )
}

export const LabelAndOptionSelected = () => {
  return (
    <ComponentBox>
      <Field.SelectCountry
        value="NO"
        label="Label text"
        onChange={(value, obj) => console.log('onChange', value, obj)}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.SelectCountry
        value="NO"
        label="Label text"
        help={{
          title: 'Help is available',
          content:
            'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
        }}
        onChange={(value, obj) => console.log('onChange', value, obj)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Field.SelectCountry
        value="NO"
        label="Label text"
        onChange={(value, obj) => console.log('onChange', value, obj)}
        disabled
      />
    </ComponentBox>
  )
}

export const Error = () => {
  return (
    <ComponentBox scope={{ FormError }}>
      <Field.SelectCountry
        value="NO"
        label="Label text"
        onChange={(value, obj) => console.log('onChange', value, obj)}
        error={new FormError('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox>
      <Field.SelectCountry
        label="Label text"
        onChange={(value, obj) => console.log('onChange', value, obj)}
        required
        validateInitially
        validateUnchanged
      />
    </ComponentBox>
  )
}
