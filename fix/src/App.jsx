import { useState } from 'react'
import { Flex, P, Hr } from '@dnb/eufemia'
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'
import pkg from '../package.json'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function App() {
  const [calls, setCalls] = useState(0)
  const [running, setRunning] = useState(0)

  // Simulates saving a draft, which takes three seconds
  const saveDraft = async () => {
    setCalls((count) => count + 1)
    setRunning((count) => count + 1)
    await wait(3000)
    setRunning((count) => count - 1)
  }

  return (
    <Flex.Stack space="large" style={{ maxWidth: '50rem', margin: '2rem auto' }}>
      <Form.MainHeading>
        Wizard demo: bypassOnNavigation with an async onStepChange
        (PR&nbsp;#9667)
      </Form.MainHeading>
      <P>
        <code>@dnb/eufemia</code>: <code>{pkg.dependencies['@dnb/eufemia']}</code>
      </P>

      <Form.Handler>
        <Form.Card>
          <ol>
            <li>Click "Next". Saving takes three seconds.</li>
            <li>
              Watch the "Next" button.{' '}
              <b>
                Without the fix, the indicator disappears after one second, and
                the button can be clicked again while it is still saving.
              </b>
            </li>
            <li>
              Click "Next" again before step 2 shows.{' '}
              <b>Without the fix, the counter shows 2 calls.</b>
            </li>
          </ol>
          <P>
            Calls to <code>onStepChange</code>:{' '}
            <output className="demo-calls">{calls}</output>
            <br />
            Still saving:{' '}
            <output className="demo-running">{running > 0 ? 'yes' : 'no'}</output>
          </P>
          <Hr />

          <Wizard.Container
            validationMode="bypassOnNavigation"
            onStepChange={saveDraft}
          >
            <Wizard.Step title="Step 1">
              <P>This is the first step.</P>
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <P>This is the second step.</P>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Card>
      </Form.Handler>
    </Flex.Stack>
  )
}
