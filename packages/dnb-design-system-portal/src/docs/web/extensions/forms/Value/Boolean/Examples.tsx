import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Value } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox>
      <Value.Boolean showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.Boolean placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const ValueTrue = () => {
  return (
    <ComponentBox>
      <Value.Boolean value={true} />
    </ComponentBox>
  )
}

export const ValueFalse = () => {
  return (
    <ComponentBox>
      <Value.Boolean value={false} />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Value.Boolean label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Value.Boolean label="Label text" value={false} />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        <span style={{ color: 'red' }}>This is before the component</span>{' '}
        <Value.Boolean value={true} inline />{' '}
        <span style={{ color: 'red' }}>This is after the component</span>
      </P>
    </ComponentBox>
  )
}
