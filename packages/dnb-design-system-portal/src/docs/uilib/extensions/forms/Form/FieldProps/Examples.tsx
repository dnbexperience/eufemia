import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Form, Field } from '@dnb/eufemia/src/extensions/forms'
import { Flex } from '@dnb/eufemia/src'

export const Required = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Flex.Stack>
          <Field.String label="Not required" />

          <Form.FieldProps required>
            <Field.String label="Required A" />
            <Field.Number label="Required B" />
          </Form.FieldProps>

          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Flex.Stack>
          <Field.String label="Not disabled" />

          <Form.FieldProps disabled>
            <Flex.Stack>
              <Field.String label="Disabled" />
              <Form.ButtonRow>
                <Form.SubmitButton />
              </Form.ButtonRow>
            </Flex.Stack>
          </Form.FieldProps>
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const Inverted = () => {
  return (
    <ComponentBox>
      <Form.Handler disabled>
        <Flex.Stack>
          <Field.String label="Disabled" />

          <Form.FieldProps disabled={false}>
            <Flex.Stack>
              <Field.String label="Not disabled" />
              <Form.ButtonRow>
                <Form.SubmitButton />
              </Form.ButtonRow>
            </Flex.Stack>
          </Form.FieldProps>
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}
