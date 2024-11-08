import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Value } from '@dnb/eufemia/src/extensions/forms'

export const VariantShort = () => {
  return (
    <ComponentBox>
      <Value.Date label="Label text" value="2023-01-16" variant="short" />
    </ComponentBox>
  )
}

export const VariantNumeric = () => {
  return (
    <ComponentBox>
      <Value.Date
        label="Label text"
        value="2023-01-16"
        variant="numeric"
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Value.Date label="Label text" value="2023-01-16" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        This is before the component{' '}
        <Value.Date label="Label text" value="2023-01-16" inline /> This is
        after the component
      </P>
    </ComponentBox>
  )
}

export const Range = () => {
  return (
    <ComponentBox>
      <Value.Date label="Label text" value="2023-01-16|2023-04-01" />
    </ComponentBox>
  )
}
