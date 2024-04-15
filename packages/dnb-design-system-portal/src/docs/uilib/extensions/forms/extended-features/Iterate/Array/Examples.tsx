import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Flex, Hr, Lead } from '@dnb/eufemia/src'
import {
  Iterate,
  Field,
  Value,
  Form,
  FieldBlock,
} from '@dnb/eufemia/src/extensions/forms'
import { trash as TrashIcon } from '@dnb/eufemia/src/icons'

export const PrimitiveElements = () => {
  return (
    <ComponentBox scope={{ Iterate }}>
      <Iterate.Array
        label="Array label"
        value={['Iron Man', 'Captain America', 'The Hulk']}
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.String itemPath="/" />
      </Iterate.Array>
    </ComponentBox>
  )
}

export const ObjectElements = () => {
  return (
    <ComponentBox scope={{ Iterate, Value }}>
      <Iterate.Array
        label="Accounts"
        value={[
          {
            accountName: 'Brukskonto',
            accountNumber: '90901134567',
          },
          {
            accountName: 'Sparekonto',
            accountNumber: '90901156789',
          },
        ]}
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Composition>
          <Field.BankAccountNumber itemPath="/accountNumber" />
          <Field.String label="Account name" itemPath="/accountName" />
        </Field.Composition>
      </Iterate.Array>
    </ComponentBox>
  )
}

export const RenderPropsPrimitiveElements = () => {
  return (
    <ComponentBox scope={{ Iterate }}>
      <Iterate.Array
        label="Array label"
        value={['foo', 'bar', 'baz']}
        onChange={(value) => console.log('onChange', value)}
      >
        {(elementValue) => <Field.String value={elementValue} />}
      </Iterate.Array>
    </ComponentBox>
  )
}

export const RenderPropsObjectElements = () => {
  return (
    <ComponentBox scope={{ Iterate }}>
      <Iterate.Array
        label="Array label"
        value={[
          { num: 1, txt: 'One' },
          { num: 2, txt: 'Two' },
          { num: 3, txt: 'Three' },
          { num: 4, txt: 'Four' },
        ]}
        onChange={(value) => console.log('onChange', value)}
      >
        {({ num, txt }) => (
          <FieldBlock width="large">
            <Field.Number value={num} width="small" />
            <Field.String value={txt} width={false} />
          </FieldBlock>
        )}
      </Iterate.Array>
    </ComponentBox>
  )
}

export const ArrayFromFormHandler = () => {
  return (
    <ComponentBox scope={{ Iterate, Value, TrashIcon }}>
      <Form.Handler
        data={{
          avengers: [
            {
              nickname: 'Iron Man',
              firstName: 'Tony',
              lastName: 'Stark',
            },
            {
              nickname: 'Captain America',
              firstName: 'Steve',
              lastName: 'Rogers',
            },
          ],
          alwaysThere: 'Nick Fury',
        }}
        onChange={(data) => console.log('Source onChange', data)}
      >
        <Flex.Vertical>
          <Form.MainHeading>Avengers</Form.MainHeading>

          <Iterate.Array
            path="/avengers"
            onChange={(value) => console.log('Iterate onChange', value)}
          >
            <Flex.Stack>
              <Lead>
                <Value.String itemPath="/nickname" />
              </Lead>

              <Field.Composition>
                <Field.String
                  itemPath="/firstName"
                  width="medium"
                  label="First name"
                />
                <Field.String
                  itemPath="/lastName"
                  width="medium"
                  label="Last name"
                />
                <Iterate.ArrayRemoveElementButton icon={TrashIcon} />
              </Field.Composition>

              <Field.String path="/alwaysThere" />

              <Hr light />
            </Flex.Stack>
          </Iterate.Array>

          <Iterate.ArrayPushButton
            top="small"
            text="Add another avenger"
            path="/avengers"
            pushValue={{}}
          />
        </Flex.Vertical>
      </Form.Handler>
    </ComponentBox>
  )
}
