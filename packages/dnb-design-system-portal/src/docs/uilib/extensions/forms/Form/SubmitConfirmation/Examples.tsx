import { Dialog, Flex, Section } from '@dnb/eufemia/src'
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
          <Field.String label="Label" path="/foo" defaultValue="foo" />
          <Form.SubmitButton />
        </Flex.Stack>

        <Form.SubmitConfirmation
          preventSubmitWhen={() => true}
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
          preventSubmitWhen={() => true}
          onStateChange={({ confirmationState }) => {
            console.log('onStateChange', confirmationState)
          }}
          renderWithState={({ confirmationState, connectWithDialog }) => {
            let content = null

            switch (confirmationState) {
              case 'readyToBeSubmitted':
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
                    <Field.String
                      label="Label"
                      path="/foo"
                      defaultValue="foo"
                    />
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

export const WithCustomReturnStatus = () => {
  return (
    <ComponentBox>
      <Form.Handler
        onSubmit={async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000))
          return {
            customStatus: 'My custom status',
          }
        }}
      >
        <Flex.Stack>
          <Field.String label="Label" path="/foo" defaultValue="foo" />
          <Form.SubmitButton />
        </Flex.Stack>

        <Form.SubmitConfirmation
          onSubmitResult={({ submitState, setConfirmationState }) => {
            if (submitState && submitState.customStatus) {
              setConfirmationState('readyToBeSubmitted')
            }
          }}
          renderWithState={({ connectWithDialog, submitState }) => {
            return (
              <Dialog
                variant="confirmation"
                title="Dialog confirmation title"
                description="Some content describing the situation."
                {...connectWithDialog}
              >
                <Section
                  variant="info"
                  innerSpace={{ top: true, bottom: true }}
                  top
                >
                  <Flex.Stack>
                    <Field.String label="Inside the dialog" path="/foo" />
                    <Form.Isolation
                      onChange={console.log}
                      data={{
                        bar: submitState
                          ? submitState.customStatus
                          : 'bar',
                      }}
                    >
                      <Field.String label="Isolated" path="/bar" />
                    </Form.Isolation>
                  </Flex.Stack>
                </Section>
              </Dialog>
            )
          }}
        />
      </Form.Handler>
    </ComponentBox>
  )
}
