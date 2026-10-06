import { Flex, P, Hr } from '@dnb/eufemia'
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'
import pkg from '../package.json'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Eufemia only shows the indicator for async functions
const slowStepChange = async () => {
  await wait(1500)
}

export default function App() {
  return (
    <Flex.Stack space="large" style={{ maxWidth: '60rem', margin: '2rem auto' }}>
      <Form.MainHeading>
        Wizard demo: going back with the step indicator (PR&nbsp;#9668)
      </Form.MainHeading>
      <P>
        <code>@dnb/eufemia</code>: <code>{pkg.dependencies['@dnb/eufemia']}</code>
      </P>

      <Form.Handler onSubmit={slowStepChange}>
        <Form.Card>
          <ol>
            <li>Click "Next" twice to reach step 3.</li>
            <li>
              In the list of steps, click "Step 1". On a narrow screen, open
              the list first.{' '}
              <b>Without the fix, the indicator shows on "Send".</b>
            </li>
          </ol>
          <Hr />

          <Wizard.Container onStepChange={slowStepChange}>
            <Wizard.Step title="Step 1">
              <P>This is the first step.</P>
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <P>This is the second step.</P>
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Step 3">
              <P>This is the third step.</P>
              <Flex.Horizontal>
                <Wizard.Buttons />
                <Form.SubmitButton />
              </Flex.Horizontal>
            </Wizard.Step>
          </Wizard.Container>
        </Form.Card>
      </Form.Handler>
    </Flex.Stack>
  )
}
