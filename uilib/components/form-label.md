---
title: 'FormLabel'
description: 'The FormLabel component represents a caption for all sorts of HTML elements in a user interface.'
version: 11.0.0
generatedAt: 2026-04-21T13:54:09.038Z
checksum: a3e2d63a21c9bff5a2c312d26f4d4ee69485b847669f8c9599a421d01406725f
---

# FormLabel

## Import

```tsx
import { FormLabel } from '@dnb/eufemia'
```

## Description

The FormLabel component represents a caption for all sorts of HTML elements in a user interface. By default, the label is displayed vertically (above the element). Use `vertical={false}` or `labelDirection="horizontal"` for inline labels.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=44978-544)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/form-label)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/form-label)

### Colon character

DNB UX has chosen to not use colon on the end of form element labels. For consistency throughout our websites, please avoid using them.

## Demos

### Default form-label

```tsx
<FormLabel forId="alone-1">Default vertical FormLabel</FormLabel>
<Checkbox id="alone-1" label="Checkbox" />
```

### Horizontal form-label

```tsx
<FormLabel forId="alone-2" vertical={false}>
  Horizontal FormLabel
</FormLabel>
<Checkbox id="alone-2" label="Checkbox" />
```

### Form-label without a `forId`

```tsx
<FormLabel>Without forId (select me)</FormLabel>
<Checkbox label="Checkbox" />
```

### Linked label (pattern)

```tsx
render(
  <form>
    <div>
      <div>
        <FormLabel forId="switch-1" text="Form Label (click me):" />
      </div>
      <div>
        <Switch id="switch-1" value="Value of switch" />
      </div>
    </div>
  </form>
)
```

## Properties

```json
{
  "props": {
    "forId": {
      "doc": "The same unique `id` like the linked HTML element has.",
      "type": "string",
      "status": "optional"
    },
    "text": {
      "doc": "The `text` of the label. You can use `children` as well.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "srOnly": {
      "doc": "When `true`, the label will be invisible and only accessible for screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "vertical": {
      "doc": "Defaults to `true`. If set to `false`, the label will be displayed horizontally (inline).",
      "type": "boolean",
      "status": "optional"
    },
    "size": {
      "doc": "Define one of the following [heading sizes](/uilib/elements/heading/): `basis`, `medium` or `large`.",
      "type": ["\"basis\"", "\"medium\"", "\"large\""],
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "disabled": {
      "doc": "If set to `true`, the label will behave as not interactive.",
      "type": "boolean",
      "status": "optional"
    },
    "element": {
      "doc": "Defines the HTML element used. Defaults to `label`.",
      "type": "React.Element",
      "status": "optional"
    },
    "ref": {
      "doc": "Attach a `React.Ref` to the inner label `element`.",
      "type": "React.Ref",
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
