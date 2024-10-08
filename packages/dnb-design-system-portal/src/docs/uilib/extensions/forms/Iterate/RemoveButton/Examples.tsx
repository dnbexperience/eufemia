import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Iterate, Field, Form } from '@dnb/eufemia/src/extensions/forms'
import { Flex } from '@dnb/eufemia/src'
import { trash as TrashIcon } from '@dnb/eufemia/src/icons'

export const PrimitiveItems = () => {
  return (
    <ComponentBox scope={{ TrashIcon }}>
      <Iterate.Array
        value={['One', 'Two', 'Three', 'Four', 'Five']}
        onChange={(value) => console.log('onChange', value)}
      >
        <Flex.Horizontal align="center">
          <Field.String itemPath="/" />
          <Iterate.RemoveButton
            icon={TrashIcon}
            onChange={(value) => console.log('onChange', value)}
          />
        </Flex.Horizontal>
      </Iterate.Array>
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
          <Flex.Horizontal align="center">
            <Field.Name.Last itemPath="/name" />
            <Iterate.RemoveButton text="Remove avenger" />
          </Flex.Horizontal>
        </Iterate.Array>
      </Form.Handler>
    </ComponentBox>
  )
}
