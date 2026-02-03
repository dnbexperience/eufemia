import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Button, Flex } from '@dnb/eufemia/src'
import { Form, Field } from '@dnb/eufemia/src/extensions/forms'

export function SubmitOutsideForm() {
  return (
    <ComponentBox>
      {() => {
        const formId = 'my-form'

        const ExternalSubmitButton = () => {
          const { submit } = Form.useSubmit(formId)
          return (
            <Button onClick={() => submit()}>
              Submit (outside Form.Handler)
            </Button>
          )
        }

        return (
          <Flex.Stack>
            <Form.Handler
              id={formId}
              onSubmit={(data) => {
                console.log('Submitted:', data)
              }}
            >
              <Form.Card>
                <Field.Name.First path="/name" value="John" />
              </Form.Card>
            </Form.Handler>

            <ExternalSubmitButton />
          </Flex.Stack>
        )
      }}
    </ComponentBox>
  )
}

export function AsyncSubmit() {
  return (
    <ComponentBox>
      {() => {
        const formId = 'my-form-async'

        const ExternalSubmitButton = () => {
          const { submit } = Form.useSubmit(formId)
          const [loading, setLoading] = React.useState(false)

          const handleClick = async () => {
            setLoading(true)
            try {
              const result = await submit()
              console.log('Submit result:', result)
            } finally {
              setLoading(false)
            }
          }

          return (
            <Button onClick={handleClick} disabled={loading}>
              {loading ? 'Submitting…' : 'Submit'}
            </Button>
          )
        }

        return (
          <Flex.Stack>
            <Form.Handler
              id={formId}
              onSubmit={async (data) => {
                await new Promise((r) => setTimeout(r, 1000))
                console.log('Submitted:', data)
              }}
            >
              <Form.Card>
                <Field.Name.First path="/name" value="John" />
              </Form.Card>
            </Form.Handler>
            <ExternalSubmitButton />
          </Flex.Stack>
        )
      }}
    </ComponentBox>
  )
}
