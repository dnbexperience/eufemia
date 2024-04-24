import { Field, Form } from '@dnb/eufemia/src/extensions/forms'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'

export const BasicErrorMessage = () => {
  return (
    <ComponentBox>
      <Form.Handler
        errorMessages={{
          // Level 1
          pattern: 'Or on the provider',
          '/myKey': {
            // Level 2
            pattern: 'Or on the provider for just one field',
          },
        }}
      >
        <Field.String
          errorMessages={{
            // Level 3
            pattern: 'Or on a single Field itself',
          }}
          path="/myKey"
          value="abc"
          pattern="^[0-9]+$"
          validateInitially
        />
      </Form.Handler>
    </ComponentBox>
  )
}
