import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { DataInput } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

export const Empty = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Email
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Email
        placeholder="Enter email address..."
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Email
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Email
        label="Label text"
        value="my-m@il.com"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Email
        value="my-m@il.com"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const InvalidSyntax = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Email
        value="Not a mail"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        validateInitially
      />
    </ComponentBox>
  )
}

export const Error = () => {
  return (
    <ComponentBox scope={{ DataInput, FormError }}>
      <DataInput.Email
        value="foo@bar.com"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new FormError('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Email
        value="my-m@il.com"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        required
      />
    </ComponentBox>
  )
}
