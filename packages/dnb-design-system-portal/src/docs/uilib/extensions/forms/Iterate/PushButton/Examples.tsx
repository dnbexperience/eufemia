import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Iterate, Field, Form } from '@dnb/eufemia/src/extensions/forms'

export const PrimitiveItems = () => {
  return (
    <ComponentBox>
      <Iterate.PushButton
        text="Add another item"
        value={['foo', 'bar']}
        pushValue="new"
        onChange={(value) => console.log('onChange', value)}
      />
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
