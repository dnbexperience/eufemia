import { Field, Form, Wizard } from '../../..'
import { Button } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/InfoOverlay',
}

export function BothStatuses() {
  const formId = () => null
  return (
    <>
      <Form.Handler
        id={formId}
        onSubmit={async () => {
          await new Promise((r) => setTimeout(r, 1000)) // Simulate a request

          Form.InfoOverlay.setContent(formId, 'success')
        }}
      >
        <Form.InfoOverlay>
          <Form.Card>
            <Field.Email />
            <Form.ButtonRow>
              <Form.SubmitButton variant="send" />
              <Button
                variant="secondary"
                onClick={() => {
                  Form.InfoOverlay.setContent(formId, 'error')
                }}
              >
                Show error
              </Button>
            </Form.ButtonRow>
          </Form.Card>
        </Form.InfoOverlay>
      </Form.Handler>
      <br />
      ----- Content ----
    </>
  )
}

export function WithAWizard() {
  return (
    <Form.Handler
      id="unique-id"
      onSubmit={async (data) => {
        await new Promise((r) => setTimeout(r, 1000))
        Form.InfoOverlay.setContent('unique-id', 'success')
        console.log('data', data)
      }}
    >
      <Form.InfoOverlay>
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
      </Form.InfoOverlay>
    </Form.Handler>
  )
}
