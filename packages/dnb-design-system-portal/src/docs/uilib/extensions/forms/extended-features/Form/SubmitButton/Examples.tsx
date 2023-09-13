import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Form } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ Form }}>
      <Form.Handler
        data={{ foo: 'bar' }}
        onSubmit={(event) => console.log('onSubmit', event)}
      >
        <Form.SubmitButton />
      </Form.Handler>
    </ComponentBox>
  )
}
