import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import {
  Iterate,
  Layout,
  Field,
  DataContext,
} from '@dnb/eufemia/src/extensions/forms'
import { trash as TrashIcon } from '@dnb/eufemia/src/icons'

export const PrimitiveElements = () => {
  return (
    <ComponentBox scope={{ Iterate, Layout, Field, TrashIcon }}>
      <Iterate.Array
        value={['One', 'Two', 'Three', 'Four', 'Five']}
        onChange={(value) => console.log('onChange', value)}
      >
        <Layout.Row>
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
    <ComponentBox scope={{ Iterate, Layout, DataContext, Field }}>
      <DataContext.Provider
        data={[
          { name: 'Iron Man' },
          { name: 'Captain America' },
          { name: 'Thor' },
        ]}
        onChange={(value) => console.log('onChange', value)}
      >
        <Iterate.Array path="/">
          <Layout.Row>
            <Field.String elementPath="/name" />
            <Iterate.ArrayRemoveElementButton text="Remove avenger" />
          </Layout.Row>
        </Iterate.Array>
      </DataContext.Provider>
    </ComponentBox>
  )
}
