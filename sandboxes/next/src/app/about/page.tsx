import { Flex, P, Anchor } from '@dnb/eufemia/build'
import { Form } from '@dnb/eufemia/build/extensions/forms'
import Link from 'next/link'

export default function About() {
  return (
    <main>
      <Flex.Stack>
        <Form.MainHeading>About</Form.MainHeading>
        <P>This is the about page </P>

        {/* @ts-ignore */}
        <Anchor element={Link} href="/">
          Back to home
        </Anchor>
      </Flex.Stack>
    </main>
  )
}
