---
title: 'Scroll View'
description: 'ScrollView is a tiny helper component helping the user controlling overflowing content horizontally or vertically'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.739Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Scroll View

## Import

```tsx
import { ScrollView } from '@dnb/eufemia/fragments'
```

## Description

ScrollView is a tiny helper component helping the user control overflowing content horizontally or vertically.

It also is used in other floating components like [Dropdown](/uilib/components/dropdown) or [Drawer](/uilib/components/drawer).

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/fragments/scroll-view)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/fragments/scroll-view)

```tsx
render(<ScrollView>scrollable content</ScrollView>)
```

## Demos

### Keyboard support

When used for regular content, it should be possible for the user to user their keyboard to control the scroll position.

You can enable keyboard support with the `interactive` property.

```tsx
render(
  <ScrollView
    interactive={true}
    style={{
      maxHeight: '10rem',
    }}
  >
    <div
      style={{
        minHeight: 800,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        background:
          'linear-gradient(rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%) 0 0/100% 200%',
      }}
    >
      large content
    </div>
  </ScrollView>
)
```

## Properties

```json
{
  "props": {
    "interactive": {
      "doc": "To make the content accessible to keyboard navigation. Use `true` or `auto`. Auto will detect if a scrollbar is visible and make the ScrollView accessible for keyboard navigation. Defaults to `false`.",
      "type": ["boolean", "auto"],
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
