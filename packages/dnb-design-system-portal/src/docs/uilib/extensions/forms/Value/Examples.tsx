import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Value } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value label="Label text">Data-value goes here</Value>
    </ComponentBox>
  )
}
