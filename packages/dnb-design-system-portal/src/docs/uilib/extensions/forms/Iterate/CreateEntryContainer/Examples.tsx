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
    <ComponentBox scope={{ Iterate }}>
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
              title="Edit account holder"
              titleWhenNew="New account holder"
            >
              <MyEditItemForm />
            </Iterate.EditContainer>
          )
        }

        const MyViewItem = () => {
          return (
            <Iterate.ViewContainer title="Account holder">
              <Value.SummaryList>
                <Value.Name.First itemPath="/firstName" showEmpty />
                <Value.Name.Last itemPath="/lastName" placeholder="-" />
              </Value.SummaryList>
            </Iterate.ViewContainer>
          )
        }

        const CreateNewEntry = () => {
          return (
            <Iterate.CreateEntryContainer
              path="/accounts"
              title="New account holder"
              showButton={
                <Iterate.CreateEntryContainer.OpenButton text="Add another account" />
              }
              showButtonWhen={(list) => list.length > 0}
            >
              <MyEditItemForm />
            </Iterate.CreateEntryContainer>
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
