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
  ${'' /* background: blue; */}
  a.dnb-skip-link {
    position: relative;
    top: 0;
    z-index: 1;
  }
  a.dnb-skip-link:active,
  a.dnb-skip-link:focus {
    margin: 0;
  }
`

stories.push([
  'Skip Link',
  () => (
    <Wrapper>
      <Box>
        <SkipLinkReset>
          <a
            className="dnb-skip-link dnb-anchor--focus"
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
