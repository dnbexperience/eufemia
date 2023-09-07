import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { ValueBlock } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ ValueBlock }}>
      <ValueBlock label="Label text">Data-value goes here</ValueBlock>
    </ComponentBox>
  )
}
