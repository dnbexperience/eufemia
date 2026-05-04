---
title: 'Value.BankAccountNumber'
description: '`Value.BankAccountNumber` is a wrapper component for displaying string values, with user experience tailored for bank account number values.'
version: 11.1.0
generatedAt: 2026-05-04T18:06:22.123Z
checksum: ec13490d1c2f56c9d3d84678ebcd37a4304e0d258fafc5afec118ddeff725cff
---

# Value.BankAccountNumber

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.BankAccountNumber />)
```

## Description

`Value.BankAccountNumber` is a wrapper component for displaying string values, with user experience tailored for bank account number values.

Use the `bankAccountType` prop to format different account types: `norwegianBban` (default), `swedishBban`, `swedishBankgiro`, `swedishPlusgiro`, or `iban`.

There is a corresponding [Field.BankAccountNumber](/uilib/extensions/forms/feature-fields/BankAccountNumber) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/BankAccountNumber)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/BankAccountNumber)

## Demos

### Empty

```tsx
render(<Value.BankAccountNumber showEmpty />)
```

### Placeholder

```tsx
render(
  <Value.BankAccountNumber placeholder="The value was not filled in" />
)
```

### Value

```tsx
render(<Value.BankAccountNumber value="20001234567" />)
```

### Label

```tsx
render(<Value.BankAccountNumber label="Label text" showEmpty />)
```

### Label and value

```tsx
render(<Value.BankAccountNumber label="Label text" value="20001234567" />)
```

### Inline

```tsx
render(
  <P>
    This is before the component{' '}
    <Value.BankAccountNumber value="20001234567" inline /> This is after
    the component
  </P>
)
```

### Bank account types

Use the `bankAccountType` prop to switch between formats.

```tsx
<Value.BankAccountNumber
  bankAccountType="swedishBban"
  value="50001234567"
/>
<Value.BankAccountNumber
  bankAccountType="swedishBankgiro"
  value="59140129"
/>
<Value.BankAccountNumber
  bankAccountType="swedishPlusgiro"
  value="1263664"
/>
<Value.BankAccountNumber
  bankAccountType="iban"
  value="NO9386011117947"
/>
```

## Properties

### BankAccountNumber-specific properties

```json
{
  "props": {
    "bankAccountType": {
      "doc": "The type of bank account number, used for label and formatting. Can be `norwegianBban`, `swedishBban`, `swedishBankgiro`, `swedishPlusgiro`, or `iban`. Defaults to `norwegianBban`.",
      "type": "string",
      "status": "optional"
    }
  }
}
```

### General properties

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
      "doc": "Provide help content for the field using `title` and `content` as a string or `React.ReactNode`. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
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
      "type": ["\"auto\"", "\"small\"", "\"medium\"", "\"large\""],
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
    "BankAccountNumber.errorBankAccountNumber": {
      "nb-NO": "Ugyldig kontonummer.",
      "en-GB": "Invalid account number.",
      "sv-SE": "Ogiltigt kontonummer.",
      "da-DK": "Ugyldigt kontonummer."
    },
    "BankAccountNumber.errorBankAccountNumberLength": {
      "nb-NO": "Du må skrive inn et gyldig kontonummer med 11 siffer.",
      "en-GB": "You must enter a valid account number with 11 digits.",
      "sv-SE": "Du måste ange ett giltigt kontonummer med 11 siffror.",
      "da-DK": "Du skal indtaste et gyldigt kontonummer med 11 cifre."
    },
    "BankAccountNumber.errorRequired": {
      "nb-NO": "Du må fylle inn et kontonummer.",
      "en-GB": "You must enter an account number.",
      "sv-SE": "Du måste fylla i ett kontonummer.",
      "da-DK": "Du skal udfylde et kontonummer."
    },
    "BankAccountNumber.label": {
      "nb-NO": "Bankkonto",
      "en-GB": "Bank account",
      "sv-SE": "Bankkonto",
      "da-DK": "Bankkonto"
    },
    "BankAccountNumber.labelIban": {
      "nb-NO": "IBAN",
      "en-GB": "IBAN",
      "sv-SE": "IBAN",
      "da-DK": "IBAN"
    },
    "BankAccountNumber.labelSwedishBankgiro": {
      "nb-NO": "Bankgiro",
      "en-GB": "Bankgiro",
      "sv-SE": "Bankgiro",
      "da-DK": "Bankgiro"
    },
    "BankAccountNumber.labelSwedishBban": {
      "nb-NO": "Svenskt kontonummer",
      "en-GB": "Swedish account number",
      "sv-SE": "Svenskt kontonummer",
      "da-DK": "Svensk kontonummer"
    },
    "BankAccountNumber.labelSwedishPlusgiro": {
      "nb-NO": "Plusgiro",
      "en-GB": "Plusgiro",
      "sv-SE": "Plusgiro",
      "da-DK": "Plusgiro"
    }
  }
}
```
