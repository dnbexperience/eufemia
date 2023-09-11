import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import {
  Iterate,
  Layout,
  Field,
  Form,
} from '@dnb/eufemia/src/extensions/forms'
import { trash as TrashIcon } from '@dnb/eufemia/src/icons'

export const PrimitiveElements = () => {
  return (
    <ComponentBox scope={{ Iterate, Layout, Field, TrashIcon }}>
      <Iterate.Array
        value={['One', 'Two', 'Three', 'Four', 'Five']}
        onChange={(value) => console.log('onChange', value)}
      >
        <Layout.Row align="center">
          <Field.String elementPath="/" />
          <Iterate.ArrayRemoveElementButton
            icon={TrashIcon}
            onChange={(value) => console.log('onChange', value)}
          />
        </Layout.Row>
      </Iterate.Array>
    </ComponentBox>
  )
}

export const ObjectElements = () => {
  return (
    <ComponentBox scope={{ Iterate, Layout, Form, Field }}>
      <Form.Handler
        data={[
          { name: 'Iron Man' },
          { name: 'Captain America' },
          { name: 'Thor' },
        ]}
        onChange={(value) => console.log('onChange', value)}
      >
        <Iterate.Array path="/">
          <Layout.Row align="center">
            <Field.String elementPath="/name" />
            <Iterate.ArrayRemoveElementButton text="Remove avenger" />
          </Layout.Row>
        </Iterate.Array>
      </Form.Handler>
    </ComponentBox>
  )
}
