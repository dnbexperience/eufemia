import { Field, Form } from '../../..'

export default {
  title: 'Eufemia/Forms/PhoneNumber',
}

export function PhoneNumber() {
  return (
    <Form.Handler onSubmit={console.log} onChange={console.log}>
      <Field.PhoneNumber
        required
        // value="+47 1"
        validateInitially
        onBlur={console.log}
        onFocus={console.log}
        path="/phoneNumber"
      />
      <Form.SubmitButton top />
    </Form.Handler>
  )
}
