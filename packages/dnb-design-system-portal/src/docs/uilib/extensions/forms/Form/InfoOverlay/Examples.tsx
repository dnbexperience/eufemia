import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { createRequest } from '../SubmitIndicator/Examples'
import { Field, Form, Wizard } from '@dnb/eufemia/src/extensions/forms'
import { Button } from '@dnb/eufemia/src'

const request = createRequest()

export const ErrorMessage = () => {
  return (
    <ComponentBox scope={{ request }}>
      {() => {
        // myFormId can be anything, as long as it's a unique instance
        const myFormId = () => null

        return (
          <Form.Handler
            id={myFormId}
            onSubmit={async () => {
              await request(1000) // Simulate a request

              Form.InfoOverlay.setContent(myFormId, 'error')
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
                      Form.InfoOverlay.setContent(myFormId, 'error')
                    }}
                  >
                    Show error
                  </Button>
                </Form.ButtonRow>
              </Form.Card>
            </Form.InfoOverlay>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const SuccessMessage = () => {
  return (
    <ComponentBox scope={{ request }}>
      {() => {
        // myFormId can be anything, as long as it's a unique instance
        const myFormId = () => null

        return (
          <Form.Handler
            id={myFormId}
            onSubmit={async () => {
              await request(1000) // Simulate a request

              Form.InfoOverlay.setContent(myFormId, 'success')
            }}
          >
            <Form.InfoOverlay>
              <Form.Card>
                <Field.Email />
                <Form.SubmitButton variant="send" />
              </Form.Card>
            </Form.InfoOverlay>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const WithAWizard = () => {
  const request = createRequest()
  return (
    <ComponentBox scope={{ request }}>
      {() => {
        // myFormId can be anything, as long as it's a unique instance
        const myFormId = () => null

        return (
          <Form.Handler
            id={myFormId}
            onSubmit={async () => {
              await request(1000)
              Form.InfoOverlay.setContent(myFormId, 'success')
            }}
          >
            <Form.InfoOverlay>
              <Wizard.Container
                onStepChange={async () => {
                  await request(1000)
                }}
              >
                <Wizard.Step title="Step 1">
                  <Form.Card>
                    <Field.String
                      path="/someInfo"
                      label="Some information"
                    />
                  </Form.Card>
                  <Wizard.NextButton />
                </Wizard.Step>
                <Wizard.Step title="Step 2">
                  <Form.Card>
                    <Field.String path="/more" label="More information" />
                  </Form.Card>
                  <Form.SubmitButton variant="send" />
                </Wizard.Step>
              </Wizard.Container>
            </Form.InfoOverlay>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}
