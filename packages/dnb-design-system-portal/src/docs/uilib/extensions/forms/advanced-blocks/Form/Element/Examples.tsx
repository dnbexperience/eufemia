import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Layout, Form, Field } from '@dnb/eufemia/src/extensions/forms'

export const DefaultElement = () => {
  return (
    <ComponentBox scope={{ Layout, Form, Field }}>
      <Form.Element onSubmit={(event) => console.log('onSubmit', event)}>
        <Layout.Card spacing="medium">
          <Field.Email />
          <Layout.ButtonRow>
            <Form.SubmitButton />
          </Layout.ButtonRow>
        </Layout.Card>
      </Form.Element>
    </ComponentBox>
  )
}
