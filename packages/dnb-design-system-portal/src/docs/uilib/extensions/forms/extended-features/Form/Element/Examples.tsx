import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Form, Field } from '@dnb/eufemia/src/extensions/forms'
import { Card } from '@dnb/eufemia/src'

export const DefaultElement = () => {
  return (
    <ComponentBox>
      <Form.Element onSubmit={(data) => console.log('onSubmit', data)}>
        <Card spacing="medium">
          <Field.Email />
          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Card>
      </Form.Element>
    </ComponentBox>
  )
}
