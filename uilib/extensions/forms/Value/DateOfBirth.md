---
title: 'Value.DateOfBirth'
description: '`Value.DateOfBirth` is a wrapper component for displaying string values, with user experience tailored for date of birth values.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.126Z
checksum: 5bae6a0512b60fd0f2268face3cdc590307333de1e3d4bccf2cf560a395f3d74
---

# Value.DateOfBirth

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.DateOfBirth />)
```

## Description

`Value.DateOfBirth` is a wrapper component for displaying string values, with user experience tailored for date of birth values.

There is a corresponding [Field.DateOfBirth](/uilib/extensions/forms/feature-fields/DateOfBirth) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.DateOfBirth />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/DateOfBirth)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/DateOfBirth)

## Demos

<ChangeLocale
  bottom
  label="Locale used in the demos:"
  listUSLocale={true}
/>

### Empty

```tsx
render(<Value.DateOfBirth showEmpty />)
```

### Placeholder

```tsx
render(<Value.DateOfBirth placeholder="The value was not filled in" />)
```

### Value

```tsx
render(<Value.DateOfBirth value="2023-01-16" />)
```

### Label

```tsx
render(<Value.DateOfBirth label="Label text" showEmpty />)
```

### Label and value

```tsx
render(<Value.DateOfBirth label="Label text" value="2023-01-16" />)
```

### Inline

```tsx
render(
  <P>
    This is before the component{' '}
    <Value.DateOfBirth value="2023-01-16" inline /> This is after the
    component
  </P>
)
```

## Properties

### DateOfBirth-specific properties

```json
{
  "dateFormat": {
    "doc": "Defines the date format for handling the internal date value. The default value is `yyyy-MM-dd`.",
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

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "DateOfBirth.label": {
      "nb-NO": "Fødselsdato",
      "en-GB": "Date of birth",
      "sv-SE": "Födelsedatum",
      "da-DK": "Fødselsdato"
    }
  }
}
```
