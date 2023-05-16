import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { DataInput } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

export const Empty = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Number
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Number
        placeholder="Enter a number"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Number
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Number
        value={420000}
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Number
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
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Number
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
    <ComponentBox scope={{ DataInput, FormError }}>
      <DataInput.Number
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
    <ComponentBox scope={{ DataInput, FormError }}>
      <DataInput.Number
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
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Number
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
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Number
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
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Number
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
