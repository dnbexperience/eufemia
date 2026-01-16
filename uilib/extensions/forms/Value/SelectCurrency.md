---
title: 'SelectCurrency'
description: '`Value.SelectCurrency` will render the selected currency.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/SelectCurrency/metadata.json
---

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
  </Form.Handler>,
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
  </Form.Handler>,
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
  </P>,
)
```
