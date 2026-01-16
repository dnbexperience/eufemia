---
title: 'Currency'
description: '`Field.Currency` is a wrapper component for the input of numbers, with user experience tailored for currency values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/feature-fields/Currency/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Currency />)
```

## Description

`Field.Currency` is a wrapper component for [number input](/uilib/extensions/forms/base-fields/Number), with user experience tailored for currency values.

It supports the HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute. Consider setting `autoComplete="transaction-amount"` if used to set the amount of a transaction, in a payment form.

There is a corresponding [Value.Currency](/uilib/extensions/forms/Value/Currency) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Currency)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/Currency)

## Demos

### Empty

```tsx
render(
  <Field.Currency onChange={(value) => console.log('onChange', value)} />,
)
```

### Placeholder

```tsx
render(
  <Field.Currency
    placeholder="Enter a number"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Label

```tsx
render(
  <Field.Currency
    label="Amount"
    currencyDisplay="name"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Label and value

```tsx
render(
  <Field.Currency
    value={150000}
    currency="NOK"
    label="Amount"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Exclusive minimum and exclusive maximum

```tsx
render(
  <Field.Currency
    value={1000}
    label="Label text"
    allowNegative={false}
    required
    exclusiveMinimum={900}
    exclusiveMaximum={1000}
    validateInitially
  />,
)
```

### With step controls

```tsx
render(
  <Field.Currency
    showStepControls
    label="Amount"
    minimum={500}
    maximum={2000}
    value={1000}
    step={100}
  />,
)
```

## Locale

This field is using `NOK` when `locale` is `en-GB`.

```tsx
render(
  <Provider locale="en-GB">
    <Field.Currency value={-150000} align="right" />
  </Provider>,
)
```

### With help

```tsx
render(
  <Field.Currency
    value={150000}
    currency="NOK"
    label="Amount"
    help={{
      title: 'Help is available',
      content:
        'Helping others, without expecting anything in return is what true self-worth is all about.',
    }}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Disabled

```tsx
render(
  <Field.Currency
    value={25000000}
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />,
)
```

### Error

```tsx
render(
  <Field.Currency
    value={12345678}
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  />,
)
```

### Validation - Required

```tsx
render(
  <Field.Currency
    value={42}
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    required
  />,
)
```

### With `Field.SelectCurrency`

This example demonstrates how to use `Field.Currency` together with `Field.SelectCurrency`.
It imitates a transaction, and therefore sets the HTML [autofill](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute for both fields, `transaction-currency` in `Field.SelectCurrency` and `transaction-amount` in `Field.Currency`.

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
