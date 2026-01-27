---
title: 'Popover'
description: 'Popover renders its own floating surface anchored to a trigger element. (For internal use only)'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.884Z
checksum: 3291905ce339ab237bcf34531e06b8238f95ca838a99e118f0856b2c0efe0155
---

# Popover

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
  </Popover>
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
  />
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
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
  </Box>
)
```

## Properties

```json
{
  "props": {
    "children": {
      "doc": "Alternative content prop. Accepts nodes or a render function that receives the same helpers as `content`.",
      "type": [
        "React.ReactNode",
        "({ close, open, toggle, id }) => React.ReactNode"
      ],
      "status": "optional"
    },
    "content": {
      "doc": "Content rendered inside the popover. Can also be a render function that receives helpers such as `close`.",
      "type": [
        "React.ReactNode",
        "({ close, open, toggle, id }) => React.ReactNode"
      ],
      "status": "required"
    },
    "title": {
      "doc": "Optional heading shown above the body content. Matches the typography used in TermDefinition.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "trigger": {
      "doc": "Custom trigger element or render function. Required unless you point Popover at an existing element using `targetElement` / `targetSelector`.",
      "type": [
        "React.ReactNode",
        "({ active, ref, toggle, open, close }) => React.ReactNode"
      ],
      "status": "optional"
    },
    "triggerAttributes": {
      "doc": "Extra HTML attributes passed to the default trigger wrapper (e.g. aria-*).",
      "type": "React.HTMLAttributes<HTMLElement>",
      "status": "optional"
    },
    "triggerClassName": {
      "doc": "Class name merged with the default trigger wrapper.",
      "type": "string",
      "status": "optional"
    },
    "triggerOffset": {
      "doc": "Spacing in pixels between the trigger element and the popover surface.",
      "type": "number",
      "status": "optional"
    },
    "targetRefreshKey": {
      "doc": "Forces the popover to recalculate its layout whenever this value changes. Useful when the trigger moves but the DOM tree stays mounted.",
      "type": "unknown",
      "status": "optional"
    },
    "targetElement": {
      "doc": "Existing DOM element (or ref) used instead of a rendered trigger. Provide `{ horizontalRef, verticalRef }` when horizontal and vertical anchors differ.",
      "type": [
        "HTMLElement",
        "React.MutableRefObject<HTMLElement>",
        "{ horizontalRef?: HTMLElement | React.MutableRefObject<HTMLElement>; verticalRef?: HTMLElement | React.MutableRefObject<HTMLElement> }"
      ],
      "status": "optional"
    },
    "targetSelector": {
      "doc": "CSS selector pointing to an element in the document to use as the trigger target.",
      "type": "string",
      "status": "optional"
    },
    "horizontalOffset": {
      "doc": "Horizontal offset in pixels to adjust the popover placement. Positive values move the popover to the right, negative values move it to the left. Useful for fine-tuning alignment when the default placement needs adjustment.",
      "type": "number",
      "defaultValue": "0",
      "status": "optional"
    },
    "arrowEdgeOffset": {
      "doc": "Offset in pixels from the edge when the arrow is positioned at the edge. When set, this value replaces the default edge spacing (8px) and arrow boundary (8px). Useful for components like Tooltip that need the arrow closer to the edge.",
      "type": "number",
      "status": "optional"
    },
    "openInitially": {
      "doc": "Whether the popover should be open by default when uncontrolled.",
      "type": "boolean",
      "status": "optional"
    },
    "open": {
      "doc": "Controls the open state when provided. Use together with `onOpenChange`.",
      "type": "boolean",
      "status": "optional"
    },
    "placement": {
      "doc": "Preferred placement of the popover relative to the trigger.",
      "type": ["top", "right", "bottom", "left"],
      "defaultValue": "bottom",
      "status": "optional"
    },
    "alignOnTarget": {
      "doc": "Adjust horizontal alignment of the popover body when `placement` is `top`/`bottom`; ignored for other placements.",
      "type": ["left", "center", "right", "null"],
      "defaultValue": "center",
      "status": "optional"
    },
    "arrowPosition": {
      "doc": "Align the arrow along the axis of the selected `placement` (e.g., left/right for `placement=\"right\"`).",
      "type": ["center", "top", "right", "bottom", "left"],
      "defaultValue": "center",
      "status": "optional"
    },
    "arrowPositionSelector": {
      "doc": "CSS selector that points to the element the arrow should align with. When the popover points vertically it aligns horizontally, and vice versa for horizontal placements.",
      "type": "string",
      "status": "optional"
    },
    "hideArrow": {
      "doc": "Hide the arrow element from the popover. When `true`, the arrow will not be rendered regardless of the `arrowPosition` prop.",
      "type": "boolean",
      "defaultValue": "false",
      "status": "optional"
    },
    "theme": {
      "doc": "Sets the surface style.",
      "type": ["light", "dark"],
      "status": "optional"
    },
    "contentClassName": {
      "doc": "Additional class name(s) merged into the popover content wrapper.",
      "type": "string",
      "status": "optional"
    },
    "baseClassName": {
      "doc": "Overrides the default BEM root block. Useful when mirroring Popover styles.",
      "type": "string",
      "status": "optional"
    },
    "hideOutline": {
      "doc": "Removes the outline/border that normally surrounds the popover surface.",
      "type": "boolean",
      "status": "optional"
    },
    "hideCloseButton": {
      "doc": "Removes the built-in close button.",
      "type": "boolean",
      "status": "optional"
    },
    "disableFocusTrap": {
      "doc": "Stops rendering the focus-trap button used to return focus to the trigger.",
      "type": "boolean",
      "status": "optional"
    },
    "focusOnOpen": {
      "doc": "If true, focus is moved into the popover content when it opens.",
      "type": "boolean",
      "status": "optional"
    },
    "focusOnOpenElement": {
      "doc": "Provide a specific element (or function returning one) to receive focus when the popover opens.",
      "type": "HTMLElement | () => HTMLElement",
      "status": "optional"
    },
    "restoreFocus": {
      "doc": "Moves focus back to the trigger element once the popover closes (defaults to true).",
      "type": "boolean",
      "status": "optional"
    },
    "preventClose": {
      "doc": "Prevent closing the popover when interacting outside of it or pressing Escape. Useful when the popover needs to stay open while other parts of the page are interacted with.",
      "type": "boolean",
      "status": "optional"
    },
    "showDelay": {
      "doc": "Delay (ms) before the popover becomes active. Useful for hover-triggered popovers.",
      "type": "number",
      "status": "optional"
    },
    "hideDelay": {
      "doc": "Delay (ms) before the popover starts hiding. Defaults to 0.",
      "type": "number",
      "status": "optional"
    },
    "noInnerSpace": {
      "doc": "Remove the default padding inside the popover by setting `--inner-space: 0` on the surface.",
      "type": "boolean",
      "status": "optional"
    },
    "closeButtonProps": {
      "doc": "Customize the built-in close button (icon, title, variant, etc.).",
      "type": "Partial<ButtonProps>",
      "status": "optional"
    },
    "skipPortal": {
      "doc": "Render inline instead of inside the shared Popover portal.",
      "type": "boolean",
      "status": "optional"
    },
    "portalRootClass": {
      "doc": "Extra className applied to the portal wrapper (only when not using `skipPortal`).",
      "type": "string",
      "status": "optional"
    },
    "keepInDOM": {
      "doc": "Keep the portal mounted in the DOM even when the popover is closed. Useful when the content should preserve its state.",
      "type": "boolean",
      "defaultValue": "false",
      "status": "optional"
    },
    "noAnimation": {
      "doc": "Disable show/hide animations.",
      "type": "boolean",
      "status": "optional"
    },
    "fixedPosition": {
      "doc": "Use fixed positioning so the popover follows the viewport instead of the page scroll.",
      "type": "boolean",
      "status": "optional"
    },
    "autoAlignMode": {
      "doc": "Control when the popover automatically flips its placement to fit within the viewport. `initial` (default): Flip placement only on initial open when there's limited space. `scroll`: Flip placement on initial open and during scroll events. `never`: Never automatically flip placement, always use the specified `placement` property.",
      "type": ["initial", "scroll", "never"],
      "defaultValue": "initial",
      "status": "optional"
    },
    "contentRef": {
      "doc": "Ref forwarded to the popover content element.",
      "type": "React.MutableRefObject<HTMLSpanElement>",
      "status": "optional"
    },
    "omitDescribedBy": {
      "doc": "Skips adding aria-describedBy on the trigger when you handle accessibility yourself.",
      "type": "boolean",
      "status": "optional"
    }
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "Popover.closeButtonTitle": {
      "nb-NO": "Lukk",
      "en-GB": "Close",
      "sv-SE": "Stäng",
      "da-DK": "Luk"
    },
    "Popover.closeTriggerTitle": {
      "nb-NO": "Klikk for å lukke",
      "en-GB": "Click to close",
      "sv-SE": "Klicka för att stänga",
      "da-DK": "Klik for at lukke"
    },
    "Popover.focusTrapTitle": {
      "nb-NO": "Klikk for å gå tilbake",
      "en-GB": "Click to return",
      "sv-SE": "Klicka för att återgå",
      "da-DK": "Klik for at vende tilbage"
    },
    "Popover.openTriggerTitle": {
      "nb-NO": "Klikk for å åpne",
      "en-GB": "Click to open",
      "sv-SE": "Klicka för att öppna",
      "da-DK": "Klik for at åbne"
    }
  }
}
```

## Events

```json
{
  "props": {
    "onOpenChange": {
      "doc": "Called whenever the open state changes (both controlled and uncontrolled).",
      "type": "(open: boolean) => void",
      "status": "optional"
    }
  }
}
```
