import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import {
  Form,
  Field,
  Value,
  DataContext,
} from '@dnb/eufemia/src/extensions/forms'

export const Path = () => {
  return (
    <ComponentBox scope={{ DataContext }}>
      <Form.Handler
        data={{
          foo: {
            one: 1,
            two: 2,
          },
          bar: 'Bar',
        }}
      >
        <DataContext.At path="/foo">
          <Field.Number path="/one" label="One" />
          <Field.Number path="/two" label="Two" />
        </DataContext.At>
      </Form.Handler>
    </ComponentBox>
  )
}

export const IteratePath = () => {
  return (
    <ComponentBox scope={{ Value, DataContext }}>
      <Form.Handler
        data={{
          list: [
            {
              title: 'Object 1',
            },
            {
              title: 'Object 2',
            },
          ],
          bar: 'Bar',
        }}
        onChange={(data) => console.log('onChange', data)}
        onPathChange={(path, value) =>
          console.log('onPathChange', path, value)
        }
      >
        <DataContext.At path="/list" iterate>
          <Value.String path="/title" label="Title" />
          <Field.String path="/title" label="Title" />
        </DataContext.At>
      </Form.Handler>
    </ComponentBox>
  )
}
