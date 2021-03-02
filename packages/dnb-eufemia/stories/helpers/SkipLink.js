/**
 * Storybook Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

export default {
  title: 'Eufemia/Helpers/SkipLink'
}

const SkipLinkReset = styled.div`
  /* empty */
`

export const SkipLink = () => (
  <Wrapper>
    <Box>
      <SkipLinkReset>
        <a
          className="dnb-skip-link-demo"
          href="#dnb-app-content"
          onClick={(e) => e.preventDefault()}
        >
          Skip to content
        </a>
      </SkipLinkReset>
    </Box>
  </Wrapper>
)
