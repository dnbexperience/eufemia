---
title: 'Value.PostalCodeAndCity'
description: '`Value.PostalCodeAndCity` is a wrapper component for displaying string values, with user experience tailored for Norwegian postal code and city values.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.142Z
checksum: db7961bd44ab12a64bab31243b3343951db454ed0712fe7eecda3297bc12ae76
---

# Value.PostalCodeAndCity

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.PostalCodeAndCity />)
```

## Description

`Value.PostalCodeAndCity` is a wrapper component for displaying string values, with user experience tailored for Norwegian postal code and city values.

There is a corresponding [Field.PostalCodeAndCity](/uilib/extensions/forms/feature-fields/PostalCodeAndCity) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.PostalCodeAndCity />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/PostalCodeAndCity)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/PostalCodeAndCity)

## Demos

### Empty

```tsx
render(<Value.PostalCodeAndCity showEmpty />)
```

### Placeholder

```tsx
render(
  <Value.PostalCodeAndCity placeholder="The value was not filled in" />
)
```

### Value

```tsx
render(<Value.PostalCodeAndCity value="0010 Oslo" />)
```

### Label

```tsx
render(<Value.PostalCodeAndCity label="Label text" showEmpty />)
```

### Label and value

```tsx
render(<Value.PostalCodeAndCity label="Label text" value="0010 Oslo" />)
```

### Label and value from the DataContext

```tsx
render(
  <Form.Handler
    data={{
      myPostalCode: '0010',
      myCity: 'Oslo',
    }}
  >
    <Value.PostalCodeAndCity
      postalCode={{
        path: '/myPostalCode',
      }}
      city={{
        path: '/myCity',
      }}
    />
  </Form.Handler>
)
```

### Inline

```tsx
render(
  <P>
    This is before the component{' '}
    <Value.PostalCodeAndCity value="0010 Oslo" inline /> This is after the
    component
  </P>
)
```

## Value-specific properties

```json
{
  "postalCode": {
    "doc": "Properties such as `value` and `path` for the [Value.String](/uilib/extensions/forms/Value/String) component for postal code.",
    "type": "object",
    "status": "optional"
  },
  "city": {
    "doc": "Properties such as `value` and `path` for the [Value.String](/uilib/extensions/forms/Value/String) component for city.",
    "type": "object",
    "status": "optional"
  }
}
```

## Properties

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
    "PostalCodeAndCity.invalidCode": {
      "nb-NO": "Ugyldig postnummer.",
      "en-GB": "Invalid postal code.",
      "sv-SE": "Ogiltigt postnummer.",
      "da-DK": "Ugyldigt postnummer."
    },
    "PostalCodeAndCity.label": {
      "nb-NO": "Postnummer og sted",
      "en-GB": "Postcode and city",
      "sv-SE": "Postnummer och ort",
      "da-DK": "Postnummer og by"
    }
  }
}
```
