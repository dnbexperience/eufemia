import { Button, Card, Flex } from '@dnb/eufemia/src/components'
import { Form, Field, Value } from '../../dnb-eufemia/src/extensions/forms'

function App() {
  return (
    <>
      {/* <Button>Test</Button> */}
      <Value.String value="foo" />
      {/* <Form.Handler>
        <Flex.Stack>
          <Card stack>
            <Field.String label="String" value="foo"></Field.String>
            <Field.Number label="Number" value={123}></Field.Number>
          </Card>
          <Form.SubmitButton />
        </Flex.Stack>
      </Form.Handler> */}
    </>
  )
}

export default App
