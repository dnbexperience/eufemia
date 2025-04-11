/* eslint-disable jsx-a11y/aria-role */
/**
 * @dnb/eufemia Component Story
 * Comprehensive Tooltip Placement Demo
 */
import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'
import { Button, NumberFormat, Tooltip } from '../../../'

const BoxWithPadding = styled(Box)`
  padding: 3rem 0 3rem 7rem !important;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const SectionTitle = styled.h3`
  margin-top: 2rem;
  margin-bottom: 1rem;
  grid-column: 1 / -1;
`

export default {
  title: 'Eufemia/Components/Tooltip',
}

export const TooltipSandbox = () => {
  return (
    <Wrapper>
      <SectionTitle>Basic Position Examples</SectionTitle>
      <GridContainer>
        <BoxWithPadding>
          <Tooltip targetElement={<Button>Default Tooltip</Button>} active>
            Default position (top center)
          </Tooltip>
        </BoxWithPadding>

        <BoxWithPadding>
          <Tooltip
            targetElement={<Button>Position Top</Button>}
            position="top"
            active
          >
            Top position
          </Tooltip>
        </BoxWithPadding>

        <BoxWithPadding>
          <Tooltip
            targetElement={<Button>Position Right</Button>}
            position="right"
            active
          >
            Right position
          </Tooltip>
        </BoxWithPadding>

        <BoxWithPadding>
          <Tooltip
            targetElement={<Button>Position Bottom</Button>}
            position="bottom"
            active
          >
            Bottom position
          </Tooltip>
        </BoxWithPadding>

        <BoxWithPadding>
          <Tooltip
            targetElement={<Button>Position Left</Button>}
            position="left"
            active
          >
            Left position
          </Tooltip>
        </BoxWithPadding>
      </GridContainer>

      <SectionTitle>Position with Alignment Examples</SectionTitle>
      <GridContainer>
        <BoxWithPadding>
          <Tooltip
            targetElement={<Button>Top Center</Button>}
            position="top"
            align="center"
            active
          >
            Top with center alignment
          </Tooltip>
        </BoxWithPadding>

        <BoxWithPadding>
          <Tooltip
            targetElement={<Button>Top Left</Button>}
            position="top"
            align="left"
            arrow="left"
            active
          >
            Top with left alignment
          </Tooltip>
        </BoxWithPadding>

        <BoxWithPadding>
          <Tooltip
            targetElement={<Button>Top Right</Button>}
            position="top"
            align="right"
            arrow="right"
            active
          >
            Top with right alignment
          </Tooltip>
        </BoxWithPadding>

        <BoxWithPadding>
          <Tooltip
            targetElement={<Button>Bottom Center</Button>}
            position="bottom"
            align="center"
            active
          >
            Bottom with center alignment
          </Tooltip>
        </BoxWithPadding>

        <BoxWithPadding>
          <Tooltip
            targetElement={<Button>Bottom Left</Button>}
            position="bottom"
            align="left"
            arrow="left"
            active
          >
            Bottom with left alignment
          </Tooltip>
        </BoxWithPadding>

        <BoxWithPadding>
          <Tooltip
            targetElement={<Button>Bottom Right</Button>}
            position="bottom"
            align="right"
            arrow="right"
            active
          >
            Bottom with right alignment
          </Tooltip>
        </BoxWithPadding>
      </GridContainer>

      <SectionTitle>Size Variations</SectionTitle>
      <GridContainer>
        <BoxWithPadding>
          <Tooltip targetElement={<Button>Default Size</Button>} active>
            Default size (basis)
          </Tooltip>
        </BoxWithPadding>

        <BoxWithPadding>
          <Tooltip
            targetElement={<Button>Large Size</Button>}
            size="large"
            active
          >
            Large size with more padding
          </Tooltip>
        </BoxWithPadding>
      </GridContainer>

      <SectionTitle>Additional Features</SectionTitle>
      <GridContainer>
        <BoxWithPadding>
          <Tooltip
            targetElement={<Button>No Animation</Button>}
            noAnimation
          >
            Tooltip without fade-in animation
          </Tooltip>
        </BoxWithPadding>

        <BoxWithPadding>
          <Tooltip
            targetElement={<Button>Delayed Show</Button>}
            showDelay={800}
          >
            Tooltip with show delay (800ms)
          </Tooltip>
        </BoxWithPadding>

        <BoxWithPadding>
          <Tooltip
            targetElement={<Button>Delayed Hide</Button>}
            hideDelay={800}
          >
            Tooltip with hide delay (800ms)
          </Tooltip>
        </BoxWithPadding>

        <BoxWithPadding>
          <button className="target-1">Vanilla button</button>
          <Tooltip id="unique" active targetSelector=".target-1">
            Tooltip
          </Tooltip>
        </BoxWithPadding>

        <BoxWithPadding>
          <Tooltip
            skipPortal
            hideDelay={1e3}
            targetElement={<Button right>Skipped Portal</Button>}
            position="bottom"
          >
            Tooltip
          </Tooltip>
        </BoxWithPadding>

        <BoxWithPadding>
          <NumberFormat
            tooltip={
              <Tooltip position="bottom">
                Tooltip for this NumberFormat
              </Tooltip>
            }
          >
            5678
          </NumberFormat>
        </BoxWithPadding>
      </GridContainer>
    </Wrapper>
  )
}
