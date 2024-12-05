import { Field, Form, Wizard } from '../../..'
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

export function WithAWizard() {
  return (
    <Form.Handler
      id="test"
      onSubmit={async (data) => {
        await new Promise((r) => setTimeout(r, 1000))
        Form.Status.setStatus('test', 'success')
        console.log('data', data)
      }}
    >
      <Form.Status>
        <Wizard.Container
          onStepChange={async () => {
            await new Promise((r) => setTimeout(r, 1000))
          }}
        >
          <Wizard.Step title="Step 1">
            <Field.String path="/someInfo" label="Some information" />
            <Wizard.NextButton />
          </Wizard.Step>
          <Wizard.Step title="Step 2">
            <Field.String path="/more" label="More information" />
            <Form.SubmitButton />
          </Wizard.Step>
        </Wizard.Container>
      </Form.Status>
    </Form.Handler>
  )
}
