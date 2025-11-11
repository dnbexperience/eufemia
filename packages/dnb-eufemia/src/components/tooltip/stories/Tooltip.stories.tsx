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
        <Tooltip targetElement={<Button right>Top</Button>}>
          Tooltip 1
        </Tooltip>
        <Tooltip position="bottom" targetElement={<Button>Bottom</Button>}>
          Tooltip 2
        </Tooltip>
      </Box>
      <Box>
        <Button>Clickable</Button>
        <br />
        <StyledTooltip
          position="top"
          targetElement={<Button right>Bottom 1</Button>}
        >
          Tooltip 1
        </StyledTooltip>
        <StyledTooltip
          position="bottom"
          targetElement={<Button>Bottom 2</Button>}
        >
          Tooltip 2
        </StyledTooltip>
      </Box>
      <Box>
        <Button
          onClick={(e) => {
            console.log(e)
          }}
          tooltip={<Tooltip>Tooltip for this Button 1b</Tooltip>}
        >
          Button with Tooltip 1
        </Button>
        <Button
          onClick={(e) => {
            console.log(e)
          }}
          tooltip={
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
