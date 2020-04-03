/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import {
  // Dropdown,
  Button,
  Tooltip
} from '../../src/components'

const StyledTooltip = styled(Tooltip)`
  margin-bottom: 4rem;
`

const TooltipStory = () => {
  return (
    <Wrapper>
      <Box>
        <button className="target-1">Show the Tooltip</button>
        <Tooltip id="unique" active target=".target-1">
          Tooltip
        </Tooltip>
      </Box>
      <Box>
        <Tooltip component={<Button>Top</Button>}>Tooltip</Tooltip>
      </Box>
      <Box>
        <StyledTooltip
          position="bottom"
          component={<Button>Bottom</Button>}
        >
          Tooltip
        </StyledTooltip>
      </Box>
    </Wrapper>
  )
}

export default ['Tooltip', () => <TooltipStory />]
