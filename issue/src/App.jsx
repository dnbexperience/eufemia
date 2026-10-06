import { Flex, P, Hr } from '@dnb/eufemia'
import { Field, Form, Wizard } from '@dnb/eufemia/extensions/forms'
import pkg from '../package.json'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Simulates a server check that takes two seconds
const checkOrganizationNumber = async () => {
  await wait(2000)
}

export default function App() {
  return (
    <Flex.Stack space="large" style={{ maxWidth: '50rem', margin: '2rem auto' }}>
      <Form.MainHeading>
        Wizard demo: going back while a field validates (PR&nbsp;#9666)
      </Form.MainHeading>
      <P>
        <code>@dnb/eufemia</code>: <code>{pkg.dependencies['@dnb/eufemia']}</code>
      </P>

      <Form.Handler>
        <Form.Card>
          <ol>
            <li>Click "Next" to go to step 2.</li>
            <li>
              Type something in "Organization number", then click "Back" right
              away.{' '}
              <b>
                Without the fix, the wizard stays on step 2, and "Email address"
                shows an error instead.
              </b>
            </li>
          </ol>
          <Hr />

          <Wizard.Container>
            <Wizard.Step title="Step 1">
              <P>This is the first step.</P>
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <Field.String
                label="Organization number"
                path="/organizationNumber"
                onBlurValidator={checkOrganizationNumber}
              />
              <Field.Email path="/email" required />
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Card>
      </Form.Handler>
    </Flex.Stack>
  )
}
