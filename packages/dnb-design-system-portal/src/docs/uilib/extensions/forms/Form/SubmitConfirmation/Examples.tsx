import { Dialog, Flex } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'

export const WithDialog = () => {
  return (
    <ComponentBox>
      <Form.Handler
        locale="en-GB"
        onSubmit={async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }}
      >
        <Flex.Stack>
          <Field.String label="Label" path="/foo" />
          <Form.SubmitButton />
        </Flex.Stack>

        <Form.SubmitConfirmation
          renderWithState={({ connectWithDialog }) => {
            return (
              <Dialog
                variant="confirmation"
                title="Dialog confirmation title"
                description="Some content describing the situation."
                {...connectWithDialog}
              />
            )
          }}
        />
      </Form.Handler>
    </ComponentBox>
  )
}

export const WithStateContent = () => {
  return (
    <ComponentBox>
      <Form.Handler
        locale="en-GB"
        onSubmit={async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }}
      >
        <Form.SubmitConfirmation
          onStateChange={({ submitState }) => {
            console.log('onStateChange', submitState)
          }}
          renderWithState={({ submitState, connectWithDialog }) => {
            let content = null

            switch (submitState) {
              case 'beforeSubmit':
                content = <>Is waiting ...</>
                break
              case 'submitInProgress':
                content = <>Submitting...</>
                break
              case 'submissionComplete':
                content = <>Complete!</>
                break
              default:
                content = (
                  <Flex.Stack>
                    <Field.String label="Label" path="/foo" />
                    <Form.SubmitButton />
                  </Flex.Stack>
                )
                break
            }

            return (
              <>
                {content}
                <Dialog
                  variant="confirmation"
                  title="Dialog confirmation title"
                  description="Some content describing the situation."
                  {...connectWithDialog}
                />
              </>
            )
          }}
        />
      </Form.Handler>
    </ComponentBox>
  )
}
