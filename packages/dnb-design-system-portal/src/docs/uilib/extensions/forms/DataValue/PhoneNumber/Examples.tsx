import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { DataValue } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.PhoneNumber showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.PhoneNumber placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const Value = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.PhoneNumber value="98712345" />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.PhoneNumber label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.PhoneNumber label="Label text" value="98712345" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <>
        This is before the component
        <DataValue.PhoneNumber value="98712345" inline />
        This is after the component
      </>
    </ComponentBox>
  )
}

export const InlineAndLabel = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <>
        This is before the component
        <DataValue.PhoneNumber
          label="Label text"
          value="98712345"
          inline
        />
        This is after the component
      </>
    </ComponentBox>
  )
}
