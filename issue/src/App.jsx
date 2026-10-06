import { useRef, useState } from 'react'
import { Flex, P, Hr } from '@dnb/eufemia'
import { Form, Field, Wizard } from '@dnb/eufemia/extensions/forms'
import pkg from '../package.json'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Eufemia only shows the indicator for async functions
const onSubmit = async () => {
  await wait(1000)
}

export default function App() {
  const [calls, setCalls] = useState([])
  const countRef = useRef(0)

  const onStepChange = async () => {
    const call = ++countRef.current
    setCalls((list) => [...list, { call, done: false }])
    await wait(5000)
    setCalls((list) =>
      list.map((item) => (item.call === call ? { call, done: true } : item))
    )
  }

  return (
    <Flex.Stack space="large" style={{ maxWidth: '60rem', margin: '2rem auto' }}>
      <Form.MainHeading>Wizard submit demo</Form.MainHeading>
      <P>
        <code>@dnb/eufemia</code>: <code>{pkg.dependencies['@dnb/eufemia']}</code>
      </P>

      <Form.Handler onSubmit={onSubmit}>
        <Form.Card>
          <ol>
            <li>
              Click "Continue". The step change takes 5 seconds.
            </li>
            <li>
              Watch "Continue". <b>Without the fix, the spinner stops after
              about 2 seconds and the button can be clicked again, while the
              step change is still running.</b>
            </li>
            <li>
              Click "Continue" again. <b>Without the fix, onStepChange runs a
              second time.</b>
            </li>
          </ol>
          <Hr />
          <P className="step-change-log">
            onStepChange calls: <b>{calls.length}</b>
            {calls.map(({ call, done }) => (
              <span key={call}>
                <br />
                Call {call}: {done ? 'done' : 'running…'}
              </span>
            ))}
          </P>
        </Form.Card>

        <Wizard.Container onStepChange={onStepChange}>
          <Wizard.Step title="Step 1">
            <Form.Card>
              <Field.String label="Name" path="/name" />
            </Form.Card>
            <Form.SubmitButton text="Continue" />
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <Form.Card>
              <P>You are on step 2.</P>
            </Form.Card>
            <Wizard.Buttons />
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>
    </Flex.Stack>
  )
}
