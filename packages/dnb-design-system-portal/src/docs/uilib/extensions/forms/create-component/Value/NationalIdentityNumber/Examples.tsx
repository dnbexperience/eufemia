import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Value } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.NationalIdentityNumber showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.NationalIdentityNumber placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.NationalIdentityNumber value="25017598765" />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.NationalIdentityNumber label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.NationalIdentityNumber
        label="Label text"
        value="25017598765"
      />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <P>
        This is before the component
        <Value.NationalIdentityNumber value="25017598765" inline />
        This is after the component
      </P>
    </ComponentBox>
  )
}
