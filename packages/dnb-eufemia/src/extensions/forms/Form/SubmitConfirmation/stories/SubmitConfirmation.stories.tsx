import React from 'react'
import { Field, Form } from '../../..'
import { Dialog, Flex, Section } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Form/SubmitConfirmation',
}

export function SubmitConfirmation() {
  return (
    <Form.Handler
      onSubmit={async (data) => {
        console.log('Now we are submitting...', data)
        await new Promise((resolve) => setTimeout(resolve, 3000))
        return {
          // error: new Error('Error message'),
          customStatus: 'custom',
        }
      }}
    >
      <Flex.Stack>
        <Field.String label="Label" path="/foo" defaultValue="foo" />
        <Form.SubmitButton />
      </Flex.Stack>

      <Form.SubmitConfirmation
        // preventSubmitWhen={({ submitState, setConfirmationState }) => {
        //   if (submitState?.customStatus) {
        //     setConfirmationState('readyToBeSubmitted')
        //     return false
        //   }
        //   return true
        // }}
        onSubmitResult={({ submitState, setConfirmationState }) => {
          if (submitState?.customStatus) {
            setConfirmationState('readyToBeSubmitted')
          }
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
          }

          return (
            <>
              {content}
              <Dialog
                variant="confirmation"
                title="Dialog confirmation title"
                description="Some content describing the situation."
                alignContent="left"
                {...connectWithDialog}
              >
                <Section
                  variant="info"
                  innerSpace={{ top: true, bottom: true }}
                  top
                >
                  <Form.Isolation onChange={console.log}>
                    <Field.String
                      label="Inside the dialog"
                      path="/bar"
                      defaultValue="bar"
                    />
                  </Form.Isolation>
                </Section>
              </Dialog>
            </>
          )
        }}
      />
    </Form.Handler>
  )
}
