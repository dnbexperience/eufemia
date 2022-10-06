/* eslint-disable jsx-a11y/aria-role */
/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import { NumberFormat, Button, Tooltip, P } from '../../../'

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
          skipPortal
          hideDelay={1e3}
          targetElement={<Button right>Skipped Portal</Button>}
          position="bottom"
        >
          Tooltip
        </Tooltip>
      </Box>
      <Box>
        <Tooltip
          animatePosition
          group="animatePosition"
          hideDelay={1e3}
          targetElement={<span role="text">Top</span>}
        >
          Tooltip 1
        </Tooltip>
        <Tooltip
          animatePosition
          group="animatePosition"
          position="bottom"
          size="large"
          targetElement={<span role="text">Bottom</span>}
        >
          Tooltip 2
        </Tooltip>
      </Box>
      <Box>
        <button className="target-1">Show the Tooltip</button>
        <button className="target-2">Tooltip</button>

        <hr />

        <Tooltip id="unique-1" active targetSelector=".target-1">
          Tooltip
        </Tooltip>

        <Tooltip id="unique-2" targetSelector=".target-2">
          Tooltip
        </Tooltip>
      </Box>
      <Box>
        <Tooltip
          group="animatePosition"
          // hideDelay={1e3}
          animatePosition
          targetElement={<Button right>Top</Button>}
        >
          Tooltip 1
        </Tooltip>
        <Tooltip
          group="animatePosition"
          position="bottom"
          animatePosition
          targetElement={<Button>Bottom</Button>}
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
          targetElement={<Button right>Bottom 1</Button>}
        >
          Tooltip 1
        </StyledTooltip>
        <StyledTooltip
          // id="button2"
          position="bottom"
          // target="#button2"
          // active
          targetElement={<Button>Bottom 2</Button>}
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
        <P>
          <Tooltip targetElement={<NumberFormat>1234</NumberFormat>}>
            Tooltip
          </Tooltip>
        </P>

        <P>
          <NumberFormat
            tooltip={
              <Tooltip position="bottom">
                Tooltip for this NumberFormat
              </Tooltip>
            }
          >
            5678
          </NumberFormat>
        </P>
      </Box>
      <Box>
        <Tooltip skipPortal active>
          Tooltip
        </Tooltip>
      </Box>
    </Wrapper>
  )
}
