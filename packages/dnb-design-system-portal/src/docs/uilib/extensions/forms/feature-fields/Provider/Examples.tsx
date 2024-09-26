import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Form, Field } from '@dnb/eufemia/src/extensions/forms'
import { Flex } from '@dnb/eufemia/src'

export const Required = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Flex.Stack>
          <Field.String label="Not required" />

          <Field.Provider required>
            <Field.String label="Required A" />
            <Field.Number label="Required B" />
          </Field.Provider>

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

          <Field.Provider disabled>
            <Flex.Stack>
              <Field.String label="Disabled" />
              <Form.ButtonRow>
                <Form.SubmitButton />
              </Form.ButtonRow>
            </Flex.Stack>
          </Field.Provider>
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

          <Field.Provider disabled={false}>
            <Flex.Stack>
              <Field.String label="Not disabled" />
              <Form.ButtonRow>
                <Form.SubmitButton />
              </Form.ButtonRow>
            </Flex.Stack>
          </Field.Provider>
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}
