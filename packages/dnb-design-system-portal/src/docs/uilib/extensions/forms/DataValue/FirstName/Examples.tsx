import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { DataValue } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.FirstName showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.FirstName placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const Value = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.FirstName value="John" />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.FirstName label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.FirstName label="Label text" value="John" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <>
        This is before the component
        <DataValue.FirstName value="John" inline />
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
        <DataValue.FirstName label="Label text" value="John" inline />
        This is after the component
      </>
    </ComponentBox>
  )
}
