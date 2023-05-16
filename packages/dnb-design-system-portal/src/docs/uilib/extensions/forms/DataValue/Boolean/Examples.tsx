import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { DataValue } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.Boolean showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.Boolean placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const ValueTrue = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.Boolean value={true} />
    </ComponentBox>
  )
}

export const ValueFalse = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.Boolean value={false} />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.Boolean label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.Boolean label="Label text" value={false} />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <>
        <span style={{ color: 'red' }}>This is before the component</span>
        <DataValue.Boolean value={true} inline />
        <span style={{ color: 'red' }}>This is after the component</span>
      </>
    </ComponentBox>
  )
}

export const InlineAndLabel = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <>
        <span style={{ color: 'red' }}>This is before the component</span>
        <DataValue.Boolean label="Label text" value={true} inline />
        <span style={{ color: 'red' }}>This is after the component</span>
      </>
    </ComponentBox>
  )
}
