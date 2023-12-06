import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Value } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Date showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Date placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Date value="2023-01-16" />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Date label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Date label="Label text" value="2023-01-16" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <P>
        This is before the component
        <Value.Date value="2023-01-16" inline />
        This is after the component
      </P>
    </ComponentBox>
  )
}
