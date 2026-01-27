---
title: 'Tooltip'
description: 'The Tooltip component is primarily meant to enhance the UX for various and additional information.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.020Z
checksum: d7368284604259dbc1ca9c882698149730cdd6ce65244dfba59efc96890b5fa3
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

## Controlled active

When you pass the `active` property, the Tooltip becomes controlled:

- `active={true}`: The Tooltip stays visible and ignores DOM events (hover, focus, touch). It will not auto-hide on `mouseleave`.
- `active={false}`: The Tooltip stays hidden and ignores DOM events. It will not auto-show on `mouseenter` or focus.

To use the built-in hover/focus/touch behavior, omit the `active` property and let the component manage visibility internally.

## Demos

### Button with hover Tooltip

```tsx
render(<Button tooltip="Button tooltip" text="Hover" />)
```

### Button with active Tooltip

<VisibleWhenNotVisualTest>
  
```tsx
render(
  <Button
    tooltip={<Tooltip active>Basic Tooltip</Tooltip>}
    text="Active"
  />
)
```

</VisibleWhenNotVisualTest>

### NumberFormat with a tooltip

```tsx
render(<NumberFormat tooltip="Tooltip">1234</NumberFormat>)
```

... or wrapped around the [NumberFormat](/uilib/components/number-format) component:

```tsx
render(
  <Tooltip targetElement={<NumberFormat>1234</NumberFormat>}>
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
<Tooltip position="bottom" targetElement={<Span>Bottom</Span>}>
  Tooltip 2
</Tooltip>
```

### Tooltip linked to a vanilla button

<VisibleWhenNotVisualTest>
  
```tsx
<button className="target-1">Show the Tooltip</button>
<Tooltip id="unique" active targetSelector=".target-1">
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
  position="right"
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
  position="right"
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
  position="left"
>
  Position left
</Tooltip>
```

```tsx
<Button className="target-position-left-long-text">Position left</Button>
<Tooltip
  id="unique-position-left-long-text"
  targetSelector=".target-position-left-long-text"
  position="left"
>
  {longText}
</Tooltip>
```

```tsx
<Button className="target-position-bottom">Position bottom</Button>
<Tooltip
  id="unique-position-bottom"
  targetSelector=".target-position-bottom"
  position="bottom"
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
  position="bottom"
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
      "type": "React.Node",
      "status": "optional"
    },
    "active": {
      "doc": "Controls visibility. When provided, Tooltip is controlled and ignores DOM events (hover/focus/touch). `true` keeps it visible; `false` keeps it hidden.",
      "type": "boolean",
      "status": "optional"
    },
    "position": {
      "doc": "Defines the offset position to the target element the arrow appears. Can be `top`, `right`, `left` and `bottom`. Defaults to `top`.",
      "type": ["top", "right", "left", "bottom"],
      "status": "optional"
    },
    "align": {
      "doc": "Defines the offset alignment to the target element the arrow appears. Can be `center`, `right` and `left`. Defaults to `center`.",
      "type": ["center", "right", "left"],
      "status": "optional"
    },
    "arrow": {
      "doc": "Defines the direction where the arrow appears. Can be `center`, `top`, `right`, `bottom` and `left`. Defaults to `center`.",
      "type": ["center", "top", "right", "bottom", "left"],
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
      "doc": "Define the delay until the tooltip should show up after the initial hover / active state.",
      "type": "boolean",
      "status": "optional"
    },
    "hideDelay": {
      "doc": "Define the delay until the tooltip should disappear up after initial visibility.",
      "type": "boolean",
      "status": "optional"
    },
    "size": {
      "doc": "Defines the spacing size of the tooltip. Can be `large` or `basis`. Defaults to `basis`.",
      "type": ["large", "basis"],
      "status": "optional"
    },
    "targetElement": {
      "doc": "Provide an element directly as a React Node or a React Ref that will be wrapped and rendered.",
      "type": ["React.Node", "React.RefObject"],
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
