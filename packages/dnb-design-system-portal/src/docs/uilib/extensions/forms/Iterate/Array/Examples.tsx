import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia/src'
import {
  Iterate,
  Field,
  Value,
  Form,
  Tools,
  Wizard,
} from '@dnb/eufemia/src/extensions/forms'
export { Default as AnimatedContainer } from '../AnimatedContainer/Examples'

export const PrimitiveItemsFields = () => {
  return (
    <ComponentBox>
      <Iterate.Array
        defaultValue={['Iron Man', 'Captain America', 'The Hulk']}
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
        <Iterate.Array
          defaultValue={['Iron Man', 'Captain America', 'The Hulk']}
        >
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
          defaultValue={[
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
            defaultValue={[
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
        defaultValue={[
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
        defaultValue={['foo', 'bar']}
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
        defaultValue={[
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
        <Flex.Stack>
          <Form.MainHeading>Avengers</Form.MainHeading>

          <Form.Card>
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
                  <Iterate.RemoveButton showConfirmDialog />
                </Iterate.Toolbar>
              </Iterate.AnimatedContainer>
            </Iterate.Array>

            <Iterate.PushButton
              text="Add another avenger"
              path="/avengers"
              pushValue={{}}
            />
          </Form.Card>
        </Flex.Stack>
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
              title="Edit account holder {itemNo}"
              titleWhenNew="New account holder {itemNo}"
            >
              <MyEditItemForm />
            </Iterate.EditContainer>
          )
        }

        const MyViewItem = () => {
          const item = Iterate.useItem()
          console.log('index:', item.index)

          return (
            <Iterate.ViewContainer title="Account holder {itemNo}">
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
                    lastName: 'Rogers',
                  },
                ],
              }}
              onChange={(data) =>
                console.log('DataContext/onChange', data)
              }
              onSubmit={async (data) => console.log('onSubmit', data)}
            >
              <Flex.Stack>
                <Form.MainHeading>Accounts</Form.MainHeading>

                <Form.Card gap={false}>
                  <Iterate.Array path="/accounts">
                    <MyViewItem />
                    <MyEditItem />
                  </Iterate.Array>

                  <CreateNewEntry />
                </Form.Card>

                <Form.SubmitButton variant="send" />
              </Flex.Stack>
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
            countPathTransform={({ value, index }) => {
              return 'myObject' in (value || {})
                ? value
                : { myObject: index }
            }}
          >
            <Field.Number itemPath="/myObject" label="Item no. {itemNo}" />
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
        <Iterate.Array path="/myList" defaultValue={[{}]}>
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

export const InitiallyOpen = () => {
  return (
    <ComponentBox scope={{ Iterate, Tools }}>
      <Form.Handler required>
        <Wizard.Container>
          <Wizard.Step>
            <Form.Card>
              <Iterate.Array path="/myList" defaultValue={[{}]}>
                <Iterate.ViewContainer>
                  <Value.String label="Item {itemNo}" itemPath="/foo" />
                </Iterate.ViewContainer>
                <Iterate.EditContainer>
                  <Field.String
                    label="Item {itemNo}"
                    itemPath="/foo"
                    defaultValue="foo"
                  />
                </Iterate.EditContainer>
              </Iterate.Array>

              <Iterate.PushButton
                text="Add"
                path="/myList"
                variant="tertiary"
                pushValue={{}}
              />
            </Form.Card>

            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step>
            <Iterate.Array path="/myList" defaultValue={[{}]}>
              <Iterate.EditContainer>
                <Field.String
                  label="Item {itemNo}"
                  itemPath="/foo"
                  defaultValue="foo"
                />
              </Iterate.EditContainer>
              <Iterate.ViewContainer>
                <Value.String label="Item {itemNo}" itemPath="/foo" />
              </Iterate.ViewContainer>
            </Iterate.Array>

            <Wizard.Buttons />
          </Wizard.Step>
        </Wizard.Container>

        <Tools.Log top />
      </Form.Handler>
    </ComponentBox>
  )
}

export const InitialOpenWithToolbarVariant = () => {
  return (
    <ComponentBox scope={{ Iterate, Tools }}>
      {() => {
        const MyForm = () => {
          const { getCountryNameByIso } = Value.SelectCountry.useCountry()

          return (
            <Form.Handler
              onSubmit={async (data) => console.log('onSubmit', data)}
              onSubmitRequest={() => console.log('onSubmitRequest')}
            >
              <Flex.Stack>
                <Form.MainHeading>Statsborgerskap</Form.MainHeading>

                <Form.Card>
                  <Iterate.Array
                    path="/countries"
                    defaultValue={[null]}
                    onChangeValidator={(arrayValue) => {
                      const findFirstDuplication = (arr) =>
                        arr.findIndex((e, i) => arr.indexOf(e) !== i)

                      const index = findFirstDuplication(arrayValue)
                      if (index > -1) {
                        return new Error(
                          'You can not have duplicate items: ' +
                            getCountryNameByIso(
                              String(arrayValue.at(index)),
                            ),
                        )
                      }
                    }}
                  >
                    <Iterate.ViewContainer toolbarVariant="minimumOneItem">
                      <Value.SelectCountry
                        label="Land du er statsborger i"
                        itemPath="/"
                      />
                    </Iterate.ViewContainer>

                    <Iterate.EditContainer toolbarVariant="minimumOneItem">
                      <Field.SelectCountry
                        label="Land du er statsborger i"
                        itemPath="/"
                        required
                      />
                    </Iterate.EditContainer>
                  </Iterate.Array>

                  <Iterate.PushButton
                    path="/countries"
                    pushValue={null}
                    text="Legg til flere statsborgerskap"
                  />
                </Form.Card>

                <Form.SubmitButton variant="send" />

                <Tools.Log />
              </Flex.Stack>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}

export const ToolbarVariantMiniumOneItemOneItem = () => {
  return (
    <ComponentBox hideCode>
      <Iterate.Array defaultValue={['foo']}>
        <Iterate.ViewContainer toolbarVariant="minimumOneItem">
          View Content
        </Iterate.ViewContainer>
        <Iterate.EditContainer toolbarVariant="minimumOneItem">
          Edit Content
        </Iterate.EditContainer>
      </Iterate.Array>
    </ComponentBox>
  )
}

export const ToolbarVariantMiniumOneItemTwoItems = () => {
  return (
    <ComponentBox hideCode>
      <Iterate.Array defaultValue={['foo', 'bar']}>
        <Iterate.ViewContainer toolbarVariant="minimumOneItem">
          View Content
        </Iterate.ViewContainer>
        <Iterate.EditContainer toolbarVariant="minimumOneItem">
          Edit Content
        </Iterate.EditContainer>
      </Iterate.Array>
    </ComponentBox>
  )
}

export const WithArrayValidator = () => {
  return (
    <ComponentBox>
      <Form.Handler
        defaultData={{ items: ['foo'] }}
        onSubmit={async () => console.log('onSubmit')}
      >
        <Form.Card>
          <Iterate.Array
            path="/items"
            onChangeValidator={(arrayValue) => {
              if (!(arrayValue && arrayValue.length > 1)) {
                return new Error('You need at least two items')
              }
            }}
            animate
          >
            <Flex.Horizontal align="flex-end">
              <Field.String
                label="Item no. {itemNo}"
                itemPath="/"
                width="medium"
                size="medium"
              />
              <Iterate.RemoveButton showConfirmDialog />
            </Flex.Horizontal>
          </Iterate.Array>

          <Iterate.PushButton
            top
            path="/items"
            pushValue={null}
            text="Add"
          />
          <Form.SubmitButton />
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const FilledViewAndEditContainer = () => {
  return (
    <ComponentBox
      data-visual-test="filled-view-and-edit-container"
      hideCode
    >
      {() => {
        const MyEditItemForm = () => {
          return (
            <Flex.Stack>
              <Field.Name.First itemPath="/firstName" required />
              <Field.Name.Last itemPath="/lastName" required />
            </Flex.Stack>
          )
        }

        const EditItemToolbar = () => {
          return (
            <Iterate.Toolbar>
              <Flex.Horizontal
                justify="space-between"
                style={{ width: '100%' }}
              >
                <Flex.Horizontal gap="large">
                  <Iterate.EditContainer.DoneButton />
                  <Iterate.EditContainer.CancelButton />
                </Flex.Horizontal>
                <Iterate.ViewContainer.RemoveButton
                  showConfirmDialog
                  left={false}
                />
              </Flex.Horizontal>
            </Iterate.Toolbar>
          )
        }

        const MyEditItem = (props) => {
          return (
            <Iterate.EditContainer
              variant="filled"
              toolbarVariant="custom"
              toolbar={<EditItemToolbar />}
              {...props}
            >
              <ValueWithAvatar />
              <MyEditItemForm />
            </Iterate.EditContainer>
          )
        }

        const CreateNewEntry = () => {
          return (
            <Iterate.PushContainer
              path="/accounts"
              title="New account holder"
              variant="filled"
              openButton={
                <Iterate.PushContainer.OpenButton text="Add another account" />
              }
              showOpenButtonWhen={(list) => list.length > 0}
            >
              <MyEditItemForm />
            </Iterate.PushContainer>
          )
        }

        const ValueWithAvatar = () => {
          const { value } = Iterate.useItem()
          const firstName = String(value['firstName'] || '')
          return (
            <Flex.Horizontal align="center">
              <Avatar.Group label={firstName}>
                <Avatar>{firstName.substring(0, 1).toUpperCase()}</Avatar>
              </Avatar.Group>
              <Value.String itemPath="/firstName" />
            </Flex.Horizontal>
          )
        }

        const MyViewItem = () => {
          return (
            <Iterate.ViewContainer
              variant="filled"
              toolbarVariant="custom"
              toolbar={<></>}
            >
              <Flex.Horizontal align="center" justify="space-between">
                <ValueWithAvatar />

                <Iterate.Toolbar>
                  <Iterate.ViewContainer.EditButton />
                </Iterate.Toolbar>
              </Flex.Horizontal>
            </Iterate.ViewContainer>
          )
        }

        return (
          <Form.Handler
            data={{
              accounts: [
                {
                  firstName:
                    'Tony with long name that maybe will wrap over to a new line',
                  lastName: 'Last',
                },
                {
                  firstName: 'Maria',
                  lastName: 'Last',
                },
              ],
            }}
            onSubmit={(data) => console.log('onSubmit', data)}
            onSubmitRequest={() => console.log('onSubmitRequest')}
          >
            <Flex.Vertical>
              <Form.MainHeading>Accounts</Form.MainHeading>

              <Form.Card gap={false}>
                <Iterate.Array path="/accounts" limit={2}>
                  <MyViewItem />
                  <MyEditItem />
                </Iterate.Array>

                <CreateNewEntry />
              </Form.Card>

              <Form.SubmitButton variant="send" />
            </Flex.Vertical>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}
