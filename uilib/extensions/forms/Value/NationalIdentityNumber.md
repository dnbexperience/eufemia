---
title: 'NationalIdentityNumber'
description: '`Value.NationalIdentityNumber` is a wrapper component for displaying string values, with user experience tailored for national identity number values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/NationalIdentityNumber/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.NationalIdentityNumber />)
```

## Description

`Value.NationalIdentityNumber` is a wrapper component for displaying string values, with user experience tailored for national identity number values.

There is a corresponding [Field.NationalIdentityNumber](/uilib/extensions/forms/feature-fields/NationalIdentityNumber) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.NationalIdentityNumber />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/NationalIdentityNumber)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/NationalIdentityNumber)

## Demos

### Empty

```tsx
render(<Value.NationalIdentityNumber showEmpty />)
```

### Placeholder

```tsx
render(
  <Value.NationalIdentityNumber placeholder="The value was not filled in" />,
)
```

### Value

```tsx
render(<Value.NationalIdentityNumber value="25017598765" />)
```

### Label

```tsx
render(<Value.NationalIdentityNumber label="Label text" showEmpty />)
```

### Label and value

```tsx
render(
  <Value.NationalIdentityNumber label="Label text" value="25017598765" />,
)
```

### Inline

```tsx
render(
  <P>
    This is before the component{' '}
    <Value.NationalIdentityNumber value="25017598765" inline /> This is
    after the component
  </P>,
)
```
