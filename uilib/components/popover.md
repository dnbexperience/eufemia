---
title: 'Popover'
description: 'Popover renders its own floating surface anchored to a trigger element. (For internal use only)'
metadata: https://eufemia.dnb.no/uilib/components/popover/metadata.json
---

## Import

```tsx
import { Popover } from '@dnb/eufemia'
```

## Description

**NB:** For internal use only.

Popover renders its own floating surface anchored to a trigger element.

It is used in the [Tooltip](/uilib/components/tooltip) and [DatePicker](/uilib/components/date-picker) component, but can also be used directly when you need a more flexible trigger or richer content.

## Relevant links

- Source code: https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/popover
- Docs code: https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/popover

## Accessibility

- Focus moves into the popover body once it opens (similar to TermDefinition), and it returns to the trigger when the popover closes.
- The Popover does by default change its alignment initially, but not reposition itself during user scroll when opened, as this could be disorienting and confusing for users.
- When you render a trigger via the provided render props, it receives ARIA attributes such as `aria-controls`, `aria-expanded`, and `aria-describedby` alongside keyboard handlers.
- Set `hideCloseButton` if you want to remove the built-in close button and handle dismissal yourself (use the provided `close` helper when rendering custom content).
- Focus moves inside the popover content when it opens and returns to the trigger when it closes.
- The popover can be dismissed with Escape, by clicking outside, or by using the close button.
- Custom triggers receive the necessary ARIA attributes (`aria-controls`, `aria-expanded`, `aria-describedby`) and keyboard handlers so long as you spread the provided props.

## Root Element (React Portal)

The Popover component uses [PortalRoot](/uilib/components/portal-root) internally to render its content. See the [PortalRoot documentation](/uilib/components/portal-root) for information on how to control where the portal content appears in the DOM.

## Demos

### Basic usage

```tsx
render(
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
    Popover content that appears when the custom trigger button is toggled.
  </Popover>,
)
```

### Without close button

```tsx
render(
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
          This popover hides the default close button. You can still close
          it programmatically by calling the provided helpers.
        </P>
        <Button text="Dismiss" variant="secondary" onClick={close} />
      </Flex.Stack>
    )}
  />,
)
```

```tsx
render(
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
  </Box>,
)
```

```tsx
render(
  <Box>
    <div data-visual-test="popover-dark">
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
    </div>
  </Box>,
)
```

```tsx
render(
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
  </Box>,
)
```

```tsx
render(
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
  </Box>,
)
```

```tsx
render(
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
  </Box>,
)
```

```tsx
render(
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
  </Box>,
)
```

```tsx
render(
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
  </Box>,
)
```

```tsx
render(
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
  </Box>,
)
```

```tsx
render(
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
  </Box>,
)
```

```tsx
render(
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
  </Box>,
)
```

```tsx
render(
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
  </Box>,
)
```

```tsx
render(
  <Box>
    <div data-visual-test="popover-placement-top">
      <Popover
        placement="top"
        trigger={({ ref, ...triggerProps }) => (
          <Button text="Placement top" innerRef={ref} {...triggerProps} />
        )}
      >
        Placement top
      </Popover>
    </div>
  </Box>,
)
```

```tsx
render(
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
  </Box>,
)
```

```tsx
render(
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
  </Box>,
)
```

```tsx
render(
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
  </Box>,
)
```

```tsx
render(
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
  </Box>,
)
```

```tsx
render(
  <Box>
    <div data-visual-test="popover-placement-right-arrow-left">
      <Popover
        placement="right"
        arrowPosition="left"
        trigger={({ ref, ...triggerProps }) => (
          <Button
            text="Placement right & arrow left"
            innerRef={ref}
            {...triggerProps}
          />
        )}
      >
        Placement right & arrow left
      </Popover>
    </div>
  </Box>,
)
```

```tsx
render(
  <Box>
    <div data-visual-test="popover-placement-left">
      <Popover
        placement="left"
        trigger={({ ref, ...triggerProps }) => (
          <Button text="Placement left" innerRef={ref} {...triggerProps} />
        )}
      >
        Placement left
      </Popover>
    </div>
  </Box>,
)
```

```tsx
render(
  <Box>
    <div data-visual-test="popover-placement-left-arrow-top">
      <Popover
        placement="left"
        arrowPosition="top"
        trigger={({ ref, ...triggerProps }) => (
          <Button
            text="Placement left & arrow top"
            innerRef={ref}
            {...triggerProps}
          />
        )}
      >
        Placement left & arrow top
      </Popover>
    </div>
  </Box>,
)
```

```tsx
render(
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
  </Box>,
)
```

```tsx
render(
  <Box>
    <div data-visual-test="popover-placement-left-arrow-right">
      <Popover
        placement="left"
        arrowPosition="right"
        trigger={({ ref, ...triggerProps }) => (
          <Button
            text="Placement left & arrow right"
            innerRef={ref}
            {...triggerProps}
          />
        )}
      >
        Placement left & arrow right
      </Popover>
    </div>
  </Box>,
)
```
