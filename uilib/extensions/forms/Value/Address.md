---
title: 'Address'
description: '`Value.Address` is a wrapper component for displaying string values, with user experience tailored for postal and street addresses.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/Address/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Address.Postal />)
render(<Value.Address.Street />)
```

## Description

`Value.Address` is a wrapper component for displaying string values, with user experience tailored for postal and street addresses.

There is a corresponding [Field.Address](/uilib/extensions/forms/feature-fields/Address) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(
  <>
    <Value.Address.Postal />
    <Value.Address.Street />
  </>,
)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/Address)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/Address)

## Demos

### Postal address

```tsx
render(<Value.Address.Postal value="Postboks 55 Falkum 3705 Skien" />)
```

### Street address

```tsx
render(<Value.Address.Street value="Dronning Eufemias gate 30" />)
```

### Placeholder

```tsx
render(<Value.Address.Street placeholder="Custom placeholder" />)
```

### Inline

```tsx
render(
  <Form.Handler
    defaultData={{
      streetAddress: 'Dronning Eufemias gate 30',
      postalAddress: 'Postboks 55 Falkum 3705 Skien',
    }}
  >
    <P>
      This is before the component{' '}
      <Value.Address.Street path="/streetAddress" inline />{' '}
      <Value.Address.Postal path="/postalAddress" inline /> This is after
      the component
    </P>
  </Form.Handler>,
)
```
