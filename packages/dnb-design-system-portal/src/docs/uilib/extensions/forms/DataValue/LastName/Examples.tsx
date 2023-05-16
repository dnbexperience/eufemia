import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { DataValue } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.LastName showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.LastName placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const Value = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.LastName value="Smith" />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.LastName label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.LastName label="Label text" value="Smith" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <>
        This is before the component
        <DataValue.LastName value="Smith" inline />
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
        <DataValue.LastName label="Label text" value="Smith" inline />
        This is after the component
      </>
    </ComponentBox>
  )
}
