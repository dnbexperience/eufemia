import { Flex, Anchor, P, Hr } from '@dnb/eufemia/src'
import { Form, Field } from '@dnb/eufemia/src/extensions/forms'

export default function App() {
  return (
    <Form.Handler>
      <Flex.Stack space="x-large">
        <Form.Card>
          <Form.MainHeading>Eufemia Starter</Form.MainHeading>
          <P>
            Feel free to fork this StackBlitz and paste your example here
            or make changes to your needs.
          </P>

          <P>✨ Use this Eufemia starter to create and report issues.</P>

          <P>🍀 Remember to update related versions</P>

          <P>
            📖 Here's the link to the documentation:
            <Anchor
              left
              href="https://eufemia.dnb.no/web/get-started/quick-start/"
              target="_blank"
            >
              Eufemia Documentation
            </Anchor>
          </P>

          <Hr />

          <Field.String
            label="Label"
            placeholder="This is a Field"
            path="/myField"
          />
        </Form.Card>

        <Form.SubmitButton text="Happy coding!" />
      </Flex.Stack>
    </Form.Handler>
  )
}
