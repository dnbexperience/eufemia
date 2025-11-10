/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  Skeleton,
  Span,
  IconPrimary,
  ToggleButton,
} from '@dnb/eufemia/src'
import styled from '@emotion/styled'

export const UnstyledExample = () => (
  <ComponentBox data-visual-test="span-skeleton">
    {() => {
      const Box = styled.div`
        display: grid;
        place-items: center;
        width: 12rem;
        height: 4rem;
        padding: 0 1rem;
        background-color: var(--color-white);
      `
      const StyledButton = styled.button`
        display: flex;
        justify-content: space-between;
        width: 100%;
        &:hover {
          color: var(--color-fire-red);
        }
        &:active {
          opacity: 0.6;
        }
      `
      const CustomImage = () => {
        const [state, setState] = React.useState(false)
        return (
          <Skeleton show={state}>
            <Box>
              <StyledButton className="dnb-button dnb-button--reset">
                <Span>Text</Span>
                <IconPrimary icon="chevron_right" />
              </StyledButton>
            </Box>
            <br />
            <Skeleton.Exclude>
              <ToggleButton
                checked={state}
                onChange={({ checked }) => setState(checked)}
                top="large"
              >
                Toggle
              </ToggleButton>
            </Skeleton.Exclude>
          </Skeleton>
        )
      }

      return <CustomImage />
    }}
  </ComponentBox>
)
