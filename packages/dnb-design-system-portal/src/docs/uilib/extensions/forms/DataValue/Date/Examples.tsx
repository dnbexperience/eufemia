import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { DataValue } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.Date showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.Date placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const Value = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.Date value="2023-01-16" />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.Date label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.Date label="Label text" value="2023-01-16" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <>
        This is before the component
        <DataValue.Date value="2023-01-16" inline />
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
        <DataValue.Date label="Label text" value="2023-01-16" inline />
        This is after the component
      </>
    </ComponentBox>
  )
}
