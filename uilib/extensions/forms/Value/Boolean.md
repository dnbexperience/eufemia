---
title: 'Value.Boolean'
description: '`Value.Boolean` is a base component for displaying values of the type `boolean`.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.079Z
checksum: ac4682e58e3c1cc2aa3bde60f5c4226fddcdd1b758b90754a7a9ae0a6bfe0f74
---

# Value.Boolean

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Boolean />)
```

## Description

`Value.Boolean` is a base component for displaying values of the type `boolean`.

Before using this component, ensure there is not a more specific [value component](/uilib/extensions/forms/Value/components/) available that better suits your needs.

There is a corresponding [Field.Boolean](/uilib/extensions/forms/base-fields/Boolean) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Boolean />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/Boolean)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/Boolean)

## Demos

### Empty

```tsx
render(<Value.Boolean showEmpty />)
```

### Placeholder

```tsx
render(<Value.Boolean placeholder="The value was not filled in" />)
```

### Value true

```tsx
render(<Value.Boolean value={true} />)
```

### Value false

```tsx
render(<Value.Boolean value={false} />)
```

### Label

```tsx
render(<Value.Boolean label="Label text" showEmpty />)
```

### Label and value

```tsx
render(<Value.Boolean label="Label text" value={false} />)
```

### Inline

```tsx
render(
  <P>
    <span
      style={{
        color: 'red',
      }}
    >
      This is before the component
    </span>{' '}
    <Value.Boolean value={true} inline />{' '}
    <span
      style={{
        color: 'red',
      }}
    >
      This is after the component
    </span>
  </P>
)
```

## Properties

### Value-specific properties

```json
{
  "trueText": {
    "doc": "The text to use when the value is true.",
    "type": "string",
    "status": "optional"
  },
  "falseText": {
    "doc": "The text to use when the value is false.",
    "type": "string",
    "status": "optional"
  }
}
```

### General properties

```json
{
  "value": {
    "doc": "Value for the value component. Will take precedence over the path value given in the data context.",
    "type": "{valueType}",
    "status": "optional"
  },
  "defaultValue": {
    "doc": "Default value for the value component. Will not take precedence over the path value given in the data context.",
    "type": "{valueType}",
    "status": "optional"
  },
  "label": {
    "doc": "Field label to show above the displayed value.",
    "type": "string",
    "status": "optional"
  },
  "labelSrOnly": {
    "doc": "Use `true` to make the label only readable by screen readers.",
    "type": "boolean",
    "status": "optional"
  },
  "help": {
    "doc": "Provide help content for the field using `title` and `content` as a string or React.Node. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
    "type": "object",
    "status": "optional"
  },
  "transformLabel": {
    "doc": "Transforms the label before it gets displayed. Receives the label as the first parameter. The second parameter is a object containing the `convertJsxToString` function.",
    "type": "function",
    "status": "optional"
  },
  "inheritLabel": {
    "doc": "Use `true` to inherit the label from a visible (rendered) field with the same path.",
    "type": "boolean",
    "status": "optional"
  },
  "inheritVisibility": {
    "doc": "Use `true` to inherit the visibility from a field with the same path. You can find more info in the [Value section](/uilib/extensions/forms/Value/#inherit-visibility-from-fields-based-on-path).",
    "type": "boolean",
    "status": "optional"
  },
  "showEmpty": {
    "doc": "Shows the value even if it is empty.",
    "type": "boolean",
    "status": "optional"
  },
  "placeholder": {
    "doc": "Text showing in place of the value if no value is given.",
    "type": "string",
    "status": "optional"
  },
  "path": {
    "doc": "JSON Pointer for where the data for this input is located in the source dataset.",
    "type": "string",
    "status": "optional"
  },
  "inline": {
    "doc": "For showing the value inline (not as a block element).",
    "type": "boolean",
    "status": "optional"
  },
  "maxWidth": {
    "doc": "Use `auto` for no max-width (use browser default), `small`, `medium` or `large` for predefined standard max widths. Defaults to `large`.",
    "type": "string",
    "status": "optional"
  },
  "transformIn": {
    "doc": "Transforms the `value` before its displayed in the value component.",
    "type": "function",
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```
