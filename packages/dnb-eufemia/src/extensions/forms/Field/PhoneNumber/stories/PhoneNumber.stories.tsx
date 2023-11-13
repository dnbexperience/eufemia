import { Field, Form } from '../../..'

export default {
  title: 'Eufemia/Forms/PhoneNumber',
}

export function PhoneNumber() {
  return (
    <Form.Handler onSubmit={console.log}>
      <Field.PhoneNumber required validateInitially path="/phoneNumber" />
      <Form.SubmitButton top />
    </Form.Handler>
  )
}
