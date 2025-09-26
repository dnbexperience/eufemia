import { Field, Form, Value } from '../../..'
import { Flex } from '../../../../..'

export default {
  title: 'Eufemia/Extensions/Forms/DateOfBirth',
}

export const DateOfBirth = () => {
  return (
    <Form.Handler data={{ dob: '1960-11-13' }} onSubmit={console.log}>
      <Flex.Stack space>
        <Field.DateOfBirth path="/dob" required />

        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
  )
}
