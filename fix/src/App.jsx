import { useState } from 'react'
import { Flex, P, Hr } from '@dnb/eufemia'
import { Field, Form } from '@dnb/eufemia/extensions/forms'
import pkg from '../package.json'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Simulates a server check of the value
const checkValue = async () => {
  await wait(300)
}

export default function App() {
  const [calls, setCalls] = useState(0)
  const [running, setRunning] = useState(0)

  // Simulates sending the form, which takes three seconds
  const send = async () => {
    setCalls((count) => count + 1)
    setRunning((count) => count + 1)
    await wait(3000)
    setRunning((count) => count - 1)
  }

  return (
    <Flex.Stack space="large" style={{ maxWidth: '50rem', margin: '2rem auto' }}>
      <Form.MainHeading>
        Form demo: async onSubmit with an async validator (PR&nbsp;#9669)
      </Form.MainHeading>
      <P>
        <code>@dnb/eufemia</code>: <code>{pkg.dependencies['@dnb/eufemia']}</code>
      </P>

      <Form.Handler onSubmit={send}>
        <Form.Card>
          <ol>
            <li>Click "Send". Sending takes three seconds.</li>
            <li>
              Watch the "Send" button.{' '}
              <b>
                Without the fix, the indicator disappears after about two
                seconds, and the button can be clicked again while it is still
                sending.
              </b>
            </li>
            <li>
              Click "Send" again before it is done.{' '}
              <b>Without the fix, the counter shows 2 calls.</b>
            </li>
          </ol>
          <P>
            Calls to <code>onSubmit</code>:{' '}
            <output className="demo-calls">{calls}</output>
            <br />
            Still sending:{' '}
            <output className="demo-running">{running > 0 ? 'yes' : 'no'}</output>
          </P>
          <Hr />

          <Field.String
            label="Customer number"
            path="/customerNumber"
            defaultValue="12345"
            onChangeValidator={checkValue}
          />
          <Form.SubmitButton variant="send" />
        </Form.Card>
      </Form.Handler>
    </Flex.Stack>
  )
}
