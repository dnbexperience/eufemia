import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Form, Iterate } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      <Iterate.Array value={['foo', 'bar']}>
        <Form.SubHeading>
          <Iterate.ItemNo>{'Item no. {itemNo}'}</Iterate.ItemNo>
        </Form.SubHeading>
      </Iterate.Array>
    </ComponentBox>
  )
}
