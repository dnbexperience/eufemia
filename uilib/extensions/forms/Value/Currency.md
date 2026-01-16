---
title: 'Currency'
description: '`Value.Currency` is a wrapper component for displaying number values, with user experience tailored for currency values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/Currency/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Currency />)
```

## Description

`Value.Currency` is a wrapper component for displaying number values, with user experience tailored for currency values.

There is a corresponding [Field.Currency](/uilib/extensions/forms/feature-fields/Currency) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Currency />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/Currency)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/Currency)

## Demos

### Empty

```tsx
render(<Value.Currency showEmpty />)
```

### Placeholder

```tsx
render(<Value.Currency placeholder="The value was not filled in" />)
```

### Value

```tsx
render(<Value.Currency value={150} />)
```

### Suffix

```tsx
render(<Value.Currency value={150} suffix=" - my suffix" />)
```

### Label

```tsx
render(<Value.Currency label="Label text" showEmpty />)
```

### Label and value

```tsx
render(<Value.Currency label="Label text" value={60000000} />)
```

### Inline

```tsx
render(
  <P>
    This is before the component <Value.Currency value={25000} inline />{' '}
    This is after the component
  </P>,
)
```

### Inline and label

```tsx
render(
  <P>
    This is before the component{' '}
    <Value.Currency label="Label text" value={25000} inline /> This is
    after the component
  </P>,
)
```
