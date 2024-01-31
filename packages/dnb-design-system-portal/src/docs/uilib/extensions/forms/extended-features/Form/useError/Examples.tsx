import React from 'react'
import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Form, Field } from '@dnb/eufemia/src/extensions/forms'
import { Flex, Section } from '@dnb/eufemia/src'

export function HasErrors() {
  return (
    <ComponentBox>
      {() => {
        const Component = () => {
          const { data } = Form.useData('default-id', {
            showError: true,
            isVisible: true,
          })
          const { hasErrors } = Form.useError('default-id')

          return (
            <Form.Handler id="default-id">
              <Flex.Stack>
                <Section
                  innerSpace
                  backgroundColor="sand-yellow"
                  breakout={false}
                >
                  <output>
                    <pre>
                      hasErrors: {JSON.stringify(hasErrors(), null, 2)}
                    </pre>
                  </output>
                </Section>

                <Field.Boolean
                  label="Error"
                  variant="button"
                  path="/showError"
                />

                <Field.Boolean
                  label="Visible"
                  variant="button"
                  path="/isVisible"
                />

                <Form.Visibility pathTrue="/isVisible">
                  <Field.String
                    path="/foo"
                    label="Label"
                    value={data.showError ? 'error' : 'valid'}
                    pattern="^valid$"
                    validateInitially
                  />
                </Form.Visibility>
              </Flex.Stack>
            </Form.Handler>
          )
        }

        return <Component />
      }}
    </ComponentBox>
  )
}
