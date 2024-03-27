import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Form, Field, Steps } from '@dnb/eufemia/src/extensions/forms'
import { Button, Card } from '@dnb/eufemia/src'
import { send as sendIcon } from '@dnb/eufemia/src/icons'

export const Default = () => {
  return (
    <ComponentBox>
      <Form.ButtonRow>
        <Steps.PreviousButton />
        <Steps.NextButton />
        <Button variant="secondary">Other button</Button>
      </Form.ButtonRow>
    </ComponentBox>
  )
}

export const WithLayout = () => {
  return (
    <ComponentBox scope={{ sendIcon }}>
      <Form.Handler onSubmit={(data) => console.log('onSubmit', data)}>
        <Card spacing="medium">
          <Field.Email />
          <Form.ButtonRow>
            <Form.SubmitButton icon={sendIcon} />
            <Button variant="secondary">Cancel</Button>
          </Form.ButtonRow>
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}
