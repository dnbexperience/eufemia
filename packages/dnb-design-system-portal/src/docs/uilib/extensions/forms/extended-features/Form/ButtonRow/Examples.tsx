import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import {
  StepsLayout,
  Form,
  Field,
} from '@dnb/eufemia/src/extensions/forms'
import { Button, Card } from '@dnb/eufemia/src'
import { send as sendIcon } from '@dnb/eufemia/src/icons'

export const Default = () => {
  return (
    <ComponentBox scope={{ StepsLayout, Form }}>
      <Form.ButtonRow>
        <StepsLayout.PreviousButton />
        <StepsLayout.NextButton />
        <Button variant="secondary">Other button</Button>
      </Form.ButtonRow>
    </ComponentBox>
  )
}

export const WithLayout = () => {
  return (
    <ComponentBox scope={{ Form, Field, sendIcon }}>
      <Form.Element onSubmit={(event) => console.log('onSubmit', event)}>
        <Card spacing="medium">
          <Field.Email />
          <Form.ButtonRow>
            <Form.SubmitButton icon={sendIcon} />
            <Button variant="secondary">Cancel</Button>
          </Form.ButtonRow>
        </Card>
      </Form.Element>
    </ComponentBox>
  )
}
