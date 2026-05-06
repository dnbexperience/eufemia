/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Code, Flex, P, Section } from '@dnb/eufemia/src'

export function CodeExample() {
  return (
    <ComponentBox>
      <Flex.Stack>
        <P>
          My <Code>formatted text</Code> inside a paragraph
        </P>

        <Section surface="dark" innerSpace={{ block: 'small' }}>
          <P>
            My <Code>formatted text</Code> inside a paragraph on dark
            surface
          </P>
        </Section>

        <pre className="dnb-pre">Code Syntax</pre>
      </Flex.Stack>
    </ComponentBox>
  )
}
