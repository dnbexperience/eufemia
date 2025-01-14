/**
 * @dnb/eufemia Element Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'
import Blockquote from '../Blockquote'
import { Code } from '../..'

const CustomStyles = styled.div`
  a {
    &:has(> .dnb-icon) {
      border-bottom: none;
      color: red;
    }
  }

  blockquote {
    max-width: 40rem;
  }
`

export default {
  title: 'Eufemia/Elements/Blockquote',
}

export const BlockquoteSandbox = () => (
  <Wrapper className="dnb-spacing">
    <CustomStyles>
      <Box>
        <blockquote className="dnb-blockquote">
          Scaevola dissentias ne nec, praesent pertinacia te vim, velit
          laboramus assentior ne ius. Choro vivendum tractatos ei quo. Te
          vim enim meis conclusionemque, per ut dolorem copiosae, ea veri
          sanctus deterruisset per
          <footer>Footer Reference</footer>
        </blockquote>
        <p className="dnb-p">
          Next line <cite>with a Cite</cite>
        </p>
      </Box>
      <Box>
        <blockquote className="dnb-blockquote dnb-blockquote--top">
          Scaevola dissentias ne nec, praesent pertinacia te vim, velit
          laboramus assentior ne ius. Choro vivendum tractatos ei quo. Te
          vim enim meis conclusionemque, per ut dolorem copiosae, ea veri
          sanctus deterruisset per
          <cite>Cite Reference</cite>
          <figcaption>Figcaption Reference</figcaption>
        </blockquote>
      </Box>
    </CustomStyles>
    <Box>
      <Blockquote space="xx-large-x2 large">
        Scaevola dissentias ne nec, praesent pertinacia te vim, velit
        laboramus assentior ne ius. Choro vivendum tractatos ei quo. Te vim
        enim meis conclusionemque, per ut dolorem copiosae, ea veri sanctus
        deterruisset per
        <cite>Cite Reference</cite>
        <figcaption>Figcaption Reference</figcaption>
      </Blockquote>
    </Box>
    <Box>
      <Blockquote data-visual-test="blockquote-with-code">
        <Code>display</Code> and <Code>background-color</Code> are CSS
        properties
      </Blockquote>
    </Box>
  </Wrapper>
)
