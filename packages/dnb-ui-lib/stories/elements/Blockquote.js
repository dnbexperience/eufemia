/**
 * dnb-ui-lib Element Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

const CustomStyles = styled.div`
  a {
    ${'' /** :has is not supported in browsers yet */}
    &:has(> .dnb-icon) {
      border-bottom: none;
      color: red;
    }
  }

  blockquote {
    max-width: 40rem;
  }
`

export const Blockquotes = () => (
  <Wrapper className="dnb-spacing">
    <CustomStyles>
      <Box>
        <blockquote className="dnb-blockquote">
          Scaevola dissentias ne nec, praesent pertinacia te vim, velit
          laboramus assentior ne ius. Choro vivendum tractatos ei quo. Te
          vim enim meis conclusionemque, per ut dolorem copiosae, ea veri
          sanctus deterruisset per
          <footer>Footer Referance</footer>
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
          <cite>Cite Referance</cite>
          <figcaption>Figcaption Referance</figcaption>
        </blockquote>
      </Box>
    </CustomStyles>
  </Wrapper>
)
