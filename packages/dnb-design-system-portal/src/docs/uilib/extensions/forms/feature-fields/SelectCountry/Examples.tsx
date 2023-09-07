import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

export const Empty = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.SelectCountry
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.SelectCountry
        placeholder="Select something...."
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.SelectCountry
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const OptionSelected = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.SelectCountry
        value="bar"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndOptionSelected = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.SelectCountry
        value="bar"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.SelectCountry
        value="bar"
        label="Label text"
        help={{
          title: 'Help is available',
          contents:
            'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.SelectCountry
        value="bar"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const Error = () => {
  return (
    <ComponentBox scope={{ Field, FormError }}>
      <Field.SelectCountry
        value="bar"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new FormError('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.SelectCountry
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        required
        validateInitially
        validateUnchanged
      />
    </ComponentBox>
  )
}
