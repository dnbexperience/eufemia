import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Layout, Form, Field } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ Layout, Form, Field }}>
      <Form.Handler
        data={{ email: null }}
        onSubmit={(event) => console.log('onSubmit', event)}
      >
        <Layout.Card spacing="medium">
          <Field.Email path="/email" />
          <Layout.ButtonRow>
            <Form.SubmitButton />
          </Layout.ButtonRow>
        </Layout.Card>
      </Form.Handler>
    </ComponentBox>
  )
}
