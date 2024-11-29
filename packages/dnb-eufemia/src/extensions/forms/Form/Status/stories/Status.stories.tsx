import { Field, Form } from '../../..'
import { Button } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Status',
}

export function BothStatuses() {
  const formId = () => null
  return (
    <>
      <Form.Handler
        id={formId}
        onSubmit={async () => {
          await new Promise((r) => setTimeout(r, 1000)) // Simulate a request

          Form.Status.setStatus(formId, 'success')
        }}
      >
        <Form.Status>
          <Form.Card>
            <Field.Email />
            <Form.ButtonRow>
              <Form.SubmitButton variant="send" />
              <Button
                variant="secondary"
                onClick={() => {
                  Form.Status.setStatus(formId, 'error')
                }}
              >
                Show error
              </Button>
            </Form.ButtonRow>
          </Form.Card>
        </Form.Status>
      </Form.Handler>
      <br />
      ----- Content ----
    </>
  )
}
