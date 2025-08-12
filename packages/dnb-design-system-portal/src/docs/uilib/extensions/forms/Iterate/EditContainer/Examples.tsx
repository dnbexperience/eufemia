import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex } from '@dnb/eufemia/src'
import { Field, Form, Iterate } from '@dnb/eufemia/src/extensions/forms'

export {
  ViewAndEditContainer,
  ToolbarVariantMiniumOneItemOneItem,
  ToolbarVariantMiniumOneItemTwoItems,
} from '../Array/Examples'

export const EditContainerWithError = () => {
  return (
    <ComponentBox data-visual-test="edit-container-error" hideCode>
      <Form.Handler
        data={{
          outsideOfCard: [
            {
              name: undefined, // // <- Trigger an error
            },
          ],
          insideOfCard: [
            {
              name: undefined, // // <- Trigger an error
            },
          ],
          withFilledVariant: [
            {
              name: undefined, // // <- Trigger an error
            },
          ],
          withFilledVariantInsideOfCard: [
            {
              name: undefined, // // <- Trigger an error
            },
          ],
          withBasicVariant: [
            {
              name: '', // // <- Trigger an error
            },
          ],
          withBasicVariantInsideOfCard: [
            {
              name: '', // // <- Trigger an error
            },
          ],
        }}
      >
        <Flex.Stack>
          <Iterate.Array path="/outsideOfCard">
            <Iterate.EditContainer title="Outside of card">
              <Field.String label="Name" itemPath="/name" required />
            </Iterate.EditContainer>
          </Iterate.Array>

          <Form.Card>
            <Iterate.Array path="/insideOfCard">
              <Iterate.EditContainer title="Inside of card">
                <Field.String label="Name" itemPath="/name" required />
              </Iterate.EditContainer>
            </Iterate.Array>
          </Form.Card>

          <Iterate.Array path="/withFilledVariant">
            <Iterate.EditContainer title="Filled variant" variant="filled">
              <Field.String label="Name" itemPath="/name" required />
            </Iterate.EditContainer>
          </Iterate.Array>

          <Form.Card>
            <Iterate.Array path="/withFilledVariantInsideOfCard">
              <Iterate.EditContainer
                title="Filled variant inside of card"
                variant="filled"
              >
                <Field.String label="Name" itemPath="/name" required />
              </Iterate.EditContainer>
            </Iterate.Array>
          </Form.Card>

          <Iterate.Array path="/withBasicVariant">
            <Iterate.EditContainer title="Basic variant" variant="basic">
              <Field.String label="Name" itemPath="/name" required />
            </Iterate.EditContainer>
          </Iterate.Array>

          <Form.Card>
            <Iterate.Array path="/withBasicVariantInsideOfCard">
              <Iterate.EditContainer
                title="Basic variant inside of card"
                variant="basic"
              >
                <Field.String label="Name" itemPath="/name" required />
              </Iterate.EditContainer>
            </Iterate.Array>
          </Form.Card>
        </Flex.Stack>

        <Form.SubmitButton text="Press me to see the error" />
      </Form.Handler>
    </ComponentBox>
  )
}
