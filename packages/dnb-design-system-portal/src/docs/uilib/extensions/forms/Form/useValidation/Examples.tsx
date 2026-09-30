import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Form, Field, Tools } from '@dnb/eufemia/src/extensions/forms'
import { Flex } from '@dnb/eufemia/src'

export function HasErrors() {
  return (
    <ComponentBox>
      {() => {
        const Component = () => {
          const { data } = Form.useData('default-id', {
            showError: true,
            isVisible: true,
          })
          const { hasErrors, hasFieldError } =
            Form.useValidation('default-id')

          return (
            <Form.Handler id="default-id">
              <Flex.Stack>
                <Tools.Log
                  data={hasErrors()}
                  label="hasErrors:"
                  breakout={false}
                />
                <Tools.Log
                  data={hasFieldError('/foo')}
                  label="hasFieldError:"
                  breakout={false}
                />

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

                <Form.Visibility pathTrue="/isVisible" animate>
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

export function HasFieldErrorWithDescendants() {
  return (
    <ComponentBox>
      {() => {
        const Component = () => {
          const { hasFieldError } = Form.useValidation('descendants-id')

          return (
            <Form.Handler id="descendants-id">
              <Flex.Stack>
                <Tools.Log
                  data={hasFieldError('/mySection', {
                    withDescendants: true,
                  })}
                  label="hasFieldError with descendants:"
                  breakout={false}
                />

                <Form.Section path="/mySection">
                  <Field.String
                    label="Write something valid"
                    path="/myField"
                    pattern="^valid$"
                    validateInitially
                  />
                </Form.Section>
              </Flex.Stack>
            </Form.Handler>
          )
        }

        return <Component />
      }}
    </ComponentBox>
  )
}

export function SetFieldStatus() {
  return (
    <ComponentBox>
      {() => {
        const MyForm = () => {
          const { setFieldStatus } = Form.useValidation('form-status')

          return (
            <Form.Handler
              id="form-status"
              onSubmit={async () => {
                await new Promise((resolve) => setTimeout(resolve, 1000))

                setFieldStatus('/myField', {
                  error: new Error('This is a field error'),
                  warning: 'This is a field warning',
                  info: 'This is a field info',
                })

                await new Promise((resolve) => setTimeout(resolve, 5000))

                setFieldStatus('/myField', {
                  error: null,
                  warning: null,
                  info: null,
                })
              }}
            >
              <Flex.Stack>
                <Field.String label="My field" path="/myField" />

                <Form.SubmitButton />
              </Flex.Stack>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}
