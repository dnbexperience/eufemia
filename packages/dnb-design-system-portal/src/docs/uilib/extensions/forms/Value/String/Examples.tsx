import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Value } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox>
      <Value.String showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.String placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox>
      <Value.String value="Text value" />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Value.String label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Value.String label="Label text" value="Text value" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        This is before the component{' '}
        <Value.String value="Text value" inline /> This is after the
        component
      </P>
    </ComponentBox>
  )
}
