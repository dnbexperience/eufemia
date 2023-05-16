import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { DataValue } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.Email showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.Email placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const Value = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.Email value="firstname.lastname@domain.com" />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.Email label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <DataValue.Email
        label="Label text"
        value="firstname.lastname@domain.com"
      />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox scope={{ DataValue }}>
      <>
        This is before the component
        <DataValue.Email value="firstname.lastname@domain.com" inline />
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
        <DataValue.Email
          label="Label text"
          value="firstname.lastname@domain.com"
          inline
        />
        This is after the component
      </>
    </ComponentBox>
  )
}
