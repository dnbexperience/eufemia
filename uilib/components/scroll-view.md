---
title: 'ScrollView'
description: 'Use ScrollView when content needs its own horizontal or vertical scrolling area.'
version: 11.10.1
generatedAt: 2026-08-17T08:59:38.594Z
checksum: 07e411cdd62dc6b941360d253d1e5f8021b471c8653325ebe6b83b998e61929c
---

# ScrollView

## Import

```tsx
import { ScrollView } from '@dnb/eufemia'
```

The previous fragment import remains available for backwards compatibility, but is deprecated and will be removed in v13:

```tsx
// Deprecated
import { ScrollView } from '@dnb/eufemia/fragments'
```

## Description

`ScrollView` creates a general-purpose horizontal or vertical scrolling area. It renders a `div`, supports native `div` attributes and [spacing properties](/uilib/layout/space/properties), and integrates with Eufemia components that need to identify their nearest scrolling container.

Use it when content must scroll independently from the page, for example when a region has a constrained width or height. Set the constraint through `style`, `className`, or a surrounding layout.

For component-specific behavior, prefer the specialized variants:

- Use [`Table.ScrollView`](/uilib/components/table/) around tables.
- Use [`List.ScrollView`](/uilib/components/list/) around lists, including when using `maxVisibleListItems`.

`Dialog` and `Drawer` already use `ScrollView` internally, so they normally do not need another one around their content.


```tsx
render(<ScrollView>scrollable content</ScrollView>)
```


## Accessibility

A scrollable region must be reachable by keyboard when it contains no other focusable elements. Use `interactive="auto"` to add it to the tab order only while it overflows. Use `interactive={true}` when it must always be keyboard-focusable.

When the region needs an accessible name, provide `aria-label` or `aria-labelledby`. Avoid unnecessary nested scrolling areas because they can make keyboard and touch navigation difficult.

## Scrollbar gutter

Use `scrollbarGutter="stable"` to reserve space for the scrollbar, preventing horizontal layout shifts when content dynamically changes between overflowing and non-overflowing states.

This maps to `scrollbar-gutter: stable`. It has no visible effect on systems using overlay scrollbars, such as the default configuration on macOS and iOS. `Dialog` and `Drawer` enable it automatically by default.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/scroll-view)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/scroll-view)


## Related components

ScrollView is part of the [Other](/uilib/components/overview/#other) category. Other components for similar needs:

- [CopyOnClick](/uilib/components/copy-on-click/) – when people should copy text by clicking it.
- [HeightAnimation](/uilib/components/height-animation/) – to animate content as it opens or closes.
- [PortalRoot](/uilib/components/portal-root/) – to render floating content outside the normal page structure.


## Demos

### Keyboard-accessible overflow

Use `interactive="auto"` to make the region keyboard-focusable only when its content overflows. The example constrains its height to create vertical overflow.


```tsx
render(<ScrollView interactive="auto" aria-label="Scrollable color example" style={{
  maxHeight: '10rem'
}}>
      <div style={{
    minHeight: 800,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    background: 'linear-gradient(rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%) 0 0/100% 200%'
  }}>
        large content
      </div>
    </ScrollView>)
```

## Properties


```json
{
  "props": {
    "interactive": {
      "doc": "To make the content accessible for keyboard navigation. Use `true` or `auto`. Auto will detect if a scrollbar is visible and make the ScrollView accessible for keyboard navigation. Defaults to `false`.",
      "type": [
        "boolean",
        "\"auto\""
      ],
      "status": "optional"
    },
    "scrollbarGutter": {
      "doc": "Reserves space for the scrollbar gutter, preventing layout shifts when content overflows. Maps to the CSS `scrollbar-gutter` property. Defaults to `undefined`.",
      "type": "\"stable\"",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```
