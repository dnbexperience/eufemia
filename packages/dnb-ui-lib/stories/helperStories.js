/**
 * Storybook Story
 *
 */

import React from 'react'
import { Wrapper, Box } from './helpers'
import styled from '@emotion/styled'
import { Button } from 'dnb-ui-lib/src'

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
            className="dnb-skip-link-demo"
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

stories.push([
  'Section',
  () => (
    <Wrapper>
      <Box>
        <div className="dnb-section dnb-section--divider">
          <Button text="Next" icon="chevron_right" />
        </div>
      </Box>
    </Wrapper>
  )
])
