---
title: 'Field.Option'
description: '`Field.Option` is a pseudo-component for defining an option to be used in a dropdown or similar user experiences.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.264Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.Option

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Option />)
```

## Description

`Field.Option` is a pseudo-component that is used by parent components to configure options. It has no use on its own. How it renders, and what extra props it accepts, are defined by the parent.

### Used in:

- [Field.ArraySelection](/uilib/extensions/forms/base-fields/ArraySelection/)
- [Field.Selection](/uilib/extensions/forms/base-fields/Selection/)

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Option)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Option)

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(
  <Field.Selection>
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>
)
```

## Properties

There might be more props available depending on the parent component. For example, `<Field.Selection variant="button">` also allows the `icon` property, among others, for its options.

```json
{
  "value": {
    "doc": "Value for this option.",
    "type": ["string", "number"],
    "status": "optional"
  },
  "title": {
    "doc": "Title for the option. Overrides `children`.",
    "type": ["string", "React.Node"],
    "status": "optional"
  },
  "groupIndex": {
    "doc": "What group index in the `groups` prop ([Field.Selection](/uilib/extensions/forms/base-fields/Selection/)) this item belongs to.",
    "type": "number",
    "status": "optional"
  },
  "text": {
    "doc": "Secondary text.",
    "type": ["string", "React.Node"],
    "status": "optional"
  },
  "disabled": {
    "doc": "Will disable the option.",
    "type": "boolean",
    "status": "optional"
  },
  "help": {
    "doc": "Provide help content for the field using `title` and `content` as a string or React.Node. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
    "type": "object",
    "status": "optional"
  },
  "children": {
    "doc": "Optional way to provide `title`. Will be ignored if `title` is used.",
    "type": "React.Node",
    "status": "optional"
  }
}
```
