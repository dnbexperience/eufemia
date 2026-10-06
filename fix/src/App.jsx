import { useState } from 'react'
import { Flex, P, Hr } from '@dnb/eufemia'
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'
import pkg from '../package.json'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function App() {
  const [calls, setCalls] = useState(0)

  // Simulates a request that fails after one second
  const failingStepChange = async () => {
    setCalls((count) => count + 1)
    await wait(1000)
    throw new Error('The request failed. Please try again.')
  }

  return (
    <Flex.Stack space="large" style={{ maxWidth: '50rem', margin: '2rem auto' }}>
      <Form.MainHeading>
        Wizard demo: onStepChange that throws (PR&nbsp;#9665)
      </Form.MainHeading>
      <P>
        <code>@dnb/eufemia</code>: <code>{pkg.dependencies['@dnb/eufemia']}</code>
      </P>

      <Form.Handler>
        <Form.Card>
          <ol>
            <li>Click "Next". The request fails after one second.</li>
            <li>
              Wait two seconds. <b>Without the fix, the counter shows 2 calls,
              and the browser console shows an unhandled promise rejection.</b>
            </li>
          </ol>
          <P>
            Calls to <code>onStepChange</code>:{' '}
            <output className="demo-calls">{calls}</output>
          </P>
          <Hr />

          <Wizard.Container onStepChange={failingStepChange}>
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
