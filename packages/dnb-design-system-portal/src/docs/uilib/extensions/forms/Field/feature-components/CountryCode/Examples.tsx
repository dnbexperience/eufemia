import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

export const Empty = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.CountryCode
        onFocus={(value) => console.log('onFocus', value)}
        onBlur={(value) => console.log('onBlur', value)}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.CountryCode
        placeholder="Code?"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.CountryCode
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const OptionSelected = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.CountryCode
        value="+47"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndOptionSelected = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.CountryCode
        value="+46"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.CountryCode
        value="+45"
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

export const HorizontalLayout = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.CountryCode
        layout="horizontal"
        value="+45"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Widths = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.CountryCode
        value="+45"
        label="Default width (prop omitted"
        onChange={(value) => console.log('onChange', value)}
      />
      <Field.CountryCode
        value="+45"
        label="Small"
        width="small"
        onChange={(value) => console.log('onChange', value)}
      />
      <Field.CountryCode
        value="+45"
        label="Medium"
        width="medium"
        onChange={(value) => console.log('onChange', value)}
      />
      <Field.CountryCode
        value="+45"
        label="Large"
        width="large"
        onChange={(value) => console.log('onChange', value)}
      />
      <Field.CountryCode
        value="+45"
        label="Stretch"
        width="stretch"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.CountryCode
        value="+44"
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
      <Field.CountryCode
        value="+43"
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
      <Field.CountryCode
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        required
        validateInitially
        validateUnchanged
      />
    </ComponentBox>
  )
}
