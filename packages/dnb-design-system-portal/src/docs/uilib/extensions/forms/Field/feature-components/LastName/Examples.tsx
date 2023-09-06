import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

export const Empty = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.LastName
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.LastName
        placeholder="Enter a name..."
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.LastName
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.LastName
        label="Label text"
        value="Smith"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.LastName
        label="Label text"
        value="Smith"
        help={{
          title: 'Help is available',
          contents:
            'It is one of the most beautiful compensations of life that no man can sincerely try to help another without helping himself.',
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.LastName
        value="Smith"
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
      <Field.LastName
        value="Unnamed"
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
      <Field.LastName
        value="Smith"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        required
      />
    </ComponentBox>
  )
}
