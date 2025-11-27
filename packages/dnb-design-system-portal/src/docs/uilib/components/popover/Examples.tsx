import React from 'react'
import { Popover, Button, P, Flex } from '@dnb/eufemia/src'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'

export function PopoverExampleDefault() {
  return (
    <ComponentBox>
      <Popover
        trigger={({ ref, ...triggerProps }) => (
          <Button
            icon="question"
            variant="secondary"
            innerRef={ref}
            {...triggerProps}
          />
        )}
        title="Need help?"
      >
        Popover content that appears when the custom trigger button is
        toggled.
      </Popover>
    </ComponentBox>
  )
}

export function PopoverExampleWithoutCloseButton() {
  return (
    <ComponentBox>
      <Popover
        hideCloseButton
        trigger={({ ref, ...triggerProps }) => (
          <Button
            text="More info"
            variant="secondary"
            innerRef={ref}
            {...triggerProps}
          />
        )}
        title="More information"
        content={({ close }) => (
          <Flex.Stack>
            <P>
              This popover hides the default close button. You can still
              close it programmatically by calling the provided helpers.
            </P>
            <Button text="Dismiss" variant="secondary" onClick={close} />
          </Flex.Stack>
        )}
      />
    </ComponentBox>
  )
}

const Box = styled.div`
  display: inline-flex;
  margin: 10rem 20rem;
  background-color: blue;
`

export function PopoverExampleBasic() {
  return (
    <Box>
      <div data-visual-test="popover-basic">
        <Popover
          trigger={({ ref, ...triggerProps }) => (
            <Button text="Details" innerRef={ref} {...triggerProps} />
          )}
          title="More information"
          content={({ close }) => (
            <Flex.Stack>
              <P>
                You can render any content inside the popover. Use the
                provided helpers to close it programmatically.
              </P>
              <Button text="Close" onClick={close} />
            </Flex.Stack>
          )}
        />
      </div>
    </Box>
  )
}

export function PopoverExampleDark() {
  return (
    <Box>
      <div data-visual-test="popover-dark">
        <Popover
          theme="dark"
          trigger={({ ref, ...triggerProps }) => (
            <Button text="Dark surface" innerRef={ref} {...triggerProps} />
          )}
          title="Dark popover"
        >
          Use `theme="dark"` whenever the popover should visually blend
          with Tooltip surfaces or sit on dark backdrops.
        </Popover>
      </div>
    </Box>
  )
}

export function PopoverExampleArrowLeft() {
  return (
    <Box>
      <div data-visual-test="popover-arrow-left">
        <Popover
          arrowPosition="left"
          trigger={({ ref, ...triggerProps }) => (
            <Button text="Arrow left" innerRef={ref} {...triggerProps} />
          )}
        >
          Arrow left
        </Popover>
      </div>
    </Box>
  )
}

export function PopoverExampleArrowRight() {
  return (
    <Box>
      <div data-visual-test="popover-arrow-right">
        <Popover
          arrowPosition="right"
          trigger={({ ref, ...triggerProps }) => (
            <Button text="Arrow right" innerRef={ref} {...triggerProps} />
          )}
        >
          Arrow right
        </Popover>
      </div>
    </Box>
  )
}

export function PopoverExampleAlignArrowCenter() {
  return (
    <Box>
      <div data-visual-test="popover-align-arrow-center">
        <Popover
          alignOnTarget="center"
          arrowPosition="center"
          trigger={({ ref, ...triggerProps }) => (
            <Button
              text="Align center & arrow center"
              innerRef={ref}
              {...triggerProps}
            />
          )}
        >
          Align center & arrow center
        </Popover>
      </div>
    </Box>
  )
}

export function PopoverExampleAlignArrowLeft() {
  return (
    <Box>
      <div data-visual-test="popover-align-arrow-left">
        <Popover
          alignOnTarget="left"
          arrowPosition="left"
          trigger={({ ref, ...triggerProps }) => (
            <Button
              text="Align left & arrow left"
              innerRef={ref}
              {...triggerProps}
            />
          )}
        >
          Align left & arrow left
        </Popover>
      </div>
    </Box>
  )
}

export function PopoverExampleAlignArrowRight() {
  return (
    <Box>
      <div data-visual-test="popover-align-arrow-right">
        <Popover
          alignOnTarget="right"
          arrowPosition="right"
          trigger={({ ref, ...triggerProps }) => (
            <Button
              text="Align right & arrow right"
              innerRef={ref}
              {...triggerProps}
            />
          )}
        >
          Align right & arrow right
        </Popover>
      </div>
    </Box>
  )
}

export function PopoverExampleAlignLeft() {
  return (
    <Box>
      <div data-visual-test="popover-align-left">
        <Popover
          alignOnTarget="left"
          trigger={({ ref, ...triggerProps }) => (
            <Button text="Align left" innerRef={ref} {...triggerProps} />
          )}
        >
          Align left
        </Popover>
      </div>
    </Box>
  )
}

export function PopoverExampleAlignRight() {
  return (
    <Box>
      <div data-visual-test="popover-align-right">
        <Popover
          alignOnTarget="right"
          trigger={({ ref, ...triggerProps }) => (
            <Button text="Align right" innerRef={ref} {...triggerProps} />
          )}
        >
          Align right
        </Popover>
      </div>
    </Box>
  )
}

export function PopoverExampleAlignLeftArrowRight() {
  return (
    <Box>
      <div data-visual-test="popover-align-left-arrow-right">
        <Popover
          alignOnTarget="left"
          arrowPosition="right"
          trigger={({ ref, ...triggerProps }) => (
            <Button
              text="Align left & arrow right"
              innerRef={ref}
              {...triggerProps}
            />
          )}
        >
          Align left & arrow right
        </Popover>
      </div>
    </Box>
  )
}

export function PopoverExampleAlignRightArrowLeft() {
  return (
    <Box>
      <div data-visual-test="popover-align-right-arrow-left">
        <Popover
          alignOnTarget="right"
          arrowPosition="left"
          trigger={({ ref, ...triggerProps }) => (
            <Button
              text="Align right & arrow left"
              innerRef={ref}
              {...triggerProps}
            />
          )}
        >
          Align right & arrow left
        </Popover>
      </div>
    </Box>
  )
}

export function PopoverExamplePlacementTop() {
  return (
    <Box>
      <div data-visual-test="popover-placement-top">
        <Popover
          placement="top"
          trigger={({ ref, ...triggerProps }) => (
            <Button
              text="Placement top"
              innerRef={ref}
              {...triggerProps}
            />
          )}
        >
          Placement top
        </Popover>
      </div>
    </Box>
  )
}

export function PopoverExamplePlacementBottom() {
  return (
    <Box>
      <div data-visual-test="popover-placement-bottom">
        <Popover
          placement="bottom"
          trigger={({ ref, ...triggerProps }) => (
            <Button
              text="Placement bottom"
              innerRef={ref}
              {...triggerProps}
            />
          )}
        >
          Placement bottom
        </Popover>
      </div>
    </Box>
  )
}

export function PopoverExamplePlacementRight() {
  return (
    <Box>
      <div data-visual-test="popover-placement-right">
        <Popover
          placement="right"
          trigger={({ ref, ...triggerProps }) => (
            <Button
              text="Placement right"
              innerRef={ref}
              {...triggerProps}
            />
          )}
        >
          Placement right
        </Popover>
      </div>
    </Box>
  )
}

export function PopoverExamplePlacementRightArrowTop() {
  return (
    <Box>
      <div data-visual-test="popover-placement-right-arrow-top">
        <Popover
          placement="right"
          arrowPosition="top"
          trigger={({ ref, ...triggerProps }) => (
            <Button
              text="Placement right & arrow top"
              innerRef={ref}
              {...triggerProps}
            />
          )}
        >
          Placement right & arrow top
        </Popover>
      </div>
    </Box>
  )
}

export function PopoverExamplePlacementRightArrowBottom() {
  return (
    <Box>
      <div data-visual-test="popover-placement-right-arrow-bottom">
        <Popover
          placement="right"
          arrowPosition="bottom"
          trigger={({ ref, ...triggerProps }) => (
            <Button
              text="Placement right & arrow bottom"
              innerRef={ref}
              {...triggerProps}
            />
          )}
        >
          Placement right & arrow bottom
        </Popover>
      </div>
    </Box>
  )
}

export function PopoverExamplePlacementLeft() {
  return (
    <Box>
      <div data-visual-test="popover-placement-left">
        <Popover
          placement="left"
          trigger={({ ref, ...triggerProps }) => (
            <Button
              text="Placement left"
              innerRef={ref}
              {...triggerProps}
            />
          )}
        >
          Placement left
        </Popover>
      </div>
    </Box>
  )
}

export function PopoverExamplePlacementLeftArrowBottom() {
  return (
    <Box>
      <div data-visual-test="popover-placement-left-arrow-bottom">
        <Popover
          placement="left"
          arrowPosition="bottom"
          trigger={({ ref, ...triggerProps }) => (
            <Button
              text="Placement left & arrow bottom"
              innerRef={ref}
              {...triggerProps}
            />
          )}
        >
          Placement left & arrow bottom
        </Popover>
      </div>
    </Box>
  )
}
