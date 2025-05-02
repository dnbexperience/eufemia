import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form, Iterate } from '@dnb/eufemia/src/extensions/forms'

export {
  ViewAndEditContainer,
  ToolbarVariantMiniumOneItemOneItem,
  ToolbarVariantMiniumOneItemTwoItems,
} from '../Array/Examples'

export const EditContainerWithError = () => {
  return (
    <ComponentBox data-visual-test="edit-container-error">
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
        }}
      >
        <Iterate.Array path="/outsideOfCard">
          <Iterate.EditContainer title="Item {itemNo}">
            <Field.String itemPath="/name" required />
          </Iterate.EditContainer>
        </Iterate.Array>

        <Form.Card>
          <Iterate.Array path="/insideOfCard">
            <Iterate.EditContainer title="Item {itemNo}">
              <Field.String itemPath="/name" required />
            </Iterate.EditContainer>
          </Iterate.Array>
        </Form.Card>

        <Form.SubmitButton text="Press me to see the error" />
      </Form.Handler>
    </ComponentBox>
  )
}
