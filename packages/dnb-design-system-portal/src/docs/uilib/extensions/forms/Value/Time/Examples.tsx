import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Value } from '@dnb/eufemia/src/extensions/forms'

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Value.Time label="Label text" value="14:30" />
    </ComponentBox>
  )
}

export const WithSeconds = () => {
  return (
    <ComponentBox>
      <Value.Time label="Label text" value="14:30:45" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        This is before the component{' '}
        <Value.Time label="Label text" value="14:30" inline /> This is
        after the component
      </P>
    </ComponentBox>
  )
}
