import { Flex, P, Hr } from '@dnb/eufemia'
import { Form, Field, Wizard } from '@dnb/eufemia/extensions/forms'
import pkg from '../package.json'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Eufemia only shows the indicator for async functions
const onStepChange = async () => {
  await wait(3000)
}

export default function App() {
  return (
    <Flex.Stack space="large" style={{ maxWidth: '60rem', margin: '2rem auto' }}>
      <Form.MainHeading>Wizard submit indicator demo</Form.MainHeading>
      <P>
        <code>@dnb/eufemia</code>: <code>{pkg.dependencies['@dnb/eufemia']}</code>
      </P>

      <Form.Handler onSubmit={() => null}>
        <Form.Card>
          <ol>
            <li>Click "Send" while the field is empty. It shows an error.</li>
            <li>Type something in the field.</li>
            <li>
              Click "Next". <b>Without the fix, "Next" shows no spinner.</b>
            </li>
          </ol>
          <Hr />
          <P>"Send" is placed outside the Wizard steps.</P>
        </Form.Card>

        <Wizard.Container onStepChange={onStepChange}>
          <Wizard.Step title="Step 1">
            <Form.Card>
              <Field.String label="Name" path="/name" required />
            </Form.Card>
            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <Form.Card>
              <P>You are on step 2.</P>
            </Form.Card>
            <Wizard.Buttons />
          </Wizard.Step>
        </Wizard.Container>

        <Form.SubmitButton text="Send" top="large" />
      </Form.Handler>
    </Flex.Stack>
  )
}
