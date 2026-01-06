import { Field, Form, JsonObject, Tools, Wizard } from '../../..'
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
        onSubmit={async (data) => {
          console.log('data', data)
          await new Promise((r) => setTimeout(r, 1000)) // Simulate a request

          Form.InfoOverlay.setContent(formId, 'success')
        }}
      >
        <Form.InfoOverlay>
          <Form.Card>
            <Field.Email path="/email" />
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
        <Tools.Log />
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
      <Tools.Log />
    </Form.Handler>
  )
}

export function Content() {
  const formId = 'form'
  Form.InfoOverlay.setContent(formId, 'error')

  const { data } = Form.useData(formId)
  console.log('data', data)

  return (
    <>
      <Form.Handler id={formId}>
        <Form.InfoOverlay>children</Form.InfoOverlay>
        <Tools.Log />
      </Form.Handler>
    </>
  )
}

export function ReduceToVisibleFieldsIssue() {
  const formId = 'formId'

  const defaultData = {
    firstName: 'Dronning',
    lastName: 'Eufemia',
  }

  const onSubmit = (data: JsonObject) => {
    console.log('Submitted data:', data)
    Form.InfoOverlay.setContent(formId, 'error')
  }

  return (
    <Form.Handler
      defaultData={defaultData}
      id={formId}
      onSubmit={async (data, { reduceToVisibleFields }) => {
        onSubmit(reduceToVisibleFields(data))
      }}
    >
      <Form.InfoOverlay>
        <Field.Name.First bottom path="/firstName" />
        <Field.Name.Last path="/lastName" />

        <Form.SubmitButton top />
      </Form.InfoOverlay>
    </Form.Handler>
  )
}
