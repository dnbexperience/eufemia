import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Iterate, Field, Form } from '@dnb/eufemia/src/extensions/forms'

export const PrimitiveElements = () => {
  return (
    <ComponentBox scope={{ Iterate }}>
      <Iterate.ArrayPushButton
        text="Add another element"
        value={['foo', 'bar']}
        pushValue="new"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const ObjectElements = () => {
  return (
    <ComponentBox scope={{ Iterate }}>
      <Form.Handler
        data={[
          { name: 'Iron Man' },
          { name: 'Captain America' },
          { name: 'Thor' },
        ]}
        onChange={(value) => console.log('onChange', value)}
      >
        <Iterate.Array path="/">
          <Field.String elementPath="/name" />
        </Iterate.Array>

        <Iterate.ArrayPushButton
          top="small"
          text="Add another element"
          path="/"
          pushValue={{}}
        />
      </Form.Handler>
    </ComponentBox>
  )
}
