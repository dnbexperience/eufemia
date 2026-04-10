import React from 'react'
import { Popover, Button, P, Flex } from '@dnb/eufemia/src'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'

export function PopoverExampleDefault() {
  return (
    <ComponentBox>
      <Popover
        trigger={({ active, ...triggerProps }) => (
          <Button icon="question" {...triggerProps} selected={active} />
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
        trigger={(triggerProps) => (
          <Button text="More info" variant="secondary" {...triggerProps} />
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
  margin: 10rem 25rem;
  background-color: blue;
`

export function PopoverExampleBasic() {
  return (
    <Box>
      <section data-visual-test="popover-basic">
        <Popover
          trigger={(triggerProps) => (
            <Button text="Details" {...triggerProps} />
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
      </section>
    </Box>
  )
}

export function PopoverExampleArrowLeft() {
  return (
    <Box>
      <section data-visual-test="popover-arrow-left">
        <Popover
          arrowPosition="left"
          trigger={(triggerProps) => (
            <Button text="Arrow left" {...triggerProps} />
          )}
        >
          Arrow left
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExampleArrowRight() {
  return (
    <Box>
      <section data-visual-test="popover-arrow-right">
        <Popover
          arrowPosition="right"
          trigger={(triggerProps) => (
            <Button text="Arrow right" {...triggerProps} />
          )}
        >
          Arrow right
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExampleAlignArrowCenter() {
  return (
    <Box>
      <section data-visual-test="popover-align-arrow-center">
        <Popover
          alignOnTarget="center"
          arrowPosition="center"
          trigger={(triggerProps) => (
            <Button text="Align center & arrow center" {...triggerProps} />
          )}
        >
          Align center & arrow center
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExampleAlignArrowLeft() {
  return (
    <Box>
      <section data-visual-test="popover-align-arrow-left">
        <Popover
          alignOnTarget="left"
          arrowPosition="left"
          trigger={(triggerProps) => (
            <Button text="Align left & arrow left" {...triggerProps} />
          )}
        >
          Align left & arrow left
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExampleAlignArrowRight() {
  return (
    <Box>
      <section data-visual-test="popover-align-arrow-right">
        <Popover
          alignOnTarget="right"
          arrowPosition="right"
          trigger={(triggerProps) => (
            <Button text="Align right & arrow right" {...triggerProps} />
          )}
        >
          Align right & arrow right
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExampleAlignLeft() {
  return (
    <Box>
      <section data-visual-test="popover-align-left">
        <Popover
          alignOnTarget="left"
          trigger={(triggerProps) => (
            <Button text="Align left" {...triggerProps} />
          )}
        >
          Align left
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExampleAlignRight() {
  return (
    <Box>
      <section data-visual-test="popover-align-right">
        <Popover
          alignOnTarget="right"
          trigger={(triggerProps) => (
            <Button text="Align right" {...triggerProps} />
          )}
        >
          Align right
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExampleAlignLeftArrowRight() {
  return (
    <Box>
      <section data-visual-test="popover-align-left-arrow-right">
        <Popover
          alignOnTarget="left"
          arrowPosition="right"
          trigger={(triggerProps) => (
            <Button text="Align left & arrow right" {...triggerProps} />
          )}
        >
          Align left & arrow right
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExampleAlignRightArrowLeft() {
  return (
    <Box>
      <section data-visual-test="popover-align-right-arrow-left">
        <Popover
          alignOnTarget="right"
          arrowPosition="left"
          trigger={(triggerProps) => (
            <Button text="Align right & arrow left" {...triggerProps} />
          )}
        >
          Align right & arrow left
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExamplePlacementTop() {
  return (
    <Box>
      <section data-visual-test="popover-placement-top">
        <Popover
          placement="top"
          trigger={(triggerProps) => (
            <Button text="Placement top" {...triggerProps} />
          )}
        >
          Placement top
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExamplePlacementBottom() {
  return (
    <Box>
      <section data-visual-test="popover-placement-bottom">
        <Popover
          placement="bottom"
          trigger={(triggerProps) => (
            <Button text="Placement bottom" {...triggerProps} />
          )}
        >
          Placement bottom
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExamplePlacementRight() {
  return (
    <Box>
      <section data-visual-test="popover-placement-right">
        <Popover
          placement="right"
          trigger={(triggerProps) => (
            <Button text="Placement right" {...triggerProps} />
          )}
        >
          Placement right
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExamplePlacementRightArrowTop() {
  return (
    <Box>
      <section data-visual-test="popover-placement-right-arrow-top">
        <Popover
          placement="right"
          arrowPosition="top"
          trigger={(triggerProps) => (
            <Button text="Placement right & arrow top" {...triggerProps} />
          )}
        >
          Placement right & arrow top
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExamplePlacementRightArrowBottom() {
  return (
    <Box>
      <section data-visual-test="popover-placement-right-arrow-bottom">
        <Popover
          placement="right"
          arrowPosition="bottom"
          trigger={(triggerProps) => (
            <Button
              text="Placement right & arrow bottom"
              {...triggerProps}
            />
          )}
        >
          Placement right & arrow bottom
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExamplePlacementLeft() {
  return (
    <Box>
      <section data-visual-test="popover-placement-left">
        <Popover
          placement="left"
          trigger={(triggerProps) => (
            <Button text="Placement left" {...triggerProps} />
          )}
        >
          Placement left
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExamplePlacementLeftArrowBottom() {
  return (
    <Box>
      <section data-visual-test="popover-placement-left-arrow-bottom">
        <Popover
          placement="left"
          arrowPosition="bottom"
          trigger={(triggerProps) => (
            <Button
              text="Placement left & arrow bottom"
              {...triggerProps}
            />
          )}
        >
          Placement left & arrow bottom
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExamplePlacementRightArrowLeft() {
  return (
    <Box>
      <section data-visual-test="popover-placement-right-arrow-left">
        <Popover
          placement="right"
          arrowPosition="left"
          trigger={(triggerProps) => (
            <Button
              text="Placement right & arrow left"
              {...triggerProps}
            />
          )}
        >
          Placement right & arrow left
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExamplePlacementLeftArrowRight() {
  return (
    <Box>
      <section data-visual-test="popover-placement-left-arrow-right">
        <Popover
          placement="left"
          arrowPosition="right"
          trigger={(triggerProps) => (
            <Button
              text="Placement left & arrow right"
              {...triggerProps}
            />
          )}
        >
          Placement left & arrow right
        </Popover>
      </section>
    </Box>
  )
}

export function PopoverExamplePlacementLeftArrowTop() {
  return (
    <Box>
      <section data-visual-test="popover-placement-left-arrow-top">
        <Popover
          placement="left"
          arrowPosition="top"
          trigger={(triggerProps) => (
            <Button text="Placement left & arrow top" {...triggerProps} />
          )}
        >
          Placement left & arrow top
        </Popover>
      </section>
    </Box>
  )
}
