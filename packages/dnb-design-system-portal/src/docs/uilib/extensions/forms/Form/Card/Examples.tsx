import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex, P } from '@dnb/eufemia/src'
import { Form, Field } from '@dnb/eufemia/src/extensions/forms'

export const BasicUsage = () => {
  return (
    <ComponentBox data-visual-test="forms-card">
      <Flex.Stack>
        <Form.MainHeading>Main heading</Form.MainHeading>
        <Form.Card>
          <Field.String label="Field A" required />
          <Field.String label="Field B" required />
          <Form.Card>
            <P>Nested card</P>
          </Form.Card>
        </Form.Card>
        <Form.SubmitButton />
      </Flex.Stack>
    </ComponentBox>
  )
}
