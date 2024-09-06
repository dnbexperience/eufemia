import {
  Field,
  Form,
  Iterate,
  Value,
} from '@dnb/eufemia/src/extensions/forms'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Card, Flex } from '@dnb/eufemia/src'

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
