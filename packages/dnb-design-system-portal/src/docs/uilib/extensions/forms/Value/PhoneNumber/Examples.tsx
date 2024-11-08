import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Value } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox>
      <Value.PhoneNumber showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.PhoneNumber placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox>
      <Value.PhoneNumber value="98712345" />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Value.PhoneNumber label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Value.PhoneNumber label="Label text" value="98712345" />
    </ComponentBox>
  )
}

export const InternationalSuffix = () => {
  return (
    <ComponentBox>
      <Value.PhoneNumber label="Label text" value="+47 98712345" />
      <Value.PhoneNumber label="Label text" value="+886 0998472751" />
      <Value.PhoneNumber label="Label text" value="+1-868 6758288" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        This is before the component{' '}
        <Value.PhoneNumber value="98712345" inline /> This is after the
        component
      </P>
    </ComponentBox>
  )
}
