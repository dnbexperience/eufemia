import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Form, Field } from '@dnb/eufemia/src/extensions/forms'
import { Card } from '@dnb/eufemia/src'

export const Default = () => {
  return (
    <ComponentBox scope={{ Form, Field }}>
      <Form.Handler
        defaultData={{ email: null }}
        onSubmit={(event) => console.log('onSubmit', event)}
      >
        <Card spacing="medium">
          <Field.Email path="/email" />
          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const SessionStorage = () => {
  return (
    <ComponentBox scope={{ Form, Field }}>
      <Form.Handler
        onSubmit={(event) => console.log('onSubmit', event)}
        sessionStorageId="session-key"
      >
        <Card spacing="medium">
          <Field.String label="Name" path="/name" />
          <Field.Email path="/email" />
          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}
