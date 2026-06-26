---
title: 'Lead'
description: 'A lead paragraph is the opening paragraph of an article, etc.'
version: 11.8.0
generatedAt: 2026-06-26T12:38:09.882Z
checksum: 4774a0918e79dc38bc1ffed225923a088efeec3346db6b43950bdf06c2a7748b
---

# Lead

## Import

```tsx
import { Lead } from '@dnb/eufemia/elements'
```

## Description

A lead paragraph is the opening paragraph of an article, such as a blog post or news story.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/elements/Lead.ts)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/elements/lead)

## Paragraph class modifiers

Eufemia comes with [several styles](/uilib/elements/paragraph/#paragraphs-modifiers) you can use on paragraphs and other HTML text elements, where `.dnb-p--lead` is one of them.


## Demos


```tsx
render(<div>
        <Lead>Default lead</Lead>
        <Lead>
          Lead with <Anchor href="/">Anchor / Text Link</Anchor> looks
          great!
        </Lead>
      </div>)
```

## Properties


```json
{
  "props": {
    "element": {
      "doc": "Defines the Element Type, like `p`.",
      "type": [
        "HTMLElement",
        "string"
      ],
      "status": "optional"
    },
    "size": {
      "doc": "Sets the font size, also sets the line-height if `lineHeight` property is not set.",
      "type": [
        "\"x-small\"",
        "\"small\"",
        "\"basis\"",
        "\"medium\"",
        "\"large\"",
        "\"x-large\"",
        "\"xx-large\""
      ],
      "status": "optional"
    },
    "lineHeight": {
      "doc": "Sets the line height, will use same value as `size` if not set.",
      "type": [
        "\"x-small\"",
        "\"small\"",
        "\"basis\"",
        "\"medium\"",
        "\"large\"",
        "\"x-large\"",
        "\"xx-large\""
      ],
      "status": "optional"
    },
    "align": {
      "doc": "Sets the text alignment.",
      "type": [
        "\"center\"",
        "\"left\"",
        "\"right\""
      ],
      "status": "optional"
    },
    "family": {
      "doc": "Sets the font family.",
      "type": [
        "\"basis\"",
        "\"heading\"",
        "\"monospace\""
      ],
      "status": "optional"
    },
    "weight": {
      "doc": "Sets the font weight.",
      "type": [
        "\"regular\"",
        "\"medium\""
      ],
      "status": "optional"
    },
    "decoration": {
      "doc": "Sets the font decoration.",
      "type": "\"underline\"",
      "status": "optional"
    },
    "slant": {
      "doc": "Sets the font style.",
      "type": "\"italic\"",
      "status": "optional"
    },
    "proseMaxWidth": {
      "doc": "Sets the maximum width based on character count for all Typography children. This will limit the text width to approximately the specified number of characters. Use `true` for a default value of 60ch.",
      "type": [
        "number",
        "boolean"
      ],
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
