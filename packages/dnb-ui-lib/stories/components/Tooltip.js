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

        <hr />

        <Tooltip id="unique" active target=".target-1">
          Tooltip
        </Tooltip>
      </Box>
      <Box>
        <Tooltip
          group="animate_position"
          // hide_delay={1e3}
          animate_position
          component={<Button right>Top</Button>}
        >
          Tooltip 1
        </Tooltip>
        <Tooltip
          group="animate_position"
          // position="bottom"
          animate_position
          component={<Button>Bottom</Button>}
        >
          Tooltip 2
        </Tooltip>
      </Box>
      <Box>
        {/* <Button right id="button1">
          Bottom 1
        </Button>
        <Button right id="button2">
          Bottom 2
        </Button> */}
        <Button>Clickable</Button>
        <br />
        <StyledTooltip
          // id="button1"
          position="top"
          // target="#button1"
          // active
          component={<Button right>Bottom 1</Button>}
        >
          Tooltip 1
        </StyledTooltip>
        <StyledTooltip
          // id="button2"
          position="bottom"
          // target="#button2"
          // active
          component={<Button>Bottom 2</Button>}
        >
          Tooltip 2
        </StyledTooltip>
      </Box>
    </Wrapper>
  )
}

export default ['Tooltip', () => <TooltipStory />]
