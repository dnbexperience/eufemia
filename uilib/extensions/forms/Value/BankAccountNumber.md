---
title: 'BankAccountNumber'
description: '`Value.BankAccountNumber` is a wrapper component for displaying string values, with user experience tailored for bank account number values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/BankAccountNumber/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.BankAccountNumber />)
```

## Description

`Value.BankAccountNumber` is a wrapper component for displaying string values, with user experience tailored for bank account number values.

There is a corresponding [Field.BankAccountNumber](/uilib/extensions/forms/feature-fields/BankAccountNumber) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.BankAccountNumber />)
```

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
  <Value.BankAccountNumber placeholder="The value was not filled in" />,
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
  </P>,
)
```
