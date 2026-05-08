/**
 * @dnb/eufemia Element Story
 *
 */

import { Wrapper, Box } from 'storybook-utils/helpers'
import Code from '../Code'
import Section from '../../../components/section/Section'

export default {
  title: 'Eufemia/Elements/Code',
}

export const CodeSandbox = () => (
  <Wrapper className="dnb-spacing">
    <Box>
      <p className="dnb-p">
        Inline code: <Code>const x = 1</Code>
      </p>
    </Box>

    <Box>
      <Section variant="surface-dark">
        <p className="dnb-p">
          On dark surface: <Code>const x = 1</Code>
        </p>
      </Section>
    </Box>
  </Wrapper>
)
