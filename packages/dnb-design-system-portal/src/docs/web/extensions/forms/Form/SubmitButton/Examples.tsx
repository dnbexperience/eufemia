import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Form } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      <Form.Handler
        data={{ foo: 'bar' }}
        onSubmit={(data) => console.log('onSubmit', data)}
      >
        <Form.SubmitButton />
      </Form.Handler>
    </ComponentBox>
  )
}

export const SendVariant = () => {
  return (
    <ComponentBox>
      <Form.Handler
        data={{ foo: 'bar' }}
        onSubmit={(data) => console.log('onSubmit', data)}
      >
        <Form.SubmitButton variant="send" />
      </Form.Handler>
    </ComponentBox>
  )
}

export const WithSubmitIndicator = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Form.SubmitButton showIndicator />
      </Form.Handler>
    </ComponentBox>
  )
}
