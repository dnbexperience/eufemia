import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Value } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Currency showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Currency placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Currency value={150} suffix=" kr" />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Currency label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Currency label="Label text" value={60000000} />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <P>
        This is before the component
        <Value.Currency value={25000} inline />
        This is after the component
      </P>
    </ComponentBox>
  )
}

export const InlineAndLabel = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <P>
        This is before the component
        <Value.Currency label="Label text" value={25000} inline />
        This is after the component
      </P>
    </ComponentBox>
  )
}
