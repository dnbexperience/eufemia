import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

export const Empty = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Number onChange={(value) => console.log('onChange', value)} />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Number
        placeholder="Enter a number"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Number
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Number
        value={420000.25}
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Number
        value={12345}
        label="Label text"
        help={{
          title: 'Help is available',
          contents:
            'Here is what a team can do for you. . . . It allows you to help others do their best.',
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const HorizontalLayout = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Number
        value={420000}
        label="Label text"
        layout="horizontal"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Widths = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Number
        label="Default width (property omitted)"
        value={123}
        onChange={(value) => console.log('onChange', value)}
      />
      <Field.Number
        label="Small"
        value={123}
        width="small"
        onChange={(value) => console.log('onChange', value)}
      />
      <Field.Number
        label="Medium"
        value={123}
        width="medium"
        onChange={(value) => console.log('onChange', value)}
      />
      <Field.Number
        label="Large"
        value={123}
        width="large"
        onChange={(value) => console.log('onChange', value)}
      />
      <Field.Number
        label="Stretch"
        value={123}
        width="stretch"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Number
        value={135}
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const Info = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Number
        value={135}
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        info="Useful information (?)"
      />
    </ComponentBox>
  )
}

export const Warning = () => {
  return (
    <ComponentBox scope={{ Field, FormError }}>
      <Field.Number
        value={135}
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        warning={new FormError("I'm warning you...")}
      />
    </ComponentBox>
  )
}

export const Error = () => {
  return (
    <ComponentBox scope={{ Field, FormError }}>
      <Field.Number
        value={135}
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new FormError('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidateRequired = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Number
        value={123}
        label="Remove and blur field"
        onChange={(value) => console.log('onChange', value)}
        required
      />
    </ComponentBox>
  )
}

export const ValidateMinimum = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Number
        value={300}
        label="Enter a number below 250 and blur to trigger error"
        onChange={(value) => console.log('onChange', value)}
        minimum={250}
      />
    </ComponentBox>
  )
}

export const ValidateMaximumCustomError = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Number
        value={200}
        label="Enter a number above 250 and blur to trigger error"
        onChange={(value) => console.log('onChange', value)}
        maximum={250}
        errorMessages={{
          maximum: "You can't enter a number THAR large.. Max 250!",
        }}
      />
    </ComponentBox>
  )
}
