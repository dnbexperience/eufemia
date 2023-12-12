import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Value } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Boolean showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Boolean placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const ValueTrue = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Boolean value={true} />
    </ComponentBox>
  )
}

export const ValueFalse = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Boolean value={false} />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Boolean label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Boolean label="Label text" value={false} />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <P>
        <span style={{ color: 'red' }}>This is before the component</span>
        <Value.Boolean value={true} inline />
        <span style={{ color: 'red' }}>This is after the component</span>
      </P>
    </ComponentBox>
  )
}
