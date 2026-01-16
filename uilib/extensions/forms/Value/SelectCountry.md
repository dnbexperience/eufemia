---
title: 'SelectCountry'
description: '`Value.SelectCountry` will render the selected country.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/SelectCountry/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.SelectCountry />)
```

## Description

`Value.SelectCountry` will render the selected country name by `value`'s ISO code ([ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)). It displays the country name in the current locale. If the value provided is not a valid/supported ISO code, it displays the value.

There is a corresponding [Field.SelectCountry](/uilib/extensions/forms/feature-fields/SelectCountry) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.SelectCountry path="/country" />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/SelectCountry)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/SelectCountry)

### The `useCountry` hook

You can use the `Value.SelectCountry.useCountry` hook to get the country name by ISO code ([ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)). It returns the country name in the current locale.

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'

const MyComponent = () => {
  const { getCountryNameByIso } = Value.SelectCountry.useCountry('NO')
}
```

## Demos

### Interactive

```tsx
render(
  <Form.Handler
    data={{
      myCountry: 'NO',
    }}
  >
    <Flex.Stack>
      <Field.SelectCountry path="/myCountry" />
      <Value.SelectCountry path="/myCountry" />
    </Flex.Stack>
  </Form.Handler>,
)
```

### Placeholder

```tsx
render(<Value.SelectCountry placeholder="No value given" />)
```

### Value

```tsx
render(<Value.SelectCountry value="NO" />)
```

### Use different locale

```tsx
render(
  <Form.Handler
    locale="en-GB"
    data={{
      myCountry: 'CH',
    }}
  >
    <Value.SelectCountry path="/myCountry" />
  </Form.Handler>,
)
```

### Label

```tsx
render(<Value.SelectCountry label="Label text" showEmpty />)
```

### Label and value

```tsx
render(<Value.SelectCountry label="Label text" value="NO" />)
```

### Inline

```tsx
render(
  <P>
    This is before the component <Value.SelectCountry value="NO" inline />{' '}
    This is after the component
  </P>,
)
```
