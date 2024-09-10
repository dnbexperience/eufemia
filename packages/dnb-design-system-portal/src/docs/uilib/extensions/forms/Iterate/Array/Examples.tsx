import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Card, Flex, Table, Td, Th, Tr } from '@dnb/eufemia/src'
import {
  Iterate,
  Field,
  Value,
  Form,
} from '@dnb/eufemia/src/extensions/forms'
export { Default as AnimatedContainer } from '../AnimatedContainer/Examples'

export const PrimitiveItemsFields = () => {
  return (
    <ComponentBox>
      <Iterate.Array
        value={['Iron Man', 'Captain America', 'The Hulk']}
        onChange={console.log}
      >
        <Field.String itemPath="/" />
      </Iterate.Array>
    </ComponentBox>
  )
}

export const PrimitiveItemsValues = () => {
  return (
    <ComponentBox data-visual-test="primitive-element-values">
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
    <ComponentBox>
      <Value.Composition>
        <Iterate.Array
          value={[
            {
              label: 'Label A',
              value: 'value 1',
            },
            {
              label: 'Label B',
              value: 'value 2',
            },
          ]}
        >
          <Value.String
            label={<Value.String itemPath="/label" />}
            itemPath="/value"
          />
        </Iterate.Array>
      </Value.Composition>
    </ComponentBox>
  )
}

export const WithTable = () => {
  return (
    <ComponentBox>
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
                <Value.Name.Last itemPath="/name" />
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

export const ObjectItems = () => {
  return (
    <ComponentBox>
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

export const RenderPropsPrimitiveItems = () => {
  return (
    <ComponentBox>
      <Iterate.Array
        value={['foo', 'bar']}
        onChange={(value) => console.log('onChange', value)}
      >
        {(elementValue) => <Field.String value={elementValue} />}
      </Iterate.Array>
    </ComponentBox>
  )
}

export const RenderPropsObjectItems = () => {
  return (
    <ComponentBox>
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
    <ComponentBox data-visual-test="animated-container">
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
                    label={false}
                    itemPath="/nickname"
                    placeholder="A Nick name"
                  />
                }
              >
                <Field.Name
                  itemPath="/nickname"
                  width="medium"
                  label="Nick name"
                />

                <Field.Composition>
                  <Field.Name.First itemPath="/firstName" width="medium" />
                  <Field.Name.Last itemPath="/lastName" width="medium" />
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
    <ComponentBox data-visual-test="view-and-edit-container">
      {() => {
        const MyEditItemForm = () => {
          return (
            <Field.Composition>
              <Field.Name.First itemPath="/firstName" width="medium" />
              <Field.Name.Last
                itemPath="/lastName"
                width="medium"
                required
              />
            </Field.Composition>
          )
        }

        const MyEditItem = () => {
          return (
            <Iterate.EditContainer
              title="Edit account holder {itemNr}"
              titleWhenNew="New account holder {itemNr}"
            >
              <MyEditItemForm />
            </Iterate.EditContainer>
          )
        }

        const MyViewItem = () => {
          const item = Iterate.useItem()
          console.log('index:', item.index)

          return (
            <Iterate.ViewContainer title="Account holder {itemNr}">
              <Value.SummaryList>
                <Value.Name.First itemPath="/firstName" showEmpty />
                <Value.Name.Last itemPath="/lastName" placeholder="-" />
              </Value.SummaryList>
            </Iterate.ViewContainer>
          )
        }

        const CreateNewEntry = () => {
          return (
            <Iterate.PushContainer
              path="/accounts"
              title="New account holder"
              openButton={
                <Iterate.PushContainer.OpenButton text="Add another account" />
              }
              showOpenButtonWhen={(list) => list.length > 0}
            >
              <MyEditItemForm />
            </Iterate.PushContainer>
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

                  <CreateNewEntry />
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

export const DynamicPathValue = () => {
  return (
    <ComponentBox>
      <Form.Handler defaultData={{ count: 0 }}>
        <Flex.Stack>
          <Field.Number path="/count" width="small" showStepControls />
          <Iterate.Array
            path="/items"
            countPath="/count"
            countPathTransform={({ value, index }) =>
              Object.prototype.hasOwnProperty.call(value || {}, 'myObject')
                ? value
                : { myObject: index }
            }
          >
            <Field.Number itemPath="/myObject" label="Item no. {itemNr}" />
          </Iterate.Array>
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const WithVisibility = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Iterate.Array path="/myList" value={[{}]}>
          <Flex.Stack>
            <Field.Name.First
              className="firstName"
              itemPath="/firstName"
            />

            <Form.Visibility
              animate
              visibleWhen={{
                itemPath: '/firstName',
                hasValue: (value) => Boolean(value),
              }}
            >
              <Field.Name.Last className="lastName" itemPath="/lastName" />
            </Form.Visibility>
          </Flex.Stack>
        </Iterate.Array>
      </Form.Handler>
    </ComponentBox>
  )
}
