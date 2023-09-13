import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Form, Field } from '@dnb/eufemia/src/extensions/forms'
import { Layout } from '@dnb/eufemia/src'

export const DefaultElement = () => {
  return (
    <ComponentBox scope={{ Form, Field }}>
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
