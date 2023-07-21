import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { FieldBlock } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ FieldBlock }}>
      <FieldBlock label="Label text">Input features goes here</FieldBlock>
    </ComponentBox>
  )
}
