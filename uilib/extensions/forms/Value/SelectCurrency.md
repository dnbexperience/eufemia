---
title: 'Value.SelectCurrency'
description: '`Value.SelectCurrency` will render the selected currency.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.166Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Value.SelectCurrency

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.SelectCurrency />)
```

## Description

`Value.SelectCurrency` will render the selected currency display name by the `value`'s ISO code ([ISO 4217 code](https://en.wikipedia.org/wiki/ISO_4217)). It displays the currency name in the current locale, together with the currency ISO code, like `Norwegian krone (NOK)`. If the value provided is not a valid/supported ISO code, it displays the value.

There is a corresponding [Field.SelectCurrency](/uilib/extensions/forms/feature-fields/SelectCurrency) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.SelectCurrency path="/currency" />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/SelectCurrency)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/SelectCurrency)

### The `useCurrency` hook

You can use the `Value.SelectCurrency.useCurrency` hook to get the currency display name by ISO code ([ISO 4217 code](https://en.wikipedia.org/wiki/ISO_4217)). It returns the currency name in the current locale, together with the currency ISO code, like `Norwegian krone (NOK)`.

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'

const MyComponent = () => {
  const { getCurrencyDisplayNameByIso } =
    Value.SelectCurrency.useCurrency('NOK')
}
```

## Demos

### Interactive

```tsx
render(
  <Form.Handler
    data={{
      myCurrency: 'NOK',
    }}
  >
    <Flex.Stack>
      <Field.SelectCurrency path="/myCurrency" />
      <Value.SelectCurrency path="/myCurrency" />
    </Flex.Stack>
  </Form.Handler>
)
```

### Placeholder

```tsx
render(<Value.SelectCurrency placeholder="No value given" />)
```

### Value

```tsx
render(<Value.SelectCurrency value="NOK" />)
```

### Use different locale

```tsx
render(
  <Form.Handler
    locale="en-GB"
    data={{
      myCurrency: 'CHF',
    }}
  >
    <Value.SelectCurrency path="/myCurrency" />
  </Form.Handler>
)
```

### Label

```tsx
render(<Value.SelectCurrency label="Label text" showEmpty />)
```

### Label and value

```tsx
render(<Value.SelectCurrency label="Label text" value="NOK" />)
```

### Inline

```tsx
render(
  <P>
    This is before the component{' '}
    <Value.SelectCurrency value="NOK" inline /> This is after the component
  </P>
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
    "Field.errorPattern": {
      "nb-NO": "Verdien er ugyldig.",
      "en-GB": "The value is invalid.",
      "sv-SE": "Värdet är ogiltigt.",
      "da-DK": "Ugyldig værdi."
    },
    "Field.errorRequired": {
      "nb-NO": "Dette feltet må fylles ut.",
      "en-GB": "This field is required.",
      "sv-SE": "Detta fält måste fyllas i.",
      "da-DK": "Dette felt skal udfyldes."
    },
    "Field.errorSummary": {
      "nb-NO": "Feil som må rettes:",
      "en-GB": "Please correct the following errors:",
      "sv-SE": "Fel som måste åtgärdas:",
      "da-DK": "Felter der skal rettes:"
    },
    "Field.errorSummaryTitle": {
      "nb-NO": "Feil som må rettes",
      "en-GB": "Please correct the following errors",
      "sv-SE": "Fel som måste åtgärdas",
      "da-DK": "Felter der skal rettes"
    },
    "Field.optionalLabelSuffix": {
      "nb-NO": "(valgfritt)",
      "en-GB": "(optional)",
      "sv-SE": "(valfritt)",
      "da-DK": "(valgfrit)"
    },
    "Field.stateSummary": {
      "nb-NO": "Oppsummering:",
      "en-GB": "Summary:",
      "sv-SE": "Sammanfattning:",
      "da-DK": "Oversigt:"
    },
    "SelectCurrency.errorRequired": {
      "nb-NO": "Du må velge en valuta fra listen.",
      "en-GB": "You must select a currency from the list.",
      "sv-SE": "Du måste välja en valuta från listan.",
      "da-DK": "Du skal vælge en valuta fra listen."
    },
    "SelectCurrency.label": {
      "nb-NO": "Valuta",
      "en-GB": "Currency",
      "sv-SE": "Valuta",
      "da-DK": "Valuta"
    },
    "SelectCurrency.placeholder": {
      "nb-NO": "Velg en valuta",
      "en-GB": "Select currency",
      "sv-SE": "Välj en valuta",
      "da-DK": "Vælg en valuta"
    }
  }
}
```
