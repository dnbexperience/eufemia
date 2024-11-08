import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Value } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox>
      <Value.Currency showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.Currency placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox>
      <Value.Currency value={150} />
    </ComponentBox>
  )
}

export const WithSuffix = () => {
  return (
    <ComponentBox>
      <Value.Currency value={150} suffix=" - my suffix" />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Value.Currency label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Value.Currency label="Label text" value={60000000} />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        This is before the component{' '}
        <Value.Currency value={25000} inline /> This is after the component
      </P>
    </ComponentBox>
  )
}

export const InlineAndLabel = () => {
  return (
    <ComponentBox>
      <P>
        This is before the component{' '}
        <Value.Currency label="Label text" value={25000} inline /> This is
        after the component
      </P>
    </ComponentBox>
  )
}
