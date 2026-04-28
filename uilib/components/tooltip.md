---
title: 'Tooltip'
description: 'The Tooltip component is primarily meant to enhance the UX for various and additional information.'
version: 11.0.2
generatedAt: 2026-04-28T04:47:21.198Z
checksum: a1a83e458430ef1d1db7463d31d70f71e0d6d80606cccba00ca109e75d1b478b
---

# Tooltip

## Import

```tsx
import { Tooltip } from '@dnb/eufemia'
```

## Description

The Tooltip component is primarily meant to enhance the UX for various and additional information.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=44531-1111)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/tooltip)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/tooltip)

### Tooltip accessibility problems

Because tooltips are often triggered by hover actions, developers and UX designers need to find alternative ways to support access to that information.

The Tooltip component is integrated into components like [Button](/uilib/components/button), which allows us to make tooltip information accessible to screen readers.

- All content inside the Tooltip can be selected when it is open
- When the mouse moves over the Tooltip content, the Tooltip remains open
- Custom triggers receive the necessary ARIA attributes (`aria-describedby`) so assistive technologies can announce the tooltip content without hovering

#### Touch devices and keyboard support

To enhance accessibility for touch devices, we add `tabindex="0"` and a `touchstart` event handler.

## Links (anchor) with target blank

The Eufemia [Anchor](/uilib/components/anchor) and [Button](/uilib/components/button) components display a Tooltip when the URL target is set to `_blank` to improve accessibility by informing users that a new window will open (out of context).

## Controlled open

When you pass the `open` property, the Tooltip becomes controlled:

- `open={true}`: The Tooltip stays visible and ignores DOM events (hover, focus, touch). It will not auto-hide on `mouseleave`.
- `open={false}`: The Tooltip stays hidden and ignores DOM events. It will not auto-show on `mouseenter` or focus.

To use the built-in hover/focus/touch behavior, omit the `open` property and let the component manage visibility internally.

## Demos

### Button with hover Tooltip

```tsx
render(<Button tooltip="Button tooltip" text="Hover" />)
```

### Button with open Tooltip

<VisibleWhenNotVisualTest>
  
```tsx
render(
  <Button tooltip={<Tooltip open>Basic Tooltip</Tooltip>} text="Open" />
)
```

</VisibleWhenNotVisualTest>

### NumberFormat with a tooltip

```tsx
render(<NumberFormat.Number tooltip="Tooltip">1234</NumberFormat.Number>)
```

... or wrapped around the [NumberFormat](/uilib/components/number-format) component:

```tsx
render(
  <Tooltip targetElement={<NumberFormat.Number>1234</NumberFormat.Number>}>
    Tooltip NumberFormat
  </Tooltip>
)
```

### Tooltip with delay

```tsx
<Tooltip
  hideDelay={1e3}
  size="large"
  targetElement={<Span right>Top</Span>}
>
  Tooltip 1
</Tooltip>
<Tooltip placement="bottom" targetElement={<Span>Bottom</Span>}>
  Tooltip 2
</Tooltip>
```

### Tooltip linked to a vanilla button

<VisibleWhenNotVisualTest>
  
```tsx
<button className="target-1">Show the Tooltip</button>
<Tooltip id="unique" open targetSelector=".target-1">
  Tooltip linked
</Tooltip>
```

</VisibleWhenNotVisualTest>

```tsx
render(<Button tooltip={`${longText} ${longText}`} text="Long text" />)
```

```tsx
<Button className="target-align-center">
  Align center & arrow center
</Button>
<Tooltip
  id="unique-align-center"
  targetSelector=".target-align-center"
  align="center"
  arrow="center"
>
  Align center & arrow center
</Tooltip>
```

```tsx
<Button className="target-align-center-long-text">
  Align center & arrow center
</Button>
<Tooltip
  id="unique-align-center-long-text"
  targetSelector=".target-align-center-long-text"
  align="center"
  arrow="center"
>
  {longText}
</Tooltip>
```

```tsx
<Button className="target-position-right">Position right</Button>
<Tooltip
  id="unique-position-right"
  targetSelector=".target-position-right"
  placement="right"
>
  Position right
</Tooltip>
```

```tsx
<Button className="target-position-right-long-text">
  Position right
</Button>
<Tooltip
  id="unique-position-right-long-text"
  targetSelector=".target-position-right-long-text"
  placement="right"
>
  {longText}
</Tooltip>
```

```tsx
<Button className="target-align-left">Align left</Button>
<Tooltip
  id="unique-align-left"
  targetSelector=".target-align-left"
  align="left"
>
  Align left
</Tooltip>
```

```tsx
<Button className="target-align-left-long-text">Align left</Button>
<Tooltip
  id="unique-align-left-long-text"
  targetSelector=".target-align-left-long-text"
  align="left"
>
  {longText}
</Tooltip>
```

```tsx
<Button className="target-align-right">Align right</Button>
<Tooltip
  id="unique-align-right"
  targetSelector=".target-align-right"
  align="right"
>
  Align right
</Tooltip>
```

```tsx
<Button className="target-align-right-long-text">Align right</Button>
<Tooltip
  id="unique-align-right-long-text"
  targetSelector=".target-align-right-long-text"
  align="right"
>
  {longText}
</Tooltip>
```

```tsx
<Button className="target-align-arrow-left">
  Align left & arrow left
</Button>
<Tooltip
  id="unique-align-arrow-left"
  targetSelector=".target-align-arrow-left"
  align="left"
  arrow="left"
>
  Align left & arrow left
</Tooltip>
```

```tsx
<Button className="target-align-arrow-left-long-text">
  Align left & arrow left
</Button>
<Tooltip
  id="unique-align-arrow-left-long-text"
  targetSelector=".target-align-arrow-left-long-text"
  align="left"
  arrow="left"
>
  {longText}
</Tooltip>
```

```tsx
<Button className="target-align-arrow-right">
  Align right & arrow right
</Button>
<Tooltip
  id="unique-align-arrow-right"
  targetSelector=".target-align-arrow-right"
  align="right"
  arrow="right"
>
  Align right & arrow right
</Tooltip>
```

```tsx
<Button className="target-align-arrow-right-long-text">
  Align right & arrow right
</Button>
<Tooltip
  id="unique-align-arrow-right-long-text"
  targetSelector=".target-align-arrow-right-long-text"
  align="right"
  arrow="right"
>
  {longText}
</Tooltip>
```

```tsx
<Button className="target-align-left-arrow-right">
  Align left & arrow right
</Button>
<Tooltip
  id="unique-align-left-arrow-right"
  targetSelector=".target-align-left-arrow-right"
  align="left"
  arrow="right"
>
  Align left & arrow right
</Tooltip>
```

```tsx
<Button className="target-align-left-arrow-right-long-text">
  Align left & arrow right
</Button>
<Tooltip
  id="unique-align-left-arrow-right-long-text"
  targetSelector=".target-align-left-arrow-right-long-text"
  align="left"
  arrow="right"
>
  {longText}
</Tooltip>
```

```tsx
<Button className="target-align-right-arrow-left">
  Align right & arrow left
</Button>
<Tooltip
  id="unique-align-right-arrow-left"
  targetSelector=".target-align-right-arrow-left"
  align="right"
  arrow="left"
>
  Align right & arrow left
</Tooltip>
```

```tsx
<Button className="target-align-right-arrow-left-long-text">
  Align right & arrow left
</Button>
<Tooltip
  id="unique-align-right-arrow-left-long-text"
  targetSelector=".target-align-right-arrow-left-long-text"
  align="right"
  arrow="left"
>
  {longText}
</Tooltip>
```

```tsx
<Button className="target-arrow-left">Arrow left</Button>
<Tooltip
  id="unique-arrow-left"
  targetSelector=".target-arrow-left"
  arrow="left"
>
  Arrow left
</Tooltip>
```

```tsx
<Button className="target-arrow-left-long-text">Arrow left</Button>
<Tooltip
  id="unique-arrow-left-long-text"
  targetSelector=".target-arrow-left-long-text"
  arrow="left"
>
  {longText}
</Tooltip>
```

```tsx
<Button className="target-arrow-right">Arrow right</Button>
<Tooltip
  id="unique-arrow-right"
  targetSelector=".target-arrow-right"
  arrow="right"
>
  Arrow right
</Tooltip>
```

```tsx
<Button className="target-arrow-right-long-text">Arrow right</Button>
<Tooltip
  id="unique-arrow-right-long-text"
  targetSelector=".target-arrow-right-long-text"
  arrow="right"
>
  {longText}
</Tooltip>
```

```tsx
<Button className="target-position-left">Position left</Button>
<Tooltip
  id="unique-position-left"
  targetSelector=".target-position-left"
  placement="left"
>
  Position left
</Tooltip>
```

```tsx
<Button className="target-position-left-long-text">Position left</Button>
<Tooltip
  id="unique-position-left-long-text"
  targetSelector=".target-position-left-long-text"
  placement="left"
>
  {longText}
</Tooltip>
```

```tsx
<Button className="target-position-bottom">Position bottom</Button>
<Tooltip
  id="unique-position-bottom"
  targetSelector=".target-position-bottom"
  placement="bottom"
>
  Position bottom
</Tooltip>
```

```tsx
<Button className="target-position-bottom-long-text">
  Position bottom
</Button>
<Tooltip
  id="unique-position-bottom-long-text"
  targetSelector=".target-position-bottom-long-text"
  placement="bottom"
>
  {longText}
</Tooltip>
```

## Properties

```json
{
  "props": {
    "children": {
      "doc": "Provide a string or a React Element to be shown as the tooltip content.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "open": {
      "doc": "Controls visibility. When provided as a boolean, Tooltip is controlled and ignores DOM events (hover/focus/touch). `true` keeps it visible; `false` keeps it hidden. When not provided (undefined), the Tooltip uses default hover/focus behavior.",
      "type": "boolean",
      "status": "optional"
    },
    "placement": {
      "doc": "Defines the offset position to the target element the arrow appears. Can be `top`, `right`, `left` and `bottom`. Defaults to `top`.",
      "type": ["\"top\"", "\"right\"", "\"left\"", "\"bottom\""],
      "status": "optional"
    },
    "align": {
      "doc": "Defines the offset alignment to the target element the arrow appears. Can be `left`, `center` and `right`. Defaults to `center`.",
      "type": ["\"left\"", "\"center\"", "\"right\"", "null"],
      "status": "optional"
    },
    "arrow": {
      "doc": "Defines the direction where the arrow appears. Can be `center`, `top`, `right`, `bottom` and `left`. Defaults to `center`.",
      "type": [
        "\"center\"",
        "\"top\"",
        "\"right\"",
        "\"bottom\"",
        "\"left\""
      ],
      "status": "optional"
    },
    "portalRootClass": {
      "doc": "CSS class name applied to the portal root element. Used to style or identify the portal container.",
      "type": "string",
      "status": "optional"
    },
    "skipPortal": {
      "doc": "Skip rendering the tooltip in a React Portal. When `true`, the tooltip renders inline in the DOM tree instead of being portaled to document.body. Useful for cases where you need the tooltip to be part of the same DOM hierarchy for styling or event handling. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "keepInDOM": {
      "doc": "Keep the tooltip portal mounted in the DOM even when closed. When `true`, the tooltip remains in the DOM when inactive. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "omitDescribedBy": {
      "doc": "Set to `true` to omit the `aria-describedby` attribute on the target element. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "showDelay": {
      "doc": "Define the delay (in milliseconds) until the tooltip should show up after the initial hover / active state. Defaults to `300`.",
      "type": "number",
      "status": "optional"
    },
    "hideDelay": {
      "doc": "Define the delay (in milliseconds) until the tooltip should disappear after initial visibility. Defaults to `500`.",
      "type": "number",
      "status": "optional"
    },
    "size": {
      "doc": "Defines the spacing size of the tooltip. Can be `large` or `default`. Defaults to `default`.",
      "type": ["\"default\"", "\"large\""],
      "status": "optional"
    },
    "targetElement": {
      "doc": "Provide an element directly as a `React.ReactNode` or a `React.Ref` that will be wrapped and rendered.",
      "type": ["React.ReactNode", "React.RefObject"],
      "status": "optional"
    },
    "targetSelector": {
      "doc": "Specify a vanilla HTML selector by a string as the target element.",
      "type": "string",
      "status": "optional"
    },
    "triggerOffset": {
      "doc": "Adjust the pixel gap between the tooltip content and its trigger. Use positive values to place the tooltip further away (e.g., to match custom spacing). Defaults to `16`.",
      "type": "number",
      "status": "optional"
    },
    "noAnimation": {
      "doc": "Set to `true` if no fade-in animation should be used.",
      "type": "boolean",
      "status": "optional"
    },
    "fixedPosition": {
      "doc": "If set to `true`, the Tooltip will be fixed in its scroll position by using CSS `position: fixed;`. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```
