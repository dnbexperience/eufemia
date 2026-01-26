---
title: 'Horizontal Rule'
description: 'The `<hr />` tag in HTML stands for horizontal rule and is used to insert a horizontal rule or a thematic break in an HTML page to divide or separate document sections.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.617Z
checksum: 5fd9fdfe6031fc1b45bdcca23d523d244f08aafdbae5b1435dc866e3b0bf7164
---

# Horizontal Rule

## Import

```tsx
import { Hr } from '@dnb/eufemia/elements'
```

## Description

The `<hr />` tag in HTML stands for horizontal rule and is used to insert a horizontal rule or a thematic break in an HTML page to divide or separate document sections. The `<hr />` tag is an empty tag and it does not require an end tag.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=12381-1523)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/elements/hr)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/elements/horizontal-rule)

## Customize hr color

```css
/* Example of how to change the line color */
.dnb-hr {
  --hr-color: var(--color-ocean-green);
}
```

## Horizontal Rule thickness tests

Browsers render borders differently. They also handle sizing differently. For example, `1.5px` will be rounded up to `2px` in Chromium-based browsers (on size-related CSS properties).

In order to address different solutions, [here is a test case](https://r8ljo.csb.app/) finding the right balance of creating `0.5px` / `1.5px` lines, browser compatibility, and correct look. As of 2020, Firefox does the best job of showing the line thickness correctly.

## Demos

### Horizontal Rule default

```tsx
Something
<Hr
  space={{
    top: '0.5rem',
    bottom: '0.5rem',
  }}
/>
Something
```

### Horizontal Rule dashed

```tsx
Something
<Hr
  dashed
  space={{
    top: '0.5rem',
    bottom: '0.5rem',
  }}
/>
Something
```

### Horizontal Rule in fullscreen

```tsx
Something
<Hr
  breakout
  space={{
    top: '0.5rem',
    bottom: '0.5rem',
  }}
/>
Something
```

## Properties

```json
{
  "breakout": {
    "doc": "To make the hr full width.",
    "type": "boolean",
    "status": "optional"
  },
  "dashed": {
    "doc": "To make the hr dashed.",
    "type": "boolean",
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```
