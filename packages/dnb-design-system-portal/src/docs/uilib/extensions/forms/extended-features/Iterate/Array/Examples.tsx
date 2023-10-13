import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Flex } from '@dnb/eufemia/src'
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
    <ComponentBox scope={{ Iterate, Field }}>
      <Iterate.Array
        label="Array label"
        value={['Iron Man', 'Captain America', 'The Hulk']}
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.String elementPath="/" />
      </Iterate.Array>
    </ComponentBox>
  )
}

export const ObjectElements = () => {
  return (
    <ComponentBox scope={{ Iterate, Field, Value }}>
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
        <h3>
          <Value.String elementPath="/nickname" />
        </h3>
        <Flex.Horizontal>
          <Field.BankAccountNumber elementPath="/accountNumber" />
          <Field.String label="Account name" elementPath="/accountName" />
        </Flex.Horizontal>
      </Iterate.Array>
    </ComponentBox>
  )
}

export const RenderPropsPrimitiveElements = () => {
  return (
    <ComponentBox scope={{ Iterate, Field }}>
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
    <ComponentBox scope={{ Iterate, Field, FieldBlock }}>
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
    <ComponentBox scope={{ Iterate, Field, Value, Form, TrashIcon }}>
      <Form.Handler
        data={{
          avengers: [
            {
              nickname: 'Iron Man',
              firstName: 'Tony',
              lastName: 'Stark',
              bornYear: 1970,
            },
            {
              nickname: 'Captain America',
              firstName: 'Steve',
              lastName: 'Rogers',
              bornYear: 1918,
            },
          ],
          alwaysThere: 'Nick Fury',
        }}
        onChange={(data) => console.log('Source onChange', data)}
      >
        <Form.MainHeading>Avengers</Form.MainHeading>

        <Iterate.Array
          path="/avengers"
          onChange={(value) => console.log('Iterate onChange', value)}
        >
          <Form.SubHeading>
            <Value.String elementPath="/nickname" />
          </Form.SubHeading>

          <Flex.Horizontal align="center">
            <Field.String
              elementPath="/firstName"
              width="medium"
              label="First name"
            />
            <Field.String
              elementPath="/lastName"
              width="medium"
              label="Last name"
            />
            <Field.Number
              elementPath="/bornYear"
              label="Year of birth"
              width="small"
            />
            <Iterate.ArrayRemoveElementButton icon={TrashIcon} />
          </Flex.Horizontal>

          <Field.String path="/alwaysThere" top="x-small" />
        </Iterate.Array>

        <Iterate.ArrayPushButton
          top="small"
          text="Add another avenger"
          path="/avengers"
          pushValue={{}}
        />
      </Form.Handler>
    </ComponentBox>
  )
}
