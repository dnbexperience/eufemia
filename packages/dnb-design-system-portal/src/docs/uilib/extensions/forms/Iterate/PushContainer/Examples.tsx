import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex } from '@dnb/eufemia/src'
import {
  Field,
  Form,
  Iterate,
  Tools,
  Value,
} from '@dnb/eufemia/src/extensions/forms'

export { ViewAndEditContainer } from '../Array/Examples'

export const InitiallyOpen = () => {
  return (
    <ComponentBox>
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

export const IsolatedData = () => {
  return (
    <ComponentBox>
      {() => {
        const formData = {
          persons: [
            {
              firstName: 'Ola',
              lastName: 'Nordmann',
            },
            {
              firstName: 'Kari',
              lastName: 'Nordmann',
            },
            {
              firstName: 'Per',
              lastName: 'Hansen',
            },
          ],
        }

        function RepresentativesView() {
          return (
            <Iterate.ViewContainer>
              <Value.Composition>
                <Value.String itemPath="/firstName" />
                <Value.String itemPath="/lastName" />
              </Value.Composition>
            </Iterate.ViewContainer>
          )
        }

        function RepresentativesEdit() {
          return (
            <Iterate.EditContainer>
              <Field.Name.First itemPath="/firstName" />
              <Field.Name.Last itemPath="/lastName" />
            </Iterate.EditContainer>
          )
        }

        function ExistingPersonDetails() {
          const { data, getValue } = Form.useData()
          const person = getValue(data['selectedPerson'])?.data || {}

          return (
            <Flex.Stack>
              <Field.Name.First
                readOnly
                itemPath="/firstName"
                value={person.firstName}
              />
              <Field.Name.Last
                readOnly
                itemPath="/lastName"
                value={person.lastName}
              />
            </Flex.Stack>
          )
        }

        function NewPersonDetails() {
          return (
            <Flex.Stack>
              <Field.Name.First required itemPath="/firstName" />
              <Field.Name.Last required itemPath="/lastName" />
            </Flex.Stack>
          )
        }

        function PushContainerContent() {
          const { data, update } = Form.useData()
          const selectedPerson = data['selectedPerson'] // Because of missing TypeScript support

          // Clear the PushContainer data when the selected person is "other",
          // so the fields do not inherit existing data.
          React.useLayoutEffect(() => {
            if (selectedPerson === 'other') {
              update('/pushContainerItems/0', {})
            }
          }, [selectedPerson, update])

          return (
            <Flex.Stack>
              <Field.Selection
                variant="radio"
                required
                path="/selectedPerson"
                dataPath="/persons"
              >
                <Field.Option value="other" label="Other person" />
              </Field.Selection>
              <Form.Visibility
                visibleWhen={{
                  path: '/selectedPerson',
                  hasValue: (value) =>
                    typeof value === 'string' && value !== 'other',
                }}
              >
                <ExistingPersonDetails />
              </Form.Visibility>

              <Form.Visibility
                visibleWhen={{
                  path: '/selectedPerson',
                  hasValue: (value) => value === 'other',
                }}
              >
                <NewPersonDetails />
              </Form.Visibility>
            </Flex.Stack>
          )
        }

        function RepresentativesCreateNew() {
          return (
            <Iterate.PushContainer
              path="/representatives"
              title="Add new representative"
              isolatedData={{
                persons: formData.persons.map((data, i) => {
                  return {
                    title: [data.firstName, data.lastName].join(' '),
                    value: '/persons/' + i,
                    data,
                  }
                }),
              }}
              openButton={
                <Iterate.PushContainer.OpenButton
                  variant="tertiary"
                  text="Add new representative"
                />
              }
              showOpenButtonWhen={(list) => list.length > 0}
            >
              <PushContainerContent />
            </Iterate.PushContainer>
          )
        }

        return (
          <Form.Handler>
            <Form.MainHeading>Representatives</Form.MainHeading>
            <Flex.Stack>
              <Form.Card>
                <Iterate.Array path="/representatives">
                  <RepresentativesView />
                  <RepresentativesEdit />
                </Iterate.Array>
                <RepresentativesCreateNew />
              </Form.Card>

              <Form.Card>
                <Form.SubHeading>Data Context</Form.SubHeading>
                <Tools.Log placeholder="-" />
              </Form.Card>
            </Flex.Stack>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}
