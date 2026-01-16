---
title: 'SelectCurrency'
description: '`Field.SelectCurrency` is a wrapper component for the selection component, with options built in for selecting a currency.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/feature-fields/SelectCurrency/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.SelectCurrency />)
```

## Description

`Field.SelectCurrency` is a wrapper component for [Field.Selection](/uilib/extensions/forms/base-fields/Selection), with options built in for selecting a currency.
[The list of available currencies to select](/uilib/extensions/forms/feature-fields/SelectCurrency/properties/#list-of-available-currencies) is carefully curated to meet the demands we know today.
When selecting a currency, the value returned is the selected currency's [ISO 4217 code](https://en.wikipedia.org/wiki/ISO_4217) (currency code) like `NOK` for Norwegian krone.

It supports the HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute. Consider setting `autoComplete="transaction-currency"` if used to set the currency of a transaction, in a payment form.

There is a corresponding [Value.SelectCurrency](/uilib/extensions/forms/Value/SelectCurrency) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/SelectCurrency)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/SelectCurrency)

### Filter or prioritize currency listing

You can filter currencies with the `currencies` property's values `Scandinavia`, `Nordic` or `Europe`.

Currencies are sorted in alphabetically order, with the following prioritized currencies on top of the list:

- Norwegian krone
- Swedish krona
- Danish krone
- Euro
- United States dollar

### TransformIn and TransformOut

You can use the `transformIn` and `transformOut` to transform the value before it gets displayed in the field and before it gets sent to the form context. The second parameter is the currency object. You may have a look at the demo below to see how it works.

```tsx
import type { CurrencyType } from '@dnb/eufemia/extensions/forms/Field/SelectCurrency'

// From the Field (internal value) to the data context or event parameter
const transformOut = (internal: string, currency: CurrencyType) => {
  if (internal) {
    return `${currency.name} (${internal})`
  }
}

// To the Field (from e.g. defaultValue)
const transformIn = (external: unknown) => {
  return String(external).match(/\((.*)\)/)?.[1] || 'NOK'
}
```

### onFocus, onBlur, onChange

These events have an additional parameter with the currency object.

```tsx
const onFocus = (value, currency) => {}
```

### The currency object

```ts
{
  continent: 'Europe',
  name: 'Norsk krone',
  iso: 'NOK',
  decimals: 2,
  i18n: {
    en: 'Norwegian krone',
    nb: 'Norsk krone',
  },
  regions: ['Scandinavia', 'Nordic']
},
```

## Demos

### Option selected

```tsx
render(
  <Field.SelectCurrency
    value="NOK"
    onChange={(value, obj) => console.log('onChange', value, obj)}
  />,
)
```

### With a horizontal layout

```tsx
render(
  <Field.SelectCurrency
    value="NOK"
    layout="horizontal"
    layoutOptions={{
      width: '6rem',
    }}
  />,
)
```

### With help

```tsx
render(
  <Field.SelectCurrency
    value="NOK"
    label="Label text"
    help={{
      title: 'Help is available',
      content:
        'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
    }}
    onChange={(value, obj) => console.log('onChange', value, obj)}
  />,
)
```

### Disabled

```tsx
render(
  <Field.SelectCurrency
    value="NOK"
    label="Label text"
    onChange={(value, obj) => console.log('onChange', value, obj)}
    disabled
  />,
)
```

### Error

```tsx
render(
  <Field.SelectCurrency
    value="NOK"
    label="Label text"
    onChange={(value, obj) => console.log('onChange', value, obj)}
    error={new Error('This is what is wrong...')}
  />,
)
```

### Validation - Required

```tsx
render(
  <Field.SelectCurrency
    label="Label text"
    onChange={(value, obj) => console.log('onChange', value, obj)}
    required
    validateInitially
    validateUnchanged
  />,
)
```

### TransformIn and TransformOut

```tsx
// From the Field (internal value) to the data context or event parameter
const transformOut = (value, currency) => {
  if (value) {
    return currency
  }
}

// To the Field (from e.g. defaultValue)
// To the Field (from e.g. defaultValue)
const transformIn = (currency) => {
  return currency?.iso
}
const MyForm = () => {
  return (
    <Form.Handler onSubmit={console.log}>
      <Form.Card>
        <Field.SelectCurrency
          path="/currency"
          transformIn={transformIn}
          transformOut={transformOut}
          defaultValue="NOK"
        />

        <Value.SelectCurrency
          path="/currency"
          transformIn={transformIn}
          placeholder="(Select a currency)"
          showEmpty
        />

        <Form.SubHeading>Data Context</Form.SubHeading>
        <Tools.Log />
      </Form.Card>
      <Form.SubmitButton />
    </Form.Handler>
  )
}
render(<MyForm />)
```

### Filter currencies

This example demonstrates how to filter specific currencies. Use the `currencies` property to define a set of currencies and/or the `filterCurrencies` property to apply custom filtering logic.

```tsx
render(
  <Field.SelectCurrency
    currencies="Scandinavia"
    filterCurrencies={({ iso }) => iso !== 'DKK'}
  />,
)
```

### With `Field.Currency`

This example demonstrates how to use `Field.SelectCurrency` together with `Field.Currency`.
It imitates a transaction, and therefore sets the HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute for both fields, `transaction-currency` in `Field.SelectCurrency` and `transaction-amount` in `Field.Currency`. This is done to provide automated assistance in filling out form field values, as well as guidance to the browser as to the type of information expected in the field.

```tsx
render(
  <Form.Handler onSubmit={console.log}>
    <Form.Card>
      <Flex.Horizontal>
        <Field.SelectCurrency
          label="Select a currency"
          path="/currency"
          value="EUR"
          autoComplete="transaction-currency"
        />
        <Field.Currency
          label="Amount"
          currency="/currency"
          autoComplete="transaction-amount"
        />
      </Flex.Horizontal>
    </Form.Card>
    <Form.SubmitButton text="Pay" />
  </Form.Handler>,
)
```

```tsx
render(
  <Field.SelectCurrency
    value="NOK"
    htmlAttributes={{
      opened: true,
    }}
  />,
)
```
