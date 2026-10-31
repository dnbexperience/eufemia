import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Form, Field, Wizard } from '@dnb/eufemia/src/extensions/forms'
import { Button } from '@dnb/eufemia/src'
import { send as sendIcon } from '@dnb/eufemia/src/icons'

export const Default = () => {
  return (
    <ComponentBox>
      <Form.ButtonRow>
        <Wizard.Buttons />
        <Button variant="secondary">Other button</Button>
      </Form.ButtonRow>
    </ComponentBox>
  )
}

export const WithLayout = () => {
  return (
    <ComponentBox scope={{ sendIcon }}>
      <Form.Handler onSubmit={(data) => console.log('onSubmit', data)}>
        <Form.Card>
          <Field.Email />
          <Form.ButtonRow>
            <Form.SubmitButton icon={sendIcon} />
            <Button variant="secondary">Cancel</Button>
          </Form.ButtonRow>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}
