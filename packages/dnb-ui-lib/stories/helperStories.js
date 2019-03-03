/**
 * Storybook Story
 *
 */

import React from 'react'
import { Wrapper, Box } from './helpers'
import styled from '@emotion/styled'

const stories = []
export default stories

const SkipLinkReset = styled.div`
  /* empty */
`

stories.push([
  'Skip Link',
  () => (
    <Wrapper>
      <Box>
        <SkipLinkReset>
          <a
            className="dnb-show-skip-link"
            href="#dnb-app-content"
            onClick={e => e.preventDefault()}
          >
            Skip to content
          </a>
        </SkipLinkReset>
      </Box>
    </Wrapper>
  )
])
