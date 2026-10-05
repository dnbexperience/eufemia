import { Flex, P, Button, Hr } from '@dnb/eufemia'
import { Form, Field } from '@dnb/eufemia/extensions/forms'
import pkg from '../package.json'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Eufemia only shows the indicator for async functions
const slowSubmit = async () => {
  await wait(1500)
}

export default function App() {
  return (
    <Flex.Stack space="large" style={{ maxWidth: '50rem', margin: '2rem auto' }}>
      <Form.MainHeading>
        Submit indicator demo (PR&nbsp;#9639)
      </Form.MainHeading>
      <P>
        <code>@dnb/eufemia</code>: <code>{pkg.dependencies['@dnb/eufemia']}</code>
      </P>

      <Form.Handler onSubmit={slowSubmit}>
        <Form.Card>
          <ol>
            <li>Click "Second" while the field is empty. It shows an error.</li>
            <li>Type something in the field.</li>
            <li>
              Click "Submit from code". <b>Without the fix, only "Second"
              shows a spinner.</b>
            </li>
          </ol>
          <Hr />

          <Field.String label="Name" path="/name" required />
          <Flex.Horizontal>
            <Form.SubmitButton text="First" />
            <Form.SubmitButton text="Second" />
            <SubmitFromCode />
          </Flex.Horizontal>
        </Form.Card>
      </Form.Handler>
    </Flex.Stack>
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
