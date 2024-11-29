import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'
import { createRequest } from '../SubmitIndicator/Examples'
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

              Form.Status.setStatus(myFormId, 'error')
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
                      Form.Status.setStatus(myFormId, 'error')
                    }}
                  >
                    Show error
                  </Button>
                </Form.ButtonRow>
              </Form.Card>
            </Form.Status>
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

              Form.Status.setStatus(myFormId, 'success')
            }}
          >
            <Form.Status>
              <Form.Card>
                <Field.Email />
                <Form.SubmitButton variant="send" />
              </Form.Card>
            </Form.Status>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}
