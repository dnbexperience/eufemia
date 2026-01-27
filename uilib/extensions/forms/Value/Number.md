---
title: 'Value.Number'
description: '`Value.Number` is a base component for displaying values of the type `number`.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.141Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Value.Number

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Number />)
```

## Description

`Value.Number` is a base component for displaying values of the type `number`.

Before using this component, ensure there is not a more specific [value component](/uilib/extensions/forms/Value/components/) available that better suits your needs.

There is a corresponding [Field.Number](/uilib/extensions/forms/base-fields/Number) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Number />)
```

It inherits all the properties from the [NumberFormat](/uilib/components/number-format/) component. All snake_case properties are converted to camelCase.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/Number)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/Number)

## Demos

### Label and value

```tsx
render(<Value.Number label="Label text" value={12345678} />)
```

### Value from path

```tsx
render(
  <Form.Handler
    data={{
      myNumber: 12345678,
    }}
  >
    <Value.Number
      label="Label text"
      currency
      currencyDisplay="code"
      currencyPosition="before"
      path="/myNumber"
    />
  </Form.Handler>
)
```

### Label only

```tsx
render(<Value.Number label="Label text" showEmpty />)
```

### Placeholder

```tsx
render(<Value.Number placeholder="The number was not filled in" />)
```

### Inline

```tsx
render(
  <P>
    This is before the component <Value.Number value={123} inline /> This
    is after the component
  </P>
)
```

## Properties

### Value-specific properties

<PropertiesTable props={NumberProperties} />

### General properties

```json
{
  "props": {
    "value": {
      "doc": "Value for the value component. Will take precedence over the path value given in the data context.",
      "type": "number",
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Default value for the value component. Will not take precedence over the path value given in the data context.",
      "type": "number",
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
  },
  "valueType": "number",
  "omit": ["value", "[Space](/uilib/layout/space/properties)"]
}
```
