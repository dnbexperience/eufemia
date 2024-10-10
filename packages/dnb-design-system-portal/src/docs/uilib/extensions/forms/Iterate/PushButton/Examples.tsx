import { Flex } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  Iterate,
  Field,
  Form,
  Value,
} from '@dnb/eufemia/src/extensions/forms'

export const PrimitiveItems = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Flex.Stack>
          <Iterate.Array path="/">
            <Value.String itemPath="/" />
          </Iterate.Array>
          <Iterate.PushButton
            text="Add another item"
            path="/"
            pushValue="new"
          />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const ObjectItems = () => {
  return (
    <ComponentBox>
      <Form.Handler
        data={[
          { name: 'Iron Man' },
          { name: 'Captain America' },
          { name: 'Thor' },
        ]}
        onChange={(value) => console.log('onChange', value)}
      >
        <Iterate.Array path="/">
          <Field.Name.Last itemPath="/name" />
        </Iterate.Array>

        <Iterate.PushButton
          top="small"
          text="Add another item"
          path="/"
          pushValue={{}}
        />
      </Form.Handler>
    </ComponentBox>
  )
}
