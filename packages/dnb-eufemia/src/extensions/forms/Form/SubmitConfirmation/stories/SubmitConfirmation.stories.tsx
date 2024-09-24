import React from 'react'
import { Field, Form } from '../../..'
import { Dialog, Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Form/SubmitConfirmation',
}

export function SubmitConfirmation() {
  return (
    <Form.Handler
      onSubmit={async (data) => {
        console.log('Now we are submitting...', data)
        await new Promise((resolve) => setTimeout(resolve, 3000))
      }}
    >
      <Flex.Stack>
        <Field.String label="Label" path="/foo" />
        <Form.SubmitButton />
      </Flex.Stack>

      <Form.SubmitConfirmation
        renderWithState={({ submitState, connectWithDialog }) => {
          let content = null

          switch (submitState) {
            case 'beforeSubmit':
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
                {...connectWithDialog}
              />
            </>
          )
        }}
      />
    </Form.Handler>
  )
}
