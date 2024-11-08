import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Value } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox>
      <Value.OrganizationNumber showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.OrganizationNumber placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox>
      <Value.OrganizationNumber value="123456789" />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Value.OrganizationNumber label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Value.OrganizationNumber label="Label text" value="123456789" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        This is before the component{' '}
        <Value.OrganizationNumber value="123456789" inline /> This is after
        the component
      </P>
    </ComponentBox>
  )
}
