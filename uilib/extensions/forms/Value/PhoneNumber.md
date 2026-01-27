---
title: 'Value.PhoneNumber'
description: '`Value.PhoneNumber` is a wrapper component for displaying string values, with user experience tailored for phone number values.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.143Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Value.PhoneNumber

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.PhoneNumber />)
```

## Description

`Value.PhoneNumber` is a wrapper component for displaying string values, with user experience tailored for phone number values.

There is a corresponding [Field.PhoneNumber](/uilib/extensions/forms/feature-fields/PhoneNumber) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.PhoneNumber />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/PhoneNumber)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/PhoneNumber)

## Demos

### Empty

```tsx
render(<Value.PhoneNumber showEmpty />)
```

### Placeholder

```tsx
render(<Value.PhoneNumber placeholder="The value was not filled in" />)
```

### Value

```tsx
render(<Value.PhoneNumber value="98712345" />)
```

### Label

```tsx
render(<Value.PhoneNumber label="Label text" showEmpty />)
```

### Label and value

```tsx
render(<Value.PhoneNumber label="Label text" value="98712345" />)
```

### Inline

```tsx
render(
  <P>
    This is before the component{' '}
    <Value.PhoneNumber value="98712345" inline /> This is after the
    component
  </P>
)
```

### International Suffix

```tsx
render(
  <Flex.Stack>
    <Value.PhoneNumber label="Label text" value="+47 98712345" />
    <Value.PhoneNumber label="Label text" value="+886 0998472751" />
    <Value.PhoneNumber label="Label text" value="+1-868 6758288" />
  </Flex.Stack>
)
```

## Properties

```json
{
  "props": {
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
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "PhoneNumber.label": {
      "nb-NO": "Mobilnummer",
      "en-GB": "Mobile number",
      "sv-SE": "Mobilnummer",
      "da-DK": "Mobilnummer"
    }
  }
}
```
