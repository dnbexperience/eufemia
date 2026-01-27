---
title: 'Blockquote'
description: 'The blockquote element is used to indicate the quotation of a large section of text from another source.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.040Z
checksum: e341aee176a995e059958ae251b9c652f485687ac5e5fac027d3525f26fe4459
---

# Blockquote

## Import

```tsx
import { Blockquote } from '@dnb/eufemia/elements'
```

## Description

The blockquote element is used to indicate the quotation of a large section of text from another source.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/elements/blockquote)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/elements/blockquote)

## Demos

### Default Blockquote

```tsx
render(
  <Blockquote data-visual-test="blockquote-default">
    Dis leo aliquam neque aptent nascetur metus ad ut eu Choro vivendum
    tractatos ei quo.
    <cite>Cite Reference</cite>
  </Blockquote>
)
```

### Blockquote with graphics on top

```tsx
render(
  <Blockquote data-visual-test="blockquote-top" direction="vertical">
    Dis leo aliquam neque aptent nascetur metus ad ut eu Choro{' '}
    <Anchor href="/uilib/elements#blockquote">vivendum tractatos</Anchor>{' '}
    ei quo.
  </Blockquote>
)
```

### Blockquote with transparent background (`no-background`)

```tsx
render(
  <Blockquote data-visual-test="blockquote-no-background" noBackground>
    Dis leo aliquam neque aptent nascetur metus ad ut eu Choro vivendum
    tractatos ei quo. Luctus cursus odio hendrerit ullamcorper adipiscing
    est dis curabitur sit.
    <cite>
      <Anchor href="/uilib/elements#blockquote" target="_blank">
        Cite Reference
      </Anchor>
    </cite>
  </Blockquote>
)
```

### Blockquote with transparent background and graphics on top

```tsx
render(
  <Blockquote
    data-visual-test="blockquote-top-no-background"
    noBackground
    direction="vertical"
  >
    Dis leo aliquam neque aptent nascetur metus ad ut eu Choro{' '}
    <Anchor href="/uilib/elements#blockquote">vivendum tractatos</Anchor>{' '}
    ei quo.
  </Blockquote>
)
```

### Blockquote with [Code](/uilib/elements/code/)

```tsx
render(
  <Blockquote data-visual-test="blockquote-with-code">
    <Code>display</Code> and <Code>background-color</Code> are CSS
    properties
  </Blockquote>
)
```

## Properties

```json
{
  "props": {
    "noBackground": {
      "doc": "Hides the blockquote background by making it transparent.",
      "type": "boolean",
      "status": "optional"
    },
    "direction": {
      "doc": "Determines the flow direction of the content inside of blockquote. Can be either `horizontal` or `vertical`. Defaults to `horizontal`.",
      "type": "string",
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
