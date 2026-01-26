---
title: 'Value.Name'
description: '`Value.Name` is a wrapper component for displaying string values, with user experience tailored for personal, like first and last name and company names.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.129Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Value.Name

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Name />)
render(<Value.Name.First />)
render(<Value.Name.Last />)
render(<Value.Name.Company />)
```

## Description

`Value.Name` is a wrapper component for displaying string values, with user experience tailored for personal, like first and last name and company names.

There is a corresponding [Field.Name](/uilib/extensions/forms/feature-fields/Name) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Value.SummaryList>
      <Value.Name />
      <Value.Name.First value="Nora" />
      <Value.Name.Last value="Mørk" />
      <Value.Name.Company value="DNB" />
    </Value.SummaryList>
  )
}
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/Name)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/Name)

## Demos

### First name

<Examples.FirstName value="Nora" />

### Last name

<Examples.LastName value="Mørk" />

### Company name

<Examples.CompanyName value="DNB" />

### Placeholder

```tsx
render(<Value.Name.Last placeholder="Custom placeholder" />)
```

### Value composition

```tsx
render(
  <Value.Composition>
    <Value.Name.First value="Nora" />
    <Value.Name.Last value="Mørk" />
  </Value.Composition>
)
```

### Inline

```tsx
render(
  <Form.Handler
    defaultData={{
      firstName: 'Nora',
      lastName: 'Mørk',
    }}
  >
    <P>
      This is before the component{' '}
      <Value.Name.First path="/firstName" inline />{' '}
      <Value.Name.Last path="/lastName" inline /> This is after the
      component
    </P>
  </Form.Handler>
)
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
    "CompanyName.label": {
      "nb-NO": "Firmanavn",
      "en-GB": "Company name",
      "sv-SE": "Företagsnamn",
      "da-DK": "Firmanavn"
    },
    "FirstName.label": {
      "nb-NO": "Fornavn",
      "en-GB": "Given name",
      "sv-SE": "Förnamn",
      "da-DK": "Fornavn"
    },
    "LastName.label": {
      "nb-NO": "Etternavn",
      "en-GB": "Surname",
      "sv-SE": "Efternamn",
      "da-DK": "Efternavn"
    }
  }
}
```
