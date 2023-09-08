import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

export const Empty = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.OrganizationNumber
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const OmitMask = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.OrganizationNumber
        onChange={(value) => console.log('onChange', value)}
        omitMask
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.OrganizationNumber
        placeholder="Enter 9 digits..."
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.OrganizationNumber
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ Field }}>
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
    <ComponentBox scope={{ Field }}>
      <Field.OrganizationNumber
        label="Label text"
        value="987654321"
        help={{
          title: 'Help is available',
          contents:
            'Success has nothing to do with what you gain in life or accomplish for yourself. It’s what you do for others.',
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.OrganizationNumber
        value="989898989"
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
      <Field.OrganizationNumber
        value="007"
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
      <Field.OrganizationNumber
        value="123456789"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        required
      />
    </ComponentBox>
  )
}
