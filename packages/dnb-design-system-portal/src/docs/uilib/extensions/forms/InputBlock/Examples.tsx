import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { InputBlock } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ InputBlock }}>
      <InputBlock label="Label text">Input features goes here</InputBlock>
    </ComponentBox>
  )
}
