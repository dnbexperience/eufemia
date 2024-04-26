import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Card, Flex, Table, Td, Th, Tr } from '@dnb/eufemia/src'
import {
  Iterate,
  Field,
  Value,
  Form,
} from '@dnb/eufemia/src/extensions/forms'
export { Default as AnimatedContainer } from '../AnimatedContainer/Examples'

export const PrimitiveElementsFields = () => {
  return (
    <ComponentBox scope={{ Iterate }}>
      <Iterate.Array
        value={['Iron Man', 'Captain America', 'The Hulk']}
        onChange={console.log}
      >
        <Field.String itemPath="/" />
      </Iterate.Array>
    </ComponentBox>
  )
}

export const PrimitiveElementsValues = () => {
  return (
    <ComponentBox
      scope={{ Iterate }}
      data-visual-test="primitive-element-values"
    >
      <Value.SummaryList>
        <Iterate.Array value={['Iron Man', 'Captain America', 'The Hulk']}>
          <Value.String itemPath="/" />
        </Iterate.Array>
      </Value.SummaryList>
    </ComponentBox>
  )
}

export const ValueComposition = () => {
  return (
    <ComponentBox scope={{ Iterate }}>
      <Value.Composition label="Label">
        <Iterate.Array value={['Iron Man', 'Captain America', 'The Hulk']}>
          <Value.String itemPath="/" />
        </Iterate.Array>
      </Value.Composition>
    </ComponentBox>
  )
}

export const WithTable = () => {
  return (
    <ComponentBox scope={{ Iterate }}>
      <Table>
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Age</Th>
          </Tr>
        </thead>
        <tbody>
          <Iterate.Array
            withoutFlex
            value={[
              { name: 'Iron Man', age: 45 },
              { name: 'Captain America', age: 123 },
              { name: 'The Hulk', age: 3337 },
            ]}
          >
            <Tr>
              <Td>
                <Value.String itemPath="/name" />
              </Td>
              <Td>
                <Value.Number itemPath="/age" />
              </Td>
            </Tr>
          </Iterate.Array>
        </tbody>
      </Table>
    </ComponentBox>
  )
}

export const ObjectElements = () => {
  return (
    <ComponentBox scope={{ Iterate, Value }}>
      <Iterate.Array
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
        value={['foo', 'bar']}
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
        value={[
          { num: 1, txt: 'One' },
          { num: 2, txt: 'Two' },
        ]}
        onChange={(value) => console.log('onChange', value)}
      >
        {({ num, txt }) => (
          <Field.Composition width="large">
            <Field.Number value={num} width="small" />
            <Field.String value={txt} width={false} />
          </Field.Composition>
        )}
      </Iterate.Array>
    </ComponentBox>
  )
}

export const ArrayFromFormHandler = () => {
  return (
    <ComponentBox
      scope={{ Iterate }}
      data-visual-test="animated-container"
    >
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
        }}
        onChange={(data) => console.log('DataContext/onChange', data)}
      >
        <Flex.Vertical>
          <Form.MainHeading>Avengers</Form.MainHeading>

          <Card stack>
            <Iterate.Array
              path="/avengers"
              onChange={(value) => console.log('Iterate/onChange', value)}
            >
              <Iterate.AnimatedContainer
                title={
                  <Value.String
                    itemPath="/nickname"
                    placeholder="A Nick name"
                  />
                }
              >
                <Field.String
                  itemPath="/nickname"
                  width="medium"
                  label="Nick name"
                />

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
                </Field.Composition>

                <Iterate.Toolbar>
                  <Iterate.RemoveButton />
                </Iterate.Toolbar>
              </Iterate.AnimatedContainer>
            </Iterate.Array>

            <Iterate.PushButton
              text="Add another avenger"
              path="/avengers"
              pushValue={{}}
            />
          </Card>
        </Flex.Vertical>
      </Form.Handler>
    </ComponentBox>
  )
}

export const ViewAndEditContainer = () => {
  return (
    <ComponentBox
      scope={{ Iterate }}
      data-visual-test="view-and-edit-container"
    >
      {() => {
        const MyEditItem = () => {
          return (
            <Iterate.EditContainer
              title="Edit account holder"
              titleWhenNew="New account holder"
            >
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
                  required
                />
              </Field.Composition>
            </Iterate.EditContainer>
          )
        }

        const MyViewItem = () => {
          return (
            <Iterate.ViewContainer title="Account holder">
              <Value.SummaryList>
                <Value.String
                  label="First name"
                  itemPath="/firstName"
                  showEmpty
                />
                <Value.String
                  label="Last name"
                  itemPath="/lastName"
                  placeholder="-"
                />
              </Value.SummaryList>
            </Iterate.ViewContainer>
          )
        }

        const MyForm = () => {
          return (
            <Form.Handler
              data={{
                accounts: [
                  {
                    firstName: 'Tony',
                    lastName: undefined, // initiate error
                  },
                ],
              }}
              onChange={(data) =>
                console.log('DataContext/onChange', data)
              }
              onSubmit={async (data) => console.log('onSubmit', data)}
            >
              <Flex.Vertical>
                <Form.MainHeading>Accounts</Form.MainHeading>

                <Card stack>
                  <Iterate.Array path="/accounts">
                    <MyViewItem />
                    <MyEditItem />
                  </Iterate.Array>

                  <Iterate.PushButton
                    text="Add another account"
                    path="/accounts"
                    pushValue={{}}
                  />
                </Card>

                <Form.SubmitButton variant="send" />
              </Flex.Vertical>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}
