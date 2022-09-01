/* eslint-disable jsx-a11y/aria-role */
/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import { NumberFormat, Button, Tooltip } from '../../'

const StyledTooltip = styled(Tooltip)`
  margin-bottom: 4rem;
`

export default {
  title: 'Eufemia/Components/Tooltip',
}

export const TooltipSandbox = () => {
  return (
    <Wrapper>
      <Box>
        <Tooltip
          animate_position
          group="animate_position"
          hide_delay={1e3}
          target_element={<span role="text">Top</span>}
        >
          Tooltip 1
        </Tooltip>
        <Tooltip
          animate_position
          group="animate_position"
          position="bottom"
          size="large"
          target_element={<span role="text">Bottom</span>}
        >
          Tooltip 2
        </Tooltip>
      </Box>
      <Box>
        <button className="target-1">Show the Tooltip</button>

        <hr />

        <Tooltip id="unique" active target_selector=".target-1">
          Tooltip
        </Tooltip>
      </Box>
      <Box>
        <Tooltip
          group="animate_position"
          // hide_delay={1e3}
          animate_position
          target_element={<Button right>Top</Button>}
        >
          Tooltip 1
        </Tooltip>
        <Tooltip
          group="animate_position"
          position="bottom"
          animate_position
          target_element={<Button>Bottom</Button>}
        >
          Tooltip 2
        </Tooltip>
      </Box>
      <Box>
        <Button>Clickable</Button>
        <br />
        <StyledTooltip
          // id="button1"
          position="top"
          // target="#button1"
          // active
          target_element={<Button right>Bottom 1</Button>}
        >
          Tooltip 1
        </StyledTooltip>
        <StyledTooltip
          // id="button2"
          position="bottom"
          // target="#button2"
          // active
          target_element={<Button>Bottom 2</Button>}
        >
          Tooltip 2
        </StyledTooltip>
      </Box>
      <Box>
        <Button
          on_click={(e) => {
            console.log(e)
          }}
          // aria-describedby="customId"
          tooltip={
            // 'Tooltip for this Button 1a'
            <Tooltip>Tooltip for this Button 1b</Tooltip>
          }
        >
          Button with Tooltip 1
        </Button>
        <Button
          on_click={(e) => {
            console.log(e)
          }}
          tooltip={
            // 'Tooltip for this Button 2a'
            <Tooltip position="bottom">Tooltip for this Button 2b</Tooltip>
          }
        >
          Button with Tooltip 2
        </Button>
      </Box>
      <Box>
        <Tooltip target_element={<NumberFormat>1234</NumberFormat>}>
          Tooltip
        </Tooltip>
        <NumberFormat
          tooltip={<Tooltip>Tooltip for this NumberFormat</Tooltip>}
        >
          1234
        </NumberFormat>
      </Box>
    </Wrapper>
  )
}
