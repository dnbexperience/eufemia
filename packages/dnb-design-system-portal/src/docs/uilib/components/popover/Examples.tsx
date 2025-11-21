import React from 'react'
import { Popover, Button, P, Flex } from '@dnb/eufemia/src'
import ComponentBox from '../../../../shared/tags/ComponentBox'

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
            <Button text="Dismiss" onClick={close} />
          </Flex.Stack>
        )}
      />
    </ComponentBox>
  )
}

export function PopoverExampleBasic() {
  return (
    <ComponentBox data-visual-test="popover-basic">
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
    </ComponentBox>
  )
}

export function PopoverExampleDark() {
  return (
    <ComponentBox data-visual-test="popover-dark">
      <Popover
        theme="dark"
        trigger={({ ref, ...triggerProps }) => (
          <Button text="Dark surface" innerRef={ref} {...triggerProps} />
        )}
        title="Dark popover"
      >
        Use `theme="dark"` whenever the popover should visually blend with
        Tooltip surfaces or sit on dark backdrops.
      </Popover>
    </ComponentBox>
  )
}
