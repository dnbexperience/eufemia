import { Flex, Anchor, P, Hr } from '@dnb/eufemia'
import { Form, Field } from '@dnb/eufemia/extensions/forms'

export default function App() {
  return (
    <Form.Handler>
      <Flex.Stack space="x-large">
        <Form.Card>
          <Form.MainHeading>Eufemia Starter</Form.MainHeading>
          <P>
            Feel free to Fork this Codesandbox and paste your example here or
            make changes to your needs.
          </P>

          <P>✨ Use this Eufemia stater to create and report issues.</P>

          <P>🍀 Remember to update related versions</P>

          <P>
            📖 Here's the link to the documentation:
            <Anchor left href="https://eufemia.dnb.no/uilib/" target="_blank">
              Eufemia Documentation
            </Anchor>
          </P>

          <Hr />

          <Field.String label="Label" placeholder="This is a Field" />
        </Form.Card>

        <Form.SubmitButton text="Happy coding!" />
      </Flex.Stack>
    </Form.Handler>
  )
}
