---
title: 'Ingress'
description: 'Ingress is a brief, introductory paragraph that follows immediately after the title of an article.'
version: 11.2.1
generatedAt: 2026-05-08T08:59:10.967Z
checksum: 845c380cad6e85ab625f75477db6dbace5110a754208c56db0e04a179d35b607
---

# Ingress

## Import

```tsx
import { Ingress } from '@dnb/eufemia/elements'
```

## Description

An ingress is a brief, introductory paragraph that follows immediately after the title of an article.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/elements/Ingress.ts)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/elements/ingress)


## Demos


```tsx
render(<div>
        <Ingress>Default ingress</Ingress>
        <Ingress>
          Ingress with <Anchor href="/">Anchor / Text Link</Anchor> looks
          great!
        </Ingress>
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
      "doc": "Sets the maximum width based on character count. This will limit the text width to approximately the specified number of characters. Use `true` for a default value of 60ch.",
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
