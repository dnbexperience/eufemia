import { Flex, P, Button, Hr } from '@dnb/eufemia'
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'
import pkg from '../package.json'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Eufemia only shows the indicator for async functions
const slowAction = async () => {
  await wait(1500)
}

export default function App() {
  return (
    <Flex.Stack space="large" style={{ maxWidth: '50rem', margin: '2rem auto' }}>
      <Form.MainHeading>
        Submit indicator demo (PR&nbsp;#9636)
      </Form.MainHeading>
      <P>
        <code>@dnb/eufemia</code>: <code>{pkg.dependencies['@dnb/eufemia']}</code>
      </P>

      <WizardDemo />
      <SubmitButtonsDemo />
    </Flex.Stack>
  )
}

function WizardDemo() {
  return (
    <Form.Handler onSubmit={slowAction}>
      <Form.Card>
        <Form.SubHeading>A. Wizard: Next after sending</Form.SubHeading>
        <ol>
          <li>Click "Next". It shows a spinner while the step changes.</li>
          <li>Click "Send" on step 2.</li>
          <li>Click "Previous".</li>
          <li>
            Click "Next" again. <b>Without the fix, there is no spinner.</b>
          </li>
        </ol>
        <Hr />

        <Wizard.Container onStepChange={slowAction}>
          <Wizard.Step title="Step 1">
            <P>This is the first step.</P>
            <Wizard.Buttons />
          </Wizard.Step>
          <Wizard.Step title="Step 2">
            <P>This is the second step.</P>
            <Flex.Horizontal>
              <Wizard.Buttons />
              <Form.SubmitButton />
            </Flex.Horizontal>
          </Wizard.Step>
        </Wizard.Container>
      </Form.Card>
    </Form.Handler>
  )
}

function SubmitButtonsDemo() {
  return (
    <Form.Handler onSubmit={slowAction}>
      <Form.Card>
        <Form.SubHeading>B. Several submit buttons</Form.SubHeading>
        <ol>
          <li>Click "Second" and wait until it is done.</li>
          <li>
            Click "Submit from code". <b>Without the fix, only "Second"
            shows a spinner.</b>
          </li>
        </ol>
        <Hr />

        <Flex.Horizontal>
          <Form.SubmitButton text="First" />
          <Form.SubmitButton text="Second" />
          <SubmitFromCode />
        </Flex.Horizontal>
      </Form.Card>
    </Form.Handler>
  )
}

function SubmitFromCode() {
  const { submit } = Form.useSubmit()

  return (
    <Button variant="secondary" onClick={() => submit()}>
      Submit from code
    </Button>
  )
}
