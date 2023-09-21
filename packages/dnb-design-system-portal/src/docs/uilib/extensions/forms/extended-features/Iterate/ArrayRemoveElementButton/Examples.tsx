import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Iterate, Field, Form } from '@dnb/eufemia/src/extensions/forms'
import { Layout } from '@dnb/eufemia/src'
import { trash as TrashIcon } from '@dnb/eufemia/src/icons'

export const PrimitiveElements = () => {
  return (
    <ComponentBox scope={{ Iterate, Layout, Field, TrashIcon }}>
      <Iterate.Array
        value={['One', 'Two', 'Three', 'Four', 'Five']}
        onChange={(value) => console.log('onChange', value)}
      >
        <Layout.Horizontal align="center">
          <Field.String elementPath="/" />
          <Iterate.ArrayRemoveElementButton
            icon={TrashIcon}
            onChange={(value) => console.log('onChange', value)}
          />
        </Layout.Horizontal>
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
          <Layout.Horizontal align="center">
            <Field.String elementPath="/name" />
            <Iterate.ArrayRemoveElementButton text="Remove avenger" />
          </Layout.Horizontal>
        </Iterate.Array>
      </Form.Handler>
    </ComponentBox>
  )
}
