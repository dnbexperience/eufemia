import { Button, Card, Flex } from '@dnb/eufemia/src/components'
import { Form, Field, Value } from '../../dnb-eufemia/src/extensions/forms'

function App() {
  return (
    <>
      {/* <Button>Test</Button> */}
      <Form.Handler>
        <Flex.Stack>
          <Card stack>
            <Value.String value="foo" />
            <Field.String
              label="String"
              // value="foo"
              // required
              // minLength={2}
            />
            {/* <Field.Number
              label="Number"
              // required
              // value={123}
            /> */}
          </Card>
          <Form.SubmitButton />
        </Flex.Stack>
      </Form.Handler>
    </>
  )
}

export default App
